import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  // come together for form
  MatFormFieldModule,
  MatInputModule,
  //
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
     // Other modules whose exported classes are needed by component templates declared in this NgModule.
  // The subset of declarations that should be visible and usable in the component templates of other NgModules.
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ]
})
export class MaterialModule { }
