import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';

@Injectable({
  providedIn: 'root'
})
export class RealmService {

  private app: Realm.App;
  private credentials!: Realm.Credentials;
  private currentUser: Realm.User | null = null;

  constructor() {
    // Substitua pelo seu App ID
    this.app = new Realm.App({ id: 'application-0-zteel' });
  }

  async login(email: string, password: string): Promise<void> {
    this.credentials = Realm.Credentials.anonymous();
    //emailPassword(email, password);
    const user = await this.app.logIn(this.credentials);
    this.currentUser = user;
  }

  async callFunctionExample(name: string): Promise<string> {
    if (!this.currentUser) throw new Error('Usuário não autenticado.');
    
    const result = await this.currentUser.functions.callFunction('getGreeting', [name]);
    return result;
  }

  async register(email: string, password: string): Promise<void> {
    await this.app.emailPasswordAuth.registerUser({ email, password });
  }
  
  logout() {
    if (this.currentUser) {
      this.currentUser.logOut();
      this.currentUser = null;
    }
  }
}
