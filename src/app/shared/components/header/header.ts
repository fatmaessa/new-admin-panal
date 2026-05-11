import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  $result: any;

  authService = inject(AuthService);

  searchQuery = output<string>();

  onSearch(value: string) {
    this.searchQuery.emit(value);
  }

  logout() {
    this.authService.logout();
  }
}
