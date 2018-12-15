import { Service } from './../services/service';
import { Player } from './../models/Player';
import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage:any = TabsPage;
  player: Player;
  toggleClickButton: boolean;
  clickCount: number;
  key: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private service: Service) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.setDefaultClickCount();
    this.getKey();
    this.getGamePIN();
  }

  onButtonClick(){
    this.player = {
      clickCount: 0,
      icon: "roxo",
      id: 1234,
      initials: "RG",
      name: "Ronaldinho Gaúcho"
    };

    this.setPlayer(this.player);
  }

  setPlayer(player: Player) {
    const srv = this.service.setPlayer(player);
    this.key = srv.key;

    srv.then(() => console.log("Player saved!"));
    this.saveKey(this.key);

    this.service.updatePlayer(player, this.key).then(a => console.log("Player updated!"))
  }

  registerPlayerClick() {
    let count = Number(this.service.getClickCount());
    count++
	  this.service.updateClickCount(count, this.key)
  }

  getGamePIN() {
	  this.service.getGamePIN().valueChanges().subscribe(pin => {
      console.log(pin);
      this.toggleClickButton = Boolean(pin)
    });
  }

  startGame() {
    this.service.startGame();
  }

  disableGame() {
    this.service.disableGame();
  }

  setDefaultClickCount() {
    if(!Number(this.service.getClickCount())) {
      this.service.saveClickCount(0);
    }
  }

  saveClickCount() {
    const count = Number(this.service.getClickCount());
    if(count === 0){
      this.service.saveClickCount(this.clickCount);
    }
  }

  saveKey(value: string) {
      this.service.saveKey(value);
  }

  getKey(){
    this.key = this.service.getKey();
  }

}
