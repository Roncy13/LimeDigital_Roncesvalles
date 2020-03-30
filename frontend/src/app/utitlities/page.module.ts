import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    TableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PageModule {}