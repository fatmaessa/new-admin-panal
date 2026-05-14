import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(AuthService);

  searchQuery = output<string>();

  onSearch(value: string) {
    this.searchQuery.emit(value);
  }

  logout() {
    this.authService.logout();
  }
}