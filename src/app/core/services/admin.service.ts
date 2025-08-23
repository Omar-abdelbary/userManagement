import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {



  private readonly _HttpClient = inject(HttpClient) ;




  GetAllUsers():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/admin/users?page=1&limit=10` ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    )
  }




  GetUserById(userId: string|number):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/admin/users/${userId}` ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    )
  }



  EditUser(userId:string |number | null , FormData:object):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/admin/users/${userId}` , FormData ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    )
  }


  DeleteUser(userId:string | number | null):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/admin/users/${userId}` ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
     )
  }



  GetStatistics():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/admin/stats` ,
      // {headers:{  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    )
  }





















}
