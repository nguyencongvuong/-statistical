import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../../models/users.model";
import {AuthenticationService} from "../../../_services/authentication.service";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public users: Users;
  public submitted = false;

  constructor(private formBuilder: FormBuilder,private authenticationService:AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['',Validators.required]
    },{validator: this.checkPasswords })
  }

  ngOnInit() {
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.controls);
    if (this.registerForm.invalid) {

      return;
    }

    let value = this.registerForm.getRawValue();

    // this.authenticationService.register(value.email,value.password);

  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group

    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
