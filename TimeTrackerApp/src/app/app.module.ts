import { DataManagerService } from './data-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToasterModule } from 'angular2-toaster';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EntityManagerComponent } from './entity-manager/entity-manager.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { SetupComponent } from './setup/setup.component';
import { HomeComponent } from './home/home.component';
import { TimerComponent } from './timer/timer.component';
import { TaskSummaryComponent } from './task-summary/task-summary.component';
import { ReportComponent } from './report/report.component';
import { DisplayTimePipe } from './display-time.pipe';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'timer/:taskid', component: TimerComponent },

  { path: 'setup', component: SetupComponent },

  { path: 'report', component: ReportComponent },

  { path: 'task-summary', component: TaskSummaryComponent },

  { path: 'entity-manager/:parenttype/:parentid/:type/:id', component: EntityManagerComponent },
  { path: 'entity-manager/:parenttype/:parentid/:type', component: EntityManagerComponent },
  
  { path: 'entity-manager/:type/:id', component: EntityManagerComponent },  
  { path: 'entity-manager/:type', component: EntityManagerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EntityManagerComponent,
    ListManagerComponent,
    SetupComponent,
    HomeComponent,
    TimerComponent,
    TaskSummaryComponent,
    ReportComponent,
    DisplayTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
