import { Routes } from "@angular/router";
export default [
    { path: '',
        loadComponent: () => import('./tasklist/tasklist.component')
    },
] as Routes;