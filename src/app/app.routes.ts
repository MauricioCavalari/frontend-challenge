import { Routes } from '@angular/router';
import { SearchDetailsComponent } from './features/search-details/search-details.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'repositorios', component: SearchDetailsComponent }
];
