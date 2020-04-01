import { Component, OnInit } from '@angular/core';
import { IndexSrvice } from './index.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { IsLoggedIn } from '../../utitlities/constants';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { PopUpImageComponent } from '../../utitlities/dialog/pop-up-image.component';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  posts: any = {};
  title = "";
  body = "";
  category = "";
  media = [];
  created = null;
  showPost = true;
  constructor(
    private service: IndexSrvice, 
    private route: ActivatedRoute, 
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {

    const showMenu = IsLoggedIn();
    this.setData();
    
    if(!showMenu) {
      setTimeout(() => {
        this.router.navigate(['/post']);
      })
    } else {
      this.route.queryParamMap.subscribe(params => {
        const id = params.get("id") || null;
  
        if (id !== null) {
          const result = this.service.findById(id).toPromise();
  
          Swal.showLoading();
          result
            .then(row => {
              this.posts = row['data'] as any;
              const { title, description, post_media, category, users} = this.posts;
              this.title = title;
              this.body = description
              this.media = post_media;
              this.category = category.description;
              this.created = users.name;
              this.showPost = !isEmpty(row['data']);

              if (!this.showPost) {
                this.setData();
              }
            })
            .finally(() => {Swal.close()});
          } else {
            this.showPost = true;
            this.setData();
          }
      })
    }
  }

  setData() {
    this.title = "Hi this is the Index Page of the CMS";
    this.body = `<p class="section-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo sit non sunt, a numquam reiciendis expedita possimus quisquam ipsam veritatis doloribus voluptas illum, nostrum perspiciatis laudantium minima obcaecati maxime laborum.</p>`;
    this.category = "";
    this.media = [];
    this.created = null;
  }

  view(media) {
    const link = `${environment.media}${media.path}`;
    console.log(media);
    this.dialog.open(PopUpImageComponent, {
      data: {
        link,
        type: media.type
      }
    });
  }

}
