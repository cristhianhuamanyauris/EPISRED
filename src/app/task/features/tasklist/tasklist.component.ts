import { Component } from '@angular/core';
import { PagComponent } from '../../ui/pag/pag.component';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [PagComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export default class TasklistComponent {

}
