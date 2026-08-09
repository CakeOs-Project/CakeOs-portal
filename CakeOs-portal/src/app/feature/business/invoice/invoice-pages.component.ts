import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Calendar, CalendarOptions, EventInput, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

type EstadoFactura = 'Pagada' | 'Pendiente' | 'Cancelada';

interface Factura {
  id: string;
  cliente: string;
  inicio: string;
  fin?: string;
  total: number;
  estado: EstadoFactura;
}

const ESTADO_CONFIG: Record<EstadoFactura, { bg: string; border: string; text: string; badgeBg: string; badgeText: string }> = {
  Pagada:    { bg: '#f0fdf4', border: '#16a34a', text: '#14532d', badgeBg: '#dcfce7', badgeText: '#15803d' },
  Pendiente: { bg: '#fffbeb', border: '#d97706', text: '#78350f', badgeBg: '#fef3c7', badgeText: '#b45309' },
  Cancelada: { bg: '#fef2f2', border: '#dc2626', text: '#7f1d1d', badgeBg: '#fee2e2', badgeText: '#b91c1c' },
};

const FACTURAS_MOCK: Factura[] = [
  { id: 'FAC-001', cliente: 'María García',   inicio: '2026-06-08T09:00:00', fin: '2026-06-08T10:00:00', total: 125.50, estado: 'Pagada' },
  { id: 'FAC-002', cliente: 'Carlos López',   inicio: '2026-06-08T14:00:00', fin: '2026-06-08T15:30:00', total: 87.00,  estado: 'Pendiente' },
  { id: 'FAC-003', cliente: 'Ana Martínez',   inicio: '2026-06-09T10:30:00', fin: '2026-06-09T11:30:00', total: 240.75, estado: 'Pagada' },
  { id: 'FAC-004', cliente: 'Roberto Díaz',   inicio: '2026-06-10T11:00:00', fin: '2026-06-10T12:00:00', total: 55.20,  estado: 'Cancelada' },
  { id: 'FAC-005', cliente: 'Laura Sánchez',  inicio: '2026-06-11T16:00:00', fin: '2026-06-11T17:00:00', total: 320.00, estado: 'Pendiente' },
  { id: 'FAC-006', cliente: 'Pedro Romero',   inicio: '2026-06-12T09:00:00', fin: '2026-06-12T10:00:00', total: 98.50,  estado: 'Pagada' },
  { id: 'FAC-007', cliente: 'Sofía Torres',   inicio: '2026-06-03',                                       total: 175.00, estado: 'Pagada' },
  { id: 'FAC-008', cliente: 'Miguel Flores',  inicio: '2026-06-05',                                       total: 64.00,  estado: 'Cancelada' },
  { id: 'FAC-009', cliente: 'Elena Vargas',   inicio: '2026-06-15T13:00:00', fin: '2026-06-15T14:00:00', total: 410.90, estado: 'Pendiente' },
  { id: 'FAC-010', cliente: 'Javier Moreno',  inicio: '2026-06-18T10:00:00', fin: '2026-06-18T11:00:00', total: 530.00, estado: 'Pagada' },
  { id: 'FAC-011', cliente: 'Isabel Cruz',    inicio: '2026-06-20',                                       total: 78.30,  estado: 'Pendiente' },
  { id: 'FAC-012', cliente: 'Antonio Reyes',  inicio: '2026-06-22T15:00:00', fin: '2026-06-22T16:00:00', total: 215.60, estado: 'Pagada' },
  { id: 'FAC-013', cliente: 'Carmen Jiménez', inicio: '2026-06-24T09:00:00', fin: '2026-06-24T10:00:00', total: 349.00, estado: 'Pendiente' },
  { id: 'FAC-014', cliente: 'Fernando Ruiz',  inicio: '2026-06-25T11:00:00', fin: '2026-06-25T12:00:00', total: 190.00, estado: 'Pagada' },
  { id: 'FAC-015', cliente: 'Patricia Núñez', inicio: '2026-06-26',                                       total: 43.80,  estado: 'Cancelada' },
];

function mapFacturasToEvents(facturas: Factura[]): EventInput[] {
  return facturas.map(f => {
    const cfg = ESTADO_CONFIG[f.estado];
    return {
      id: f.id,
      title: f.cliente,
      start: f.inicio,
      end: f.fin,
      backgroundColor: cfg.bg,
      borderColor: cfg.border,
      textColor: cfg.text,
      extendedProps: {
        facturaId: f.id,
        cliente: f.cliente,
        total: f.total,
        estado: f.estado,
        badgeBg: cfg.badgeBg,
        badgeText: cfg.badgeText,
      },
    };
  });
}

function renderEventContent(arg: EventContentArg): { html: string } {
  const { facturaId, cliente, total, estado, badgeBg, badgeText } = arg.event.extendedProps;
  const totalStr = `$${(total as number).toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return {
    html: `
      <div class="cko-event">
        <span class="cko-event__id">${facturaId}</span>
        <span class="cko-event__client">${cliente}</span>
        <div class="cko-event__footer">
          <span class="cko-event__total">${totalStr}</span>
          <span class="cko-event__badge" style="background:${badgeBg};color:${badgeText}">${estado}</span>
        </div>
      </div>
    `,
  };
}

@Component({
  selector: 'app-invoice-pages',
  imports: [],
  templateUrl: './invoice-pages.component.html',
  styleUrl: './invoice-pages.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class InvoicePagesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('calendarEl') calendarEl!: ElementRef<HTMLElement>;

  private calendar: Calendar | null = null;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const options: CalendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
      },
      height: '100%',
      dayMaxEvents: 3,
      events: mapFacturasToEvents(FACTURAS_MOCK),
      eventContent: (arg: EventContentArg) => renderEventContent(arg),
      eventClick: (arg: EventClickArg) => {
        const id = arg.event.extendedProps['facturaId'] as string;
        this.router.navigate(['/facturas', id]);
      },
    };

    this.calendar = new Calendar(this.calendarEl.nativeElement, options);
    this.calendar.render();
  }

  ngOnDestroy(): void {
    this.calendar?.destroy();
  }
}
