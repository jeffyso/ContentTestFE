import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentModel } from 'src/app/model/Content.model';
import { errorResponse } from 'src/app/model/Response.model';
import { ApiService } from 'src/app/services/api.service';
import { AddContentComponent } from '../add-content/add-content.component';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { EditContentComponent } from '../edit-content/edit-content.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  contents: ContentModel[] = new Array<ContentModel>();

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadContent()
  }

  loadContent() {
    this.api.authGet('/getContent').subscribe((res: ContentModel[]) => {
      this.contents = res;
      console.log(this.contents)
    });
  }

  openDetail(content: ContentModel) {
    this.dialog.open(ContentDetailComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
      data: content,
      disableClose: true
    }
    ).afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadContent();
      }
    });
  }

  openEdit(content: ContentModel) {
    this.dialog.open(EditContentComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
      data: content
    }).afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadContent();
      }
    });
  }

  openAdd() {
    this.dialog.open(AddContentComponent ,{width: '50%',}).afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadContent();
      }
    });
  }
  onDelete(id: any) {
        this.api.authDelete('/deleteContent/' + id).subscribe({
          next: (res: any) => {
            alert("Delete Success")
            setTimeout(() => {
              this.loadContent();
            }, 2000);
          },
          error: (err:errorResponse) => {
            this.loadContent();
            alert("Delete Failed")
          }
        });

  }
}


