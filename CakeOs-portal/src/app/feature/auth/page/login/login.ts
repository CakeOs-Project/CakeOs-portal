import { Component } from '@angular/core';
import { AuthInput } from "../../component/auth-input/auth-input";
import { AuthLogo } from "../../component/auth-logo/auth-logo";
import { AuthLayout } from "../../component/auth-layout/auth-layout";
import { AuthButton } from "../../component/auth-button/auth-button";

@Component({
  selector: 'app-login',
  imports: [AuthInput, AuthLogo, AuthLayout, AuthButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
