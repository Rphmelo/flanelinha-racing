webpackJsonp([1],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CLICK_COUNT_KEY = "CLICK_COUNT_KEY";
var USER_ID_KEY = "USER_ID_KEY";
var Service = (function () {
    function Service(db) {
        this.db = db;
        this.basePath = '/realPlayers';
    }
    Service.prototype.setPlayer = function (player) {
        return this.db.database.ref().child(this.basePath).push(player);
    };
    Service.prototype.updatePlayer = function (player, key) {
        return this.db.database.ref(this.basePath + "/" + key).update(player);
    };
    Service.prototype.updateClickCount = function (clickCount, key) {
        this.saveClickCount(clickCount);
        return this.db.database.ref(this.basePath + "/" + key + "/clickCount").set(clickCount);
    };
    Service.prototype.setEnableGame = function (value) {
        this.db.database.ref("/enableGame").set(value);
    };
    Service.prototype.getGamePIN = function () {
        return this.db.object("/enableGame");
    };
    Service.prototype.getClickable = function () {
        return this.db.object("/clickable");
    };
    Service.prototype.setClickable = function (value) {
        return this.db.database.ref("/clickable").set(value);
    };
    Service.prototype.saveClickCount = function (value) {
        localStorage.setItem(CLICK_COUNT_KEY, String(value));
    };
    Service.prototype.saveKey = function (value) {
        localStorage.setItem(USER_ID_KEY, value);
    };
    Service.prototype.getKey = function () {
        return localStorage.getItem(USER_ID_KEY);
    };
    Service.prototype.getClickCount = function () {
        return localStorage.getItem(CLICK_COUNT_KEY);
    };
    Service.prototype.getRegisteredPlayersCount = function () {
        return this.db.database.ref().child("realPlayers");
    };
    Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["AngularFireDatabase"]])
    ], Service);
    return Service;
}());

