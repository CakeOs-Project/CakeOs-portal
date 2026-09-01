import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceWizardService } from '../../services/invoice-wizard.service';
import { InvoiceStep } from '../../models/invoice-wizard.model';

@Component({
  selector: 'app-step-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-summary.component.html',
  styleUrl: './step-summary.component.css',
})
export class StepSummaryComponent {
  private readonly wizard = inject(InvoiceWizardService);

  readonly items = this.wizard.items;
  readonly clientInfo = this.wizard.clientInfo;
  readonly itemsSubtotal = this.wizard.itemsSubtotal;

  backToDetails(): void {
    this.wizard.goToStep(InvoiceStep.Details);
  }

  generateInvoice(): void {
    console.log('Generating invoice with data:', {
      client: this.clientInfo(),
      items: this.items(),
      total: this.itemsSubtotal(),
    });
  }
}
