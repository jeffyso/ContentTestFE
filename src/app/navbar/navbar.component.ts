import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../page/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logOut() {  
        localStorage.clear();
        this.router.navigate(['/home']);
  }

  ngDoCheck() {
    this.login = localStorage.getItem("token") ? true : false ;
  }
}
