import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SideNavService } from './side-nav.service';
import { KonvaModule } from "ng2-konva";
import { ShapeService } from './shape.service';
import {MatTooltipModule} from '@angular/material/tooltip';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    KonvaModule,
    MatTooltipModule
  //  AngularFontAwesomeModule
    

  ],
  providers: [
    SideNavService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
