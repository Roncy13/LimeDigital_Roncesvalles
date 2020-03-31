import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import { MediaRoutingModule } from './media.routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { PageModule } from '../../utitlities/page.module';

@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    AgGridModule.withComponents([]),
    PageModule,
  ]
})
export class MediaModule { }
