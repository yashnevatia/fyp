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

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Home\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n    <!-- <ion-grid style=\"height: 10%\">\n        <!-- <ion-row justify-content-center align-items-center style=\"height: 100%; flex-direction: column\">\n            <ion-button href=\"/exercise\">Start Workout</ion-button>\n        </ion-row> -->\n        <!-- <ion-row align-items-center>\n            <ion-button href=\"/exercise\">Start Workout</ion-button>\n        </ion-row> -->\n    <!-- </ion-grid> -->\n\n    <ion-list>\n    <ion-item>\n        <ion-label stacked>Bicep Curl Sets</ion-label>\n        <ion-input type=\"number\" text-right id=\"input\" [(ngModel)]=\"curl_sets\"></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label stacked>Front Raise Sets</ion-label>\n        <ion-input type=\"number\" text-right id=\"input\" [(ngModel)]=\"raise_sets\"></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label stacked>Reps per set</ion-label>\n        <ion-input type=\"number\" text-right id=\"input\" [(ngModel)]=\"reps_per_set\" ></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label stacked>Rest between sets (secs)</ion-label>\n        <ion-input type=\"number\" text-right id=\"input\" [(ngModel)]=\"rest_time\"></ion-input>\n    </ion-item>\n    <!-- <ion-button href=\"/exercise\">Start Workout</ion-button> -->\n    <ion-button (click)=go()>Start Workout</ion-button>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-title {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0 90px 1px;\n  width: 100%;\n  height: 100%;\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy95YXNodmFyZGhhbm5ldmF0aWEvRGVza3RvcC9maXJzdFByb2plY3Qvc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRpdGxlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHBhZGRpbmc6IDAgOTBweCAxcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbiJdfQ== */"

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
/* harmony import */ var _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/speech-recognition/ngx */ "./node_modules/@ionic-native/speech-recognition/ngx/index.js");




var HomePage = /** @class */ (function () {
    function HomePage(router, speechRecognition) {
        this.router = router;
        this.speechRecognition = speechRecognition;
        this.curl_sets = 0;
        this.raise_sets = 0;
        this.reps_per_set = 0;
        this.rest_time = 0;
        this.speechRecognition.isRecognitionAvailable()
            .then(function (available) { return console.log("available", available); });
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) { return console.log("permission", hasPermission); });
    }
    HomePage.prototype.ngOnInit = function () {
        // this.loadVideo()
        this.listener();
    };
    HomePage.prototype.go = function () {
        console.log(this.curl_sets, this.raise_sets, this.reps_per_set, this.rest_time);
        var url = "/exercise?curl_sets=" + this.curl_sets + "&raise_sets=" + this.raise_sets + "&reps_per_set=" + this.reps_per_set + "&rest_time=" + this.rest_time + "&";
        this.router.navigateByUrl(url);
    };
    HomePage.prototype.listener = function () {
        var _this = this;
        console.log("entered again");
        this.speechRecognition.startListening({ showPopup: false })
            .subscribe(function (matches) {
            console.log("matches", matches);
            if (matches.find(function (match) { return match === "start workout"; })) {
                // this.speechRecognition.stopListening();
                _this.router.navigate(['exercise']);
                var url = "/exercise?curl_sets=" + _this.curl_sets + "&raise_sets=" + _this.raise_sets + "&reps_per_set=" + _this.reps_per_set + "&rest_time=" + _this.rest_time + "&";
                _this.router.navigateByUrl(url);
            }
            else {
                _this.listener();
            }
        }, function (onerror) {
            console.log('error:', onerror);
            _this.listener();
        });
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_3__["SpeechRecognition"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map