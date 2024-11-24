import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js/auto';
import { Progress } from '../../../models/progress';
import { MemberService } from '../../../services/member.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.css'
})
export class ProgressTrackerComponent implements OnInit {

  member:any;
  /* let memberId = localStorage.getItem('userid') */
  memberId = this.loginService.userLoggedIn()? this.loginService.userLogged(): '';
  chart!: Chart;
  progress!: Progress[]

  constructor(
    private memberService: MemberService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProgress();
  }

  loadProgress() {
    this.memberService.getProgressByMember(this.memberId).subscribe(
      (dataMember: any) => {
        console.log(dataMember)
        this.progress = dataMember.data.progress
        this.loadChart()
      },
      (error: any) => {
        console.error("Error al cargar el progreso", error)
      }
    )
  }

  getFormattedDates(): string[] {
    const dates = this.progress.map(item => {
      let date = new Date(item.date);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    });
    console.log(dates);
    return dates
  }

  getWeights(): number[] {
    const weights = this.progress.map(progress => progress.weight.valueOf());
    console.log(weights);
    
    return weights;
  }

  loadChart() {
    const data = {
      labels: this.getFormattedDates(),
      datasets: [{
        label: 'Peso',
        data: this.getWeights(),
        fill: true,
        borderColor: '#ffffff',
        backgroundColor: '#5fc745',
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 4,
        pointBorderColor: '#ffffff',
        pointBackgroundColor: '#5fc745',
        pointHoverBackgroundColor: '#ffffff',
      }]

    };

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Asegura que el gráfico no mantenga un aspecto específico
      scales: {
        x: {
          grid: {
            display: true,
          }
        },
        y: {
          grid: {
            display: true,
          }
        }
      }
    };

    this.chart = new Chart("chart",
      {
        type: 'line' as ChartType,
        data,
        options
      })
  }

  addProgress() {
    this.router.navigate(['progresses/record'])

  }

}
