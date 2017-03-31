import { Entity } from './../entity';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DataManagerService } from './../data-manager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  @Input() type: string;
  action: string = 'Add';
  @Output() entityList: Entity[];
  selectedEntity: Entity = null;
  @Input() parentEntity: Entity = null;

  constructor(
    private dataManager: DataManagerService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
    var self = this;

    if (self.type) {
      self.dataManager.GetEntityList(self.type).then(
        function (items) {
          self.entityList = items;
        },
        function(reason){

        }
      )
    }
  }

  isSelected(entity) { return entity === this.selectedEntity; }

  onSelect(entity) {
    var self = this;

    if (self.selectedEntity == entity)
    {
      self.action = "Add";
      self.selectedEntity = null;
    }
    else
    {
      self.action = "Edit";
      self.selectedEntity = entity;
    }
  }
}
