import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContentModel } from 'src/app/model/Content.model';
import { errorResponse, okResponse } from 'src/app/model/Response.model';
import { ApiService } from 'src/app/services/api.service';
import { TextEditerService } from 'src/app/services/text-editer.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    public editer: TextEditerService,
    @Inject(MAT_DIALOG_DATA) public content: ContentModel,
    public dialogRef: MatDialogRef<EditContentComponent>,
    private api: ApiService,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
        ],
      ],
      content: ["", Validators.required],
    });

    if (content) {
      this.form.patchValue({
        title: content.title,
        content: content.content,
      })
      console.log(this.form.value)
    } else {
      alert("Failed")
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 2000);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.authPut('/updateContent/' + this.content.id ,this.form.value).subscribe({
      next: (res: okResponse) => {
        alert("success")
        setTimeout(() => {
         this.dialogRef.close(true);
        }, 2000);
       
      },
      error: (err: errorResponse) => {
        alert(err)
      }
    }
    );
  }
}
