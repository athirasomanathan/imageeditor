import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../side-nav.service';
import {Navst} from '../navst';
import{LEFTNAVS} from '../leftnav';
import{RIGHTNAV} from '../rightnav';
import { MatButton } from '@angular/material/button';
import { ShapeService } from '../shape.service';
import Konva from 'konva';
import{LAYERS} from '../layers';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit {

  @ViewChild('leftsidenav') public leftsidenav: MatSidenav;
  @ViewChild('rightsidenav') public rightsidenav: MatSidenav;
  
  leftnavs = LEFTNAVS;
  rightnavs = RIGHTNAV;
  layers=LAYERS;
  selectedNav:Navst=this.leftnavs[0];

  shapes: any = [];
  stage: Konva.Stage;
  layer: Konva.Layer;
  node:any=[];
  selectionRectangle: Konva.Rect;
  x1:any;
  y1:any;
  x2:any;
  y2:any;
  box:any;
  selected:any; 
  selectedButton: any = {
    'circle': false,
    'rectangle': false,
    'line': false,
    'undo': false,
    'erase': false,
    'text': false
  }
  transformers: Konva.Transformer[] = [];
  erase: boolean = false;
  

  constructor(private sideNavService: SideNavService, private shapeService: ShapeService) 
  { 
  }
  ngAfterViewInit(): void 
  {
    this.sideNavService.setsidenav(this.leftsidenav);
    //this.rightNavService.sharedMessage.subscribe(message => this.newdraw = message);
  }

  clickMenu(leftnav:Navst) 
  { 
        this.selectedNav=leftnav;
        this.rightsidenav.open();
       // this.opened=true;
        
  }


  ngOnInit(): void
  {
    
    let width = 500;
    let height = 500;
    var i;
    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
     
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.addLineListeners();
    
  }
      
  clearSelection() 
  {
        Object.keys(this.selectedButton).forEach(key => {
          this.selectedButton[key] = false;
        })
  }
  setSelection(type: string) 
  {
        this.selectedButton[type] = true;
  }
     
  addShape(type: string) 
  {
       
        this.clearSelection();
        this.setSelection(type);
        if (type == 'circle') {
         
          this.addCircle();
        }
        else if (type == 'line') {
          this.addLine();
        }
        else if (type == 'rectangle') {
          this.addRectangle();
        }else if (type == 'square') {
          this.addSquare();
        }else if (type == 'ellipse') {
          this.addEllipse();
        }
        else if (type == 'text') {
          //this.addText();
        }
  }
  addCircle() {
      const circle = this.shapeService.circle();
      circle.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      circle.on('mouseout', function() {
        document.body.style.cursor = 'default';
      });
      this.shapes.push(circle);
      this.layer.add(circle);
      this.stage.add(this.layer);
      this.addTransformerListeners();
      
  }
  addRectangle() 
  {
      const rectangle = this.shapeService.rectangle();
      rectangle.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      rectangle.on('mouseout', function() {
        document.body.style.cursor = 'default';
      });
      this.shapes.push(rectangle);
      this.layer.add(rectangle);
      this.stage.add(this.layer);
      this.addTransformerListeners();
  }
  addSquare() 
  {
      const square = this.shapeService.square();
      square.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      square.on('mouseout', function() {
        document.body.style.cursor = 'default';
      });
      this.shapes.push(square);
      this.layer.add(square);
      this.stage.add(this.layer);
      this.addTransformerListeners();
  }
  addEllipse() {
      const ellipse = this.shapeService.ellipse();
      ellipse.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      ellipse.on('mouseout', function() {
        document.body.style.cursor = 'default';
      });
      this.shapes.push(ellipse);
      this.layer.add(ellipse);
      this.stage.add(this.layer);
      this.addTransformerListeners();
  }
  addLine() 
  {
      this.selectedButton['line'] = true;
     
  }
  addLineListeners() {
    const component = this;
    let lastLine;
    let isPaint;
    let x,y,flag=false;
    const tr = new Konva.Transformer({
      
      enabledAnchors: ['top-left','bottom-left','middle-left', 'top-right','bottom-right','middle-right']
  });
  
    this.stage.on('mousedown touchstart', function (e) {
      if (!component.selectedButton['line'] && !component.erase) {
        return;
      }
      if(flag==false)
      {
      isPaint = true;
      let pos = component.stage.getPointerPosition();
      x=pos.x;
      y=pos.y;
      const mode = component.erase ? 'erase' : 'brush';
      lastLine = component.shapeService.line(pos, mode);
      component.layer.add(lastLine);
      component.stage.add(component.layer);
         
      }
      
    });
    this.stage.on('click', function (e) {
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
     // const isSelected = tr.attachTo().index(e.target) >= 0;
     console.log(e.target);
      
      
      if (!this.clickStartShape ) {
        
          return;
      }
      if(e.target._id==1 || !this.clickStartShape )
      {
        component.selected=null;
        component.node=null;
        flag=false
      
      }
      if (e.target._id == this.clickStartShape._id) {
        flag = true;
        component.addDeleteListener(e.target);
        component.selected=e.target;
        component.layer.add(tr);
        tr.attachTo(e.target);
        component.transformers.push(tr);
        component.layer.draw();
        component.selectedNav=component.layers[0];
          
      }
      else {
        tr.detach();
        component.layer.draw();
      }
    
      
     
    });
    
    this.stage.on('mouseup touchend', function () {
      isPaint = false;
      component.shapes.push(lastLine);
    });
    // and core function - drawing
    this.stage.on('mousemove touchmove', function (e) {
      if(flag==false)
      {
      if (!isPaint) {
        return;
      }
    
      
      const pos = component.stage.getPointerPosition();
      lastLine.points([x,y,pos.x,pos.y]);
     // var newPoints = lastLine.points().concat([pos.x, pos.y]);
      //lastLine.points(newPoints);
      component.layer.batchDraw();
    }
      
    });
  
  }
  addTransformerListeners() 
  {
      const component = this;
      const tr = new Konva.Transformer();
      
      this.stage.on('click', function (e) {
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
       // const isSelected = tr.attachTo().index(e.target) >= 0;
       //console.log(e.target);
        
        
        if (!this.clickStartShape ) {
          
            return;
        }
        if(e.target._id==1)
        {
          component.selected=null;
          component.node=null;
        
        }
        if (e.target._id == this.clickStartShape._id) {
          component.addDeleteListener(e.target);
          component.selected=e.target;
          component.layer.add(tr);
          tr.attachTo(e.target);
          component.transformers.push(tr);
          component.layer.draw();
          component.selectedNav=component.layers[0];
            
        }
        else {
          tr.detach();
          component.layer.draw();
        }
      
        
       
      });
  }
  addDeleteListener(shape) 
  {
      const component = this;
      window.addEventListener('keydown', function (e) 
      {
        console.log(component.selected);
        if (e.keyCode === 46) 
        {
          if(component.selected==null)
          {
            return;
          }
            component.transformers.forEach(t => 
            {
            if(t==component.selected)
            {
              t.detach();
            }else
            {
              return;
            }
          
          });
          component.selected.remove();
          /* const selectedShape = component.shapes.find(s => s._id == shape._id);
          selectedShape.remove(); */
          e.preventDefault();
        }
        component.layer.batchDraw();
      });
  }
  changeLayer(layer:string){
    if(this.selected==null){
      return;

    }

    if(layer=='layertop'){
      this.selected.moveToTop();

    }
    if(layer=='layerbottom'){
      this.selected.moveToBottom();

    }
    if(layer=='layerup'){
      this.selected.moveUp();

    }
    if(layer=='layerdown'){
      this.selected.moveDown();

    }
    this.layer.draw();
  }
}

        
