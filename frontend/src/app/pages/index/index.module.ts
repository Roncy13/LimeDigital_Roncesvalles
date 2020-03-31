import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index.routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { PageModule } from '../../utitlities/page.module';
import { IndexComponent } from './index.component';

@NgModule({
  entryComponents: [],
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    AgGridModule.withComponents([]),
    PageModule,
  ]
})
export class IndexModule { }
