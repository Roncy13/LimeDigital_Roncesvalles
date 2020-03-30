import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  constructor(private service: CategoryService) { }

  ngOnInit() {

    this.fetchCategories();
  }

  fetchCategories() {
    Swal.showLoading();
    const result = this.service.all().toPromise();

    result.then(
      row => console.log(row)
    )
    .catch(this.service.checkError)
    .finally(this.service.finally)
  }
}
