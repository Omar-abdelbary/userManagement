import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly   _HttpClient = inject(HttpClient) ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService  = inject(ToastrService) ;
  private readonly _Plat_Id = inject(PLATFORM_ID) ;


  UserData :any  = null ;

  email:WritableSignal<string> = signal("")
  name:WritableSignal<string> = signal("")






    // token = localStorage.getItem("userToken") ;






  registerUser(FormData:object):Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/api/auth/register` , FormData)
  }




  loginUser(FormData:object) :Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/login` , FormData)
  }


  loginAdmin(FormData:object) :Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/login`   , FormData)
  }


  changePass(FormData:object):Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/auth/change-password`, FormData,
    // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
  )
}





  updateProfile(FormData:object) :Observable<any> {
    return this._HttpClient.put( `${environment.baseUrl}/api/auth/profile` , FormData ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    )
  }



  getMyUser () :Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/auth/me` ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    )
  }




SaveUserInfo() {

  if (isPlatformBrowser(this._Plat_Id)) {

      if (localStorage.getItem("userToken") !== null ) {


    this.UserData = (jwtDecode(localStorage.getItem("userToken") !))
  }

  }
}



signOut() {


 if (isPlatformBrowser(this._Plat_Id)) {

   if (localStorage.getItem("userToken") !==null) {


     localStorage.removeItem("userToken") ;
  this.UserData = null ;

  setTimeout(() => {

    this._ToastrService.success("Success SignOut And navigate Login Component" , "PMS ProjectManagement") ;
    this._Router.navigate(["/login"]) ;
  }, 1000);
  }

 }
}

































 }
