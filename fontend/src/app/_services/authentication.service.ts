import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {auth} from "firebase";
// import auth from "fireb
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate{
  user;
  constructor(public  afAuth:  AngularFireAuth,public router:Router) { }

  async login(email:string,password:string){

    var self = this;
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.afAuth.authState.subscribe(user => {
      console.log(user)
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
    this.router.navigate(['']);
  }
  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    // this.sendEmailVerification();
  }
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['admin/verify-email']);
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('idToken');
    this.router.navigate(['/login']);
  }
  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    const idToken = localStorage.getItem('idToken');
    console.log(user);
    return  user  !==  null || idToken !== null;
  }
  async  loginWithGoogle(){
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['admin/list']);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.isLoggedIn;
    if (currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
