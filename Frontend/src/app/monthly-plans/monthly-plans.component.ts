import { Component } from '@angular/core';
import { MonthlyPlan } from '../models/monthly-plan';
import { MonthlyPlanService } from '../services/monthly-plan.service';

@Component({
  selector: 'app-monthly-plans',
  standalone: true,
  imports: [],
  templateUrl: './monthly-plans.component.html',
  styleUrl: './monthly-plans.component.css'
})
export class MonthlyPlansComponent {

  monthlyPlans!: MonthlyPlan[];
  constructor( private monthlyService : MonthlyPlanService){
  }

  ngOnInit(){
    this.getMonthlyPlans();
  }
  

  getMonthlyPlans() {
    this.monthlyService.getAllMonthlyPlans().subscribe(
      (data: any) => {
        console.log(data)
        this.monthlyPlans = data.data;
      },
      (error: any) => {
        console.error("Error al traer planes", error)
      }
    )
  }
}
