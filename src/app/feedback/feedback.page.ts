import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})

export class FeedbackPage implements OnInit {
    public items: Array<any> = [];
    // public itemRef: firebase.database.Reference = firebase.database().ref('/workouts');
    constructor() { }

    ngOnInit() {
        console.log("reached here")
        this.getlogs()

    }

    myDate(input){
        var date = new Date(input);
        console.log(date)
        var day = date.getDate();
        var month = date.getMonth(); //Be careful! January is 0 not 1
        var year = date.getFullYear();
        console.log(day, month, year)
        var dateString = day + "-" +(month + 1) + "-" + year;
        return dateString
    }

    async getlogs(){
        const snapshot = await firebase.firestore().collection('workouts').get()
        let value = snapshot.docs.map(doc => doc.data());
        value.forEach((val) => {
            console.log(val)
            val.bicep = val['curl']
            val.raise = val['raise']
            val.date = this.myDate(val['date'])
            this.items.push(val)
        });

    }


}
