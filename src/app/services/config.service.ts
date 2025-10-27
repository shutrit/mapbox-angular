import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  async loadConfig() {
    // console.log("check loading Config json");
    const configUrl = "../../assets/config.json";
    this.config = await firstValueFrom(this.http.get(configUrl));
  }

  get<T = any>(key: string): T {
    return this.config?.[key];
  }

  getAll() {
    return this.config;
  }
}
