import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Player } from '../models/player';

const CLICK_COUNT_KEY = "CLICK_COUNT_KEY";
const USER_ID_KEY = "USER_ID_KEY";

@Injectable()
export class Service {

  private basePath: string = '/realPlayers';

  constructor(private db: AngularFireDatabase) { }

  setPlayer(player: Player){
    return this.db.database.ref().child(this.basePath).push(player);
  }

  updatePlayer(player: Player, key: string){
    return this.db.database.ref(`${this.basePath}/${key}`).update(player);
  }

  updateClickCount(clickCount: number, key: string){
    this.saveClickCount(clickCount);
    return this.db.database.ref(`${this.basePath}/${key}/clickCount`).set(clickCount);
  }

  setEnableGame(value: boolean){
    this.db.database.ref(`/enableGame`).set(value);
  }

  getGamePIN(): AngularFireObject<number>{
    return this.db.object(`/enableGame`);
  }

  getClickable(): AngularFireObject<number>{
    return this.db.object(`/clickable`);
  }

  setClickable(value: boolean) {
    return this.db.database.ref(`/clickable`).set(value);
  }

  saveClickCount(value: number){
    localStorage.setItem(CLICK_COUNT_KEY, String(value));
  }

  saveKey(value: string){
    localStorage.setItem(USER_ID_KEY, value);
  }

  getKey(): string{
    return localStorage.getItem(USER_ID_KEY);
  }

  getClickCount(): string{
    return localStorage.getItem(CLICK_COUNT_KEY);
  }

  getRegisteredPlayersCount() {
    return this.db.database.ref().child("realPlayers");
  }
 
}
