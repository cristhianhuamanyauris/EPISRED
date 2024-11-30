import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCreate, TaskService } from '../../datacces/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export default class TaskformComponent {
  //Segundo cambio acá
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router)
  loading = signal(false);

  form = this._formBuilder.group({
    tittle: this._formBuilder.control('', Validators.required),
    descrip: this._formBuilder.control('', Validators.required)
  });
  async submit() {
    if(this.form.invalid) return;

    console.log(this.form.value);   
    try {
      this.loading.set(true);
      const {tittle, descrip} = this.form.value;
      const task: TaskCreate = {
        tittle: tittle || '',
        descrip: descrip || '',
      };
      await this._taskService.create(task);
      toast.success('Post publicado correctamente.');
      this._router.navigateByUrl('/tasks');

    } catch (error) {
      toast.success('Ocurrio un error.');
  
    } finally{
      this.loading.set(false);
    }  
  };

}
