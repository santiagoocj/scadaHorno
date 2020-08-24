import { Component, OnInit } from '@angular/core';
import  { timer } from 'rxjs';


@Component({
  selector: 'app-horno',
  templateUrl: './horno.component.html',
  styleUrls: ['./horno.component.css']
})
export class HornoComponent implements OnInit {

	habilitar: boolean = true;
	rutaImagen: String = '../../assets/img/horno vacio.jpg';
	temperatura;
	temperaturaAumentada: number = 10;
  tiempoHorno;
  intervalo;

  constructor() { }

  ngOnInit(): void {
  }

  setHabilitar(): void{
  	this.habilitar = (this.habilitar==true)? false: true;
  	this.rutaImagen = (this.habilitar == true)? '../../assets/img/horno vacio.jpg':'../../assets/img/horno llenandose.gif';
    this.temperatura = 160;
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
      this.tiempoHorno = 25;
      this.intervalo = setInterval(() =>{
        if(this.tiempoHorno > 0) {
        this.tiempoHorno--;
      } else {
        clearTimeout(this.intervalo);
        alert("el pan está Listo");
      }
     }, 1000);
    }else{
      clearTimeout(this.intervalo);
    }
  }

}




