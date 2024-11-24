import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { MonthlyFeeService } from '../../services/monthly-fee.service';
import { DataTablesModule } from 'angular-datatables';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fees-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink],
  providers: [DatePipe],
  templateUrl: './fees-list.component.html',
  styleUrl: './fees-list.component.css'
})
export class FeesListComponent implements OnInit {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()

  constructor(
    private monthlyFeeService: MonthlyFeeService,
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
          this.monthlyFeeService.getAllMonthlyFees().subscribe(resp => {
            console.log(resp.data)
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          })
        },
        columns: [
          { title: 'Fecha Vencimiento', data: 'dueDate', ngPipeInstance: this.datePipe, ngPipeArgs: ['shortTime', 'format']},
          { title: 'Monto ($)', data: 'amount' },
          { title: 'Usuario de Miembro', data: 'member' },
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
