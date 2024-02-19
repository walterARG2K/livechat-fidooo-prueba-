export function getCookie(cookie: string) {
  var cookieFounded = document.cookie.match(
    "(^|;)\\s*" + cookie + "\\s*=\\s*([^;]+)"
  );
  if (cookieFounded) {
    return decodeURIComponent(cookieFounded.pop()!);
  }
}
