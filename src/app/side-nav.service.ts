import { Injectable, EventEmitter } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
@Injectable()
export class SideNavService {
  private sidenav: MatSidenav;
  //public leftNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject('default');
  constructor() { }
  public setsidenav(sidenav: MatSidenav){
    this.sidenav=sidenav;
    
  }
  public open() {
    return this.sidenav.open();
}


public close() {
    return this.sidenav.close();
}

public toggle(): void {
this.sidenav.toggle();

}
  /* public toggle() {
    console.log('hi');
    return this.leftNavToggleSubject.next(null); */
 // } 
}

