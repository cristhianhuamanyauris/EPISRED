import { AfterViewChecked, AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskCreate, TaskService } from '../../datacces/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { input } from '@angular/core';
import { __await } from 'tslib';
import { $locationShim } from '@angular/common/upgrade';
@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css',
  providers: [TaskService],
})
export default class TaskformComponent {
  //Segundo cambio acá
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router)
  loading = signal(false);
  idTask = input.required<string>();

  form = this._formBuilder.group({
    tittle: this._formBuilder.control('', Validators.required),
    descrip: this._formBuilder.control('', Validators.required)
  });

  constructor(){
    effect(() => {
      console.log(this.idTask());
      const id = this.idTask();
      if (id) {
        this.getTask(id);
      }
    });
  }
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
      const id  = this.idTask();
      if (id) {
        await this._taskService.update(task, id);
        
      }else{
        await this._taskService.create(task);
      }
      toast.success(`Post ${id ? 'Editada': 'Creada'} correctamente.`);
      this._router.navigateByUrl('/tasks');

    } catch (error) {
      toast.success('Ocurrio un error.');
  
    } finally{
      this.loading.set(false);
    }  
  };

  async getTask(id: string){
    const taskSnapshot = await this._taskService.getTask(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }


}
