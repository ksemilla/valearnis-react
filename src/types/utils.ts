export interface AccessToken {
  access_token: string
}

export interface ErrorResponse {
  response: {
    data: { detail: { msg: string; loc: (string | number)[] }[] }
  }
}
