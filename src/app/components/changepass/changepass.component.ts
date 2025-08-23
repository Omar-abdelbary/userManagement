import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass ,
  ],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.css'
})
export class ChangepassComponent {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _AuthService = inject(AuthService) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _Router = inject(Router) ;

  isLoading :WritableSignal<boolean> = signal(false) ;


  changePassForm :FormGroup = this._FormBuilder.group({
    currentPassword : [null , [Validators.required ,  Validators.pattern(/^[a-z0-9]{8,20}$/)]]   ,
    newPassword  : [null , [Validators.required ,  Validators.pattern(/^[a-z0-9]{8,20}$/)]],
  })




  Save() {
    if (this.changePassForm.valid) {
      this.isLoading.set(true) ;
      this._AuthService.changePass(this.changePassForm.value).subscribe({
        next:(res)=>{
          if (res.success === true) {
            this.isLoading.set(false) ;
            this._ToastrService.success(res.message , "PMS ProjectManagement") ;
            setTimeout(() => {
              this._Router.navigate(["/profile"])
            }, 2000);
          }
        },
        error:(err:HttpErrorResponse)=>{
          // console.log(err);
          this.isLoading.set(false) ;
        }
      })
    } else {

      this.changePassForm.markAllAsTouched() ;
    }
  }

}
