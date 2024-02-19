import { Settings, DateTime } from "luxon";
import { tokenDecode } from "./decodeToken";

export function validateTokenExpiration(token: string) {
  Settings.defaultLocale = "es";
  const { exp } = tokenDecode(token);
  const now = DateTime.now().toMillis();
  return exp ? exp * 1000 <= now : true;
}
