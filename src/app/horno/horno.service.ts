import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { Chart } from 'node_modules/chart.js';
import { Horno } from './horno';
import { of ,Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HornoService {

    intervaloTiempo; //variable auxiliar del contador 

    constructor() {}

    comenzarTiempo(habilitar: boolean, horno: Horno): void {
        if (habilitar == false) {
            clearTimeout(this.intervaloTiempo);
            let referenciaTiempo = 0;
            this.intervaloTiempo = setInterval(() => { //función encargada del tiempo del horno
                if (referenciaTiempo <= horno.tiempoHorno) {
                    this.intervaloTiempoGrafica(referenciaTiempo, horno);
                    referenciaTiempo++;
                } else {
                    clearTimeout(this.intervaloTiempo);
                    alert("el proceso termino con exito");
                }
            }, 1000);

        } else {
            clearTimeout(this.intervaloTiempo);//pausa el tiempo del horno 

        }
    }

    intervaloTiempoGrafica(tiempo: number, horno: Horno): void {
        let verificar = horno.aumentoPeriodoMuestreo;
        if (verificar == tiempo) {
            horno.temperatura = horno.voltaje * horno.periodoMuestreo + horno.temperatura; //función encargada de representar el horno en condiciones ideales 
            horno.periodoMuestreoGrafica.push(horno.aumentoPeriodoMuestreo);
            horno.pintarGrafica.push(horno.temperatura);
            horno.aumentoPeriodoMuestreo = horno.periodoMuestreo + horno.aumentoPeriodoMuestreo;
            this.crearGrafica(horno);
        }

    }


    crearGrafica(horno: Horno): void {
        let chart = new Chart("myChart", {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Temperatura/Tiempo',
                    data: horno.pintarGrafica
        }],
                labels: horno.periodoMuestreoGrafica
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
