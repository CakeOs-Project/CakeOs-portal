import { Injectable, computed, signal } from '@angular/core';
import { InvoiceStep, WizardClientInfo, WizardItem, WizardPhoto } from '../models/invoice-wizard.model';

@Injectable({ providedIn: 'root' })
export class InvoiceWizardService {
  readonly currentStep = signal<InvoiceStep>(InvoiceStep.Items);

  readonly clientInfo = signal<WizardClientInfo>({
    fullName: 'Jane Doe',
    phone: '(555) 123-4567',
    email: 'jane.doe@example.com',
    fulfillmentMethod: 'pickup',
    fulfillmentDateTime: '2026-09-15T14:00',
  });

  readonly items = signal<WizardItem[]>([
    {
      id: 'item-1',
      productId: 1,
      name: '3-Tier Wedding Cake',
      description: 'Custom Design • Base Price: $450.00',
      unitPrice: 450.00,
      quantity: 1,
    },
  ]);

  readonly decorationNotes = signal<string>('');

  readonly photos = signal<WizardPhoto[]>([
    {
      id: 'photo-1',
      url: 'assets/images/login-illustration.svg',
      name: 'Reference Cake 1',
    },
  ]);

  readonly itemsSubtotal = computed(() => {
    return this.items().reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  });

  readonly totalItemsCount = computed(() => {
    return this.items().reduce((total, item) => total + item.quantity, 0);
  });

  goToStep(step: InvoiceStep): void {
    if (step >= InvoiceStep.ClientInfo && step <= InvoiceStep.Summary) {
      this.currentStep.set(step);
    }
  }

  nextStep(): void {
    if (this.currentStep() < InvoiceStep.Summary) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > InvoiceStep.ClientInfo) {
      this.currentStep.update((s) => s - 1);
    }
  }

  // Client Info mutations
  updateClientInfo(partial: Partial<WizardClientInfo>): void {
    this.clientInfo.update((current) => ({ ...current, ...partial }));
  }

  // Item mutations
  addItem(item: Omit<WizardItem, 'id'>): void {
    const existingIndex = this.items().findIndex((i) => i.productId === item.productId);
    if (existingIndex !== -1) {
      this.incrementItemQuantity(existingIndex);
    } else {
      const newItem: WizardItem = {
        ...item,
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      };
      this.items.update((list) => [...list, newItem]);
    }
  }

  removeItem(index: number): void {
    this.items.update((list) => list.filter((_, i) => i !== index));
  }

  incrementItemQuantity(index: number): void {
    this.items.update((list) =>
      list.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  decrementItemQuantity(index: number): void {
    this.items.update((list) =>
      list
        .map((item, i) =>
          i === index ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Photo mutations
  addPhoto(photo: Omit<WizardPhoto, 'id'>): void {
    const newPhoto: WizardPhoto = {
      ...photo,
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    this.photos.update((list) => [...list, newPhoto]);
  }

  removePhoto(photoId: string): void {
    this.photos.update((list) => list.filter((p) => p.id !== photoId));
  }

  setDecorationNotes(notes: string): void {
    this.decorationNotes.set(notes);
  }

  reset(): void {
    this.currentStep.set(InvoiceStep.ClientInfo);
    this.items.set([]);
    this.decorationNotes.set('');
    this.photos.set([]);
  }
}
