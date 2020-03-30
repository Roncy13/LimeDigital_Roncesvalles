import { NgModule } from '@angular/core';
import { CategoryComponent, DialogOverviewExampleDialog } from './category.component';
import { CategoryRoutingModule } from './category.routing.module';
import { PageModule } from '../../utitlities/page.module';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  entryComponents: [DialogOverviewExampleDialog],
  declarations: [CategoryComponent, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AgGridModule.withComponents([]),
    PageModule,
  ]
})
export class CategoryModule { }
