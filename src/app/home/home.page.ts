import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{

    curl_sets: number = 0;
    squat_sets: number = 0;
    reps_per_set: number = 0;
    rest_time: number = 0;

    constructor(private router: Router) {

    }


    go(){
        console.log(this.curl_sets, this.squat_sets, this.reps_per_set, this.rest_time);
        let url = `/exercise?curl_sets=${this.curl_sets}&squat_sets=${this.squat_sets}&reps_per_set=${this.reps_per_set}&rest_time=${this.rest_time}&`;
        this.router.navigateByUrl(url);
    }


}
