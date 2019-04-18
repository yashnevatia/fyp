import { Injectable } from '@angular/core';

@Injectable()
export class HelperClass {

    confidence_threshold: number = 0.5;
    ratio_threshold: number = 2.8; /*Set this to 4.0 for non-mobile*/
    side: string = "left";
    public lastRecorded : any;
    public width : number;
    public height : number;

    constructor(){

    }

    isMobile() {
      return /Android/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.userAgent);
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
            if(keypoints[j].part === this.side + 'Wrist' && keypoints[j].score > 0.3){

                f1 = 1
                lw = keypoints[j];
            }else if(keypoints[j].part === this.side + 'Shoulder' && keypoints[j].score > 0.3){

                f2 = 1
                ls = keypoints[j];
            }else if(keypoints[j].part === this.side + 'Elbow' && keypoints[j].score > 0.3){

                f3 = 1;
                le = keypoints[j];
            }else if(keypoints[j].part === this.side + 'Hip' && keypoints[j].score > 0.3){

                f4 = 1;
                lh = keypoints[j];
            }
        }

        if (f1 && f2 && f3 && f4){

            switch(temp)
            {
              case 1 : return this.angle(lw.position,le.position,ls.position);
              break;
              case 2 : return this.angle(le.position,ls.position,{
                  x:ls.position.x,
                  y:(ls.position.y+100)
              });
              break;
              case 3: return this.angle(ls.position, lh.position, {
                  x: lh.position.x + 100,
                  y:(lh.position.y)
              })
              default : return this.angle(lw.position,le.position,ls.position);
            }
        }
        else return -1
    }

    getAngleSqaut(temp, keypoints){
        let ls = undefined;let lh= undefined;let lk= undefined;

        var f1 = 0;var f2 = 0;var f3 = 0;
        for (let j=0; j<keypoints.length;j++){
            if(keypoints[j].part === this.side + 'Shoulder' && keypoints[j].score > 0.5){
                f1 = 1
                ls = keypoints[j];
            }else if(keypoints[j].part === this.side + 'Hip' && keypoints[j].score > 0.5){

                f2 = 1
                lh = keypoints[j];
            }else if(keypoints[j].part === this.side + 'Knee' && keypoints[j].score > 0.5){

                f3 = 1;
                lk = keypoints[j];
            }
        }

        if (f1 && f2 && f3){
            switch(temp)
            {
              case 1 : return this.angle(ls.position,lh.position,lk.position);
              break;
              default : return this.angle(ls.position,lh.position,lk.position);
            }
        }
        else return -1;
    }

    getPos(temp, keypoints){
        if(temp === 1){
            let hip = keypoints.find(obj => {
                return obj.part === "leftHip";
            })
            if(hip.score > 0.4){
                return hip.position.y
            }

        }else if(temp === 2){
            let knee = keypoints.find(obj => {
                return obj.part === "leftKnee";
            })
            if(knee.score > 0.4){
                return knee.position.y
            }
        }else if(temp === 3){
            let shoulder = keypoints.find(obj => {
                return obj.part === "leftShoulder";
            })
            if(shoulder.score > 0.4){
                return shoulder.position.x
            }
        }
        return -1;
    }

    angle(A, B, C){
        var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
        var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
        var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
        let angle = Math.acos((BC*BC+AB*AB-(AC*AC))/(2*BC*AB));
        // console.log(angle*180/Math.PI);
        return angle*180/Math.PI;
    }

    checkConfidence(sidePoints){
        for (var i = sidePoints.length - 1; i >= 0; i--){
            if (sidePoints[i] < this.confidence_threshold) return false;
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
        let left = this.checkConfidence(sidePoints["left"]);
        let right = this.checkConfidence(sidePoints["right"]);
        if(left){
            this.side = "left";
        }else if(right){
            this.side = "right"
        }
        return left || right;

    }

    checkOrientation(keypoints){

        var side = this.getSide(keypoints) ? "right" : "left";

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
        if (s2e/s2s > this.ratio_threshold) {
            return true;
        }
        else {
            var flag= this.getAngle(1,keypoints) < 90;
            return flag;
        }

    }

    checkCentral()
    {
      var left_boundary = 0.3*this.width;
      var right_boundary = 0.7*this.width;
      // console.log(left_boundary,this.lastRecorded,right_boundary);
      // console.log(left_boundary<this.lastRecorded,this.lastRecorded<right_boundary);
      if (left_boundary<this.lastRecorded && this.lastRecorded<right_boundary) return "centre";
      else if(this.lastRecorded>right_boundary) return 'h';
      else return 'l';
    }

}
