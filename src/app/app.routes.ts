import { Routes } from '@angular/router';
   
export const routes: Routes = [
    { path: 'auth',
        loadChildren: ()=> import('./auth/features/auth.routes'), //lazzy loading
    },
    { path: 'tasks',
        loadChildren: ()=> import('./task/features/task.routes'), //lazzy loading
    },
    { path: '**',
        redirectTo: '/tasks',
    }
];
