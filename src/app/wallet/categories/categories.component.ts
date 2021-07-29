import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  listCategories: any = []
  loading = false
  modalRef: BsModalRef;
  name = new FormControl('', [Validators.required]);
  category: Category

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  openMocalCreateCategory(template: TemplateRef<any>){
    this.category = new Category()
    this.openModal(template)
  }
  openMocalEditCategory(template: TemplateRef<any>, category: Category){
    this.category = new Category()
    this.category.id = category.id
    this.category.name = category.name
    this.openModal(template)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async getCategories() {
    this.loading = true
    try {
      const result = await this.categoryService.getCategories().toPromise()
      this.listCategories = result
    } catch (e) {
      this.errorHelper(e)
    }
    this.loading = false
  }

  async saveCategory() {
    this.loading = true
    try {
      const result = await this.categoryService.createCategory(this.category).toPromise()
      this.listCategories.push(result)
      this.modalService.hide()
      this.toastr.success('Salvo com sucesso')
    } catch (e) {
      this.errorHelper(e)
    }
    this.loading = false
  }

  async updateCategory(category: Category) {
    this.loading = true
    try {
      const result = await this.categoryService.updateCategory(this.category).toPromise()
      this.listCategories.map((item, i) => {
        if (item.id === result['id']){
          this.listCategories[i] = result
        }
      }) 
      this.modalService.hide()
      this.toastr.success('Salvo com sucesso')
    } catch (e) {
      this.errorHelper(e)
    }
    this.loading = false
  }

  errorHelper(e: HttpErrorResponse) {
    if (e.status === 400) {
      switch (e.error.name) {
        case 'MissingParamError':
          this.toastr.warning('Preencha todas as informações')
          break
        case 'InvalidParamError':
          this.toastr.warning('Dados inválidos')
          break
        default:
          this.toastr.error('Tivemos um problema, tente novamente')
      }
    }
  }

}
