import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SouqElGomla';

  showHeaderFooter : boolean = true;

  constructor(public authService: AuthServiceService ,private router: Router) {
    authService.prepareUserData();
    authService.refreshInfo();

    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        let path1 : string = event['url']
        if (path1.substr(0,11) == '/auth/login' || path1.substr(0,14) == '/auth/register') 
        {
          console.log(event['url'])
          this.showHeaderFooter = false;
        } else {
           console.log(event['url'])
          this.showHeaderFooter = true;
        }
      }
    });
    
  }

  ngOnInit(): void {
    this.authService.prepareUserData();
    this.authService.refreshInfo();
  }


}
