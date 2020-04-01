import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, RegisterDialog } from './header.component';
import { RouterModule } from '@angular/router';
import { PageModule } from '../utitlities/page.module';

@NgModule({
  entryComponents: [RegisterDialog],
  declarations: [HeaderComponent, RegisterDialog],
  imports: [
    CommonModule,
    RouterModule,
    PageModule
  ], exports: [HeaderComponent]
})
export class HeaderModule { }
