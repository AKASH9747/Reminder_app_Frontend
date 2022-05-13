import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  unum = '';
  pswd = '';

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  loginForm = this.fb.group({
    unum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  login() {
    var unum = this.loginForm.value.unum;
    var pswd = this.loginForm.value.pswd;

    if (this.loginForm.valid) {
      this.ds.login(unum, pswd).subscribe(
        (result: any) => {
          if (result) {
            localStorage.setItem('currentUserName',JSON.stringify(result.currentUserName));
            localStorage.setItem('currentUserNumber',JSON.stringify(result.currentUnum));
            localStorage.setItem('token', JSON.stringify(result.token));

            alert(result.message);
            this.router.navigateByUrl('dashboard');
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }
}
