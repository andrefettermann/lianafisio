import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'pacientes',
    pathMatch: 'full'
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/pacientes/lista/pacientes.module').then( m => m.PacientesPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./pages/pacientes/formulario/formulario.module').then( m => m.FormularioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
