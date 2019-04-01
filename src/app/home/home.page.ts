import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
// import { MyClass } from '../app.myclass';
// import Speech from 'speak-tts';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    // Bluetooth stuff
    unpairedDevices: any;
    pairedDevices: any;
    gettingDevices: Boolean;
    model: any;

    // Positions shit
    lastRecorded : any;
    width : number;
    height : number;

    video: any;
    exercise: any;
    angles: any;
    rep: number;
    elbow: boolean; // elbow error flag.
    // speech: any;
    count: number;
    confidenceThreshold: number;
    state: number;
    ORIENTATION_COUNT: number;
    CORRECT_ORIENTATION: number;
    POSITION_COUNT: number;
    CORRECT_POSITION: number;
    lastCheck: boolean;
    STARTED: boolean;
    ratioThreshold: number;
    bicepThreshold: number;
    state1Thresh : number = 140;
    state2Thresh : number = 99;
    state3Thresh : number = 70;
    constructor(private router: Router, private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController) {
        this.angles = [];
        this.rep = 0;
        this.elbow = false;
        this.count = 0;
        // this.speech = new Speech();
        this.confidenceThreshold = 0.5;
        this.ratioThreshold = 2.8; /*Set this to 4.0 for non-mobile*/
        this.bicepThreshold = 80; /*Set this to 90 for non-mobile*/
        this.ORIENTATION_COUNT=0;
        this.CORRECT_ORIENTATION=0;
        this.POSITION_COUNT=0;
        this.state=1;
        this.STARTED=false;
        
        // Bluetooth stuff
        bluetoothSerial.enable();
        this.model = {val:'h'};
    }

    endWorkout(){
        // this.navCtrl.push(EndPage);
    }

    ngOnInit() {
        this.loadVideo()
    }

    isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    isiOS() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    isMobile() {
      return this.isAndroid() || this.isiOS();
    }

    async setupCamera() {
        const videoWidth = 600;
        this.width = videoWidth;
        const videoHeight = 500;
        this.height = videoHeight;
        this.lastRecorded = this.width/2;
        navigator.getUserMedia = navigator.getUserMedia;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
            }


        const video = <HTMLVideoElement>document.getElementById('video');
        video.width = videoWidth;
        video.height = videoHeight;

        const mobile = this.isMobile();
        this.bicepThreshold = mobile ? this.bicepThreshold : 90;
        this.ratioThreshold = mobile ? this.ratioThreshold : 4;
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

    async poses(video){
        let me = this;
        console.log("entered poses")
        const net = await posenet.load(0.75);
        async function poseDetectionFrame() {
            const pose = await net.estimateSinglePose(
                  video, 0.5, true, 16);
            var dir = me.checkCentral();
            if(dir!="centre") me.turnOn(dir);
            //ADD CHECK FOR ORIENTATION + POSITION HERE
            var check = me.checkPositionOrientation(pose.keypoints);
            console.log(me.CORRECT_ORIENTATION);
            if (check==true)
            {   
                if (me.CORRECT_ORIENTATION>10 || (!me.STARTED && me.CORRECT_ORIENTATION>20))
                {
                    me.main_function(pose.keypoints);
                }
                else
                {
                    me.CORRECT_ORIENTATION++;
                }
            }

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
    }

    checkCentral()
    {
      var left_boundary = 0.3*this.width;
      var right_boundary = 0.7*this.width;
      // console.log(left_boundary,lastRecorded,right_boundary);
      // console.log(left_boundary<lastRecorded,lastRecorded<right_boundary);
      if (left_boundary<this.lastRecorded && this.lastRecorded<right_boundary) return "centre";
      else if(this.lastRecorded>right_boundary) return 'h';
      else return 'l';
    }

    checkPositionOrientation(keypoints){
        if (!this.checkPosition(["Wrist","Elbow","Shoulder"],keypoints)) 
        {
            this.POSITION_COUNT++;
            if (this.POSITION_COUNT>10)
            {
                this.CORRECT_POSITION=0;
                console.log("WRONG POSITION");
                this.POSITION_COUNT=0;
                // return false;
            }
            return false;
        }
        else 
        {   
            this.CORRECT_POSITION++;
            this.POSITION_COUNT=0;
            if (this.checkOrientationSideBicep(keypoints))
            {
                 this.ORIENTATION_COUNT=0;
                 return true;
            }
            else
            {
                this.ORIENTATION_COUNT++;
                this.CORRECT_ORIENTATION--;
                if(this.ORIENTATION_COUNT>20)
                {   
                    console.log("WRONG");
                    this.state = 1;
                    this.CORRECT_ORIENTATION = 0;
                    this.ORIENTATION_COUNT=0;
                    return false;
                }
                return false;
            }
        }
    }

    checkConfidence(sidePoints)
    {
      for (var i = sidePoints.length - 1; i >= 0; i--) 
      {
        if (sidePoints[i]<this.confidenceThreshold) return false;
      }
      return true;
    }

    checkPosition(points,keypoints){

      var sides = ["left","right"];
      var sidePoints = {
        "left":[],
        "right":[]
      };

      for (var i = sides.length - 1; i >= 0; i--) {
        for (var j = points.length - 1; j >= 0; j--) {
          let confidence = keypoints.find( obj => {
            return obj.part == sides[i]+points[j];
          }).score;

          sidePoints[sides[i]].push(confidence);
        }
      }

      return this.checkConfidence(sidePoints["left"]) || this.checkConfidence(sidePoints["right"]);
    }

    getSide(keypoints){
      return keypoints.find( obj => {
            return obj.part == "rightShoulder";
          }).score > keypoints.find( obj => {
            return obj.part == "leftShoulder";
          }).score;
    }

    getDistance(A,B){
      var a = A.x-B.x;
      var b = A.y-B.y;
      return Math.sqrt( a*a + b*b );
    }


    checkOrientationSideBicep(keypoints){
      // console.log("co")

      // get right and left shoulder, elbow and wrist
      
      var side = this.getSide(keypoints) ? "right" : "left";
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
      var s2e = this.getDistance(shoulder.position,wrist.position);
      var s2s = this.getDistance(shoulder.position,opshoulder.position);
      var e2w = this.getDistance(elbow.position,wrist.position)
      
      this.lastRecorded = (shoulder.position.x + opshoulder.position.x)/2;

      if (s2e/s2s>this.ratioThreshold) {return true;}
      else {
        console.log("ration",(s2e/s2s));
        var bicep_angle = this.getAngle(1,keypoints);
        var flag= (bicep_angle<this.bicepThreshold) || (bicep_angle==-1 && this.state!=3);
        console.log(bicep_angle);
        return flag;
    }

    }


    main_function(keypoints){
        var bicep_angle = this.getAngle(1, keypoints);
        var elbow_angle = this.getAngle(2, keypoints);

        if (bicep_angle !== -1){
          console.log("BICEP",bicep_angle);
            if(this.state==1 && bicep_angle < this.state2Thresh){
                console.log('state 2');
                this.state = 2;
            }
            else if(this.state==2 && bicep_angle < this.state3Thresh){
                console.log('state 3', bicep_angle);
                this.state = 3;
            }
            else if(this.state==3 && bicep_angle > this.state1Thresh){
                this.rep += 1;
                console.log("REP", this.rep);
                console.log('state 1');
                this.state = 1;
            }
        }


        if (elbow_angle !== -1){
            if (elbow_angle > 15){
                this.elbow = true;
                this.count += 1;
                if (this.count > 20){
                    // this.speech.speak({
                    //     text: 'Elbow error ?',
                    // }).then(() => {
                    //     console.log("Success !")
                    // }).catch(e => {
                    //     console.error("An error occurred :", e)
                    // })
                    this.count = 0;
                }

            }else{
                this.elbow = false;
                this.count = 0;
            }
        }


    }

    angle(A, B, C){
        var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
        var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
        var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
        let angle = Math.acos((BC*BC+AB*AB-(AC*AC))/(2*BC*AB));
        // console.log(angle*180/Math.PI);
        return angle*180/Math.PI;
    }

    getAngle(temp, keypoints){
            let lw = undefined;let ls= undefined;
            let le= undefined; let lh= undefined;
            var f1 = 0;var f2 = 0;var f3 = 0;var f4 = 0;
            for (let j=0; j<keypoints.length;j++){
                if(keypoints[j].part === 'leftWrist' && keypoints[j].score > 0.3){

                    f1 = 1
                    lw = keypoints[j];
                }else if(keypoints[j].part === 'leftShoulder' && keypoints[j].score > 0.3){

                    f2 = 1
                    ls = keypoints[j];
                }else if(keypoints[j].part === 'leftElbow' && keypoints[j].score > 0.3){

                    f3 = 1;
                    le = keypoints[j];
                }else if(keypoints[j].part === 'leftHip' && keypoints[j].score > 0.3){

                    f4 = 1;
                    lh = keypoints[j];
                }
            }
            if (f1 && f2 && f3 && f4){

                switch(temp)
                {
                  case 1 : return this.angle(lw.position,le.position,ls.position);
                  break;
                  case 2 : return this.angle(le.position,ls.position,{x:ls.position.x,y:(ls.position.y+100)});
                  break;
                  default : return this.angle(lw.position,le.position,ls.position);;
                }
            }
            else return -1
    }

    ionViewWillLeave(){
        console.log("leaving this page");
    }

    ionViewWillEnter(){
        console.log("entering this page");
    }

    go(){
        this.router.navigate(['feedback']);
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

