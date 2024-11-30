import { Component, input } from '@angular/core';
import { Task } from '../../datacces/task.service';
@Component({
  selector: 'app-pag',
  standalone: true,
  imports: [],
  templateUrl: './pag.component.html',
  styleUrl: './pag.component.css'
})
export class PagComponent {
  tasks = input.required<Task[]>();
}
