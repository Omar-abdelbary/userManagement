import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { Istats } from '../../core/interfaces/istats';

@Component({
  selector: 'app-adminstats',
  standalone: true,
  imports: [],
  templateUrl: './adminstats.component.html',
  styleUrl: './adminstats.component.css'
})
export class AdminstatsComponent implements OnInit {

  private readonly _AdminService = inject(AdminService) ;
  Stats:WritableSignal<Istats> = signal({} as Istats) ;


  ngOnInit(): void {
  this._AdminService.GetStatistics().subscribe({
    next: (res) => {
      if (res.success === true) {
        this.Stats.set(res.data);
        this.renderChart(res.data);  // <--- هنا
      }
    }
  });
}



  renderChart(data: any) {
    const ctx: any = document.getElementById('statsChart');
    if (!ctx) return;

    new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Active', 'Inactive', 'Admins', 'Regular'],
    datasets: [{
      data: [data.activeUsers, data.inactiveUsers, data.adminUsers, data.regularUsers],
      backgroundColor: ['#2ca02c', '#d62728', '#9467bd', '#8c564b']
    }]
  },
  options: {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true
    }
  }
});
  }






























}
