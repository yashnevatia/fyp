import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
// import Speech from 'speak-tts';
import { Router } from '@angular/router';

// import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    curl_sets: number = 0;
    raise_sets: number = 0;
    reps_per_set: number = 0;
    rest_time: number = 0;

    constructor(private router: Router,/* private speechRecognition: SpeechRecognition*/) {

        // this.speechRecognition.isRecognitionAvailable()
        // .then((available: boolean) => console.log("available", available))
        //
        // this.speechRecognition.hasPermission()
        // .then((hasPermission: boolean) => console.log("permission", hasPermission))

    }


    ngOnInit() {
        // this.loadVideo()
        // this.listener()

    }

    go(){
        console.log(this.curl_sets, this.raise_sets, this.reps_per_set, this.rest_time);
        let url = `/exercise?curl_sets=${this.curl_sets}&raise_sets=${this.raise_sets}&reps_per_set=${this.reps_per_set}&rest_time=${this.rest_time}&`;
        this.router.navigateByUrl(url);
    }

    // listener(){
    //     console.log("entered again");
    //     this.speechRecognition.startListening({showPopup: false})
    //     .subscribe(
    //         (matches: Array<string>) => {
    //             console.log("matches", matches);
    //             if (matches.find( match => match === "start workout")){
    //                 // this.speechRecognition.stopListening();
    //                 this.router.navigate(['exercise']);
    //             }else{
    //                 this.listener();
    //             }
    //
    //         }
    //         ,
    //         (onerror) => {
    //             console.log('error:', onerror)
    //             this.listener();
    //         }
    //     )
    // }

}
