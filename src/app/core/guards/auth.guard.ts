import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


  const _Router = inject(Router) ;

  const _Plat_Id = inject(PLATFORM_ID) ;






  if (isPlatformBrowser(_Plat_Id)) {
    
    if (localStorage.getItem("userToken") !== null) {
      return true ;
    } else {

      _Router.navigate(["/login"]) ;
      return false ;

    }
  }





return false ;
};
