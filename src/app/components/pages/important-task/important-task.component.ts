import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-task',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './important-task.component.html',
  styleUrl: './important-task.component.css'
})
export class ImportantTaskComponent {
  newTasks = "";
  taskList: any[] = [];
  httpService = inject(HttpService);
  dateNow = new Date();
  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.taskList = result.filter((x:any)=>x.important==true);
    })
  }

  onComplete(task: any) {
    task.completed = true;
    this.httpService.updateTask(task).subscribe(()=>{
       this.getAllTask();
    })
  }
  onImportant(task: any) {
    task.important = true;
    this.httpService.updateTask(task).subscribe(()=>{
       this.getAllTask();
    })
  }
}
