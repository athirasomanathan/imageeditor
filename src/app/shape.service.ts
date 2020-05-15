import { Injectable } from '@angular/core';
import Konva from 'konva';
@Injectable({
providedIn: 'root'
})
export class ShapeService {
  constructor() { }
 
  circle() {
    return new Konva.Circle({
      x: 250,
      y: 100,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
  }
  line(pos, mode: string = 'brush') {
    return new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: 2,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: [pos.x, pos.y],
      draggable: true,
      
    });
    
  }
  rectangle() {
    return new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
  }
  square() {
    return new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 100,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
      
    });
  }

  ellipse(){
    return new Konva.Ellipse({
      x: 70,
      y: 70,
      radiusX: 100,
      radiusY: 50,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
  }
  wedge(){
  return new Konva.Wedge({
    x: 70,
    y: 70,
    radius: 70,
    angle: 60,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    rotation: -120,
  });
 }
 
}