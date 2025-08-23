import { Component, computed, inject, Signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navuser',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navuser.component.html',
  styleUrl: './navuser.component.css'
})
export class NavuserComponent  implements OnInit {


  readonly  _AuthService = inject(AuthService) ;

  Email :Signal<string> = computed( ()=> this._AuthService.email() ) ;

  Name:Signal<string> = computed(     ()=>this._AuthService.name()    )  ;





ngOnInit(): void {

  this._AuthService.getMyUser().subscribe({
    next:(res)=>{
      // console.log(res);
      this._AuthService.email.set(res.data.email) ;
      this._AuthService.name.set(res.data.firstName)
    }
  })
}

}
