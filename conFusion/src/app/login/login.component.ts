import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

      user = {username: '', password: '', remember: false};
  constructor(private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }
  onSubmit() {
       // TODO : it seems not work
     console.log('User: ', this.user);
     console.log('ssss');
     this.dialogRef.close(); // close dialog in js
   }
}
