import { Component, OnInit, Inject } from '@angular/core';
import { MediaService } from './media.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DelayRequest, BUTTON, YesNo } from '../../utitlities/constants';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PopUpImageComponent } from '../../utitlities/dialog/pop-up-image.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.sass']
})
export class MediaComponent implements OnInit {

  medias = [];
  change: Subject<boolean> = new Subject();

  constructor(private service: MediaService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchMedias();

    this.change.subscribe(row => {
      if (row) {
        this.fetchMedias();
      }
    });
  }

  edit(data) {
    this.dialog.open(MediaDialog, {
      width: '50%',
      data: { change: this.change, form: data }
    });
  }

  fetchMedias() {
    Swal.showLoading();
    const result = this.service.all().toPromise();

    result.then(
      row => this.medias = row.data
    )
    .catch(this.service.checkError)
    .finally(this.service.finally)    
  }

  showForm(): void {
    this.dialog.open(MediaDialog, {
      width: '50%',
      data: { change: this.change, form: {} }
    });
  }

  delete(data) {
    YesNo.fire({
      title: "Confirmation",
      icon: "info",
      text: `Are you sure to delete ${data.name} ?`
    }).then(res => {
      if (res.value) {
        DelayRequest(() => this.destroy(data.id));
      }
    })
  }

  destroy(id) {
    const result = this.service.destroy(id).toPromise();

    result.then(
      ({message}) => this.toastr.success(message)
    )
    .catch(this.service.checkError)
    .finally(() => {
      this.service.finally();
      this.fetchMedias();
    })
  }

  showImage(media) {
    const link = `${environment.media}${media.path}`;
    this.dialog.open(PopUpImageComponent, {
      data: {
        link,
        type: media.type
      }
    });
  }

}

@Component({
  selector: 'media',
  templateUrl: './dialog.html',
})
export class MediaDialog {

  form: FormGroup;
  saveButton: any = BUTTON.Add;
  fileToUpload: File = null;

  constructor(
    public dialogRef: MatDialogRef<MediaDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private toast: ToastrService,
    private service: MediaService) {
      this.save = this.save.bind(this);
      this.saveForm = this.saveForm.bind(this);
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
  
  setForm() {
    this.form = this.fb.group({
      file: ["", Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveForm() {
    const { type } = this.fileToUpload;
    let formData = new FormData();
    formData.append(type.includes('image/') ? 'photo' : 'video', this.fileToUpload);
    DelayRequest(() => this.save(formData, this.data.form));
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(payload, form) {
    const result = !this.checkForm() ? this.service.create(payload).toPromise() : this.service.update(payload, form.id).toPromise();

      result
        .then(({message}) => {
          this.onNoClick();
          this.toast.success(message);
          this.data.change.next(true);
        })
        .catch(this.service.checkError)
        .finally(this.service.finally);
  }
}