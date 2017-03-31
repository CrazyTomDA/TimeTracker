import { ToasterService } from 'angular2-toaster';
import { DataManagerService } from './../data-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from './../task';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  timeElasped: Observable<number>;
  task: Task = new Task();
  timerSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private dataManager: DataManagerService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    var self = this;

    self.task.entityId = this.route.snapshot.params['taskid'];

    self.task.startTime = (new Date()).getTime();

    //var timer = Observable.timer(500, 1000);
    //self.timerSubscription = timer.subscribe(t => self.timeElasped = t);

    self.timeElasped = Observable.interval(1000);
  }

  onStop() {
    var self = this;

    self.task.endTime = (new Date()).getTime();

    self.dataManager.workStats = self.task;

    self.router.navigate(['/task-summary']);
  }
}
