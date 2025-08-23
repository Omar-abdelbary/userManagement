import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass  ,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _AuthService = inject(AuthService) ;
  private readonly _Router = inject(Router) ;
  private readonly  _ToastrService = inject(ToastrService) ;
  isLoading : WritableSignal <boolean> = signal(false) ;


  registerForm : FormGroup = this._FormBuilder.group({

  firstName : [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(15)]] ,
  lastName : [ null , [Validators.required , Validators.minLength(5) , Validators.maxLength(15)]] ,
  email : [ null , [Validators.required , Validators.email]] ,
  password : [ null , [Validators.required , Validators.pattern(/^[a-z0-9]{8,20}$/)] ] ,

  })   ;




  registerSubmit() {

    if (this.registerForm.valid) {
      this.isLoading.set(true) ;
      this._AuthService.registerUser(this.registerForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          this._ToastrService.success(res.message , "PMS ProjectManagement")
          this.isLoading.set(false) ;
          if (res.success === true) {
            setTimeout(() => {

              this._Router.navigate(["/login"]) ;
            }, 2000);
          }
        },
        error:(err:HttpErrorResponse)=>{
          // console.log(err);
          this.isLoading.set(false) ;
          this._ToastrService.error(err.error.message , "PMS ProjectManagement")
        }
      })
    } else {


      this.registerForm.markAllAsTouched() ;
    }
  }
}
