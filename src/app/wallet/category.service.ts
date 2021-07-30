import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './models/category.model';

const BASE_URL = 'http://localhost:4000/api/'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(BASE_URL + 'category')
  }

  createCategory(category: Category) {
    return this.http.post(BASE_URL + 'category', category)
  }

  updateCategory(category: Category) {
    return this.http.put(BASE_URL + 'category', category)
  }

}
