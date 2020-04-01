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
import Swal from 'sweetalert2';
import { CategoryService } from '../category/category.service';
import { PostService } from './post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  change: Subject<boolean> = new Subject();
  posts: [] = [];
  showAdd = false;
  constructor(
    private toast: ToastrService,
    private dialog: MatDialog, 
    private route: ActivatedRoute,
    private service: PostService) {}

  ngOnInit() {

    this.change.subscribe();
    this.fetchPost();
    this.change.subscribe(
      row => {
        if (row) {
          this.fetchPost();
        }
      }
    );

    this.checkPageStatus();
  }

  checkPageStatus() {
    this.route.queryParamMap.subscribe(params => {
      const result = params.get("add") || 'false';

      if (result == 'true') {
        this.showForm();
      }
    })
  }

  fetchPost() {
    Swal.showLoading();

    const result = this.service.all().toPromise();

    result.then(({data}) =>  {
      this.posts = data;
    })
      .catch(this.service.checkError)
      .finally(this.service.finally);
  }

  showForm(edit={}): void {
    this.dialog.open(PostDialog, {
      width: '50%',
      height: '100%',
      data: { change: this.change, form: edit }
    });
  }

  delete(data) {
    YesNo.fire({
      title: "Confirmation",
      icon: "info",
      text: `Are you sure to delete ${data.title} ?`
    }).then(res => {
      if (res.value) {
        DelayRequest(() => this.destroy(data.id));
      }
    })
  }

  destroy(id) {
    const result = this.service.destroy(id).toPromise();

    result.then(
      ({message}) => this.toast.success(message)
    )
    .catch(this.service.checkError)
    .finally(() => {
      this.service.finally();
      this.fetchPost();
    })
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
  medias: [] = [];
  change: Subject<[]> = new Subject();
  categories = [];
  constructor(
    public dialogRef: MatDialogRef<PostDialog>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private toast: ToastrService,
    private categorySrv: CategoryService,
    private service: PostService,
    private mediaSrv: MediaService) {
      this.save = this.save.bind(this);
      this.saveFile = this.saveFile.bind(this);
      this.saveForm = this.saveForm.bind(this);
      this.saveMedia = this.saveMedia.bind(this);
      this.setForm();
      this.setData();

      this.setSelectedMedia();
      this.setCategory();
    }

  setCategory() {
    const result = this.categorySrv.all().toPromise();

    result.then((row)=> this.categories = row.data)
      .catch(this.categorySrv.checkError)
      .finally(this.categorySrv.finally)
  }
  
  setSelectedMedia() {
    this.change.subscribe(row => {
      if (row) {
        this.medias = [...this.medias, ...row] as [];
        console.log(this.medias);
        this.form.patchValue({
          media: this.medias
        });
      }
    })
  }

  checkForm(): Boolean {
    return Object.keys(this.data.form).length > 0;
  }
    
  setData(): void {
    if (this.checkForm()) {
      this.saveButton = BUTTON.Edit;
    }
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
  
  setForm() {
    const medias = this.data.form.post_media || [];
    
    this.form = this.fb.group({
      title: [this.data.form.title || "", [Validators.required, Validators.maxLength(225)]],
      description: [this.data.form.description || "", Validators.required],
      category_id: [this.data.form.category_id || "", Validators.required],
      media: [medias, Validators.required]
    });

    this.medias = medias;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveForm() {
    const { value } = this.form;

    value.media = value.media.map(({ name, path, type }) => ({ name, path, type}));

    DelayRequest(() => this.save(value, this.data.form));
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.saveMedia();
  }

  saveMedia() {
    const { type } = this.fileToUpload;
    let formData = new FormData();
    formData.append(type.includes('image/') ? 'photo' : 'video', this.fileToUpload);

    DelayRequest(() => this.saveFile(formData, {}));
  }

  selectMedia() {
  
    this.dialog.open(MediaList, {
      width: "80%",
      height: "100%",
      data: {
        change: this.change
      }
    });
  }
  
  view(item) {
    const link = `${environment.media}${item.path}`;
    
    this.dialog.open(PopUpImageComponent, {
      data: {
        link,
        type: item.type
      }
    });
  }

  deleteItem(item, i) {
    let media = this.form.controls['media'].value;

    pullAt(media,[i]);
    this.form.patchValue({
      media
    });
    this.medias = media;
  }

  saveFile(payload, form) {
    let result =this.mediaSrv.create(payload).toPromise();
    
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


@Component({
  selector: 'media-list',
  templateUrl: './show.media.html',
})

export class MediaList implements OnInit {

  selected = [];
  medias = [];

  constructor(
    public dialogRef: MatDialogRef<MediaList>,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private mediaSrv: MediaService) {}
    
    ngOnInit() {
      Swal.showLoading();
      const result = this.mediaSrv.all().toPromise();

      result
        .then(({data}) => this.medias = data.map(row => ({...row, selected: false})))
        .catch(this.mediaSrv.checkError)
        .finally(this.mediaSrv.finally)
    }

    save() {
      const selected = this.medias.filter(row => row.selected) || [];

      if (selected.length === 0) {
        this.toastr.error("No Selected Medias, Please Select atleast one...!");
      } else {
        this.data.change.next(selected);
        this.onNoClick();
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    showImage(item) {
      const link = `${environment.media}${item.path}`;
    
      this.dialog.open(PopUpImageComponent, {
       data: {
          link,
          type: item.type
        }
      });
    }
 
}
