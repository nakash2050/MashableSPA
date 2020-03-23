import { Injectable } from '@angular/core';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  toastOptions: ToastOptions = {
    title: 'Bootstrap Toasty',
    showClose: true,
    timeout: 5000,
    theme: 'material'
  };

  constructor(private toastyService: ToastyService) { }

  confirm(message: string, okCallback: () => any) {
    alertify
      .confirm(message, (e) => {
        if (e) {
          okCallback();
        } else {
        }
      })
      .set({ title: 'OTMS' });
  }

  success(message) {
    this.clear();
    this.toastOptions.title = 'Success!';
    this.toastOptions.msg = message;
    this.toastyService.success(this.toastOptions);
  }

  error(message) {
    this.clear();
    this.toastOptions.title = 'Alert!';
    this.toastOptions.msg = message;
    this.toastyService.error(this.toastOptions);
  }

  warning(message) {
    this.clear();
    this.toastOptions.title = 'Alert!';
    this.toastOptions.msg = message;
    this.toastyService.warning(this.toastOptions);
  }

  message(message) {
    this.clear();
    this.toastOptions.title = 'Info!';
    this.toastOptions.msg = message;
    this.toastyService.info(this.toastOptions);
  }

  clear(): void {
    this.toastyService.clearAll();
  }
}
