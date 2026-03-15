import { Component } from '@angular/core';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Header } from "../header/header";

@Component({
  selector: 'app-home-page',
  imports: [NavigationBar, Header],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
