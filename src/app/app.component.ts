import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingService } from './shared/services/loading/loading.service';
import { ErrorNotificationService } from './shared/services/notification/notification.service';
import { ErrorComponent } from './shared/components/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, LoadingComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-challenge';
  userData: any;

  constructor (public loadingService: LoadingService, public errorNotificationService: ErrorNotificationService) {}

  handleError(error: any) {
    console.error('Error:', error); // Log error for debugging
    this.errorNotificationService.showError(error.message || 'An unknown error occurred.');
  }

}
