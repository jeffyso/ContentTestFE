import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentModel } from 'src/app/model/Content.model';
import { ApiService } from 'src/app/services/api.service';
import { EditContentComponent } from '../edit-content/edit-content.component';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {


  _isUpdate: boolean = false;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public content: ContentModel,
    public dialogRef: MatDialogRef<ContentDetailComponent>,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  openEdit() {
    this.dialog.open(EditContentComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
      data: this.content
    })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.loadContent()
          this._isUpdate = true;
        }
      });
  }

  loadContent() {
    this.api.authGet('/content/' + this.content.id).subscribe((res: ContentModel) => {
      this.content = res;
    })
  }
}
