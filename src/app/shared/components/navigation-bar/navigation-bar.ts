import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
})
export class NavigationBar {
  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update((v) => !v);
  }
  closeMenu() {
    this.isOpen.set(false);
  }
}
