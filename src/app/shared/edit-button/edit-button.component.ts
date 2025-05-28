import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  imports: [CommonModule],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css',
})
export class EditButtonComponent {
  @Input() isIncome!: boolean;
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }
}
