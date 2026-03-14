export const MAX_PHOTO_UPLOAD_BYTES = 5 * 1024 * 1024;
export const MAX_PHOTO_OUTPUT_BYTES = 420 * 1024;
export const MAX_PHOTO_DIMENSION = 480;
export const PHOTO_ACCEPT_TYPES = ["image/jpeg", "image/png", "image/webp"];

type CompressionResult =
  | {
      ok: true;
      dataUrl: string;
    }
  | {
      ok: false;
      message: string;
    };

function estimateDataUrlBytes(dataUrl: string): number {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Math.ceil((base64.length * 3) / 4);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("图片加载失败"));
    };

    image.src = objectUrl;
  });
}

function drawToDataUrl(image: HTMLImageElement, maxDimension: number, quality: number): string {
  const longestSide = Math.max(image.width, image.height);
  const scale = longestSide > maxDimension ? maxDimension / longestSide : 1;
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器不支持图片压缩");
  }

  canvas.width = width;
  canvas.height = height;

  // Use a white background so exported PDF stays clean even for transparent PNGs.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", quality);
}

export async function processPhotoUpload(file: File): Promise<CompressionResult> {
  if (!PHOTO_ACCEPT_TYPES.includes(file.type)) {
    return {
      ok: false,
      message: "仅支持 JPG、PNG 或 WebP 格式的图片",
    };
  }

  if (file.size > MAX_PHOTO_UPLOAD_BYTES) {
    return {
      ok: false,
      message: "图片不能超过 5MB，请更换更小的文件",
    };
  }

  try {
    const image = await loadImage(file);

    if (image.width < 120 || image.height < 120) {
      return {
        ok: false,
        message: "图片尺寸过小，建议上传至少 120x120 的清晰照片",
      };
    }

    const dimensionCandidates = [MAX_PHOTO_DIMENSION, 420, 360, 320];
    const qualityCandidates = [0.86, 0.8, 0.74, 0.68];

    for (const dimension of dimensionCandidates) {
      for (const quality of qualityCandidates) {
        const dataUrl = drawToDataUrl(image, dimension, quality);
        if (estimateDataUrlBytes(dataUrl) <= MAX_PHOTO_OUTPUT_BYTES) {
          return {
            ok: true,
            dataUrl,
          };
        }
      }
    }

    return {
      ok: false,
      message: "图片压缩后仍然过大，请换一张更小或更简单的照片",
    };
  } catch {
    return {
      ok: false,
      message: "图片处理失败，请重新选择文件",
    };
  }
}

export function isValidPhotoDataUrl(value: string): boolean {
  return /^data:image\/(jpeg|jpg|png|webp);base64,/i.test(value.trim());
}

