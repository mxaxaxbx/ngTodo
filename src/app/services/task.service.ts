import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: TaskI[];

  constructor(private afs: AngularFirestore) { }

  public getAllTasks(): Observable<TaskI[]> {
    return this.afs
      .collection('todo')
      .snapshotChanges()
      .pipe(
        map(actions => 
          actions.map (a => {
            
            const data = a.payload.doc.data() as TaskI;
            const id = a.payload.doc.id;
            
            data.selected = false;
            
            return {id, ...data};
          })
        ),
        
      );
  }

  public getTaskById(id: TaskI): Observable<TaskI> {
    return this.afs.doc<TaskI>(`todo/${id}`).valueChanges();
  }

  // pilas con los tipos
  public uploadTask(task: any) {
    const taskObj = {
      action: task.task
    };    

    return this.afs.collection('todo').doc(task.id).update(taskObj);
  }

  public addTask(task: any) {
    const taskObj = {
      action: task.task
    };    

    return this.afs.collection('todo').add(taskObj);
  }

  public deleteTask(taskId: string) {
    return this.afs.collection('todo').doc(taskId).delete();
  }

}
