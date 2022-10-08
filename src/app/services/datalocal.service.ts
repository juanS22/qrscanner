import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro/registro.module';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  constructor(private navCtrl:NavController) { }

  async guardarRegistro(format:string,content:string)
  {
    const nuevoRegistro = new Registro(format,content);
    //tarea 1 deben guardar los registros en la memoria del equipo plugins storage aplicacion notcias
    this.abrirRegistro(nuevoRegistro);
  
  
  
  
  }

  abrirRegistro(registro:Registro)
  {
    this.navCtrl.navigateForward('/tabs/tab2');
    switch(registro.type){

      case 'http':
        this.navCtrl.navigateForward(`/tabs/tab2/${registro.content}`);

        //tarea 2 abrir el registro en el navegador nativo del dispositivo
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.content}`);
        //abrir el mapa
        break;
    }
  }

}
