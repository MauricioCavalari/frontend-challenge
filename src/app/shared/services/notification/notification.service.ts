import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  private hideTimeoutSubscription: Subscription | null = null;
  error$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next(message);

    if (this.hideTimeoutSubscription) {
      this.hideTimeoutSubscription.unsubscribe();
    }

    this.hideTimeoutSubscription = timer(5000)
      .pipe(takeUntil(new Subject()))
      .subscribe(() => this.clearError());
  }

  clearError() {
    this.errorSubject.next(null);
    if (this.hideTimeoutSubscription) {
      this.hideTimeoutSubscription.unsubscribe();
      this.hideTimeoutSubscription = null;
    }
  }
}
