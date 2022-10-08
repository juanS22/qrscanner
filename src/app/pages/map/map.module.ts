import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRountingModule } from './map-rounting.module';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRountingModule
  ]
})
export class MapModule { }
