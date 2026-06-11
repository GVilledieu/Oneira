import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DreamListComponent } from "./components/dream-list/dream-list.component";
import { DreamFormComponent } from "./components/dream-list/dream-form/dream-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DreamListComponent, DreamFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Oneira';
}
