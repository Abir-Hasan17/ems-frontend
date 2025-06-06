import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css'],
})
export class EmptyStateComponent {
  @Input() message: string = 'Nothing here yet.';
  @Input() quote: string =
    '“Wealth consists not in having great possessions, but in having few wants.”';
  @Input() author: string = '– Epictetus';
  @Input() emoji: string = '💰';
}
