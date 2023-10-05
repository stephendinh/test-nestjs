import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Exception');
  private getExceptionMessage(exception?: any): string {
    return exception?.message || JSON.stringify(exception) || String(exception);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      catchError((exception) => {
        this.logger.error(
          `{${request?.method}: ${request?.url}}: ${this.getExceptionMessage(
            exception,
          )}`,
        );
        return exception;
      }),
    );
  }
}
