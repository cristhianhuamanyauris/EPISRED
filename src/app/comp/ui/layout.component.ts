import { Component } from "@angular/core";
import { RouterModule, Router, RouterLink } from "@angular/router";
import { inject } from "@angular/core";
import { AuthStateService } from "../dataccces/auth-state.service";
@Component({
    standalone: true,
    imports: [RouterModule, RouterLink],
    selector: 'app-Layout',
    styleUrl: './layout.component.css',
    template: `
    <header class="header">
        <nav class="nav">
            <a class="logo" routerLink="/tasks">Ng Task</a>
            <button class="logout" (click)="logOut()">Salir</button>
        </nav>
    </header>
    <router-outlet></router-outlet>`
})
export default class LayoutComponent {
    //constructor(){
        //console.log('holi');
    //}
    private _authState = inject(AuthStateService)
    private _router = inject(Router);
    async logOut(){
        await this._authState.logOut();
        this._router.navigateByUrl('/auth/singin')
    }
}