//# sourceMappingURL=service.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_service__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GamePage = (function () {
    function GamePage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.clickCount = 0;
    }
    GamePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GamePage');
        this.getGamePIN();
        this.getClickable();
        this.getKey();
    };
    GamePage.prototype.saveClickCount = function () {
        this.clickCount = Number(this.service.getClickCount());
        if (this.clickCount === 0) {
            this.service.saveClickCount(this.clickCount);
        }
    };
    GamePage.prototype.getGamePIN = function () {
        var _this = this;
        this.service.getGamePIN().valueChanges().subscribe(function (pin) {
            console.log(pin);
            _this.toggleClickButton = Boolean(pin);
        });
    };
    GamePage.prototype.getClickable = function () {
        var _this = this;
        this.service.getClickable().valueChanges().subscribe(function (res) {
            console.log(res);
            _this.clickable = Boolean(res);
        });
    };
    GamePage.prototype.registerPlayerClick = function () {
        var _this = this;
        this.clickCount = Number(this.service.getClickCount());
        this.clickCount++;
        this.service.setClickable(false).then(function () {
            if (_this.clickCount < 10) {
                _this.service.updateClickCount(_this.clickCount, _this.key).then(function () {
                    if (_this.clickCount === 9) {
                        _this.disableGame();
                        _this.service.saveClickCount(0);
                    }
                    else {
                        setTimeout(function () {
                            _this.service.setClickable(true);
                        }, 500);
                    }
                });
            }
        });
    };
    GamePage.prototype.startGame = function () {
        this.service.setEnableGame(true);
    };
    GamePage.prototype.disableGame = function () {
        this.service.setEnableGame(false);
    };
    GamePage.prototype.getKey = function () {
        this.key = this.service.getKey();
    };
    GamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-game',template:/*ion-inline-start:"C:\fiap\flanelinha-racing\src\pages\game\game.html"*/`<!--\n\n  Generated template for the GamePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>GAME</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <div class="numero-clicks">{{clickCount}}</div>\n\n  <div class="numero-clicks" *ngIf="clickCount > 8" >Você ganhou!</div>\n\n\n\n  <button ion-button large full icon-only (click)="registerPlayerClick()"\n\n  [disabled]="!flagClickButton && !clickable">\n\n      <ion-icon name="car"></ion-icon>\n\n    </button>\n\n\n\n</ion-content>`/*ion-inline-end:"C:\fiap\flanelinha-racing\src\pages\game\game.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_service__["a" /* Service */]])
    ], GamePage);
    return GamePage;
}());

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/game/game.module": [
		704,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 212;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_game__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, service, formBuilder) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.formBuilder = formBuilder;
        this.player = {
            clickCount: 0,
            icon: "",
            id: 0,
            initials: "",
            name: "",
            lastName: ""
        };
    }
    HomePage.prototype.ngOnInit = function () {
        this.createFormLogin();
        this.setDefaultClickCount();
        this.getKey();
        this.getRegisteredPlayersCount();
        this.colors = ["cinza", "laranja", "roxo"];
        this.formLogin.controls;
    };
    HomePage.prototype.createFormLogin = function () {
        this.formLogin = this.formBuilder.group({
            name: [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            lastName: [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            icon: [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required]
        });
    };
    HomePage.prototype.getRegisteredPlayersCount = function () {
        var _this = this;
        this.service.getRegisteredPlayersCount().on("value", function (snapshot) {
            console.log("Player count: " + snapshot.numChildren());
            _this.userId = snapshot.numChildren();
        });
    };
    HomePage.prototype.registerNewPlayer = function () {
        if (this.formLogin.invalid) {
            return;
        }
        this.player.name = this.formLogin.controls["name"].value;
        this.player.lastName = this.formLogin.controls["lastName"].value;
        this.player.initials = "" + (this.player.name ? this.player.name[0] : "") + (this.player.lastName ? this.player.lastName[0] : '');
        this.player.id = this.userId;
        this.player.icon = this.formLogin.controls["icon"].value;
        this.setPlayer(this.player);
    };
    HomePage.prototype.setPlayer = function (player) {
        var _this = this;
        var srv = this.service.setPlayer(player);
        this.key = srv.key;
        srv.then(function () { return console.log("Player saved!"); });
        this.saveKey(this.key);
        this.service.updatePlayer(player, this.key).then(function (a) {
            console.log("Player updated!");
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__game_game__["a" /* GamePage */]);
        });
    };
    HomePage.prototype.setDefaultClickCount = function () {
        if (!Number(this.service.getClickCount())) {
            this.service.saveClickCount(0);
        }
    };
    HomePage.prototype.saveKey = function (value) {
        this.service.saveKey(value);
    };
    HomePage.prototype.getKey = function () {
        this.key = this.service.getKey();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\fiap\flanelinha-racing\src\pages\home\home.html"*/`<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Cadastro\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding  [formGroup]="formLogin" novalidate>\n\n  <ion-item>\n\n    <ion-label>Nome</ion-label>\n\n    <ion-input type="text" formControlName="name"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label>Sobrenome</ion-label>\n\n    <ion-input type="text" formControlName="lastName"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label>Cor do ícone</ion-label>\n\n    <ion-select formControlName="icon" interface="action-sheet">\n\n      <ion-option *ngFor="let color of colors" [value]="color">{{color}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n  <button ion-button block (click)="registerNewPlayer()">CADASTRAR</button>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\fiap\flanelinha-racing\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_service__["a" /* Service */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(364);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_game_game__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_forms__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Import the AF2 Module






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_game_game__["a" /* GamePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_10__environment__["a" /* environment */].firebase, __WEBPACK_IMPORTED_MODULE_10__environment__["a" /* environment */].dbName),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_12__angular_forms__["e" /* ReactiveFormsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_game_game__["a" /* GamePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__services_service__["a" /* Service */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(358);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\fiap\flanelinha-racing\src\app\app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n\n`/*ion-inline-end:"C:\fiap\flanelinha-racing\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    firebase: {
        apiKey: "AIzaSyC3VUWDei9pmytUQ8Dk9bMIYhOjug6lpoU",
        authDomain: "flanelinha-223018.firebaseapp.com",
        databaseURL: "https://flanelinha-223018.firebaseio.com",
        projectId: " flanelinha-223018",
        storageBucket: " flanelinha-223018.appspot.com",
        messagingSenderId: "671584397542"
    },
    dbName: 'flanelinha'
};
//# sourceMappingURL=index.js.map

/***/ })

},[359]);
//# sourceMappingURL=main.js.map