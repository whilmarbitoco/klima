export function generateRandomId(base: string, length: number = 32): string {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  const randomPart = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const input = `${base}-${randomPart}-${Date.now()}`;

  let hash: number = Date.now();
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const final = (hash >>> 0).toString(16) + randomPart;

  return final.slice(0, length);
}

export const isParementersMissing = (anything: any[]): boolean => {
  return anything.some((item) => item === undefined || item === null);
};
