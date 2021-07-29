import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css']
})
export class WalletDashboardComponent implements OnInit {

  balance: number = 0
  listTransactions: any = []
  totalPages = 0
  currentPage = 0
  perpage = 10
  dateForm: FormGroup;
  startDate = new FormControl('', [Validators.required, Validators.maxLength(8)]);
  endDate = new FormControl('', [Validators.required, Validators.maxLength(8)]);
  loading = false
  modalRef: BsModalRef;
  listCategories: any = []
  newTransaction: Transaction

  constructor(
    private transactionService: TransactionService, 
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getBalance()
    this.getCategories()
    this.newTransaction = new Transaction()

  }

  async getBalance() {
    this.loading = true
    try {
      const result = await this.transactionService.getBalance().toPromise()
      this.balance = result['value']
    } catch (e) {
      this.toastr.error('Tivemos um problema, tente novamente')
    }
    this.loading = false
  }

  async filterTransactions() {
    if (this.startDate.valid && this.endDate.valid) {
      this.loading = true
      try {
        const result = await this.transactionService.getTransactionsByFilter(this.currentPage, this.perpage, this.getStartDate(), this.getEndDate()).toPromise()
        this.totalPages = Number(result['totalPages']) + 1
        this.currentPage = result['currentPage']
        this.listTransactions = result['data']
        const total = Number(result['total'])
        if ( total == 0 ) {
          this.toastr.warning('Nenhuma transação encontrada para o filtro.')
        }
      } catch (e) {
        this.toastr.error('Tivemos um problema, tente novamente')
      }
      this.loading = false
    } else {
      this.toastr.warning('Filtro informado é inválido')
    }
  }

  async getNextPage() {
    if (this.currentPage < (this.totalPages-1)) {
      this.currentPage++
      await this.filterTransactions()
    }
    this.formatDate(this.startDate.value)
  }

  async getPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--
      await this.filterTransactions()
    }
  }

  async getPage(page: number) {
    this.currentPage = page
    await this.filterTransactions()
  }

  exportCSV() {
    if (this.startDate.valid && this.endDate.valid) {
      const result = this.transactionService.getTransactionsCsv(this.getStartDate(), this.getEndDate())
      window.open(result, "_blank");
    } else {
      this.toastr.warning('Filtro informado é inválido')
    }
  }

  getStartDate() {
    return this.formatDate(this.startDate.value)
  }

  getEndDate() {
    return this.formatDate(this.endDate.value)
  }

  formatDate(date: string) {
    const dia = date.substring(0,2)
    const mes = date.substring(2,4)
    const ano = date.substring(4,8)
    return `${ano}-${mes}-${dia}`
  }

  async getCategories() {
    try {
      const result = await this.categoryService.getCategories().toPromise()
      this.listCategories = result
    } catch (e) {
      this.toastr.error('Tivemos um problema, tente novamente')
    }
  }

  async saveTransaction() {
    try {
      const result = await this.transactionService.create(this.newTransaction).toPromise()
      this.modalRef.hide()
      this.toastr.success('Transação salva com sucesso')
    } catch (e) {
      this.toastr.error('Tivemos um problema, tente novamente')
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
