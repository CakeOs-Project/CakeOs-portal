import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceWizardService } from '../../services/invoice-wizard.service';
import { InvoiceStep } from '../../models/invoice-wizard.model';

@Component({
  selector: 'app-step-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-client.component.html',
  styleUrl: './step-client.component.css',
})
export class StepClientComponent {
  private readonly wizard = inject(InvoiceWizardService);

  readonly clientInfo = this.wizard.clientInfo;
  readonly searchQuery = signal('');

  onNameChange(fullName: string): void {
    this.wizard.updateClientInfo({ fullName });
  }

  onPhoneChange(phone: string): void {
    this.wizard.updateClientInfo({ phone });
  }

  onEmailChange(email: string): void {
    this.wizard.updateClientInfo({ email });
  }

  setFulfillmentMethod(fulfillmentMethod: 'pickup' | 'delivery'): void {
    this.wizard.updateClientInfo({ fulfillmentMethod });
  }

  onDateChange(fulfillmentDateTime: string): void {
    this.wizard.updateClientInfo({ fulfillmentDateTime });
  }

  onSearch(): void {
    // Search existing client logic
  }

  continueToItems(): void {
    this.wizard.goToStep(InvoiceStep.Items);
  }
}
