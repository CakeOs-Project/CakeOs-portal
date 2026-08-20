import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type EstadoProduccion = 'Terminado' | 'En preparación' | 'Cancelado' | 'Pendiente de pago';

interface FacturaDetalleView {
  id: string;
  folio: string;
  cliente: string;
  telefono: string;
  fechaEntrega: string;
  horaEntrega: string;
  tipoEntrega: string;
  estadoProduccion: EstadoProduccion;
  productoNombre: string;
  productoDesc: string;
  cantidad: number;
  relleno: string;
  decoracion: string;
  mensajeProducto: string;
  rellenoNombre: string;
  rellenoDesc: string;
  extras: string[];
  mensajePersonalizado: string;
  notasAdicionales: string;
}

const ESTADO_PRODUCCION_COLORS: Record<EstadoProduccion, string> = {
  'Terminado':       '#16a34a',
  'En preparación':  '#d97706',
  'Cancelado':       '#dc2626',
  'Pendiente de pago': '#7c3aed',
};

const ESTADO_PRODUCCION_BG: Record<EstadoProduccion, string> = {
  'Terminado':       '#dcfce7',
  'En preparación':  '#fef3c7',
  'Cancelado':       '#fee2e2',
  'Pendiente de pago': '#ede9fe',
};

function buildDefault(id: string, cliente: string, estado: EstadoProduccion): FacturaDetalleView {
  return {
    id,
    folio: `FAC-2026${id.replace('FAC-', '').padStart(4, '0')}-${id.replace('FAC-', '')}`,
    cliente,
    telefono: '+52 55 0000 0000',
    fechaEntrega: 'Junio 2026',
    horaEntrega: '12:00 PM',
    tipoEntrega: 'Pick-up',
    estadoProduccion: estado,
    productoNombre: 'Pastel de Chocolate Premium',
    productoDesc: 'Grande • Redondo • 3 Capas',
    cantidad: 1,
    relleno: 'No lleva',
    decoracion: 'Según especificación del cliente',
    mensajeProducto: 'Feliz ocasión',
    rellenoNombre: 'Sin relleno',
    rellenoDesc: 'Bizcocho húmedo de vainilla.',
    extras: ['Topper personalizado', 'Caja decorativa'],
    mensajePersonalizado: '"Mensaje personalizado del cliente."',
    notasAdicionales: 'Sin notas adicionales.',
  };
}

