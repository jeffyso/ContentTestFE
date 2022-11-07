import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { errorResponse, okResponse } from 'src/app/model/Response.model';
import { ApiService } from 'src/app/services/api.service';
import { TextEditerService } from 'src/app/services/text-editer.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  submitted: boolean = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    public editer: TextEditerService,
    private api: ApiService,
    public dialogRef: MatDialogRef<AddContentComponent>,
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
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.authPost('/addContent', this.form.value).subscribe({
      next: (res: okResponse) => {
        alert("Success")
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 2000);
      },
      error: (err: errorResponse) => {
        alert("Failed")
      }
    });
  }
}
