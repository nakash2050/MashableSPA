import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  
  constructor(
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.authService.assignLoggedInUserName()

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
