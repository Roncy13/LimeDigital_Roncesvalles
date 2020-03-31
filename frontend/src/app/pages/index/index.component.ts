import { Component, OnInit } from '@angular/core';
import { IndexSrvice } from './index.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { IsLoggedIn } from '../../utitlities/constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  posts: any = {};
  title = "Hi this is the Index Page of the CMS";
  body = `<p class="section-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo sit non sunt, a numquam reiciendis expedita possimus quisquam ipsam veritatis doloribus voluptas illum, nostrum perspiciatis laudantium minima obcaecati maxime laborum.</p>`;
  constructor(private service: IndexSrvice, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    const showMenu = IsLoggedIn();
    
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
              this.title = this.posts.title;
              this.body = this.posts.description
            })
            .finally(() => {Swal.close()});
          }
      })
    }
  }

}
