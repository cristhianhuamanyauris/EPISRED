import { Routes } from '@angular/router';
import { publicGuard } from './scty/auth.guards';
import { privateGuard } from './scty/auth.guards';   
export const routes: Routes = [
    { 
        canActivateChild: [publicGuard()],
        path: 'auth',
        loadChildren: ()=> import('./auth/features/auth.routes'), //lazzy loading
    },
    { 
        canActivateChild: [privateGuard()],
        path: 'tasks',
        loadComponent: () => import('./comp/ui/layout.component'),
        loadChildren: ()=> import('./task/features/task.routes'), //lazzy loading
    },
    { path: '**',
        redirectTo: '/tasks',
    }
];
