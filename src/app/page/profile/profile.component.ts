import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { errorResponse } from 'src/app/model/Response.model';
import { UserModel } from 'src/app/model/User.model';
import { ApiService } from 'src/app/services/api.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  contentId: number = 0;
  profile: UserModel = new UserModel();
  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.api.get('/profile').subscribe(
      {
        next: (res: any) => {
          this.profile = res;
        },
        error: (err: errorResponse) => {
          alert("Load failed")
        }
      }
    )
  }
  openEdit() {
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
      data: this.profile
    })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.loadProfile();
        }
      });
  }

}
