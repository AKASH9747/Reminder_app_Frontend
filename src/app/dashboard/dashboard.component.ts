import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentUserName: any;
  currentUserNumber: any;

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private router: Router
  ) {
    if (localStorage.getItem('currentUserNumber' )) {
      this.currentUserName = JSON.parse(
        localStorage.getItem('currentUserName') || ''
      );
      this.currentUserNumber = JSON.parse(
        localStorage.getItem('currentUserNumber') || ''
      );

    }

  }

  ngOnInit(): void {}

  eventForm = this.fb.group({
    date: ['', [Validators.required]],
    discription: ['',[Validators.required]]
  });

  addEvent() {
    var date = this.eventForm.value.date;
    var discription = this.eventForm.value.discription;
    if (this.eventForm.valid) {
      this.ds.addEvent(this.currentUserNumber, date, discription).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
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
  logOut() {
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserNumber');
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
