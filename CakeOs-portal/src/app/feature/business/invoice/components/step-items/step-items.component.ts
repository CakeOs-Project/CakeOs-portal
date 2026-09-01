import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceWizardService } from '../../services/invoice-wizard.service';
import { InvoiceStep } from '../../models/invoice-wizard.model';
import { Product } from '../../../product/models/product.model';

@Component({
  selector: 'app-step-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-items.component.html',
  styleUrl: './step-items.component.css',
})
export class StepItemsComponent {
  private readonly wizard = inject(InvoiceWizardService);

  readonly items = this.wizard.items;
  readonly photos = this.wizard.photos;
  readonly decorationNotes = this.wizard.decorationNotes;
  readonly itemsSubtotal = this.wizard.itemsSubtotal;

  readonly catalogSearchQuery = signal<string>('');
  readonly isCatalogOpen = signal<boolean>(false);

  // Productos disponibles en catálogo para búsqueda y selección
  readonly catalogProducts: Product[] = [
    {
      id: 1,
      name: 'Pastel de Bodas (3 Pisos)',
      description: 'Diseño personalizado • Precio Base: $450.00',
      price: 450.00,
      isActive: true,
    },
    {
      id: 2,
      name: 'Pastel de Cumpleaños Temático (Fondant)',
      description: 'Decoración artística • Precio Base: $120.00',
      price: 120.00,
      isActive: true,
    },
    {
      id: 3,
      name: 'Delicia de Ganache de Chocolate',
      description: 'Puro chocolate belga • Precio Base: $65.00',
      price: 65.00,
      isActive: true,
    },
    {
      id: 4,
      name: 'Caja de Cupcakes Deluxe (12 uds.)',
      description: 'Sabores gourmet surtidos • Precio Base: $36.00',
      price: 36.00,
      isActive: true,
    },
    {
      id: 5,
      name: 'Torre de Macarons (30 uds.)',
      description: 'Repostería francesa artesanal • Precio Base: $75.00',
      price: 75.00,
      isActive: true,
    },
  ];

  readonly filteredCatalog = computed(() => {
    const query = this.catalogSearchQuery().trim().toLowerCase();
    if (!query) return this.catalogProducts;
    return this.catalogProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  });

  onSearchChange(value: string): void {
    this.catalogSearchQuery.set(value);
    this.isCatalogOpen.set(true);
  }

  onSelectProduct(product: Product): void {
    this.wizard.addItem({
      productId: product.id,
      name: product.name,
      description: product.description,
      unitPrice: product.price,
      quantity: 1,
    });
    this.catalogSearchQuery.set('');
    this.isCatalogOpen.set(false);
  }

  incrementQuantity(index: number): void {
    this.wizard.incrementItemQuantity(index);
  }

  decrementQuantity(index: number): void {
    this.wizard.decrementItemQuantity(index);
  }

  removeItem(index: number): void {
    this.wizard.removeItem(index);
  }

  onNotesChange(notes: string): void {
    this.wizard.setDecorationNotes(notes);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.wizard.addPhoto({
          url: reader.result as string,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(photoId: string): void {
    this.wizard.removePhoto(photoId);
  }

  backToClient(): void {
    this.wizard.goToStep(InvoiceStep.ClientInfo);
  }

  continueToDetails(): void {
    this.wizard.goToStep(InvoiceStep.Details);
  }
}
