const DISPLAY_LOCALE = "zh-CN";
const DISPLAY_TIME_ZONE = "Asia/Shanghai";

export function formatDisplayDateTime(value: string) {
  return new Date(value).toLocaleString(DISPLAY_LOCALE, {
    timeZone: DISPLAY_TIME_ZONE,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatFullDisplayDateTime(value: string) {
  return new Date(value).toLocaleString(DISPLAY_LOCALE, {
    timeZone: DISPLAY_TIME_ZONE
  });
}
