import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'factura',
    renderMode: RenderMode.Client,
  },
  {
    path: 'factura/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
