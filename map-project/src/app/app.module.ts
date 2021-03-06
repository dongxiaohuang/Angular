import { BrowserModule } from '@angular/platform-browser';


import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3AVlaDTOxqpnA6lqKW9kvHKQR9UZ0YIE'
    })

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
