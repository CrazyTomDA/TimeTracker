import { Entity } from './../entity';
import { DataManagerService } from './../data-manager.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-manager',
  templateUrl: './entity-manager.component.html',
  styleUrls: ['./entity-manager.component.css']  
})
export class EntityManagerComponent implements OnInit {

  @Input() name: string;
  @Output() parentList: Entity[];
  action: string = 'Add';

  currentEntity: Entity = new Entity;

  constructor(
    private toasterService: ToasterService,
    private dataManager: DataManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    var self = this;

    /*self.parentEntity.type = this.route.snapshot.params['parenttype'];
    self.parentEntity.id = this.route.snapshot.params['parentid'];*/

    self.currentEntity.parentType = this.route.snapshot.params['parenttype'];
    self.currentEntity.parentId = this.route.snapshot.params['parentid'];

    self.currentEntity.type = this.route.snapshot.params['type'];
    self.currentEntity.id = this.route.snapshot.params['id'];

    if (self.currentEntity.id) {
      self.dataManager.GetEntity(self.currentEntity).then(
        function (item) {
          self.currentEntity = item;
          self.action = 'Edit';
        },
        function (reason) {
          self.action = 'Add';
          self.toasterService.pop(
            'error',
            'Failure',
            reason
          );
        }
      )
    }

    /*if (self.currentEntity.parentId) {
      self.dataManager.GetEntityList(self.currentEntity.parentType).then(
        function (items) {
          self.parentList = items;
        }
      )
    }*/
  }

  save(): void {
    var self = this;
    // invoke service to save

    this.dataManager.SaveEntity(self.currentEntity).then(
      function () {
        self.toasterService.pop(
          'success',
          'Success',
          'Saved ' + self.currentEntity.type
        );

        self.router.navigate(['/setup']);
      },
      function (reason) {
        self.toasterService.pop(
          'error',
          'Failure',
          reason
        );

      });
  }

  delete(): void {
    var self = this;
    // invoke service to delete

    this.dataManager.DeleteEntity(self.currentEntity).then(
      function () {
        self.toasterService.pop(
          'success',
          'Success',
          'Deleted ' + self.currentEntity.type
        );

        self.router.navigate(['/setup']);
      },
      function (reason) {
        self.toasterService.pop(
          'error',
          'Failure',
          reason
        );
      });
  }

  cancel(): void {
    var self = this;

    self.location.back();
  }
}