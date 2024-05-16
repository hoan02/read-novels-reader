import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function formatDate(dateTime: Date) {
  return format(dateTime, "dd/MM/yyyy", { locale: vi });
}

export function formatDateTime(dateTime: Date) {
  return format(dateTime, "dd/MM/yyyy HH:mm", { locale: vi });
}
