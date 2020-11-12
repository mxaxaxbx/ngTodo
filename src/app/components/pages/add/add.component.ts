import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskI } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private taskSvc: TaskService,
    private router: Router
  ) { }

  taskForm = new FormGroup({
    task: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  saveTask(form: TaskI) {
    this.taskSvc.addTask(form)
      .then(() => {
        this.router.navigate(['/list']);

      })
      .catch(err => {
        console.error(err);
        
      });

  }

}
