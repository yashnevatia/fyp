import { Injectable } from '@angular/core';

@Injectable()
export class HelperClass {
    constructor(){

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

    getDistance(A, B){
        var a = A.x-B.x;
        var b = A.y-B.y;
        return Math.sqrt(a*a + b*b);
    }

    getSide(keypoints){
        return keypoints.find(obj => {
            return obj.part === "rightShoulder";
        }).score > keypoints.find(obj => {
            return obj.part === "leftShoulder";
        }).score;
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

    angle(A, B, C){
        var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
        var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
        var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
        let angle = Math.acos((BC*BC+AB*AB-(AC*AC))/(2*BC*AB));
        // console.log(angle*180/Math.PI);
        return angle*180/Math.PI;
    }
}
