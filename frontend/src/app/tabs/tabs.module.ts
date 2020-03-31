import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TabsComponent]
})
export class TabsModule { }
