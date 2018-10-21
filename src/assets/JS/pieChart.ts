import { Injectable } from '@angular/core';
import { ChartData } from '../../app/classes/chartData';
import { ChartDataKey } from '../../app/classes/chartDataKey';
import { Utilities } from './utilities';
import { utils } from 'protractor';

export class Piechart {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    colors: string[];
    centerX: number;
    centerY: number;
    pieRadius: number;

    constructor() {
        }

    setupCanvas(Canvas: HTMLCanvasElement, Colors: string[]) {
        this.canvas = Canvas;
        this.colors = Colors;
        this.context = this.canvas.getContext("2d");
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
    }

    draw (data: ChartData[]) {
        let total_value = 0;
        let color_index = 0;
        let start_angle = 0;
        let slice_angle = 0;
        let labelX = 0;
        let labelY = 0;
        let labelText = "";
        let returnKey=[];

        let util = new Utilities;
        total_value = util.sumProperty(data, "amount");

        data.forEach(item => {
            let val = +item.amount;
            let thisColor = this.colors[color_index % this.colors.length];
            let percent = Math.round((100*val / total_value))/100;
            slice_angle = 2 * Math.PI * val / total_value;
            this.drawPieSlice(  this.context, 
                                this.centerX,
                                this.centerY,
                                this.pieRadius,
                                start_angle,
                                start_angle + slice_angle,
                                this.getGradient(thisColor));
            start_angle += slice_angle;

            returnKey.push({ description: item.description, percent: percent, color: thisColor });
            color_index++;
            if (color_index === this.colors.length) {
                color_index = 0;
            }
        });
        this.context.fillStyle = "white";
        this.context.beginPath();
        this.context.arc(this.centerX,
                         this.centerY,
                         this.pieRadius * .45,
                         0,
                         2*Math.PI);
                         this.context.fill();
        return returnKey;
    }
    
    drawPieSlice(Context, centerX, centerY, radius, startAngle, endAngle, color) {
        Context.fillStyle = color;
        Context.beginPath();
        Context.moveTo(centerX, centerY);
        Context.arc(centerX, centerY, radius, startAngle, endAngle);
        Context.closePath();
        Context.fill();
    }

    getGradient(inColor) {
        let intCanvasCenterX = this.canvas.width/2;
        let intCanvasCenterY = this.canvas.height/2;
        let radialGradient;
        let util = new Utilities();
        let endColor = util.LightenDarkenColor(inColor,60);
        
        radialGradient = this.context.createRadialGradient(intCanvasCenterX,intCanvasCenterY,this.pieRadius / 1.5,intCanvasCenterX,intCanvasCenterY,this.pieRadius);
        radialGradient.addColorStop(0,inColor);
        radialGradient.addColorStop(0.5,endColor);
        radialGradient.addColorStop(1,inColor);
        return radialGradient;
    }
}
