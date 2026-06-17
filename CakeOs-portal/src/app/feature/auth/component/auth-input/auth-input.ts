import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }

}
