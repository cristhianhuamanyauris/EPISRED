import { Component, input, effect } from '@angular/core';
import { Task } from '../../datacces/task.service';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../datacces/task.service';
@Component({
  selector: 'app-pag',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pag.component.html',
  styleUrl: './pag.component.css'
})
export class PagComponent {
  tasks = input.required<Task[]>();

  constructor(private taskService: TaskService){
    effect(() => {
      console.log(this.tasks());
    });
  }
   // Método definido fuera del constructor
   deleteTask(id: string): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta tarea?'); // Confirmación
    if (confirmDelete) {
      this.taskService.delete(id)
        .then(() => {
          console.log('Tarea eliminada correctamente.');
          // Aquí puedes actualizar tu lista de tareas si es necesario
        })
        .catch(error => {
          console.error('Error al eliminar la tarea:', error);
        });
    }
  }

}
