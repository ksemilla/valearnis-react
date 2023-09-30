export const getAccessToken = () => {
  return localStorage.getItem("accessToken")
}

export function decodeJwt(token: string): any {
  const parts = token.split(".")

  if (parts.length !== 3) {
    throw new Error("Invalid JWT token format")
  }

  const payloadBase64Url = parts[1]
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/")
  const payloadJson = decodeURIComponent(
    atob(payloadBase64)
      .split("")
      .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )

  return JSON.parse(payloadJson)
}
