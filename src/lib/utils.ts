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

export const moistureAverage = (data: number[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / data.length).toFixed(2));
};

export const isOptimalTemperature = (temp: number): boolean => {
  return temp >= 20 && temp <= 30;
};

export const isOptimalSoilMoisture = (moisture: number): boolean => {
  return moisture >= 20 && moisture <= 60;
};

export const isOptimalHumidity = (
  humidity: number
): "Low" | "Optimal" | "High" => {
  return humidity < 30 ? "Low" : humidity > 60 ? "High" : "Optimal";
};

export const isOptimalPressure = (pressure: number): boolean => {
  return pressure >= 1010 && pressure <= 1025;
};

export const cleanAIResponse = (raw: string): string => {
  let cleaned = raw.replace(/```(?:json)?/gi, "");

  const firstBracketIndex = Math.min(
    ...["[", "{"].map((ch) => cleaned.indexOf(ch)).filter((i) => i >= 0)
  );
  if (firstBracketIndex > 0) {
    cleaned = cleaned.slice(firstBracketIndex);
  }

  const lastBracketIndex = Math.max(
    cleaned.lastIndexOf("]"),
    cleaned.lastIndexOf("}")
  );
  if (lastBracketIndex > 0) {
    cleaned = cleaned.slice(0, lastBracketIndex + 1);
  }

  cleaned = cleaned.replace(/\\n/g, "");
  cleaned = cleaned.trim();

  return cleaned;
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const transformDay = (index: number): string => {
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = (today.getDay() + index) % 7;
  return index == 0 ? `${days[dayIndex]} (Today)` : days[dayIndex];
};
