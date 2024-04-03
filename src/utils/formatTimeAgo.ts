import { format, differenceInMilliseconds } from "date-fns";
import { vi } from "date-fns/locale";

export default function formatTimeAgo(dateTime: Date) {
  const now = new Date();
  const diffMilliseconds = differenceInMilliseconds(now, dateTime);

  if (diffMilliseconds >= 31536000000) {
    // 1 year in milliseconds
    return format(dateTime, "dd/MM/yyyy", { locale: vi });
  } else if (diffMilliseconds >= 86400000) {
    // 1 day in milliseconds
    return `${Math.floor(diffMilliseconds / 86400000)} ngày trước`;
  } else if (diffMilliseconds >= 3600000) {
    // 1 hour in milliseconds
    return `${Math.floor(diffMilliseconds / 3600000)} giờ trước`;
  } else if (diffMilliseconds >= 60000) {
    // 1 minute in milliseconds
    return `${Math.floor(diffMilliseconds / 60000)} phút trước`;
  } else {
    return `${Math.floor(diffMilliseconds / 1000)} giây trước`;
  }
}
