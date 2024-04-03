import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function formatDate(dateTime: Date) {
  return format(dateTime, "dd/MM/yyyy HH:mm", { locale: vi });
}
