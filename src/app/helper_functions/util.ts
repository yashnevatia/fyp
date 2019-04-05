import { Injectable } from '@angular/core';

import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

@Injectable()
export class UtilClass {
    constructor(){

    }

    drawPoint(y, x, r, color, ctx){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawPosition(ctx){
        ctx.beginPath();
        ctx.arc(350, 40, 10, 0, 2*Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    drawOrientation(ctx){
        ctx.beginPath();
        ctx.arc(370, 40, 10, 0, 2*Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    drawKeypoints(keypoints, ctx){
        for(let i=0;i<keypoints.length;i++){
            const keypoint = keypoints[i];
            if (keypoint.score > 0.5){
                const {y, x} = keypoint.position;
                this.drawPoint(y, x, 3, 'aqua', ctx);
            }

        }
    }

    drawSkeleton(keypoints, ctx){
        const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);
        adjacentKeyPoints.forEach((keypoint) => {
            console.log(keypoint[0].position)
            this.drawSegment(
                [keypoint[0].position.y, keypoint[0].position.x],
                [keypoint[1].position.y, keypoint[1].position.x],
                'aqua', ctx
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
