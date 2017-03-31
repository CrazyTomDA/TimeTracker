import { Router } from '@angular/router';
import { DataManagerService } from './../data-manager.service';
import { Entity } from './../entity';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedProjectId: string;
  selectedTaskId: string;
  projects: Entity[];
  tasks: Entity[];
  tasksByProject: Entity[];

  constructor(
    private dataManager: DataManagerService,
    private router: Router
  ) { }

  ngOnInit() {
    var self = this;

    self.dataManager.GetEntityList('Project').then(
      function (items) {
        self.projects = items;
      }
    )

    self.dataManager.GetEntityList('Task').then(
      function (items) {
        self.tasks = items;
      }
    )
  }

  onProjectChange() {
    var self = this;

    self.tasksByProject = self.tasks.filter(function (item) {
      return item.parentId == self.selectedProjectId;
    });
  }
}
