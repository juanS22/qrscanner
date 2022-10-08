import { AfterViewInit, Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  scanActive:boolean = false;

  constructor(
    private aLertCtrL:AlertController, 
    private pLatform:Platform,
    private dataLocalService:DatalocalService
    
    ) {}

  ngAfterViewInit() {
    if (this.pLatform.is('capacitor')){
      BarcodeScanner.prepare();
    }     
  }

  async scan(){
    if(this.pLatform.is('capacitor')){
    console.log("comenzando a escanear");
    const allowed = await this.checkPermisos();
    if(allowed){
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();    
    if (result.hasContent) {
      console.log(result.content);
      this.dataLocalService.guardarRegistro(result.format,result.content)
      this.scanActive=false;
      }
    }
  }else{
      console.log("Corriendo en web")
      this.dataLocalService.guardarRegistro('geo','geo:40.314177298200406,-74.94430297499082')
    }
  }

  checkPermisos(){
    return new Promise(async(resolve,reject)=>{
      const status = await BarcodeScanner.checkPermission({force:true});
      if(status.granted){
        resolve(true);
      }else if(status.denied){
        const alert = await this.aLertCtrL.create({
          header:'Sin permisos',
          message:'Por favor permita el acceso a la camara en sus preferencias',
          buttons:[
            {
              text :'No',
              role :'Cancel'
            },
            {
              text :'Abrir preferencias',
              handler: ()=>{
                BarcodeScanner.openAppSettings(),
                resolve(false)
              }
            }
          ]

        });

        await alert.present();


      }else{
        resolve(reject);
      }
    })
  }
  
}

