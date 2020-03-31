import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { TabsModule } from './tabs/tabs.module';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostModule } from './pages/post/post.module';
import { MediaModule } from './pages/media/media.module';
import { CategoryModule } from './pages/category/category.module';
import { AgGridModule } from 'ag-grid-angular';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    TabsModule,
    PostModule,
    AgGridModule.withComponents([]),
    MediaModule,
    CategoryModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
