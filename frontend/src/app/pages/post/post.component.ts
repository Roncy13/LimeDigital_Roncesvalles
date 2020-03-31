import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BUTTON, DelayRequest, YesNo } from '../../utitlities/constants';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../media/media.service';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PopUpImageComponent } from '../../utitlities/dialog/pop-up-image.component';
import { pullAt } from 'lodash';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  change: Subject<boolean> = new Subject();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {

    this.change.subscribe();
  }

  showForm(): void {
    this.dialog.open(PostDialog, {
      width: '50%',
      height: '100%',
      data: { change: this.change, form: {} }
    });
  }
}

@Component({
  selector: 'media',
  templateUrl: './post.dialog.html',
})
export class PostDialog {

  form: FormGroup;
  saveButton: any = BUTTON.Add;
  fileToUpload: File = null;
  file: string;
  medias: [];
  constructor(
    public dialogRef: MatDialogRef<PostDialog>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private toast: ToastrService,
    private mediaSrv: MediaService) {
      this.save = this.save.bind(this);
      this.saveFile = this.saveFile.bind(this);
      this.saveForm = this.saveForm.bind(this);
      this.saveMedia = this.saveMedia.bind(this);
      this.setForm();
      this.setData();
    }

  checkForm(): Boolean {
    return Object.keys(this.data.form).length > 0;
  }
    
  setData(): void {
    if (this.checkForm()) {
      const { file = "" } = this.data.form;

      this.form.setValue({
        file
      });
      this.saveButton = BUTTON.Edit;
    }
  }

  save() {}
  
  setForm() {
    this.form = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      media: [[], Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveForm() {
    const { value } = this.form;

    console.log(value);
   /*const { type } = this.fileToUpload;
    let formData = new FormData();
    formData.append(type.includes('image/') ? 'photo' : 'video', this.fileToUpload);

    console.log(formData.getAll('photo'));
    DelayRequest(() => this.save(formData, this.data.form));*/
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.saveMedia();
  }

  saveMedia() {
    const { type } = this.fileToUpload;
    let formData = new FormData();
    formData.append(type.includes('image/') ? 'photo' : 'video', this.fileToUpload);

    DelayRequest(() => this.saveFile(formData, this.data.form));
  }
  
  view(item) {
    const link = `${environment.media}${item.path}`;
    
    this.dialog.open(PopUpImageComponent, {
      width: "80%",
      height: "100%",
      data: {
        link,
        type: item.type
      }
    });
  }

  delete(item, i) {
    YesNo.fire({
      title: "Confirmation",
      icon: "info",
      text: `Are you sure to delete ${item.name} ?`
    }).then(res => {
      if (res.value) {
        let media = this.form.controls['media'].value;
        
        pullAt(media,[i]);
        this.form.patchValue({
          media
        });
        this.medias = media;
      }
    })
  }

  saveFile(payload, form) {
    let result = !this.checkForm() ? this.mediaSrv.create(payload).toPromise() : this.mediaSrv.update(payload, form.id).toPromise();
    
      result
        .then(({message, data}) => {
          this.toast.success(message);
          const media = this.form.controls['media'].value;
          media.push(data);
          this.form.patchValue({
            media
          });
          this.file = "";
          this.medias = media;
        })
        .catch(this.mediaSrv.checkError)
        .finally(this.mediaSrv.finally);
  }
}
