import { Component } from '@angular/core';
import { SidebarNavElimentComponent } from '../sidebar-nav-eliment/sidebar-nav-eliment.component';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarNavElimentComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
