import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { BadRequestError } from './bad-request-error';
import { UnauthorizedError } from './unauthorized-error';
import { NotFoundError } from './not-found-error';
import { InternalServerError } from './internal-server-error';
import { environment } from 'src/environments/environment';
import { ToastyService } from 'ng2-toasty';


@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private toastyService: ToastyService) { }

  handleError(error: any) {
    
    if (error.originalError) {
      const message = error.originalError;

      if (error instanceof BadRequestError) {        
        this.toastyService.error(message.ModelState ? this.parseError(message.ModelState) : `400: ${error.originalError}`);
      } else if (error instanceof UnauthorizedError) {
        this.toastyService.error('401: Authorization has been denied for this request!');
      } else if (error instanceof NotFoundError) {
        this.toastyService.error('404: The resource you are looking for could not be found!');
      } else if (error instanceof InternalServerError) {
        if (!environment.production) {
          console.log({ serverError: message });
          this.toastyService.error('500: Internal Server Error: Check console for more details.');
        } else {
          this.toastyService.error(`500: ${this.parseError(message)}`);
        }
      }
    } else {
      console.log(error);
    }
  }

  private parseError(modelStateError: any): string {
    let modelStateErrorMessage: string = '';

    for (const key in modelStateError) {
      if (modelStateError[key]) {
        modelStateErrorMessage += modelStateError[key] + '\n';
      }
    }

    return modelStateErrorMessage;
  }
}