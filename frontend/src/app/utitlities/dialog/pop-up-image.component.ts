import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'show-image',
  templateUrl: 'show-image.html',
  styleUrls: ["./report-details.component.scss"],
})
export class PopUpImageComponent implements OnInit {
  link: string = "";
  type: string = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialogRef<PopUpImageComponent>
  ) {}

  ngOnInit() {
    this.link = this.data.link;
    this.type = this.data.type;
  }

  close() {
    this.dialog.close();
  }
}