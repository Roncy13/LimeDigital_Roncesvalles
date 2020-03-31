import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent, PostDialog, MediaList } from './post.component';
import { PostRoutingModule } from './post.routing.module';
import { PageModule } from '../../utitlities/page.module';
import { AgGridModule } from 'ag-grid-angular';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  entryComponents: [PostDialog, MediaList],
  declarations: [PostComponent, PostDialog, MediaList],
  imports: [
    CommonModule,
    PageModule,
    AgGridModule.withComponents([]),
    PostRoutingModule,
    EditorModule
  ]
})
export class PostModule { }
