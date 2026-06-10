import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-input',
  imports: [],
  templateUrl: './auth-input.html',
  styleUrl: './auth-input.css',
})
export class AuthInput {

  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';

}
