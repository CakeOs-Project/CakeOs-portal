import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './base.html',
  styleUrl: './base.css',
})
export class Base {}
