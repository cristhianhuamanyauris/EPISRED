import { Routes } from "@angular/router";
export default [
    { path: '',
        loadComponent: () => import('./tasklist/tasklist.component')
    },
    { path: 'new',
        loadComponent: () => import('./taskform/taskform.component')
    },
    { path: 'edit/id',
        loadComponent: () => import('./taskform/taskform.component')
    },
] as Routes;