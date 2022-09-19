import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'adminpanel',
    loadChildren: () => import('./adminpanel/adminpanel.module').then( m => m.AdminpanelPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'admin-panel-create-movie',
    loadChildren: () => import('./admin-panel-create-movie/admin-panel-create-movie.module').then( m => m.AdminPanelCreateMoviePageModule)
  },
  {
    path: 'admin-panel-edit-movie',
    loadChildren: () => import('./admin-panel-edit-movie/admin-panel-edit-movie.module').then( m => m.AdminPanelEditMoviePageModule)
  },
  {
    path: 'createshow',
    loadChildren: () => import('./createshow/createshow.module').then( m => m.CreateshowPageModule)
  },
  {
    path: 'editshow',
    loadChildren: () => import('./editshow/editshow.module').then( m => m.EditshowPageModule)
  },
  {
    path: 'movie-detail',
    loadChildren: () => import('./movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'selectseat',
    loadChildren: () => import('./selectseat/selectseat.module').then( m => m.SelectseatPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'choosedate',
    loadChildren: () => import('./choosedate/choosedate.module').then( m => m.ChoosedatePageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'book-summary',
    loadChildren: () => import('./book-summary/book-summary.module').then( m => m.BookSummaryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
