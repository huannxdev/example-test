import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/response.type';
import { User } from '../model/user.type';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private readonly api_url = environment.api_url;
  registerUser(email: string, password: string) {
    const url = `${this.api_url}/register`;
    return this.httpClient.post(url, { email, password });
  }

  getAllRegisterUsers(page: number) {
    const url = `${this.api_url}/users`;
    return this.httpClient.get<ApiResponse<User[]>>(url, { params: { page } });
  }
}
