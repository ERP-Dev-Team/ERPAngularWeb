import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { LoginComponent } from './components/loginComponent/login/login.component';
import {ViewProjectComponent} from './components/project/view-project/view-project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { ViewCampComponent } from './components/camps/view-camp/view-camp.component';
import { AddCampComponent } from './components/camps/add-camp/add-camp.component';
import { EditCampComponent } from './components/camps/edit-camp/edit-camp.component';
import { DesignationsSetComponent } from './views/designations/designations-set/designations-set.component';
import { AddDesignationComponent } from './views/designations/designations-set/add-designation/add-designation.component';
import { EditDesignationComponent } from './views/designations/designations-set/edit-designation/edit-designation.component';
import { AddRoleComponent } from './views/roles/add-role/add-role.component';
import { ViewRoleComponent } from './views/roles/view-role/view-role.component';
import { EditRoleComponent } from './views/roles/edit-role/edit-role.component';
import { AddUnitComponent } from './views/units/add-unit/add-unit.component';
import { EditUnitComponent } from './views/units/edit-unit/edit-unit.component';
import { ViewUnitComponent } from './views/units/view-unit/view-unit.component';
import { ViewItemComponent } from './views/items/view-item/view-item.component';
import { EditItemComponent } from './views/items/edit-item/edit-item.component';
import { AddItemComponent } from './views/items/add-item/add-item.component';
import { ViewItemCategoryComponent } from './views/itemCategories/view-item-category/view-item-category.component';
import { AddItemCategoryComponent } from './views/itemCategories/add-item-category/add-item-category.component';
import { EditItemCategoryComponent } from './views/itemCategories/edit-item-category/edit-item-category.component';
import { AuthenticationComponent } from './customModules/authentication/authentication.component';
import { AdminLayoutComponent } from './customModules/admin-layout/admin-layout.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: '', component: AuthenticationComponent, loadChildren: () => import('./customModules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '', component: AdminLayoutComponent,loadChildren: () => import('./customModules/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },  { path: 'admin', loadChildren: () => import('./customModules/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
  {
    path: '**',
    redirectTo: 'login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload',
    useHash : true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
