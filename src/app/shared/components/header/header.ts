import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { SearchComponent } from "../search/search";
import { SearchResult } from '../../models/search_models';


@Component({
  selector: 'app-header',
  imports: [SearchComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
$result: any;

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
