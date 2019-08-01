import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http/';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        //console.log(isLoggedIn);
          if ( JSON.parse(sessionStorage.getItem("selectedUser"))){
          //console.log("isloggedin true");
          return true;
        }
        else{
          //console.log("isloggedin false");
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}