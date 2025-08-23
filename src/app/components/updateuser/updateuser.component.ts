import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent implements OnInit  {


  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _AdminService = inject(AdminService) ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _ActivatedRoute = inject(ActivatedRoute) ;
    isLoading :WritableSignal<boolean> = signal(false) ;
    UserId :string|number|null = ""

  UpdateUserForm:FormGroup = this._FormBuilder.group({
    firstName: [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(15)] ] ,
    isActive : [null , [Validators.required  ]] ,
    role : [null , [Validators.required , Validators.maxLength(4)]] ,
  }) ;



  UpdateSave() {
    if (this.UpdateUserForm.valid) {
      this.isLoading.set(true) ;
      this._AdminService.EditUser( this.UserId ,this.UpdateUserForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          if (res.success === true) {
                  this.isLoading.set(false) ;
            this._ToastrService.success(res.message , "PMS ProjectManagement") ;

            setTimeout(() => {
              this._Router.navigate(["/allusers"]) ;
            }, 2000);
          }
        },

        error:(err:HttpErrorResponse) =>{
          this.isLoading.set(false) ;
          // console.log(err);
        }
      })

    } else {

      this.UpdateUserForm.markAllAsTouched() ;
    }
  }



  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        console.log(param);
        this.UserId = param.get("id")
      }
    })
  }



}
