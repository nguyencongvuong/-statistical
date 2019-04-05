import { Component, OnInit } from '@angular/core';
// import * as $ from 'assest/js';
// import * from 'asse'
import {Login} from '../../../assets/js/login'
import {AuthenticationService} from "../../_services/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Route,ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public response;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }
  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    Login
    // this.loginForm = this.formBuilder.group()
  }
  get f() { return this.loginForm.controls; }
    onSubmit() {

    var self = this;
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      let data = this.loginForm.getRawValue();
     this.authenticationService.login(data.email,data.password).catch(function (data) {
       self.response = data;

     });

  }
}
