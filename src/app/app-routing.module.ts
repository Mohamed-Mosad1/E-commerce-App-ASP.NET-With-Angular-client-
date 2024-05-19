import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}, title: 'Home'},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}, title: 'Not Found'},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}, title: 'Server Error'},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}, title: 'Test Error'},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule), data: {breadcrumb: 'Shop'}, title: 'Shop'},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
