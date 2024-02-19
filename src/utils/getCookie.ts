export function getCookie(cookie: string) {
  if (typeof document !== "undefined") {
    var cookieFounded = document.cookie.match(
      "(^|;)\\s*" + cookie + "\\s*=\\s*([^;]+)"
    );

    if (cookieFounded) {
      return decodeURIComponent(cookieFounded.pop()!);
    }
  }
}
