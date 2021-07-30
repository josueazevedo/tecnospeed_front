import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from './models/transaction.model';

const BASE_URL = 'http://localhost:4000/api/'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getBalance() {
    return this.http.get(BASE_URL + 'balance')
  }

  getTransactionsByFilter(page: number, perpage: number, startDate: string, endDate: string) {
    return this.http.get(BASE_URL + `transaction?page=${page}&perpage=${perpage}&startdate=${startDate}&enddate=${endDate}`)
  }

  getTransactionsCsv(startDate: string, endDate: string) {
    return (BASE_URL + `transaction/export?startdate=${startDate}&enddate=${endDate}`)
  }

  create(transaction: Transaction) {
    return this.http.post(BASE_URL + 'transaction', transaction)
  }

}
