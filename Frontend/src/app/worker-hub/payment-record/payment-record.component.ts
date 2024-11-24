import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { PaymentRecordService } from '../../services/payment-record.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-record',
  standalone: true,
  imports: [DataTablesModule],
  providers: [DatePipe],
  templateUrl: './payment-record.component.html',
  styleUrl: './payment-record.component.css'
})
export class PaymentRecordComponent implements OnInit {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()

  constructor(
    private paymentRecordService: PaymentRecordService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const self = this;
      this.dtOptions = {
        language: {
          url: '/assets/datatable.spanish.json',
        },
        ajax: (dataTablesParameters: any, callback) => {
          this.paymentRecordService.getAllPaymentRecord().subscribe(resp => {
            console.log(resp.data)
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          })
        },
        columns: [
          { title: 'Fecha Pago', data: 'releaseDate', ngPipeInstance: this.datePipe, ngPipeArgs: ['long', 'format']},
          { title: 'Fecha Vencimiento', data: 'fee.dueDate', ngPipeInstance: this.datePipe, ngPipeArgs: ['long', 'format']},
          { title: 'Monto ($)', data: 'fee.amount' },
          { title: 'Usuario de Miembro', data: 'fee.member' },
        ]
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
