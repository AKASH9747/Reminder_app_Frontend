import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  //Register
  register(uname: any, unum: any, pswd: any) {
    const data = {
      uname,
      unum,
      pswd,
    };

    return this.http.post('http://localhost:3000/register', data);
  }

  //Login
  login(unum: any, pswd: any) {
    const data = {
      unum,
      pswd,
    };

    return this.http.post('http://localhost:3000/login', data);
  }

  //Add Event
  addEvent(unum: any, date: any, discription: any) {
    const data = {
      date,
      discription,
      unum,
    };

    return this.http.post('http://localhost:3000/dashboard', data,this.getOptions());
  }

  //History
  history(unum: any) {
    const data = {
      unum,
    };

    return this.http.post('http://localhost:3000/history', data);
  }

  getOptions() {
    // token fetch
    const token = JSON.parse(localStorage.getItem('token') || '');
    // to create request headder
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('x-access-token', token);
      options.headers = headers;
    }
    return options;
  }
}
