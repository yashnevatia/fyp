import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
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
    @ViewChild('doughnutCanvas') doughnutCanvas;
    public latest: any;
    public doughnutChart: any;

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
            val.dateString = this.myDate(val['date'])
            this.items.push(val)
        });

        this.items.sort( (a,b) => {
            var res = new Date(a['date'])>new Date(b['date']) ? -1 : 1;
            return res;
        });
    
        this.latest = this.items[0];
        this.items = this.items.slice(1,);
       this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

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
}

}
