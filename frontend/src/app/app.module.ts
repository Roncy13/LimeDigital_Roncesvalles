import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { TabsModule } from './tabs/tabs.module';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    TabsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
