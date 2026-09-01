import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../../core/services/header.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly headerService = inject(HeaderService);
  private readonly sessionService = inject(SessionService);

  readonly title = this.headerService.title;
  readonly searchQuery = signal('');
  readonly imageError = signal(false);

  readonly userName = computed(() => {
    return this.sessionService.fullName() || 'Employee';
  });

  readonly userRole = computed(() => {
    return this.sessionService.rolName() || 'Owner';
  });

  readonly userInitials = computed(() => {
    const name = this.userName().trim();
    if (!name) return 'EM';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.headerService.setSearchQuery(value);
  }

  onImageError(): void {
    this.imageError.set(true);
  }

  onSettingsClick(): void {
    console.log('Settings clicked');
  }

  onHelpClick(): void {
    console.log('Help clicked');
  }
}
