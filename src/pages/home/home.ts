import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { Service } from '../../services/service';
import { Player } from '../../models/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  listaAvatar: any;
  toggleClickButton: boolean;
  key: string;
  userId: number;
  formLogin: FormGroup;

  player: Player = {
    clickCount: 0,
    icon: "",
    id: 0,
    initials: "",
    name: "",
    lastName: ""
  };

  colors: Array<string>;

  constructor(public navCtrl: NavController,  private service: Service,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createFormLogin();
    this.setDefaultClickCount();
    this.getKey();
    this.getRegisteredPlayersCount();
    this.colors = ["cinza", "laranja", "roxo"];
    this.formLogin.controls
  }

  createFormLogin() {
    this.formLogin = this.formBuilder.group({
      name:  [null, Validators.required],
      lastName: [null, Validators.required],
      icon: [null, Validators.required]
    });
  }

  getRegisteredPlayersCount() {
    this.service.getRegisteredPlayersCount().on("value", (snapshot) => {
      console.log(`Player count: ${snapshot.numChildren()}`);
      this.userId = snapshot.numChildren();
    });
  }

  registerNewPlayer(){
    if(this.formLogin.invalid){
      return;
    }
    
    this.player.name = this.formLogin.controls["name"].value;
    this.player.lastName = this.formLogin.controls["lastName"].value
    this.player.initials = `${this.player.name ? this.player.name[0]: ""}${this.player.lastName ? this.player.lastName[0]: ''}`
    this.player.id = this.userId;
    this.player.icon = this.formLogin.controls["icon"].value;

    this.setPlayer(this.player);
  }

  setPlayer(player: Player) {
    const srv = this.service.setPlayer(player);
    this.key = srv.key;

    srv.then(() => console.log("Player saved!"));
    this.saveKey(this.key);

    this.service.updatePlayer(player, this.key).then(a => {
      console.log("Player updated!");
      this.navCtrl.push(GamePage);
    })
  }

  setDefaultClickCount() {
    if(!Number(this.service.getClickCount())) {
      this.service.saveClickCount(0);
    }
  }

  saveKey(value: string) {
      this.service.saveKey(value);
  }

  getKey(){
    this.key = this.service.getKey();
  }

}
