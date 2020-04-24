import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { TestGraphComponent } from './test-graph/test-graph.component';
import { HomeConseillerModule } from './home-conseiller/home-conseiller.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TestGraphComponent]
})

export class AppModule { }
