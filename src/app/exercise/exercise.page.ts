import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { Router, ActivatedRoute} from '@angular/router';
// import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { HelperClass } from '../helper_functions/helper_functions';
import { UtilClass } from '../helper_functions/util';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController, Platform } from '@ionic/angular';


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
    util: any;
    count: number = 0;
    rep: number;

    // Bluetooth stuff
    unpairedDevices: any;
    pairedDevices: any;
    gettingDevices: Boolean;
    model: any;


    // curl variables
    angles: any = [];
    elbow: boolean = false;
    curling: boolean = true;

    // exercise variables
    curl_sets: number = 5;
    squat_sets: number = 0;
    reps_per_set: number = 5;
    rest_time: number = 10;
    rest: boolean = false;
    set_count: number = 0;

    // orientation variables
    wrong_orientation_count: number = 0;
    correct_orientation: number = 0;
    wrong_position_count: number = 0;
    correct_position: number = 0;

    // squat variables
    top_position: number = -1;
    bottom_position: number = -1;
    shoulder_middle: number = -1;
    shoulder: boolean = false;


    //HTMLCanvasElement
    context: any;

    constructor(private router: Router, public activatedRoute: ActivatedRoute, private bluetoothSerial: BluetoothSerial, private plt: Platform) {
        this.hf = new HelperClass();
        this.util = new UtilClass();
        bluetoothSerial.enable();
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(p => {
                if (p['curl_sets']) this.curl_sets = parseInt(p['curl_sets']);
                if (p['squat_sets']) this.squat_sets = parseInt(p['squat_sets']);
                if (p['reps_per_set']) this.reps_per_set = parseInt(p['reps_per_set']);
                if (p['rest_time']) this.rest_time = parseInt(p['rest_time']);
        });
        console.log(this.curl_sets, this.squat_sets, this.reps_per_set, this.rest_time)
        // this.speaker(`Your workout is going to start in ${this.rest_time} seconds.`);
        if(this.curl_sets > 0){
            setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'CURL');
            this.curling = true;
        }else{
            setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'SQUAT');
            this.curling = false;
        }
        this.loadVideo();

    }

    async setupCamera() {
        const videoWidth = this.plt.width();
        const videoHeight = this.plt.height();
        this.hf.width = videoWidth;
        this.hf.height = videoHeight;
        this.hf.lastRecorded = this.hf.width/2;
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

    setUpCanvas(){
        var canvas = <HTMLCanvasElement>document.getElementById("mainCanvas");
        this.context = canvas.getContext("2d");
        var v = <HTMLVideoElement>document.getElementById('video');
        canvas.width = this.plt.width();
        canvas.height = this.plt.height();

    }

    setContext(ctx){
        var w = this.plt.width();
        var h = this.plt.height();

        ctx.clearRect(0, 0, w,h);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-w, 0);
        ctx.drawImage(this.video, 0, 0, w, h);
        ctx.restore();
        ctx.font = "50px Comic Sans MS";
        ctx.fillText(this.rep.toString(), w*0.1, 50);
    }

    speaker(tospeak){
    //     console.log(tospeak);
    //     this.tts.speak(tospeak)
    //     .then(() => console.log('Success'))
    //     .catch((reason: any) => console.log(reason));
    }

    helper(){
        if(this.rep >= this.reps_per_set){
            clearInterval(this.interval);
            if(this.set_count < this.curl_sets){
                setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'CURL');
                this.speaker(`Well done. Rest for ${this.rest_time} now.`)
                console.log("started rest");
                this.rest = true;
            }
            else if(this.set_count < this.curl_sets + this.squat_sets){
                setTimeout(this.startWorkout.bind(this), this.rest_time*1000, 'SQUAT');
                this.speaker(`Well done. Rest for ${this.rest_time} now.`);
                console.log("started rest");
                this.rest = true;
            }else{
                console.log("WORKOUT DONE");
                this.speaker(`Well done. Your workout is now over.`);
                firebase.firestore().collection("workouts").add({
                    curl : this.curl_sets,
                    raise: this.squat_sets,
                    date: new Date().toString()
                }).then(async (doc) => {
                    console.log("workout saved")
                })
            }

        }
    }

    startWorkout(exercise_name){
        this.set_count += 1;
        let val = 0;
        if (exercise_name === 'CURL' || exercise_name === ''){
            val = this.set_count;
            this.curling = true;
        }else{
            val = this.set_count - this.curl_sets;
            this.curling = false;
        }
        console.log("NEW SET", exercise_name , val);
        this.speaker(`starting ${exercise_name} set number ${val} in 3 2 1.`)
        this.rep = 0;
        this.rest = false;
        this.interval = setInterval(this.helper.bind(this), 1000)
    }

    async loadVideo() {

      console.log('reached here loadVideo');
      this.video = await this.setupCamera();
      // this.video.play();
      this.setUpCanvas();
      console.log('reached here loadVideo 1')
      this.poses(this.video)
      // return video;
    }

    go(){
        this.router.navigate(['feedback']);
    }

    checkPositionOrientation(keypoints, parts_to_check){

        if(!this.hf.checkPosition(parts_to_check, keypoints)){
            this.wrong_position_count += 1;
            if (this.wrong_position_count > 10){
                this.correct_position = 0;
                this.wrong_position_count = 0
            }
            return false;
        }
        else{
            this.correct_position += 1;
            this.wrong_position_count = 0;
            if(this.hf.checkOrientation(keypoints)){
                this.wrong_orientation_count = 0;
                return true;
            }
            else{
                this.wrong_orientation_count += 1;
                this.correct_orientation -= 1;
                if (this.wrong_orientation_count > 20){
                    console.log("WRONG");
                    this.state = 1;
                    this.correct_orientation = 0;
                    this.wrong_orientation_count = 0;
                }
                return false;
            }
        }
    }

    async poses(video){
        let me = this;
        const net = await posenet.load(0.75);

        async function poseDetectionFrame() {
            const pose = await net.estimateSinglePose(video, 0.5, true, 16);
            let parts_to_check = [];

            var dir = me.hf.checkCentral();
            // console.log("dir",dir);
            if(dir!="centre") me.turnOn(dir);

            if(me.curling){
                parts_to_check = ["Wrist", "Elbow", "Shoulder"];
            }else{
                parts_to_check = ["Shoulder", "Hip", "Knee"];
            }

            let check = me.checkPositionOrientation(pose.keypoints, parts_to_check);
            me.setContext(me.context);

            if(check){
                if(me.correct_orientation > 20){
                    me.util.drawKeypoints(pose.keypoints, me.context);
                    me.util.drawSkeleton(pose.keypoints, me.context);
                    if(me.curling){
                        me.main_function_bicep(pose.keypoints);
                    }else{
                        me.main_function_squat(pose.keypoints);
                    }
                }
                else{
                    me.correct_orientation += 1;
                }
            }
            if (me.correct_orientation<20 && me.correct_position>=20){
                me.util.drawOrientation(me.context);

            }
            if(me.correct_position < 20){
                me.util.drawPosition(me.context);
            }
            requestAnimationFrame(poseDetectionFrame);
        }
        poseDetectionFrame()
    }

    main_function_squat(keypoints){
        let me = this
        let body_angle = me.hf.getAngleSqaut(1, keypoints)
        if(175 < body_angle && body_angle < 180){
            me.top_position = me.hf.getPos(1, keypoints);
            me.bottom_position = me.hf.getPos(2, keypoints);
            me.shoulder_middle = me.hf.getPos(3, keypoints);
        }

        var hip_position = this.hf.getPos(1, keypoints);
        var knee_position = this.hf.getPos(2, keypoints);
        var mid_position = (this.top_position + this.bottom_position) / 2

        if (hip_position !== -1 && knee_position != -1){
            if(this.state === 1 && hip_position > mid_position){
                this.state = 2;
            }
            else if(this.state === 2 && hip_position + 5 > this.bottom_position){
                this.state = 3;
            }
            else if(this.state === 3 && hip_position <= this.top_position + 5){
                this.rep += 1;
                console.log("REP", this.rep);
                this.state = 1;
            }
        }

        var shoulder_position = this.hf.getPos(3, keypoints);
        if (shoulder_position !== -1){
            let movement = Math.abs(shoulder_position - this.shoulder_middle)
            if (movement > 30){
                // console.log(shoulder_position, this.shoulder_middle)
                this.shoulder = true;
                this.count += 1;
                if (this.count > 50){
                    // console.log("SAY BACK BENDING")
                    // this.tts.speak('Elbow error')
                    //   .then(() => console.log('Success'))
                    //   .catch((reason: any) => console.log(reason));
                    this.count = 0;
                }

            }else{
                this.shoulder = false;
                this.count = 0;
            }
        }
    }

    main_function_bicep(keypoints){
        var bicep_angle = this.hf.getAngle(1, keypoints);
        var elbow_angle = this.hf.getAngle(2, keypoints);

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




    async turnOn(dir){
    var ctrl = this;
    await this.bluetoothSerial.write(dir).then(function (success) {
      console.log(success);
      // ctrl.model.ledResponse = success;
    }, function (failure) {
      console.log(failure);
      // ctrl.model.ledResponse = failure;
    });
    // this.model.val = this.model.val=='h' ? '0':'h';
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  turnOff(){
    var ctrl = this;
    this.bluetoothSerial.write('0').then(function (success) {
      console.log(success);
      ctrl.model.ledResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.ledResponse = failure;
    });
  }

}
