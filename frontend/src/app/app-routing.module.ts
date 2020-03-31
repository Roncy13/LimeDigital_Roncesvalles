import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
  },
  {
    path: "post",
    loadChildren: "./pages/post/post.module#PostModule",
    canActivate: [LoggedInGuard],
  },
  {
    path: "category",
    loadChildren: "./pages/category/category.module#CategoryModule",
    canActivate: [LoggedInGuard],
  },
  {
    path: "media",
    loadChildren: "./pages/media/media.module#MediaModule",
    canActivate: [LoggedInGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
