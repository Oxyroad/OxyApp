import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TransportComponent, SearchFilter} from './app.component';


@NgModule({
  declarations: [
    TransportComponent,
    SearchFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [TransportComponent]
})
export class AppModule { }
