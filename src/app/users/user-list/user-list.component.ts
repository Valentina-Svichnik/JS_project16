import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Muser } from 'src/app/shared/models/muser.model';
import { MusersService } from 'src/app/shared/services/musers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Muser[];
  now = new Date();
  searchStr = '';
  typeOfSort = '';

  constructor(private musersService: MusersService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let users = this.musersService.getAll();
      this.users = await users == null && users == undefined ? [] : await users;
    } catch (err) {
      console.error(err);
    }
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  getAge(date : any) {
    if (date !== null && date !== undefined) {
      let month = date.slice(5,7);
      let year = date.slice(0, 4);
      let day = date.slice(8, 10);
      let one : number = 1;
      if (month > this.now.getMonth()) {
        one = 0;
      }
      else if (month = this.now.getMonth()) {
        if (day > this.now.getDay()) {
          one = 0;
        }
      }
      return this.now.getFullYear() - (Number(year) - one);
    }
    else{
      return '';
    }
  }

  onSearchWorker() {

  }
  
}
