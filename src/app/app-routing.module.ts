import { NgModule } from '@angular/core';
import { RouterModule, PreloadingStrategy, Route, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    data: {
      preload: true
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule),
    data: {
      preload: false
    },
  },
  {
    path: 'booklist',
    loadChildren: () => import('./booklist/booklist.module').then( m => m.BooklistPageModule),
    data: {
      preload: false
    },
  },
  {
    path: 'addbook',
    loadChildren: () => import('./addbook/addbook.module').then( m => m.AddbookPageModule),
    data: {
      preload: false
    },
  }
];

export class SimpleLoadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    }
    return of(null);
  }
}

@NgModule({
  providers: [SimpleLoadingStrategy],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SimpleLoadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
