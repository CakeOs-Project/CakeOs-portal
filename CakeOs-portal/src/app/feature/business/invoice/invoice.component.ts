import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceStepperComponent } from './components/invoice-stepper/invoice-stepper.component';
import { StepClientComponent } from './components/step-client/step-client.component';
import { StepItemsComponent } from './components/step-items/step-items.component';
import { StepDetailsComponent } from './components/step-details/step-details.component';
import { StepSummaryComponent } from './components/step-summary/step-summary.component';
import { InvoiceWizardService } from './services/invoice-wizard.service';
import { InvoiceStep } from './models/invoice-wizard.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceStepperComponent,
    StepClientComponent,
    StepItemsComponent,
    StepDetailsComponent,
    StepSummaryComponent,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent {
  private readonly wizard = inject(InvoiceWizardService);

  readonly currentStep = this.wizard.currentStep;
  readonly Step = InvoiceStep;
}
