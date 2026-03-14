export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function arrayToLines(value: string[]): string {
  return value.join("\n");
}

export function commaToArray(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function arrayToComma(value: string[]): string {
  return value.join(", ");
}

