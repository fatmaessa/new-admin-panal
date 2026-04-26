import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SummaryCardsComponent } from '../summary-cards/summary-cards';
import { ActivityTableComponent } from '../activity-table/activity-table';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SummaryCardsComponent, ActivityTableComponent],
  templateUrl: './home-page.html',
    styleUrl: './home-page.scss',

})
export class HomePage {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}