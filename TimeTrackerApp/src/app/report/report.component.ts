import { Task } from './../task';
import { DataManagerService } from './../data-manager.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Output() workStatsList: Task[];

  constructor(
    private dataManager: DataManagerService
  ) { }

  ngOnInit() {
    var self = this;

    self.dataManager.GetTaskList().then(
      function (tasks) {
        self.workStatsList = tasks;
      },
      function (reason) {
      }
    )
  }
}
