import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
// import { MyClass } from '../app.myclass';
import Speech from 'speak-tts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

    video: any;
    exercise: any;
    angles: any;
    flag1 : boolean; // start position : bottom
    flag2: boolean; // middle position : middle
    flag3: boolean; // close position : top
    rep: number;
    elbow: boolean; // elbow error flag.
    speech: any;
    count: number;

    constructor(private router: Router) {
        this.angles = [];
        this.flag1 = true;
        this.flag2 = false;
        this.flag3 = false;
        this.rep = 0;
        this.elbow = false;
        this.count = 0;
        this.speech = new Speech();
        this.speech.init().then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
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
        const videoHeight = 500;
        navigator.getUserMedia = navigator.getUserMedia;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
            }


        const video = <HTMLVideoElement>document.getElementById('video');
        video.width = videoWidth;
        video.height = videoHeight;

        const mobile = this.isMobile();
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
            // console.log(pose);
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
        var bicep_angle = this.getAngle(1, keypoints);
        var elbow_angle = this.getAngle(2, keypoints);
        // console.log("bicep_angle", bicep_angle)
        // console.log("elbow_angle", elbow_angle)

        if (bicep_angle !== -1){
            if(this.flag1 && !this.flag2 && !this.flag3 && bicep_angle < 90){
                this.flag1 = false;
                this.flag2 = true;
                console.log('state 2');
            }
            else if(this.flag2 && !this.flag1 && !this.flag3 && bicep_angle < 60){
                this.flag2 = false;
                this.flag3 = true;
                console.log('state 3', bicep_angle);
            }
            else if(this.flag3 && !this.flag1 && !this.flag2 && bicep_angle > 90 && bicep_angle < 120){
                this.flag3 = false;
                this.flag2 = true;
                console.log('state 2');
            }
            else if(this.flag2 && !this.flag1 && !this.flag3 && bicep_angle > 120){
                this.rep += 1;
                console.log("REP", this.rep);
                this.flag2 = false;
                this.flag1 = true;
                console.log('state 1');
            }
        }

        if (elbow_angle !== -1){
            if (elbow_angle > 15){
                this.elbow = true;
                this.count += 1;
                if (this.count > 20){
                    this.speech.speak({
                        text: 'Elbow error ?',
                    }).then(() => {
                        console.log("Success !")
                    }).catch(e => {
                        console.error("An error occurred :", e)
                    })
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


}
