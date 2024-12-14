/*
import { Component, inject } from '@angular/core';
import { PagComponent } from '../../ui/pag/pag.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../datacces/task.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [PagComponent, RouterLink, NgIf],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
  providers: [TaskService],
})
export default class TasklistComponent {
  taskService = inject(TaskService);

}
*/

import { Component, inject, OnInit } from '@angular/core';
import { PagComponent } from '../../ui/pag/pag.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../datacces/task.service';
import { UserService } from '../../datacces/user.service';
import { AuthStateService } from '../../../comp/dataccces/auth-state.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [PagComponent, RouterLink, NgIf],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  providers: [TaskService],
})
export default class TasklistComponent implements OnInit {
  taskService = inject(TaskService);
  userService = inject(UserService);
  authStateService = inject(AuthStateService);

  userDetails: any; // Para almacenar los detalles del usuario

  ngOnInit(): void {
    // Obtener detalles del usuario autenticado
    if (this.authStateService.currentUser) {
      this.userService.getUserDetails().then((docSnap) => {
        if (docSnap && docSnap.exists()) {
          this.userDetails = docSnap.data();
        } else {
          console.error('No se encontraron detalles del usuario.');
        }
      }).catch((error) => {
        console.error('Error obteniendo detalles del usuario:', error);
      });
    }
  }
}


