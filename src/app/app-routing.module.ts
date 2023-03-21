import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ItemHeaderComponent } from './pages/home/models/item-header/item-header.component';
import { ItemBoxComponent } from './pages/home/models/item-box/item-box.component';
import { FinalModelComponent } from './pages/home/models/final-model/final-model.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageComponent } from './pages/page/page.component';
const routes: Routes = [
  {
    path: '', component: PageComponent
  },
  {
  path: 'home',
  component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'search/:fourniture',
  component: HomeComponent
},
{
  path:'item/:id',
  component: HomeComponent
},
{
  path:'homepage',
  component: PageComponent
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
