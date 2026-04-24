import { Component } from '@angular/core';
import { NavigationBar } from "../../core/navigation-bar/navigation-bar";
import { Header } from "../../core/header/header";
import { Table } from "../../shared/table/table";

@Component({
  selector: 'app-home-page',
  imports: [ Table],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
