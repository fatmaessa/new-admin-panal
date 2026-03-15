import { Component } from '@angular/core';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Header } from "../header/header";
import { Table } from "../table/table";

@Component({
  selector: 'app-home-page',
  imports: [ Table],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
