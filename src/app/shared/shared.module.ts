import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { LoadingService } from './services/loading/loading.service';
import { ErrorNotificationService } from './services/notification/notification.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    UserService,
    LoadingService,
    ErrorNotificationService
  ]

})
export class SharedModule { }
