import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HornoComponent } from './horno/horno.component';
import { FooterComponent } from './footer/footer.component';
import { GraficasComponent } from './graficas/graficas.component';


@NgModule({
  declarations: [
    AppComponent,
    HornoComponent,
    FooterComponent,
    GraficasComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
