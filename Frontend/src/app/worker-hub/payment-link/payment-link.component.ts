import { Component, Input } from '@angular/core';
import { ImageQrService } from '../../services/image-qr.service';
import { PaymentRecordService } from '../../services/payment-record.service';
import { MonthlyFeeService } from '../../services/monthly-fee.service';
import { MonthlyFeeRequest } from '../../models/monthly-fee';
import { NgIf } from '@angular/common';
import { PaymentRecordRequest } from '../../models/payment-record';

@Component({
  selector: 'app-payment-link',
  standalone: true,
  imports: [NgIf],
  templateUrl: './payment-link.component.html',
  styleUrl: './payment-link.component.css'
})
export class PaymentLinkComponent {
  
  @Input() monthlyFee!: MonthlyFeeRequest;
  @Input() paymentLink!: string;
  

  monthlyFeeCreated : any;
  memberId:string = "";
  size = "200";
  qrImage!:string

  paymentRecord!: PaymentRecordRequest;

  constructor(
    private imageQrservice: ImageQrService,
    private paymentRecordService : PaymentRecordService,
    private monthlyFeeService: MonthlyFeeService
  ){
  }

  ngOnInit(){
    console.log("LIIIIINK",this.paymentLink);
    console.log("CUOTAAA",this.monthlyFee);
    
    this.generarQR();
  }

  generarQR(){
    this.imageQrservice.generate(this.paymentLink, this.size).subscribe(
      data=>{
        console.log(data) 
        //estructura para asignar imagenes base 64
        this.qrImage = `data:image/png;base64,${data}`
      },
      error=>{
        console.log(error)
      }
    )
  }

  addMonthlyFee(){
    this.monthlyFeeService.addMonthlyFee(this.monthlyFee).subscribe(
      (data: any) => {
        console.log(data);
        this.addPaymentRecord(data.data._id)
      },
      (error: any) => {
        console.error("Error al crear Cuota", error)
      }
    )
  }

  addPaymentRecord(feeId: string){
    this.paymentRecord = {
      releaseDate: new Date(),
      fee: feeId
    }
    this.paymentRecordService.addPaymentRecord(this.paymentRecord).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error: any) => {
        console.error("Error al crear Registro de pago", error)
      }
    )
  }
}
