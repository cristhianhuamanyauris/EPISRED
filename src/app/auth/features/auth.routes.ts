import { Routes } from "@angular/router";
export default [
    { path: 'singin',
        loadComponent: ()=> import('./singin/singin.component')//lazzy loading
    },
    { path: 'singup',
        loadComponent: ()=> import('./singup/singup.component')//lazzy loading
    },
] as Routes;