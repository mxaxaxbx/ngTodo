import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public tasks$: Observable<TaskI[]>;

  constructor(
    private taskSvc: TaskService
  ) { }

  ngOnInit(): void { 
    this.tasks$ = this.taskSvc.getAllTasks();
  }

}
