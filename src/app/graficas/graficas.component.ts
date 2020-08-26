import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	let chart = new Chart("myChart", {
    type: 'line',
    data: {
        datasets: [{
            label: 'Temperatura/Tiempo',
            data: [160, 160, 180, 60,130]
        }],
        labels: ['5', '10', '15', '20', '25']
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 190
                }
            }]
        }
    }
	});
  }

}
