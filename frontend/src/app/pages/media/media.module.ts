import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent, MediaDialog } from './media.component';
import { MediaRoutingModule } from './media.routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { PageModule } from '../../utitlities/page.module';

@NgModule({
  entryComponents: [MediaDialog],
  declarations: [MediaComponent, MediaDialog],
  imports: [
    CommonModule,
    MediaRoutingModule,
    AgGridModule.withComponents([]),
    PageModule,
  ]
})
export class MediaModule { }
