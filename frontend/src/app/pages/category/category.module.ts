import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category.routing.module';
import { AgGridModule } from 'ag-grid-angular';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AgGridModule.withComponents([]),
    TableModule
  ]
})
export class CategoryModule { }
