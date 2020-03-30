import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from './category.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DelayRequest, BUTTON, YesNo } from '../../utitlities/constants';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  categories = [];
  form = {
    name: "",
    animal: ""
  }
  change: Subject<boolean> = new Subject();

  constructor(
    private toastr: ToastrService,
    private service: CategoryService, 
    public dialog: MatDialog) {
      this.destroy = this.destroy.bind(this);
  }

  ngOnInit() {

    this.fetchCategories();

    this.change.subscribe(row => {
      if (row) {
        this.fetchCategories();
      }
    })
  }

  resetForm() {
    this.form = {
      name: "",
      animal: ""
    };
  }

  fetchCategories() {
    Swal.showLoading();
    const result = this.service.all().toPromise();

    result.then(
      row => this.categories = row.data
    )
    .catch(this.service.checkError)
    .finally(this.service.finally)
  }

  add() {
    this.resetForm();

    this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      data: { change: this.change, form: {} }
    });
  }

  edit(data) {
    this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      data: { change: this.change, form: data }
    });
  }

  delete(data) {
    YesNo.fire({
      title: "Confirmation",
      icon: "info",
      text: `Are you sure to delete ${data.description} ?`
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
      this.fetchCategories();
    })
  }
}

@Component({
  selector: 'category-add',
  templateUrl: 'dialogs/add.html',
})
export class DialogOverviewExampleDialog {

  form: FormGroup;
  saveButton: any = BUTTON.Add;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private toast: ToastrService,
    private service: CategoryService) {
      this.save = this.save.bind(this);
      this.setForm();
      this.setData();
    }

  checkForm(): Boolean {
    return Object.keys(this.data.form).length > 0;
  }
    
  setData(): void {
    if (this.checkForm) {
      const { description } = this.data.form;

      this.form.setValue({
        description
      });
      this.saveButton = BUTTON.Edit;
    }
  }
  
  setForm() {
    this.form = this.fb.group({
      description: ["", Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveForm() {
    const { value } = this.form;

    DelayRequest(() => this.save(value, this.data.form));
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