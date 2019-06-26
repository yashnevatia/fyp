(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["load-load-module"],{

/***/ "./src/app/load/load.module.ts":
/*!*************************************!*\
  !*** ./src/app/load/load.module.ts ***!
  \*************************************/
/*! exports provided: LoadPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadPageModule", function() { return LoadPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _load_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./load.page */ "./src/app/load/load.page.ts");







var routes = [
    {
        path: '',
        component: _load_page__WEBPACK_IMPORTED_MODULE_6__["LoadPage"]
    }
];
var LoadPageModule = /** @class */ (function () {
    function LoadPageModule() {
    }
    LoadPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_load_page__WEBPACK_IMPORTED_MODULE_6__["LoadPage"]]
        })
    ], LoadPageModule);
    return LoadPageModule;
}());



/***/ }),

/***/ "./src/app/load/load.page.html":
/*!*************************************!*\
  !*** ./src/app/load/load.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <link href=\"https://fonts.googleapis.com/css?family=Cairo|Lato|Raleway|Righteous\" rel=\"stylesheet\">\n  <ion-toolbar color=\"base\">\n\t<ion-buttons slot=\"start\">\n        <ion-button href=\"/home\">\n\t      <ion-icon name=\"arrow-dropleft\"></ion-icon>\n\t    </ion-button>\n    </ion-buttons>\n  <ion-buttons slot=\"secondary\">\n    <ion-button href=\"/start\">\n      <ion-icon slot=\"icon-only\" name=\"home\"></ion-icon>\n    </ion-button>\n    <ion-button href=\"/home\">\n      <ion-icon slot=\"icon-only\" name=\"back\"></ion-icon>\n    </ion-button>\n  </ion-buttons>\n</ion-toolbar>\n\n</ion-header>\n\n<ion-content padding color=\"base\">\n    <ion-button ion-button color=\"tertiary\" (click)=\"get_workout('bicep_basics')\" block>Bicep Basics</ion-button>\n    <ion-button ion-button color=\"success\" (click)=\"get_workout('squat_bacics')\" block>Squat Basics</ion-button>\n    <ion-button ion-button color=\"tertiary\" (click)=\"get_workout('full_body_blast')\" block>Full Body Blast</ion-button>\n    <ion-button ion-button color=\"success\" (click)=\"get_workout('arm_attack')\" block>Arm Attack</ion-button>\n    <ion-button ion-button color=\"tertiary\" (click)=\"get_workout('leg_destruction')\" block>Leg Destruction</ion-button>\n  \n</ion-content>\n "

/***/ }),

/***/ "./src/app/load/load.page.scss":
/*!*************************************!*\
  !*** ./src/app/load/load.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvYWQvbG9hZC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/load/load.page.ts":
/*!***********************************!*\
  !*** ./src/app/load/load.page.ts ***!
  \***********************************/
/*! exports provided: LoadPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadPage", function() { return LoadPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/http/ngx */ "./node_modules/@ionic-native/http/ngx/index.js");



// import * as products from "/src/assets/data/workouts.json";
//and then using them as:
var LoadPage = /** @class */ (function () {
    function LoadPage(http) {
        this.http = http;
    }
    LoadPage.prototype.ngOnInit = function () {
    };
    LoadPage.prototype.get_workout = function (arg) {
        var _this = this;
        console.log("here");
        console.log(arg);
        // declare function require(url: string);
        //and later:
        // let variable = require('/src/assets/data/workouts.json');
        //And using it as:
        // console.log(products);
        fetch("assets/data/workouts.json").then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, res.json()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // this.http.get('/src/assets/data/workouts.json', {}, {}).then( 
        // 	data => {
        // 		console.log(data);
        // 	}
        // 	)
    };
    LoadPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-load',
            template: __webpack_require__(/*! ./load.page.html */ "./src/app/load/load.page.html"),
            styles: [__webpack_require__(/*! ./load.page.scss */ "./src/app/load/load.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_2__["HTTP"]])
    ], LoadPage);
    return LoadPage;
}());



/***/ })

}]);
//# sourceMappingURL=load-load-module.js.map