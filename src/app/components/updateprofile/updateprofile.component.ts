import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass ,
  ],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {

  private readonly _AuthService = inject(AuthService) ;
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _ToastrService = inject(ToastrService) ;
  isLoading :WritableSignal<boolean> = signal(false) ;


  UpdateProfile:FormGroup = this._FormBuilder.group({
    firstName : [ null , [Validators.required , Validators.minLength(5) , Validators.maxLength(15)]] ,
    lastName : [null , [ Validators.required ,    Validators.minLength(5) , Validators.maxLength(15)]] ,
  }) ;





  Submit() {

    if (this.UpdateProfile.valid) {
      this.isLoading.set(true) ;
      this._AuthService.updateProfile(this.UpdateProfile.value).subscribe({
        next:(res)=>{
          if (res.success === true) {
            this.isLoading.set(false) ;
            this._ToastrService.success(res.message , "PMS ProjectManagement") ;
            setTimeout(() => {
              this._Router.navigate(["/profile"]) ;
            }, 2000);
          }
        },

        error:(err :HttpErrorResponse)=>{
          // console.log(err);
          this.isLoading.set(false) ;

        }
      })

    } else {

      this.UpdateProfile.markAllAsTouched() ;
    }
  }





























}
