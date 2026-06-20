import {
  BEIJING_TIME_ZONE_LABEL,
  formatBeijingDateTime,
  formatBeijingDataTimestamp,
  formatFullBeijingDateTime,
  getBeijingDateKey,
  getTodayDateKeyInBeijing,
  isTodayInBeijing
} from "./time";

export const DISPLAY_TIME_ZONE_LABEL = BEIJING_TIME_ZONE_LABEL;

export function formatDisplayDateTime(value: string | Date) {
  return formatBeijingDateTime(value);
}

export function formatFullDisplayDateTime(value: string | Date) {
  return formatFullBeijingDateTime(value);
}

export function formatDisplayDateKey(value: string | Date) {
  return getBeijingDateKey(value);
}

export {
  formatBeijingDateTime,
  formatBeijingDataTimestamp,
  getBeijingDateKey,
  getTodayDateKeyInBeijing,
  isTodayInBeijing
};
