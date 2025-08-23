import { Component, computed, inject, Signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navadmin',
  standalone: true,
  imports: [RouterLink ,
    RouterLink ,
    RouterLinkActive,
  ],
  templateUrl: './navadmin.component.html',
  styleUrl: './navadmin.component.css'
})
export class NavadminComponent {

  readonly _AuthService = inject(AuthService) ;



}
