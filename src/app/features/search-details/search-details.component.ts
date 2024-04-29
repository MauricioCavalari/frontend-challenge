import { UserService } from 'src/app/shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Repository } from 'src/app/shared/typings/repository';


@Component({
  selector: 'app-search-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss']
})
export class SearchDetailsComponent implements OnInit {
  login: any;
  repositories: Repository[] = [];
  sortBy: string = 'none';
  sortOrder: string = 'asc';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSerive: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.login = params['userData'];
    });

    this.userSerive.getRepositories(this.login).subscribe((response) => {
      this.repositories = response;
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }

  sortRepositories() {
    if (this.sortBy === 'stars') {
      this.repositories.sort((a, b) => {
        return this.sortOrder === 'asc' ? a.stargazers_count - b.stargazers_count : b.stargazers_count - a.stargazers_count;
      });
    } else if (this.sortBy === 'name') {
      this.repositories.sort((a, b) => {
        const nameA = a.full_name.toLowerCase();
        const nameB = b.full_name.toLowerCase();
        return this.sortOrder === 'asc' ? (nameA < nameB ? -1 : 1) : (nameA > nameB ? -1 : 1);
      });
    }
  }

  onSortChange(event: any) {
    this.sortBy = event.target.value;
    this.sortRepositories();
  }

  onSortOrderChange(order: string) {
    this.sortOrder = order;
    this.sortRepositories();
  }
}
