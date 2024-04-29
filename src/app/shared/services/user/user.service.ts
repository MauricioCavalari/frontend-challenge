import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../loading/loading.service';
import { Repository } from '../../typings/repository';
import { ErrorNotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private errorNotificationService: ErrorNotificationService
  ) { }

  getGitUser(username: string) {
    return this.http.get(this.baseUrl + 'users/' + username).pipe(
      map((response) => {
        this.loadingService.hide();
        return response;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 0) {
          this.loadingService.hide();
          return throwError(() => this.errorNotificationService.showError('Falha na conexão com a internet'));
        } else {
          this.loadingService.hide();
          return throwError(() => this.errorNotificationService.showError('Desculpe, ocorreu um problema ao buscar o usuário.'));
        }
      })
    );
  }

  getStarredRepos(username: string) {
    return this.http.get(this.baseUrl + 'users/' + username + '/starred');
  }

  getRepositories(username: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.baseUrl + 'users/' + username + '/repos');
}
}
