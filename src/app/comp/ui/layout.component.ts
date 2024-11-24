import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthStateService } from "../dataccces/auth-state.service";
@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-Layout',
    template: '<button (click)="logOut()">Salir</button>, <router-outlet/>',
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