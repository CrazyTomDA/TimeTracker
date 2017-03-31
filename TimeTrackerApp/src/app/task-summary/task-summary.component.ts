import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Task } from './../task';
import { DataManagerService } from './../data-manager.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.css'],
})
export class TaskSummaryComponent implements OnInit {
  @Output() workStats: Task = new Task();

  constructor(
    private dataManager: DataManagerService,
    private toaster: ToasterService,
    private router:Router
  ) { }

  ngOnInit() {
    var self = this;

    self.workStats = self.dataManager.workStats;

    self.dataManager.UpdateTaskMetaData(self.workStats).then(
      function (task) {
        self.workStats = task;
      });
  }

  SaveWorkStats() {
    var self = this;

    self.dataManager.SaveTask(self.workStats).then(
      function () {
        self.toaster.pop(
          'success',
          'Success',
          'Saved Data'
        );

        self.router.navigate(['/home']);
      });
  }
}
