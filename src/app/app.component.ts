import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { signOut } from '@angular/fire/auth';
import { AuthStateService } from './comp/dataccces/auth-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private _authState = inject(AuthStateService)
  private _router = inject(Router);
  async logOut(){
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/singin')
  }
}
