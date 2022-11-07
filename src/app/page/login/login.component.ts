import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorResponse } from 'src/app/model/Response.model';
import { LoginResponse } from 'src/app/model/User.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted: boolean = false;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,

  ) {

    this.form = this.formBuilder.group({
      username: [
        '',Validators.required,
      ],
      password: [
        '',Validators.required,
      ],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.authPost('/login', this.form.value).subscribe(
      {
        next: (res: LoginResponse) => {
          localStorage.setItem("token",res.token);
          setTimeout(() => {
            this.router.navigate(['/contents']);
          }, 2000);

        },
        error: (err:errorResponse) => {
          alert("Wrong Username or Password")
        }
      }
    )

  }
}
