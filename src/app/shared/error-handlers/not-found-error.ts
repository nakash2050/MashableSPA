import { AppError } from "./app-error";

export class NotFoundError extends AppError {
    constructor(error?: any, status?: any)  {        
        super(error, status);
    }
}