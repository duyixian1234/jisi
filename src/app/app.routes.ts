import {RouterModule, Routes} from '@angular/router';

import {EditorComponent} from './editor/editor.component';

export const routes: Routes = [
  {path: '', redirectTo: 'edit', pathMatch: 'full'},
  {path: 'edit', component: EditorComponent},
  {path: 'edit/:id', component: EditorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);