import { Component, OnInit } from '@angular/core';
import  { timer } from 'rxjs';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-horno',
  templateUrl: './horno.component.html',
  styleUrls: ['./horno.component.css']
})
export class HornoComponent implements OnInit {

	habilitar: boolean = true;
	rutaImagen: String = '../../assets/img/horno vacio.jpg';
	temperatura: number = 160;
	temperaturaAumentada: number = 10;
  tiempoHorno;
  intervalo;
  pintarGrafica: number[] = [];
  voltaje: number = 3;
  periodoMuestreo: number = 2;
  periodoMuestreoGrafica: number[] = [];
  aumentoPeriodoMuestreo: number = 2;


  constructor() { }

  ngOnInit(): void {

  }

  setHabilitar(): void{
  	this.habilitar = (this.habilitar==true)? false: true;
  	this.rutaImagen = (this.habilitar == true)? '../../assets/img/horno vacio.jpg':'../../assets/img/horno llenandose.gif';
    if(this.habilitar == true)
      this.pintarGrafica.length = 0;
    
  }

  setAumentarTemperatura(): number{
 	return this.temperatura = this.temperatura + this.temperaturaAumentada;
  }

  setDisminuirTemperatura(): number{
    return this.temperatura = (this.temperatura == 0)? 0: this.temperatura - this.temperaturaAumentada;
  }

  comenzarTiempo(): void{
    if(this.habilitar == false){
      clearTimeout(this.intervalo);
      this.tiempoHorno = 0;
      this.intervalo = setInterval(() =>{
        if(this.tiempoHorno <= 25) {
          this.intervaloTiempoGrafica(this.tiempoHorno);
          this.tiempoHorno++;
      } else {
        clearTimeout(this.intervalo);
        alert("el proceso termino con exito");
      }
     }, 1000);
    }else{
      clearTimeout(this.intervalo);
    }
  }

  intervaloTiempoGrafica(tiempo: number): void{
    let verificar = this.aumentoPeriodoMuestreo;
    if(verificar == tiempo){
      this.temperatura = this.voltaje*this.periodoMuestreo + this.temperatura;
      this.periodoMuestreoGrafica.push(this.aumentoPeriodoMuestreo);
      this.pintarGrafica.push(this.temperatura);
      this.aumentoPeriodoMuestreo = this.periodoMuestreo + this.aumentoPeriodoMuestreo;
      this.crearGrafica();
    }

  }



  crearGrafica():void{
    let chart = new Chart("myChart", {
    type: 'line',
    data: {
        datasets: [{
            label: 'Temperatura/Tiempo',
            data: this.pintarGrafica
        }],
        labels: this.periodoMuestreoGrafica
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




