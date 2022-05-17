import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  email = new FormControl('');
  password = new FormControl('');

  ngOnInit(): void {
  }

  submit() {
    this.auth.authenticate(this.email.value, this.password.value);
  }

}
