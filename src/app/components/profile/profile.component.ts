import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IuserInfo } from '../../core/interfaces/iuser-info';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ DatePipe ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private readonly _AuthService = inject(AuthService) ;

  DetailsUser:WritableSignal<IuserInfo> = signal({} as IuserInfo) ;




  ngOnInit(): void {

    this._AuthService.getMyUser().subscribe({
      next:(res)=>{
        if (res.success === true) {


          this._AuthService.email.set(res.data.email) ;
          this._AuthService.name.set(res.data.firstName)
          this.DetailsUser.set(res.data) ;


        }
      }
    })
  }


}
