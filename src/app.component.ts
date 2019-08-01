import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})

export class AppComponent {
  showMenu = false;
  hrTool =true;
  title = 'recruitmentToolFrontEnd';
  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
          if(event.url == "/applicantLogin" || event.url =="/info" || event.url =="/test"|| event.url =="/complete"|| event.url =="/abort"){
            this.hrTool = false;
          }else{
            this.hrTool = true;
          }
          this.showMenu = event.url !== "/";
        }
      });
    }

}
