import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, RouterModule, RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
})
export class RootComponent {}
