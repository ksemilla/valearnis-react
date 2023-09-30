import { AccessToken, Credentials, User } from "../types"
import { ApiService } from "./BaseService"

export class AuthService {
  static verifyToken(data: AccessToken) {
    return ApiService.post<User>(`auth/verify/`, data)
  }

  static login(data: Credentials) {
    return ApiService.post<AccessToken>(`auth/`, data)
  }
}
