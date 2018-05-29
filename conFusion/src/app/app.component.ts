import { Component } from '@angular/core';

// conponent operator takes an javascript object as a parameter
@Component({
// used in index.html
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'confusion';
}
// a component is just a js/ts class
