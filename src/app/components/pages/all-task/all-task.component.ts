import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent {
  newTasks = "";
  initialtaskList: any[] = [];
  taskList: any[] = [];
  httpService = inject(HttpService);
  dateNow = new Date();
  stateService = inject(StateService);

  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      if (value) {
        this.taskList = this.initialtaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      }else{
        this.taskList=this.initialtaskList;
      }
    })
    this.getAllTask();
  }

  addTask() {
    this.httpService.addTask(this.newTasks).subscribe(() => {
      this.newTasks = "";
      this.getAllTask();
    })
  }
  getAllTask() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.initialtaskList = this.taskList = result;
    })
  }
  onComplete(task: any) {
    task.completed = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTask();
    })
  }
  onImportant(task: any) {
    task.important = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTask();
    })
  }
}
