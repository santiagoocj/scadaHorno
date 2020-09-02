import { Component, OnInit } from '@angular/core';
import  { timer } from 'rxjs';
import { Chart } from 'node_modules/chart.js';
import { HornoService } from './horno.service';
import { Horno } from './horno';



@Component({
  selector: 'app-horno',
  templateUrl: './horno.component.html',
  styleUrls: ['./horno.component.css']
})
export class HornoComponent implements OnInit {

	habilitar: boolean = true;
  muestraVoltaje: number;//variable auxiliar para desconectar y conectar el voltaje

	model: Horno = {
    rutaImagen: '../../assets/img/horno vacio.jpg', 
    temperatura: 170,
    tiempoHorno: 25,
    intervalo: 0,
    pintarGrafica: [],
    voltaje: 110,
    periodoMuestreo: 2, 
    periodoMuestreoGrafica: [],
    aumentoPeriodoMuestreo:  2,
  };

  constructor(private hornoService: HornoService) { }

  ngOnInit(): void {

  }

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true)? false : true;
    this.terminarProceso();
  	this.model.rutaImagen = (this.habilitar == true)? '../../assets/img/horno vacio.jpg':'../../assets/img/horno llenandose.gif';
    if(this.habilitar == true)
      this.model.pintarGrafica.length = 0;
    
  }


  iniciarProceso(): void{
    this.hornoService.comenzarTiempo(this.habilitar, this.model);
  }

  terminarProceso(): void{//restaura el modelo a los valores predeterminados para cuando se apaga el horno
    if(this.habilitar == true){
      this.model = {
      rutaImagen: '../../assets/img/horno vacio.jpg', 
      temperatura: 170,
      tiempoHorno: 25,
      intervalo: 0,
      pintarGrafica: [],
      voltaje: 110,
      periodoMuestreo: 2, 
      periodoMuestreoGrafica: [],
      aumentoPeriodoMuestreo:  2,
      };
    }
  }

  validarEntradasUsuario():void{
    if(this.habilitar == true){
      if(this.model.temperatura == null){
        alert("el campo temperatura es obligatorio");
      }else if(this.model.temperatura <= 160 || this.model.temperatura >= 180){
        alert("la temperatura de referencia esta en 160 y 180 grados");
      }else if(this.model.tiempoHorno == null){
        alert("el campo tiempo es obligatorio");
      }else if(this.model.periodoMuestreo == null){
        alert("el campo periodo de muestreo es obligatorio");
      }
      else{
        this.setHabilitar();
        this.iniciarProceso();
        this.muestraVoltaje = this.model.voltaje;
      }
    }else{
      this.setHabilitar();
      this.iniciarProceso();
    }

  }

  desconectarVoltaje(): void{
    if(this.model.voltaje != 0){
      this.model.voltaje = 0;
    }else{
      this.model.voltaje = this.muestraVoltaje;
    }

  }

}




