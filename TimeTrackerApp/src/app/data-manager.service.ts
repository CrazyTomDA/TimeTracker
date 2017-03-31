import { Task } from './task';
import { UUID } from 'angular2-uuid';
import { Entity } from './entity';
import { Injectable } from '@angular/core';


@Injectable()
export class DataManagerService {
  workStats: Task;

  constructor() { }

  /**
   * GetEntity
   */
  public GetEntity(entity: Entity): Promise<Entity> {
    var entityListString: string = localStorage.getItem(entity.type);
    var entityList: Entity[] = [];

    if (entityListString !== null)
      entityList = JSON.parse(entityListString);

    entity = entityList.filter(function (item) {
      return item.id === entity.id;
    })[0];

    if (entity && entity.id !== null)
      return Promise.resolve(entity);
    else
      return Promise.reject('Entity Not Found');
  }

  /**
   * GetEntityList
   */
  public GetEntityList(entityType: string): Promise<Entity[]> {
    var entityListString: string = localStorage.getItem(entityType);
    var entityList: Entity[] = [];

    if (entityListString !== null)
      entityList = JSON.parse(entityListString);

    if (entityList && entityList.length > 0)
      return Promise.resolve(entityList);
    else
      return Promise.reject('Entity List Not Found');
  }

  /**
   * SaveEntity
   */
  public SaveEntity(entity: Entity): Promise<void> {
    var entityListString: string = localStorage.getItem(entity.type);
    var entityList: Entity[] = [];

    if (entityListString !== null) {
      entityList = JSON.parse(entityListString);

      if (!entity.id)
        for (var i = 0; i < entityList.length; i++) {
          if (entityList[i].name.toLowerCase() === entity.name.toLowerCase())
            return Promise.reject("Entity Already Exists");
        }
    }

    if (!entity.id)
      entity.id = UUID.UUID();
    else
      entityList = entityList.filter(function (item) {
        return item.id !== entity.id;
      });

    entityList.push(entity);

    localStorage.setItem(entity.type, JSON.stringify(entityList));
    return Promise.resolve();
  }

  /**
   * DeleteEntity
   */
  public DeleteEntity(entity: Entity): Promise<void> {
    var entityListString: string = localStorage.getItem(entity.type);
    var entityList: Entity[] = [];
    var oldEntityListCount: number;

    if (entityListString !== null)
      entityList = JSON.parse(entityListString);

    oldEntityListCount = entityList.length;

    entityList = entityList.filter(function (item) {
      return item.id !== entity.id;
    });

    if (oldEntityListCount !== entityList.length) {
      localStorage.setItem(entity.type, JSON.stringify(entityList));
      return Promise.resolve();
    }
    else
      return Promise.reject('Entity Not Found');
  }

  /**
   * SaveTask
   */
  public SaveTask(task: Task): Promise<void> {
    var workStatsListString: string = localStorage.getItem('WorkStats');
    var workStatsList: Task[] = [];

    if (workStatsListString !== null)
      workStatsList = JSON.parse(workStatsListString);

    task.id = UUID.UUID();

    workStatsList.push(task);

    localStorage.setItem('WorkStats', JSON.stringify(workStatsList));

    return Promise.resolve();
  }

  /**
   * GetTaskList
   */
  public GetTaskList(): Promise<Task[]> {
    var self = this;
    var workStatsListString: string = localStorage.getItem('WorkStats');
    var workStatsList: Task[] = [];

    var taskList: Entity[];
    var projectList: Entity[];

    if (workStatsListString !== null) {
      workStatsList = JSON.parse(workStatsListString);

      self.GetEntityList('Project').then(function (projects) {
        projectList = projects;

        self.GetEntityList('Task').then(function (tasks) {
          taskList = tasks;

          for (var i = 0; i < workStatsList.length; i++) {
            var task = taskList.filter(function (item) {
              return item.id === workStatsList[i].entityId;
            })[0];

            workStatsList[i].task = task.name;

            workStatsList[i].project = projectList.filter(function (item) {
              return item.id === task.parentId;
            })[0].name;
          }
        });
      });
    }

    if (workStatsList && workStatsList.length > 0)
      return Promise.resolve(workStatsList);
    else
      return Promise.reject('Task List Not Found');
  }

  UpdateTaskMetaData(task:Task):Promise<Task>{
    var self = this;

    var taskList: Entity[];
    var projectList: Entity[];

    self.GetEntityList('Project').then(function (projects) {
        projectList = projects;

        self.GetEntityList('Task').then(function (tasks) {
          taskList = tasks;

            var taskInfo = taskList.filter(function (item) {
              return item.id === task.entityId;
            })[0];

            task.task = taskInfo.name;

            task.project = projectList.filter(function (item) {
              return item.id === taskInfo.parentId;
            })[0].name;
        });
      });

      return Promise.resolve(task);
  }
}