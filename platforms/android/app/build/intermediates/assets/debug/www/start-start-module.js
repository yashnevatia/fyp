(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["start-start-module"],{

/***/ "./src/app/start/start.module.ts":
/*!***************************************!*\
  !*** ./src/app/start/start.module.ts ***!
  \***************************************/
/*! exports provided: StartPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartPageModule", function() { return StartPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _start_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./start.page */ "./src/app/start/start.page.ts");







var routes = [
    {
        path: '',
        component: _start_page__WEBPACK_IMPORTED_MODULE_6__["StartPage"]
    }
];
var StartPageModule = /** @class */ (function () {
    function StartPageModule() {
    }
    StartPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_start_page__WEBPACK_IMPORTED_MODULE_6__["StartPage"]]
        })
    ], StartPageModule);
    return StartPageModule;
}());



/***/ }),

/***/ "./src/app/start/start.page.html":
/*!***************************************!*\
  !*** ./src/app/start/start.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n\t<link href=\"https://fonts.googleapis.com/css?family=Cairo|Lato|Raleway|Righteous\" rel=\"stylesheet\">\n\n\n</ion-header>\n\n<ion-content padding color=\"base\">\n<img src=\"assets/icon/logo3.png\" alt=\"your image\">\n<div class=\"main_content\">\n<ion-button color=\"dark\" href=\"/data\" block>Workout Stats <ion-icon name=\"stats\">Workout Stats</ion-icon> </ion-button>\n<br>\n<br>\n<ion-button ion-button color=\"light\" href=\"/home\" block>Start Workout <ion-icon name=\"flame\"></ion-icon></ion-button>\n</div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/start/start.page.scss":
/*!***************************************!*\
  !*** ./src/app/start/start.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0YXJ0L3N0YXJ0LnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/start/start.page.ts":
/*!*************************************!*\
  !*** ./src/app/start/start.page.ts ***!
  \*************************************/
/*! exports provided: StartPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartPage", function() { return StartPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_bluetooth_serial_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/bluetooth-serial/ngx */ "./node_modules/@ionic-native/bluetooth-serial/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");




var StartPage = /** @class */ (function () {
    function StartPage(alertCtrl, bluetoothSerial, toastCtrl) {
        this.alertCtrl = alertCtrl;
        this.bluetoothSerial = bluetoothSerial;
        this.toastCtrl = toastCtrl;
        this.HC05 = "HC-05";
        this.success = function (data) { return alert(data); };
        this.fail = function (error) { return alert(error); };
        this.model = {};
    }
    StartPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var address, i;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Here");
                        return [4 /*yield*/, this.bluetoothSerial.enable()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bluetoothSerial.list().then(function (successfulPairing) {
                                _this.pairedDevices = successfulPairing;
                                console.log(_this.pairedDevices);
                            }, function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        address = "";
                        for (i = this.pairedDevices.length - 1; i >= 0; i--) {
                            if (this.pairedDevices[i].name == this.HC05) {
                                address = this.pairedDevices[i].address;
                                break;
                            }
                        }
                        return [4 /*yield*/, this.selectDevice(address)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // console.log(paired);
    /* Slide 1 - Find, Connect, Disconnect */
    StartPage.prototype.startScanning = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pairedDevices = null;
                        this.unpairedDevices = null;
                        this.gettingDevices = true;
                        return [4 /*yield*/, this.bluetoothSerial.discoverUnpaired().then(function (success) {
                                _this.unpairedDevices = success;
                                _this.gettingDevices = false;
                                success.forEach(function (element) {
                                    if (element.name == _this.HC05) {
                                        _this.selectDevice(element.address);
                                    }
                                    console.log(element);
                                });
                            }, function (err) {
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StartPage.prototype.selectDevice = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = '98:D3:A1:FD:38:1C';
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Connect',
                                message: 'Do you want to connect with?' + address,
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
                                        }
                                    },
                                    {
                                        text: 'Connect',
                                        handler: function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        console.log(address);
                                                        return [4 /*yield*/, this.bluetoothSerial.connect(address).subscribe(this.success, this.fail)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StartPage.prototype.disconnect = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Disconnect?',
                            message: 'Do you want to Disconnect?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Disconnect',
                                    handler: function () {
                                        _this.bluetoothSerial.disconnect();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* Slide 2 - Turn LED On and OFF */
    StartPage.prototype.turnOn = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var ctrl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctrl = this;
                        return [4 /*yield*/, this.bluetoothSerial.write('h').then(function (success) {
                                console.log(success);
                                ctrl.model.ledResponse = success;
                            }, function (failure) {
                                console.log(failure);
                                ctrl.model.ledResponse = failure;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StartPage.prototype.turnOff = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var ctrl;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctrl = this;
                        return [4 /*yield*/, this.bluetoothSerial.write('0').then(function (success) {
                                console.log(success);
                                ctrl.model.ledResponse = success;
                            }, function (failure) {
                                console.log(failure);
                                ctrl.model.ledResponse = failure;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* Slide 3 - Custom text read and write. */
    StartPage.prototype.readThings = function () {
        var ctrl = this;
        this.bluetoothSerial.read().then(function (success) {
            console.log(success);
            ctrl.model.readResponse = success;
        }, function (failure) {
            console.log(failure);
            ctrl.model.readResponse = failure;
        });
    };
    StartPage.prototype.writeThings = function () {
        var ctrl = this;
        this.bluetoothSerial.write(this.model.writeThis).then(function (success) {
            console.log(success);
        }, function (failure) {
            console.log(failure);
        });
    };
    /* Slide 4 */
    StartPage.prototype.util = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bluetoothSerial.isEnabled().then(function (res) {
                            console.log("isEnabled() : " + res);
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bluetoothSerial.isConnected().then(function (res) {
                                console.log("isConnected() : " + res);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StartPage.prototype.showSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bluetoothSerial.showBluetoothSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StartPage.prototype.listThings = function () {
        this.bluetoothSerial.list().then(function (data) {
            console.log(data);
        });
    };
    StartPage.prototype.writeThingsExample = function () {
        // Write a string
        this.bluetoothSerial.write('hello world').then(function (res) {
            console.log(res);
        }, function (res) {
            console.log(res);
        });
    };
    StartPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-start',
            template: __webpack_require__(/*! ./start.page.html */ "./src/app/start/start.page.html"),
            styles: [__webpack_require__(/*! ./start.page.scss */ "./src/app/start/start.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"], _ionic_native_bluetooth_serial_ngx__WEBPACK_IMPORTED_MODULE_2__["BluetoothSerial"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"]])
    ], StartPage);
    return StartPage;
}());



/***/ })

}]);
//# sourceMappingURL=start-start-module.js.map