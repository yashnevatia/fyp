(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["feedback-feedback-module"],{

/***/ "./src/app/feedback/feedback.module.ts":
/*!*********************************************!*\
  !*** ./src/app/feedback/feedback.module.ts ***!
  \*********************************************/
/*! exports provided: FeedbackPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackPageModule", function() { return FeedbackPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _feedback_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feedback.page */ "./src/app/feedback/feedback.page.ts");







var routes = [
    {
        path: '',
        component: _feedback_page__WEBPACK_IMPORTED_MODULE_6__["FeedbackPage"]
    }
];
var FeedbackPageModule = /** @class */ (function () {
    function FeedbackPageModule() {
    }
    FeedbackPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_feedback_page__WEBPACK_IMPORTED_MODULE_6__["FeedbackPage"]]
        })
    ], FeedbackPageModule);
    return FeedbackPageModule;
}());



/***/ }),

/***/ "./src/app/feedback/feedback.page.html":
/*!*********************************************!*\
  !*** ./src/app/feedback/feedback.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <link href=\"https://fonts.googleapis.com/css?family=Cairo|Lato|Raleway|Righteous\" rel=\"stylesheet\">\n  <ion-toolbar color=\"base\">\n  <ion-buttons slot=\"secondary\">\n    <ion-button href=\"/start\">\n      <ion-icon slot=\"icon-only\" name=\"home\" ></ion-icon>\n    </ion-button>\n  </ion-buttons>\n</ion-toolbar>\n  \n</ion-header>\n\n<ion-content padding color=\"base\">\n    \n  <div class=\"main_content\">\n<ion-card color=\"dark\">\n  <ion-card-header>\n    <ion-card-title>Workout Details</ion-card-title>\n    <ion-card-subtitle>Bicep Curl : {{ latest.bicep }} reps</ion-card-subtitle>\n    <ion-card-subtitle>Front Shoulder Raise : {{ latest.raise }} reps</ion-card-subtitle>\n    <ion-card-content>\n      <canvas #doughnutCanvas></canvas>\n    </ion-card-content>\n  </ion-card-header>\n</ion-card>\n  </div> \n  <h2> Workout History </h2> \n  <div *ngFor=\"let item of items\">\n  \t<ion-card color=\"light\">\n  <ion-card-header>\n    <ion-card-title>{{ item.dateString }}</ion-card-title>\n  </ion-card-header>\n  <ion-card-content>\n    Bicep Curl reps: {{ item.bicep }} <br>\n    Front Raise reps: {{ item.raise }} <br>\n  </ion-card-content>\n</ion-card>\n    <!-- Date: {{ item.date }} <br>\n    Bicep Curl reps: {{ item.bicep }} <br>\n    Front Raise reps: {{ item.raise }} <br> -->\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/feedback/feedback.page.scss":
/*!*********************************************!*\
  !*** ./src/app/feedback/feedback.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-title {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0 90px 1px;\n  width: 100%;\n  height: 100%;\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aXNobnVjaG9wcmEvUHJvamVjdC9meXAvc3JjL2FwcC9mZWVkYmFjay9mZWVkYmFjay5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2ZlZWRiYWNrL2ZlZWRiYWNrLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi10aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBwYWRkaW5nOiAwIDkwcHggMXB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/feedback/feedback.page.ts":
/*!*******************************************!*\
  !*** ./src/app/feedback/feedback.page.ts ***!
  \*******************************************/
/*! exports provided: FeedbackPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackPage", function() { return FeedbackPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/database */ "./node_modules/firebase/database/dist/index.esm.js");






var FeedbackPage = /** @class */ (function () {
    function FeedbackPage() {
        this.items = [];
    }
    FeedbackPage.prototype.ngOnInit = function () {
        console.log("reached here");
        this.getlogs();
    };
    FeedbackPage.prototype.myDate = function (input) {
        var date = new Date(input);
        console.log(date);
        var day = date.getDate();
        var month = date.getMonth(); //Be careful! January is 0 not 1
        var year = date.getFullYear();
        console.log(day, month, year);
        var dateString = day + "-" + (month + 1) + "-" + year;
        return dateString;
    };
    FeedbackPage.prototype.getlogs = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var snapshot, value;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_app__WEBPACK_IMPORTED_MODULE_3__["firestore"]().collection('workouts').get()];
                    case 1:
                        snapshot = _a.sent();
                        value = snapshot.docs.map(function (doc) { return doc.data(); });
                        value.forEach(function (val) {
                            console.log(val);
                            val.bicep = val['curl'];
                            val.raise = val['raise'];
                            val.dateString = _this.myDate(val['date']);
                            _this.items.push(val);
                        });
                        this.items.sort(function (a, b) {
                            var res = new Date(a['date']) > new Date(b['date']) ? -1 : 1;
                            return res;
                        });
                        this.latest = this.items[0];
                        this.items = this.items.slice(1);
                        this.doughnutChart = new chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"](this.doughnutCanvas.nativeElement, {
                            type: 'doughnut',
                            data: {
                                labels: ["Bicep Curls", "Front Shoulder Raise", "Squats", "Deadlifts"],
                                datasets: [{
                                        label: '# of Sets',
                                        data: [this.latest.bicep, this.latest.raise, 10, 20],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.4)',
                                            'rgba(54, 162, 235, 0.4)',
                                            'rgba(255, 206, 86, 0.4)',
                                            'rgba(75, 192, 192, 0.4)',
                                            'rgba(153, 102, 255, 0.4)',
                                            'rgba(255, 159, 64, 0.4)'
                                        ],
                                        hoverBackgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56",
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ]
                                    }]
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('doughnutCanvas'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FeedbackPage.prototype, "doughnutCanvas", void 0);
    FeedbackPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-feedback',
            template: __webpack_require__(/*! ./feedback.page.html */ "./src/app/feedback/feedback.page.html"),
            styles: [__webpack_require__(/*! ./feedback.page.scss */ "./src/app/feedback/feedback.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FeedbackPage);
    return FeedbackPage;
}());



/***/ })

}]);
//# sourceMappingURL=feedback-feedback-module.js.map