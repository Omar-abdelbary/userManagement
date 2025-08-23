import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { UserComponent } from './layouts/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { authGuard } from './core/guards/auth.guard';
import { AllusersComponent } from './components/allusers/allusers.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { AdminstatsComponent } from './components/adminstats/adminstats.component';


export const routes: Routes = [


  {path:"" , component: AuthComponent , children: [
    {path:"" , redirectTo:"login" , pathMatch:"full" , title:"login"} ,
    {path:"login" , component: LoginComponent , title:"login User" } ,
    {path:"register" , component: RegisterComponent , title: "register User" } ,
    {path:"loginAdmin" , component: LoginAdminComponent , title: "login Admin" } ,
]} ,


{ path:"" , component:UserComponent , canActivate:[authGuard ] ,  children : [
  {path:"" , redirectTo:"profile" , pathMatch:"full" , title:"profile"} ,
  {path:"profile" , component:ProfileComponent , title:"profile" } ,
  {path:"changepass" , loadComponent:()=> import("./components/changepass/changepass.component").then( (c)=>c.ChangepassComponent) , title : "changePass"} ,
  {path:"updateprofile" , loadComponent: ()=> import ("./components/updateprofile/updateprofile.component").then((c)=>c.UpdateprofileComponent ), title:"updateProfile"} ,
]} ,


{path: "" , component: AdminComponent , canActivate:[authGuard  ] , children:[
  {path: "" , redirectTo :"allusers" , pathMatch:"full" , title:"allusers"} ,
  {path:"allusers" , component:AllusersComponent , title:"allusers"} ,
  {path:"updateuser/:id" , loadComponent:()=>  import("./components/updateuser/updateuser.component").then( (c)=>c.UpdateuserComponent  ) , title:"edit user info"} ,
  {path:"stats" , loadComponent: ()=> import("./components/adminstats/adminstats.component").then(  (c)=>c.AdminstatsComponent    )   , title:"getStats"}
]} ,


{path: "**" , loadComponent: ()=> import("./components/notfound/notfound.component").then(   (c)=>c.NotfoundComponent   )  , title:"notfound"} ,



];
