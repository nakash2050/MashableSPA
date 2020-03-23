import { Component, OnInit } from '@angular/core';
import { ROUTE_PATH } from 'src/app/constants/route-name.constant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UnauthorizedError } from 'src/app/shared/error-handlers/unauthorized-error';
import { ToastyService } from 'ng2-toasty';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  username: string;
  password: string;
  isRegistration = false;
  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alertify: AlertifyService) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    if (this.authService.loggedIn()) {
      this.router.navigate([ROUTE_PATH.HOME.DASHBOARD]);
    }
  }

  login(loginForm: any): void {
    this.authService.login(loginForm.value)
      .subscribe(response => {

      }, error => {
        if (error instanceof UnauthorizedError) {
          this.alertify.error("Incorrect Username or Password!");
        }
      }, () => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        if (returnUrl) {
          returnUrl = returnUrl === `${ROUTE_PATH.AUTH.MAIN} \ ${ROUTE_PATH.AUTH.LOGIN}` ? ROUTE_PATH.HOME.DASHBOARD : returnUrl;
        }

        this.router.navigate(['/dashboard']);
      });
  }
}
