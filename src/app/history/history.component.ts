import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  unum: any;
  event: any;
  constructor(private ds: DataService) {
    this.unum = JSON.parse(localStorage.getItem('currentUserNumber') || '');
    this.ds.history(this.unum).subscribe(
      (result: any) => {
        this.event = result.history;
      },
      (result) => {
        alert(result.error.message);
      }
    );
  }

  ngOnInit(): void {}
}