const FACTURAS_DETALLE: Record<string, FacturaDetalleView> = {
  'FAC-001': {
    id: 'FAC-001', folio: 'FAC-20260608-001',
    cliente: 'María García', telefono: '+52 55 1234 5678',
    fechaEntrega: 'Junio 8, 2026', horaEntrega: '10:00 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel de Chocolate Premium', productoDesc: 'Grande • Redondo • 3 Capas',
    cantidad: 1, relleno: 'Ganache de Chocolate',
    decoracion: 'Flores en fondant blanco con detalles dorados',
    mensajeProducto: 'Feliz cumpleaños',
    rellenoNombre: 'Ganache de Chocolate', rellenoDesc: 'Chocolate belga 70% con crema y mantequilla perfectamente equilibrados.',
    extras: ['Topper acrílico "Feliz Cumpleaños"', 'Bengalas de chispas premium', 'Caja decorativa premium'],
    mensajePersonalizado: '"Feliz cumpleaños María! - Con todo el cariño de tu familia."',
    notasAdicionales: 'Que el texto del topper sea en letra cursiva dorada y brillante.',
  },
  'FAC-002': {
    id: 'FAC-002', folio: 'FAC-20260608-002',
    cliente: 'Carlos López', telefono: '+52 55 9876 5432',
    fechaEntrega: 'Junio 8, 2026', horaEntrega: '15:30 PM', tipoEntrega: 'Delivery',
    estadoProduccion: 'En preparación',
    productoNombre: 'Cupcakes de Vainilla', productoDesc: 'Docena • Decorados individualmente',
    cantidad: 12, relleno: 'Crema de vainilla',
    decoracion: 'Frosting de colores pastel (azul, rosa, amarillo)',
    mensajeProducto: 'Sin mensaje',
    rellenoNombre: 'Crema Chantilly de Vainilla', rellenoDesc: 'Crema batida con extracto de vainilla natural.',
    extras: ['Caja de transporte reforzada', 'Sticker decorativo con logo'],
    mensajePersonalizado: '"Para la reunión de oficina, gracias."',
    notasAdicionales: 'Los colores deben ser azul, rosa y amarillo. Sin mezclar sabores.',
  },
  'FAC-003': {
    id: 'FAC-003', folio: 'FAC-20260609-003',
    cliente: 'Ana Martínez', telefono: '+52 55 5555 1234',
    fechaEntrega: 'Junio 9, 2026', horaEntrega: '11:30 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel de Zanahoria con Betún', productoDesc: 'Mediano • Cuadrado • 2 Capas',
    cantidad: 1, relleno: 'Crema de queso',
    decoracion: 'Betún de queso crema con nueces y canela',
    mensajeProducto: 'Con amor para mamá',
    rellenoNombre: 'Crema de Queso', rellenoDesc: 'Queso crema suave batido con azúcar glass y vainilla.',
    extras: ['Topper "Mamá Te Quiero"', 'Decoración de zanahorias en fondant'],
    mensajePersonalizado: '"Con todo el amor para la mejor mamá del mundo."',
    notasAdicionales: 'Incluir nueces picadas en la decoración superior.',
  },
  'FAC-004': {
    id: 'FAC-004', folio: 'FAC-20260610-004',
    cliente: 'Roberto Díaz', telefono: '+52 55 3333 7890',
    fechaEntrega: 'Junio 10, 2026', horaEntrega: '12:00 PM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Cancelado',
    productoNombre: 'Pastel de Fresa', productoDesc: 'Pequeño • Redondo • 1 Capa',
    cantidad: 1, relleno: 'Crema de fresa',
    decoracion: 'Fresas naturales y crema chantilly',
    mensajeProducto: 'Feliz día',
    rellenoNombre: 'Crema de Fresa', rellenoDesc: 'Puré de fresa natural con crema batida.',
    extras: ['Caja básica'],
    mensajePersonalizado: '"Gracias por todo."',
    notasAdicionales: 'Pedido cancelado por el cliente el día 9.',
  },
  'FAC-005': {
    id: 'FAC-005', folio: 'FAC-20260611-005',
    cliente: 'Laura Sánchez', telefono: '+52 55 7777 4567',
    fechaEntrega: 'Junio 11, 2026', horaEntrega: '17:00 PM', tipoEntrega: 'Delivery',
    estadoProduccion: 'En preparación',
    productoNombre: 'Pastel de Bodas de 3 Pisos', productoDesc: 'Tres pisos • Redondo • Fondant blanco',
    cantidad: 1, relleno: 'Ganache de frutos rojos',
    decoracion: 'Flores de azúcar, perlas comestibles y lazo dorado',
    mensajeProducto: 'Feliz aniversario',
    rellenoNombre: 'Ganache de Frutos Rojos', rellenoDesc: 'Frambuesas y arándanos frescos con crema y chocolate blanco.',
    extras: ['Topper acrílico personalizado "Mr & Mrs"', 'Bengalas de chispas premium', 'Bouquet de flores naturales decorativas'],
    mensajePersonalizado: '"Que este día sea el inicio de su historia más hermosa."',
    notasAdicionales: 'El piso superior debe tener el topper. Entregar en caja especial de 3 pisos.',
  },
  'FAC-006': {
    id: 'FAC-006', folio: 'FAC-20260612-006',
    cliente: 'Pedro Romero', telefono: '+52 55 2222 8888',
    fechaEntrega: 'Junio 12, 2026', horaEntrega: '10:00 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel de Limón con Merengue', productoDesc: 'Mediano • Redondo • 2 Capas',
    cantidad: 1, relleno: 'Crema de limón',
    decoracion: 'Merengue tostado y ralladura de limón',
    mensajeProducto: 'Feliz cumpleaños Pedro',
    rellenoNombre: 'Crema de Limón', rellenoDesc: 'Lemon curd casero con mantequilla y ralladura natural.',
    extras: ['Topper "Happy Birthday"', 'Velas numéricas'],
    mensajePersonalizado: '"¡Felicidades! Que este día esté lleno de alegría."',
    notasAdicionales: 'Tostar el merengue ligeramente antes de entregar.',
  },
  'FAC-007': {
    id: 'FAC-007', folio: 'FAC-20260603-007',
    cliente: 'Sofía Torres', telefono: '+52 55 4444 3210',
    fechaEntrega: 'Junio 3, 2026', horaEntrega: '09:00 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel Red Velvet', productoDesc: 'Grande • Redondo • 3 Capas',
    cantidad: 1, relleno: 'Crema de queso',
    decoracion: 'Betún blanco con detalles rojos',
    mensajeProducto: 'Te quiero mucho',
    rellenoNombre: 'Crema de Queso', rellenoDesc: 'Queso crema suave con azúcar glass y esencia de vainilla.',
    extras: ['Decoración de terciopelo rojo', 'Caja premium'],
    mensajePersonalizado: '"Con todo el amor del mundo para ti."',
    notasAdicionales: 'El color debe ser rojo vivo, no oscuro.',
  },
  'FAC-008': {
    id: 'FAC-008', folio: 'FAC-20260605-008',
    cliente: 'Miguel Flores', telefono: '+52 55 6666 9090',
    fechaEntrega: 'Junio 5, 2026', horaEntrega: '11:00 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Cancelado',
    productoNombre: 'Muffins de Arándano', productoDesc: 'Media docena • Sin decoración especial',
    cantidad: 6, relleno: 'Sin relleno',
    decoracion: 'Streusel de avena y canela',
    mensajeProducto: 'Sin mensaje',
    rellenoNombre: 'Sin relleno', rellenoDesc: 'Bizcocho esponjoso de arándano al natural.',
    extras: ['Caja de cartón kraft'],
    mensajePersonalizado: '"Para llevar a casa."',
    notasAdicionales: 'Pedido cancelado. Sin cargo al cliente.',
  },
  'FAC-009': {
    id: 'FAC-009', folio: 'FAC-20260615-009',
    cliente: 'Elena Vargas', telefono: '+52 55 8888 6543',
    fechaEntrega: 'Junio 15, 2026', horaEntrega: '14:00 PM', tipoEntrega: 'Delivery',
    estadoProduccion: 'En preparación',
    productoNombre: 'Pastel de Tres Leches', productoDesc: 'Grande • Rectangular • Sin capas',
    cantidad: 1, relleno: 'Crema de tres leches',
    decoracion: 'Chantilly y canela espolvoreada',
    mensajeProducto: 'Feliz cumpleaños Elena',
    rellenoNombre: 'Crema de Tres Leches', rellenoDesc: 'Mezcla de leche evaporada, condensada y entera con vainilla.',
    extras: ['Topper personalizado "Elena 30"', 'Bengalas doradas', 'Decoración de fresas frescas'],
    mensajePersonalizado: '"Que tus 30 estén llenos de éxito y alegría!"',
    notasAdicionales: 'Refrigerar hasta la entrega. Llevar en hielera.',
  },
  'FAC-010': {
    id: 'FAC-010', folio: 'FAC-20260618-010',
    cliente: 'Javier Moreno', telefono: '+52 55 1111 7654',
    fechaEntrega: 'Junio 18, 2026', horaEntrega: '11:00 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel de Bodas Premium 4 Pisos', productoDesc: 'Cuatro pisos • Blanco y dorado • Fondant',
    cantidad: 1, relleno: 'Ganache de vainilla y frambuesa',
    decoracion: 'Flores de azúcar, hojas de oro comestible y perlas de azúcar',
    mensajeProducto: 'Para siempre juntos',
    rellenoNombre: 'Ganache de Vainilla y Frambuesa', rellenoDesc: 'Frambuesas frescas con chocolate blanco y vainilla de Madagascar.',
    extras: ['Topper acrílico dorado "Forever"', 'Flores naturales decorativas', 'Bouquet de baby roses'],
    mensajePersonalizado: '"El amor verdadero es eterno. ¡Felicidades!"',
    notasAdicionales: 'Montar el pastel en el venue. Contactar al organizador del evento.',
  },
  'FAC-011': {
    id: 'FAC-011', folio: 'FAC-20260620-011',
    cliente: 'Isabel Cruz', telefono: '+52 55 9999 2345',
    fechaEntrega: 'Junio 20, 2026', horaEntrega: '15:00 PM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'En preparación',
    productoNombre: 'Pay de Queso con Frutos Rojos', productoDesc: 'Mediano • Redondo • Sin horno',
    cantidad: 1, relleno: 'Mousse de queso',
    decoracion: 'Compota de frutos rojos y menta fresca',
    mensajeProducto: 'Gracias',
    rellenoNombre: 'Mousse de Queso Crema', rellenoDesc: 'Queso crema batido con crema para batir y gelatina.',
    extras: ['Caja refrigerada', 'Etiqueta personalizada'],
    mensajePersonalizado: '"Muchas gracias por todo. Te lo mereces."',
    notasAdicionales: 'Mantener refrigerado. No exponer a temperatura ambiente más de 2 horas.',
  },
  'FAC-012': {
    id: 'FAC-012', folio: 'FAC-20260622-012',
    cliente: 'Antonio Reyes', telefono: '+52 55 3456 7890',
    fechaEntrega: 'Junio 22, 2026', horaEntrega: '16:00 PM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel de Chocolate con Fresas', productoDesc: 'Grande • Redondo • 4 Capas',
    cantidad: 1, relleno: 'Ganache oscuro y fresas',
    decoracion: 'Espejo de chocolate y fresas naturales',
    mensajeProducto: 'Con amor',
    rellenoNombre: 'Ganache Oscuro con Fresas', rellenoDesc: 'Chocolate 85% con fresas naturales maceradas.',
    extras: ['Topper "Happy Anniversary"', 'Fresas cubiertas de chocolate', 'Caja negra premium'],
    mensajePersonalizado: '"Gracias por cada momento a tu lado. ¡Feliz aniversario!"',
    notasAdicionales: 'Las fresas deben ser frescas y de buen tamaño. Chequear con proveedor.',
  },
  'FAC-013': {
    id: 'FAC-013', folio: 'FAC-20260624-013',
    cliente: 'Carmen Jiménez', telefono: '+52 55 6789 0123',
    fechaEntrega: 'Junio 24, 2026', horaEntrega: '10:00 AM', tipoEntrega: 'Delivery',
    estadoProduccion: 'En preparación',
    productoNombre: 'Pastel de Vainilla con Buttercream', productoDesc: 'Grande • Cuadrado • 3 Capas',
    cantidad: 1, relleno: 'Buttercream de vainilla',
    decoracion: 'Flores de buttercream en tonos pastel',
    mensajeProducto: 'Feliz cumpleaños Carmen',
    rellenoNombre: 'Buttercream de Vainilla', rellenoDesc: 'Mantequilla sin sal batida con azúcar glass y vainilla pura.',
    extras: ['Topper acrílico "Carmen 50"', 'Decoración floral premium', 'Bengalas doradas'],
    mensajePersonalizado: '"50 años de ser una mujer increíble. ¡Te queremos!"',
    notasAdicionales: 'El diseño floral debe ser en colores rosa palo, lila y blanco.',
  },
  'FAC-014': {
    id: 'FAC-014', folio: 'FAC-20260625-014',
    cliente: 'Fernando Ruiz', telefono: '+52 55 2345 6789',
    fechaEntrega: 'Junio 25, 2026', horaEntrega: '12:00 PM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Terminado',
    productoNombre: 'Pastel de Moka', productoDesc: 'Mediano • Redondo • 2 Capas',
    cantidad: 1, relleno: 'Crema de café',
    decoracion: 'Ganache de café y granos de café chocolate',
    mensajeProducto: 'Bien merecido',
    rellenoNombre: 'Crema de Café Espresso', rellenoDesc: 'Espresso doble concentrado con crema y chocolate negro.',
    extras: ['Granos de café decorativos', 'Caja kraft premium'],
    mensajePersonalizado: '"Por todo tu esfuerzo. ¡Felicidades!"',
    notasAdicionales: 'Usar café de grano de origen para el betún.',
  },
  'FAC-015': {
    id: 'FAC-015', folio: 'FAC-20260626-015',
    cliente: 'Patricia Núñez', telefono: '+52 55 8901 2345',
    fechaEntrega: 'Junio 26, 2026', horaEntrega: '09:00 AM', tipoEntrega: 'Pick-up',
    estadoProduccion: 'Cancelado',
    productoNombre: 'Galletas Decoradas', productoDesc: '24 piezas • Decoración royal icing',
    cantidad: 24, relleno: 'Sin relleno',
    decoracion: 'Royal icing en colores temáticos',
    mensajeProducto: 'Sin mensaje',
    rellenoNombre: 'Sin relleno', rellenoDesc: 'Galleta de mantequilla clásica.',
    extras: ['Bolsas individuales', 'Etiquetas personalizadas'],
    mensajePersonalizado: '"Para los souvenirs de la fiesta."',
    notasAdicionales: 'Pedido cancelado por cambio de fecha del evento.',
  },
};

@Component({
  selector: 'app-invoice-detail',
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css',
})
export class InvoiceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  factura: FacturaDetalleView | null = null;

  estadoColor(estado: EstadoProduccion): string {
    return ESTADO_PRODUCCION_COLORS[estado] ?? '#64748b';
  }

  estadoBg(estado: EstadoProduccion): string {
    return ESTADO_PRODUCCION_BG[estado] ?? '#f1f5f9';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.factura = FACTURAS_DETALLE[id] ?? buildDefault(id, 'Cliente', 'En preparación');
  }

  goBack(): void {
    this.router.navigate(['/factura']);
  }

  marcarTerminado(): void {
    if (!this.factura) return;
    this.factura = { ...this.factura, estadoProduccion: 'Terminado' };
  }
}
