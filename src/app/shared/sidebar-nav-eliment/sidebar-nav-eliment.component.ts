import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar-nav-eliment',
  imports: [RouterModule],
  templateUrl: './sidebar-nav-eliment.component.html',
  styleUrl: './sidebar-nav-eliment.component.css',
})
export class SidebarNavElimentComponent {
  @Input() navItem = { navLabel: '', navRoute: '', navIcon: '' };
}
