import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ROUTE_PATH } from 'src/app/constants/route-name.constant';
import { CustomValidators } from 'src/app/shared/custom.valiators';
import { BadRequestError } from 'src/app/shared/error-handlers/bad-request-error';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {

  registrationForm: FormGroup;
  
  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    if (this.authService.loggedIn()) {
      this.router.navigate([ROUTE_PATH.HOME]);
    }

    this.buildRegistrationForm();
  }

  buildRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, CustomValidators.passwordValidator]],
      confirmPassword: [null, Validators.required],
      role: [null, Validators.required]
    }, { validator: CustomValidators.confirmPasswordValidator });
  }

  get RegistrationFormControls() {
    return this.registrationForm.controls;
  }

  registerUser(): void {
    this.authService.registerUser(this.registrationForm.value)
      .subscribe(() => {
        this.registrationForm.reset();
        this.alertify.success('You have been registered successfully! Please Sign in.');
        setTimeout(() => {
          this.router.navigate(['auth','login']);
        }, 3000);
      }, error => {
        if (error instanceof BadRequestError) {
          this.alertify.error(error.originalError);
        }
      });
  }
}
