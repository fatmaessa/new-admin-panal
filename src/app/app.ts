import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from "./navigation-bar/navigation-bar";
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('new-admin-panal');
}
