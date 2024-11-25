import { Component } from '@angular/core';
import { PagComponent } from '../../ui/pag/pag.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [PagComponent, RouterLink],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export default class TasklistComponent {

}
