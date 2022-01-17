import { Injectable } from '@angular/core';

export enum AppCacheKeys {
  User = 'gl-user_token'
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() { }
  cache(key: string, item: any): void { localStorage.setItem(key, JSON.stringify(item)); }
  isItem(key: string): boolean { return !!localStorage.getItem(key); }
  getItem<T>(key: string): T { return JSON.parse(localStorage.getItem(key)); }
  clear(): void { localStorage.clear() }
}
