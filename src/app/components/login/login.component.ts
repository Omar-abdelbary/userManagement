import { NgClass, APP_BASE_HREF } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink ,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly _FormBuilder = inject(FormBuilder)  ;
  private readonly _AuthService = inject(AuthService)  ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService)
  readonly isLoading:WritableSignal<boolean> = signal(false) ;
  userId:WritableSignal<string> = signal("")

  loginForm:FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required , Validators.email]] ,
    password : [ null , [Validators.required , Validators.pattern(/^[a-z0-9]{8,20}$/)]] ,
  })


  loginSubmit() {

    if (this.loginForm.valid) {

      this.isLoading.set(true) ;

      this._AuthService.loginUser(this.loginForm.value).subscribe({

        next:(res)=>{



          if (res.success === true) {
            this.isLoading.set(false) ;
            this._ToastrService.success(res.message , "PMS ProjectManagement") ;
            localStorage.setItem("userToken" , res.data.token) ;
            this._AuthService.SaveUserInfo()  ;

            setTimeout(() => {

              this._Router.navigate(["/profile"]) ;

            }, 2000);
          }
        },
        error:(err:HttpErrorResponse)=>{

          this.isLoading.set(false) ;

          this._ToastrService.error(err.error.message , "PMS ProjectManagement")

        }
      })

    } else {


      this.loginForm.markAllAsTouched() ;
    }
  }

}
