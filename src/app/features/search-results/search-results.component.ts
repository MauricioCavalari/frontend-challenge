import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() userData: any;
  totalStars: number | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userData) {
      this.getStarredRepos(this.userData.login);
    }
  }

  getStarredRepos(username: string) {
    this.userService.getStarredRepos(username).subscribe((starredRepos) => {
    this.countStars(starredRepos)
    })
  }

  countStars(starredRepos: any) {
    this.totalStars = 0;
    for (const repo of starredRepos) {
      this.totalStars += repo.stargazers_count;
    }
    return this.totalStars;
  }

  goToDetails() {
    this.router.navigate(['repositorios'], { queryParams: { userData: this.userData.login } });
  }

}
