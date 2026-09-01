import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InvoiceWizardService } from '../../services/invoice-wizard.service';
import { InvoiceStep } from '../../models/invoice-wizard.model';

@Component({
  selector: 'app-invoice-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-stepper.component.html',
  styleUrl: './invoice-stepper.component.css',
})
export class InvoiceStepperComponent {
  private readonly wizard = inject(InvoiceWizardService);
  private readonly router = inject(Router);

  readonly currentStep = this.wizard.currentStep;
  readonly Step = InvoiceStep;

  goToStep(step: InvoiceStep): void {
    this.wizard.goToStep(step);
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
