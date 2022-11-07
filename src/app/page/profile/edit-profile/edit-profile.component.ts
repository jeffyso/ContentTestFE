import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { errorResponse } from 'src/app/model/Response.model';
import { UserModel } from 'src/app/model/User.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  nickname:string=""
  email:string= ""

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public profile: UserModel,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
  }

  onSubmit() {

    let value = {
      nickname:this.nickname,
      email:this.email
    };

    this.api.put('/updateProfile', value).subscribe(
      {
        next: (res: any) => {
          alert("success")
          setTimeout(() => {
            this.dialogRef.close(true);
          }, 2000);
        },
        error: (err: errorResponse) => {
          alert("Failed")
        }
      }
    );
  }
}
