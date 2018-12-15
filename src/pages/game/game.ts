import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../services/service';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  clickCount = 0;
  toggleClickButton: boolean;
  clickable: boolean;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private service: Service) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.getGamePIN();
    this.getClickable();
    this.getKey();
  }

  saveClickCount() {
    this.clickCount = Number(this.service.getClickCount());
    if(this.clickCount === 0){
      this.service.saveClickCount(this.clickCount);
    }
  }

  getGamePIN() {
	  this.service.getGamePIN().valueChanges().subscribe(pin => {
      console.log(pin);
      this.toggleClickButton = Boolean(pin)
    });
  }

  getClickable() {
	  this.service.getClickable().valueChanges().subscribe(res => {
      console.log(res);
      this.clickable = Boolean(res)
    });
  }

  registerPlayerClick() {
    this.clickCount = Number(this.service.getClickCount());
    this.clickCount++
    this.service.setClickable(false).then(() => {
      this.service.updateClickCount(this.clickCount, this.key).then(() => {
        setTimeout(() => {
          this.service.setClickable(true);
        }, 300)
      });
    });
  }

  startGame() {
    this.service.setEnableGame(true);
  }

  disableGame() {
    this.service.setEnableGame(false);
  }

  getKey(){
    this.key = this.service.getKey();
  }

}
