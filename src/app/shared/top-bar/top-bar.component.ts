import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Input() pageTitle = '';
  @Input() pageIcon = '';
  @Input() pageQuote = '';
}
