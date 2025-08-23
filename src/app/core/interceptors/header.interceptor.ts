import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {



  const _Plat_Id = inject(PLATFORM_ID) ;

  if (isPlatformBrowser(_Plat_Id)) {

    if (localStorage.getItem("userToken") !== null) {

      if (req.url.includes("me") || req.url.includes("profile") || req.url.includes("change-password") || req.url.includes("users") || req.url.includes("stats")  ) {

        req = req.clone( { setHeaders: {  Authorization: `Bearer ${localStorage.getItem("userToken")}`} }   )
      }
    }
  }


  return next(req);
};
