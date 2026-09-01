import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, Sidebar, HeaderComponent],
  templateUrl: './base.html',
  styleUrl: './base.css',
})
export class Base {}
