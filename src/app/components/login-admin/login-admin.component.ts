import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { log } from 'node:console';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {



    private readonly _FormBuilder = inject(FormBuilder)  ;
    private readonly _Router = inject(Router) ;
    private readonly _AuthService = inject(AuthService) ;
    private readonly _ToastrService = inject(ToastrService) ;
    isLoading: WritableSignal <boolean> = signal(false)

    loginForm:FormGroup = this._FormBuilder.group({
      email : [null , [Validators.required , Validators.email]] ,
      password : [ null , [Validators.required , Validators.pattern(/^[a-z0-9]{8,20}$/)]] ,
    })


    loginSubmit() {
      if (this.loginForm.valid) {
        this.isLoading.set(true) ;
        this._AuthService.loginAdmin(this.loginForm.value).subscribe({
          next:(res)=>{


            if (res.success === true ) {

              this.isLoading.set(false) ;
            this._ToastrService.success(res.message , "PMS ProjectManagement") ;
            localStorage.setItem("userToken" , res.data.token) ;
            this._AuthService.SaveUserInfo() ;

            setTimeout(() => {
              this._Router.navigate(["/allusers"]) ;
            }, 2000);

            }
          },
          error:(err :HttpErrorResponse)=>{

            console.log(err);

            this.isLoading.set(false) ;
            this._ToastrService.error(err.error.message , "PMS ProjectManagement")
          }
        })
      } else {
        this.loginForm.markAllAsTouched() ;
      }
    }
}
