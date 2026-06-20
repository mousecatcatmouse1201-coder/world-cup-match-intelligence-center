const BEIJING_LOCALE = "zh-CN";
const BEIJING_TIME_ZONE = "Asia/Shanghai";

export const BEIJING_TIME_ZONE_LABEL = "北京时间";

function toDate(value: string | Date) {
  return typeof value === "string" ? new Date(value) : value;
}

function beijingParts(value: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BEIJING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(toDate(value));
}

function part(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((item) => item.type === type)?.value ?? "";
}

export function getBeijingDateKey(value: string | Date): string {
  const parts = beijingParts(value);
  return `${part(parts, "year")}-${part(parts, "month")}-${part(parts, "day")}`;
}

export function getTodayDateKeyInBeijing(now: Date = new Date()): string {
  return getBeijingDateKey(now);
}

export function isTodayInBeijing(value: string | Date, now: Date = new Date()): boolean {
  return getBeijingDateKey(value) === getTodayDateKeyInBeijing(now);
}

export function formatBeijingDateTime(value: string | Date): string {
  return toDate(value).toLocaleString(BEIJING_LOCALE, {
    timeZone: BEIJING_TIME_ZONE,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatFullBeijingDateTime(value: string | Date): string {
  return toDate(value).toLocaleString(BEIJING_LOCALE, {
    timeZone: BEIJING_TIME_ZONE
  });
}

export function formatBeijingDataTimestamp(value: string | Date): string {
  const parts = beijingParts(value);
  return `${part(parts, "year")}-${part(parts, "month")}-${part(parts, "day")} ${part(parts, "hour")}:${part(parts, "minute")}`;
}
