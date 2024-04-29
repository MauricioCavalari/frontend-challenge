import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, SearchResultsComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  userDataEvent: any

  constructor(
    private loadingService: LoadingService,
    private user: UserService
  ) { }

  pesquisar: string = '';

  ngOnInit(): void { }

  search(): void {
    this.loadingService.show();
    this.user.getGitUser(this.pesquisar).subscribe((response) => {
      this.userDataEvent = response
      this.pesquisar = '';
    })
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    }
  }

}
