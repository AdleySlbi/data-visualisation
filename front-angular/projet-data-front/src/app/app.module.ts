import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { TestGraphComponent } from './test-graph/test-graph.component';
import { HomeConseillerModule } from './home-conseiller/home-conseiller.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    TestGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    HomeConseillerModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [TestGraphComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class AppModule { }
