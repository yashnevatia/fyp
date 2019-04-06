(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");







var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <link href=\"https://fonts.googleapis.com/css?family=Cairo|Lato|Raleway|Righteous\" rel=\"stylesheet\">\n  <ion-toolbar color=\"base\">\n  <ion-buttons slot=\"secondary\">\n    <ion-button href=\"/start\">\n      <ion-icon slot=\"icon-only\" name=\"home\" ></ion-icon>\n    </ion-button>\n  </ion-buttons>\n</ion-toolbar>\n  \n</ion-header>\n\n<ion-content padding color=\"base\">\n\n      <div class=\"main_content2\">\n        <div class=\"input_section\">\n        <div class=\"input_div\">\n        <h2>Bicep Curl Sets</h2>\n        <ion-input  text-right   type=\"number\" id=\"input\" [(ngModel)]=\"curl_sets\"></ion-input>\n        <!-- <h2>Bicep Curl Sets</h2> -->\n        \n        </div>\n\n        <div class=\"input_div\">\n        <h2>Front Raise Sets</h2>\n        <ion-input  text-right   type=\"number\" id=\"input\" [(ngModel)]=\"curl_sets\"></ion-input>\n        <!-- <h2>Bicep Curl Sets</h2> -->\n        \n        </div>\n        \n        <div class=\"input_div\">\n        <h2>Squat Sets</h2>\n        <ion-input  text-right   type=\"number\" id=\"input\" [(ngModel)]=\"curl_sets\"></ion-input>\n        <!-- <h2>Bicep Curl Sets</h2> -->\n        \n        </div>\n\n        <div class=\"input_div\">\n        <h2>Weights Used</h2>\n        <ion-input  text-right   type=\"number\" id=\"input\" [(ngModel)]=\"curl_sets\"></ion-input>\n        <!-- <h2>Bicep Curl Sets</h2> -->\n        \n        </div>\n\n        <div class=\"input_div\">\n        <h2>Repetitions</h2>\n        <ion-input  text-right  placeholder=\"Reps per set\" type=\"number\" id=\"input\" [(ngModel)]=\"reps_per_set\" ></ion-input>\n        <!-- <h2>Reps per set</h2> -->\n        </div>\n        <div class=\"input_div\">\n        <h2>Rest Period</h2>\n        <ion-input text-right   placeholder=\"Rest between sets (secs)\" type=\"number\" id=\"input\" [(ngModel)]=\"rest_time\"></ion-input>\n        <!-- <h2>Rest between sets (secs)</h2> -->\n        </div>\n    </div>    \n    <!-- <ion-button (click)=go()>Start Workout</ion-button> -->\n    <ion-button ion-button color=\"light\" (click)=go() block>Start Workout <ion-icon name=\"flame\"></ion-icon></ion-button>\n    <ion-button ion-button color=\"primary\" href=\"/feedback\" block>Load Workout <ion-icon name=\"save\"></ion-icon></ion-button>\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-title {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0 90px 1px;\n  width: 100%;\n  height: 100%;\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aXNobnVjaG9wcmEvUHJvamVjdC9meXAvc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRpdGxlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHBhZGRpbmc6IDAgOTBweCAxcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var HomePage = /** @class */ (function () {
    function HomePage(router) {
        this.router = router;
        this.curl_sets = 0;
        this.squat_sets = 0;
        this.reps_per_set = 0;
        this.rest_time = 0;
    }
    HomePage.prototype.go = function () {
        console.log(this.curl_sets, this.squat_sets, this.reps_per_set, this.rest_time);
        var url = "/exercise?curl_sets=" + this.curl_sets + "&squat_sets=" + this.squat_sets + "&reps_per_set=" + this.reps_per_set + "&rest_time=" + this.rest_time + "&";
        this.router.navigateByUrl(url);
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map