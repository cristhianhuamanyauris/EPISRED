import { Component, input, effect } from '@angular/core';
import { Task } from '../../datacces/task.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-pag',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pag.component.html',
  styleUrl: './pag.component.css'
})
export class PagComponent {
  tasks = input.required<Task[]>();

  constructor(){
    effect(() => {
      console.log(this.tasks());
    });
  }
}
