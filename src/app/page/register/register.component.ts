import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { errorResponse } from 'src/app/model/Response.model';
import { LoginResponse, UserModel } from 'src/app/model/User.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  username: string = "";
  password: string = "";
  email:string = "";
  nickname:string = ""

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router : Router
  ) { }


 
  ngOnInit(): void {
  }
  
  onSubmit() {

    let user = {
      username:this.username,
      password:this.password,
      email:this.email,
      nickname:this.nickname
    };


    this.api.authPost('/register', user).subscribe(
      {
        next: (res: LoginResponse) => {
          alert('Success');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err:errorResponse) => {
          alert("Register Failed")
        }
      }
    )
  }

}
