import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceWizardService } from '../../services/invoice-wizard.service';
import { InvoiceStep } from '../../models/invoice-wizard.model';

@Component({
  selector: 'app-step-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-details.component.html',
  styleUrl: './step-details.component.css',
})
export class StepDetailsComponent {
  private readonly wizard = inject(InvoiceWizardService);

  readonly items = this.wizard.items;
  readonly itemsSubtotal = this.wizard.itemsSubtotal;

  backToItems(): void {
    this.wizard.goToStep(InvoiceStep.Items);
  }

  continueToSummary(): void {
    this.wizard.goToStep(InvoiceStep.Summary);
  }
}
