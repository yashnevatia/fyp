import { Injectable } from '@angular/core';

import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

@Injectable()
export class UtilClass {
    public color: string = 'aqua';
    constructor(){

    }

    drawPoint(y, x, r, color, ctx){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawPosition(ctx){
        // ctx.beginPath();
        // ctx.arc(350, 40, 10, 0, 2*Math.PI);
        ctx.fillStyle = 'red';
        // ctx.fill();
        ctx.textAlign = "center";
        ctx.font = "30px Cairo ";
        ctx.fillText("Please Correct Your Position",200,400);
    }

    drawOrientation(ctx){
        ctx.fillStyle = 'yellow';
        // ctx.fill();
        ctx.textAlign = "center";
        ctx.font = "30px Cairo ";
        ctx.fillText("Please Correct Your Orientation",200,400);
    }

    drawRest(ctx){
        ctx.fillStyle = 'red';
        // ctx.fill();
        ctx.textAlign = "center";
        ctx.font = "30px Cairo ";
        ctx.fillText("REST PERIOD",200,400);
    }

    drawKeypoints(keypoints, ctx){
        console.log(this.color);
        for(let i=0;i<keypoints.length;i++){
            const keypoint = keypoints[i];
            if (keypoint.score > 0.5){
                const {y, x} = keypoint.position;
                this.drawPoint(y, x, 3, this.color, ctx);
            }

        }
    }

    drawSkeleton(keypoints, ctx){
        const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);
        adjacentKeyPoints.forEach((keypoint) => {
            // console.log(keypoint[0].position)
            this.drawSegment(
                [keypoint[0].position.y, keypoint[0].position.x],
                [keypoint[1].position.y, keypoint[1].position.x],
                this.color, ctx
            );
        });
    }

    drawSegment([ay, ax], [by, bx], color, ctx) {
        let scale = 1;
        ctx.beginPath();
        ctx.moveTo(ax * scale, ay * scale);
        ctx.lineTo(bx * scale, by * scale);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();
     }

    toTuple({y, x}) {
        return [y, x];
    }

}
