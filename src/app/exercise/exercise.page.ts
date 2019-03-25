import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { Router, ActivatedRoute} from '@angular/router';
// import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { HelperClass } from '../helper_functions/helper_functions';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

    video: any;
    interval: any;
    state: number = 1;
    hf: any;

    angles: any;
    rep: number;
    elbow: boolean = false; // elbow error flag.
    count: number = 0;

    // exercise variables
    curl_sets: number = 5;
    raise_sets: number = 0;
    reps_per_set: number = 5;
    rest_time: number = 10;
    rest: boolean = false;
    set_count: number = 0;

    // orientation variables
    orientation_count: number = 0;
    correct_orientation: number = 0;
    position_count: number = 0;
    correct_position: number = 0;
    confidence_threshold: number = 0.5;
    ratio_threshold: number = 4.6;
    started: boolean = false;
    lasCheck: boolean;

    constructor(private router: Router, public activatedRoute: ActivatedRoute, /*private speechRecognition: SpeechRecognition, private tts: TextToSpeech, */) {
        this.angles = [];
        this.hf = new HelperClass();
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(p => {
                if (p['curl_sets']) this.curl_sets = parseInt(p['curl_sets']);
                if (p['raise_sets']) this.raise_sets = parseInt(p['raise_sets']);
                if (p['reps_per_set']) this.reps_per_set = parseInt(p['reps_per_set']);
                if (p['rest_time']) this.rest_time = parseInt(p['rest_time']);
        });
        console.log(this.curl_sets, this.raise_sets, this.reps_per_set, this.rest_time)
        // this.speaker(`Your workout is going to start in ${this.rest_time} seconds.`);
        if(this.curl_sets > 0){
            setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'CURL')
        }else{
            setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'RAISE')
        }
        this.loadVideo();

    }

    // speaker(tospeak){
    //     console.log(tospeak);
    //     this.tts.speak(tospeak)
    //     .then(() => console.log('Success'))
    //     .catch((reason: any) => console.log(reason));
    // }

    helper(){
        if(this.rep >= this.reps_per_set){
            clearInterval(this.interval);
            if(this.set_count < this.curl_sets){
                setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'CURL');
                // this.speaker(`Well done. Rest for ${this.rest_time} now.`)
                console.log("started rest");
                this.rest = true;
            }
            else if(this.set_count < this.curl_sets + this.raise_sets){
                setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'RAISE');
                // this.speaker(`Well done. Rest for ${this.rest_time} now.`);
                console.log("started rest");
                this.rest = true;
            }else{
                console.log("WORKOUT DONE");
                // this.speaker(`Well done. Your workout is now over.`);
                firebase.firestore().collection("workouts").add({
                    curl : this.curl_sets,
                    raise: this.raise_sets,
                    date: new Date().toString()
                }).then(async (doc) => {
                    console.log("workout saved")
                })
            }

        }
    }

    startWorkout(temp){
        this.set_count += 1;
        let val = temp === 'CURL' ? this.set_count : this.set_count - this.curl_sets;
        console.log("NEW SET", temp , val);
        // this.speaker(`starting ${temp} set number ${val} in 3 2 1.`)
        this.rep = 0;
        this.rest = false;
        this.interval = setInterval(this.helper.bind(this), 1000)
    }

    async setupCamera() {
        const videoWidth = 300;
        const videoHeight = 300;
        navigator.getUserMedia = navigator.getUserMedia;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
            }


        const video = <HTMLVideoElement>document.getElementById('video');
        video.width = videoWidth;
        video.height = videoHeight;

        const mobile = this.hf.isMobile();
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': {
                facingMode: 'user',
                width: mobile ? undefined : videoWidth,
                height: mobile ? undefined : videoHeight,
            },
        });
        video.srcObject = stream;

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
              resolve(video);
            };
        });
    }

    checkConfidence(sidePoints){
        for (var i = sidePoints.length - 1; i >= 0; i--){
            if (sidePoints[i]<this.confidence_threshold) return false;
        }
        return true;
    }

    checkPosition(points, keypoints){
        let sides = ['left', 'right'];
        let sidePoints = {
            "left" : [], "right": []
        };
        for(let i = sides.length-1;i >= 0; i--){
            for(let j = points.length - 1; j >= 0; j--){
                let confidence = keypoints.find(obj => {
                    return obj.part === sides[i] + points[j];
                }).score;
                sidePoints[sides[i]].push(confidence)
            }
        }
        return this.checkConfidence(sidePoints["left"]) || this.checkConfidence(sidePoints["right"]);
    }

    checkOrientationSideBicep(keypoints){

        var side = this.hf.getSide(keypoints) ? "right" : "left";
        // console.log(side);
        var opside = side == "right" ? "left" : "right";

        var wrist = keypoints.find( obj => {
              return obj.part === side+"Wrist";
          });
        var elbow = keypoints.find( obj => {
              return obj.part === side+"Elbow";
          });
        var shoulder = keypoints.find( obj => {
              return obj.part === side+"Shoulder";
          });
        var opshoulder = keypoints.find( obj => {
              return obj.part === opside+"Shoulder";
          });
        var s2e = this.hf.getDistance(shoulder.position,wrist.position);
        var s2s = this.hf.getDistance(shoulder.position,opshoulder.position);
        var e2w = this.hf.getDistance(elbow.position,wrist.position)

        if (s2e/s2s>this.ratio_threshold) {
            return true;
        }
        else {
            var flag= this.hf.getAngle(1,keypoints) < 90;
            return flag;
        }

    }

    checkPositionOrientation(keypoints){
        if(!this.checkPosition(["Wrist", "Elbow", "Shoulder"], keypoints)){
            this.position_count += 1;
            if (this.position_count > 10){
                this.correct_position = 0;
                console.log("wrong position");
                this.position_count = 0
            }
            return false;
        }
        else{
            this.correct_position += 1;
            this.position_count = 0;
            if(this.checkOrientationSideBicep(keypoints)){
                this.orientation_count = 0;
                return true;
            }
            else{
                this.orientation_count += 1;
                this.correct_orientation -= 1;
                if (this.orientation_count > 20){
                    console.log("WRONG");
                    this.state = 1;
                    this.correct_orientation = 0;
                    this.orientation_count = 0;
                }
                return false;
            }
        }
    }

    async poses(video){
        let me = this;
        console.log("entered poses")
        const net = await posenet.load(0.75);

        async function poseDetectionFrame() {
            const pose = await net.estimateSinglePose(video, 0.5, true, 16);
            let check = me.checkPositionOrientation(pose.keypoints)
            if(check){
                if(me.correct_orientation > 20){
                    me.main_function(pose.keypoints);
                }
                else{
                    me.correct_orientation += 1;
                }
            }
            me.main_function(pose.keypoints);
            requestAnimationFrame(poseDetectionFrame);
        }
        poseDetectionFrame()
    }

    async loadVideo() {

      console.log('reached here loadVideo');
      this.video = await this.setupCamera();
      this.video.play();
      console.log('reached here loadVideo 1')
      this.poses(this.video)
      // return video;
    }

    main_function(keypoints){
        var bicep_angle = this.hf.getAngle(1, keypoints);
        var elbow_angle = this.hf.getAngle(2, keypoints);
        // console.log("bicep_angle", bicep_angle)
        // console.log("elbow_angle", elbow_angle)

        if (bicep_angle !== -1){
            if(this.state === 1 && bicep_angle < 90){
                this.state = 2;
            }
            else if(this.state === 2 && bicep_angle < 60){
                this.state = 3;
            }
            else if(this.state === 3 && bicep_angle > 140){
                this.rep += 1;
                // console.log("REP", this.rep);
                this.state = 1;
            }
        }

        if (elbow_angle !== -1){
            if (elbow_angle > 15){
                this.elbow = true;
                this.count += 1;
                if (this.count > 20){
                    // console.log("SAY ELBOW")
                    // this.tts.speak('Elbow error')
                    //   .then(() => console.log('Success'))
                    //   .catch((reason: any) => console.log(reason));
                    this.count = 0;
                }

            }else{
                this.elbow = false;
                this.count = 0;
            }
        }


    }

    go(){
        this.router.navigate(['feedback']);
    }


}
