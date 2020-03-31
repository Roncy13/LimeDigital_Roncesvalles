import { Component, OnInit } from '@angular/core';
import { MediaService } from './media.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DelayRequest, BUTTON, YesNo } from '../../utitlities/constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.sass']
})
export class MediaComponent implements OnInit {

  medias = [];

  constructor(private service: MediaService) { }

  ngOnInit() {
    this.fetchMedias();
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

}
