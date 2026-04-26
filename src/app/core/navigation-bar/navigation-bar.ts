import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
})
export class NavigationBar {}
