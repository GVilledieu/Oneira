import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {

  title = input<string>();
  message = input<string>();
  confirmLabel = input<string>('Confirmer');
  cancelLabel = input<string>('Annuler');
  
  confirmed = output<void>();
  cancelled = output<void>();

} 
