import { Component, inject } from '@angular/core';
import { PagComponent } from '../../ui/pag/pag.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../datacces/task.service';
@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [PagComponent, RouterLink],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export default class TasklistComponent {
  tasks = inject(TaskService).getTasks;

}
