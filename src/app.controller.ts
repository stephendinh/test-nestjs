import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  webHook(@Body() data: any): any {
    const payload = JSON.parse(data.payload);
    const branch = payload.ref;
    if (branch === 'refs/heads/master') {
      // This is a push event to the master branch
      console.log('Commit pushed to master branch. Triggering your action...');
    } else {
      // This is a push event to a different branch
      console.log(
        'Commit pushed to a branch other than master. No action required.',
      );
    }
  }
}
