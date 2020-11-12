import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskI } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { DeleteDialogComponent } from '../../layout/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  task$: TaskI;
  private taskId: string;

  constructor(
    private taskSvc: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  taskForm = new FormGroup({
    id: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    this.route.params.subscribe(value => {
      this.getTaskById(value.id);
      this.taskId = value.id
    })
  }

  getTaskById(id: TaskI) {
    this.taskSvc.getTaskById(id).subscribe(data => {
      if(!data){
        return this.router.navigate(['/list']);
      }
      
      this.task$ = data;
      
      this.initValuesForm();
      
    });
    
  }

  updateTask(form: TaskI) {
    this.taskSvc.uploadTask(form)
      .then(() => {
        this.router.navigate(['/list']);

      })
      .catch(err => {
        console.error(err);
        
      });
    
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteTask();
      }
      
    });
  }

  private deleteTask() {
    this.taskSvc.deleteTask(this.taskId)
      .then(() => {
        this.router.navigate(['/list']);

      })
      .catch(err => {
        console.error(err);
        
      });
  }

  private initValuesForm(): void {
    this.taskForm.patchValue({
      id: this.taskId,
      task: this.task$.action,
    })
  }

}
