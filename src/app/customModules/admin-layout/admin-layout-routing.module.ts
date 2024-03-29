import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { NavBarComponent } from '../../components/navigationBar/nav-bar/nav-bar.component';
import { AddProjectComponent } from '../../components/project/add-project/add-project.component';
import { ViewItemCategoryComponent } from '../../views/itemCategories/view-item-category/view-item-category.component';
import { ViewProjectComponent } from '../../components/project/view-project/view-project.component';
import { EditProjectComponent } from '../../components/project/edit-project/edit-project.component';
import { ViewCampComponent } from '../../components/camps/view-camp/view-camp.component';
import { AddCampComponent } from '../../components/camps/add-camp/add-camp.component';
import { EditCampComponent } from '../../components/camps/edit-camp/edit-camp.component';
import { DesignationsSetComponent } from '../../views/designations/designations-set/designations-set.component';
import { EditDesignationComponent } from '../../views/designations/designations-set/edit-designation/edit-designation.component';
import { AddDesignationComponent } from '../../views/designations/designations-set/add-designation/add-designation.component';
import { AddRoleComponent } from '../../views/roles/add-role/add-role.component';
import { ViewRoleComponent } from '../../views/roles/view-role/view-role.component';
import { EditRoleComponent } from '../../views/roles/edit-role/edit-role.component';
import { AddUnitComponent } from '../../views/units/add-unit/add-unit.component';
import { EditUnitComponent } from '../../views/units/edit-unit/edit-unit.component';
import { ViewUnitComponent } from '../../views/units/view-unit/view-unit.component';
import { ViewItemComponent } from '../../views/items/view-item/view-item.component';
import { EditItemComponent } from '../../views/items/edit-item/edit-item.component';
import { AddItemComponent } from '../../views/items/add-item/add-item.component';
import { AddItemCategoryComponent } from '../../views/itemCategories/add-item-category/add-item-category.component';
import { EditItemCategoryComponent } from '../../views/itemCategories/edit-item-category/edit-item-category.component';
import { ViewUserComponent } from '../../views/users/view-user/view-user.component';
import { EditUserComponent } from '../../views/users/edit-user/edit-user.component';
import { AddUserComponent } from '../../views/users/add-user/add-user.component';
import { CavedComponent } from '../../views/caved/caved.component';
import { EditCavedComponent } from '../../views/caved/edit-caved/edit-caved.component';
import { ViewRequistionComponent } from '../../views/materialViews/Requistions/view-requistion/view-requistion.component';
import { CreateRequistionComponent } from '../../views/materialViews/Requistions/create-requistion/create-requistion.component';
import {AddDeviceComponent} from '../../views/devices/add-device/add-device.component';
import {ViewDeviceComponent} from '../../views/devices/view-device/view-device.component';
import {AddWorkTypeComponent} from '../../views/workType/add-work-type/add-work-type.component';
import {EditWorkTypeComponent} from '../../views/workType/edit-work-type/edit-work-type.component';
import {ViewWorkTypesComponent} from '../../views/workType/view-work-types/view-work-types.component';
import {AddSupplierTypeComponent} from  '../../views/supplier/supplier_type/add/add-supplier-type.component';
import {ViewSupplierTypeComponent} from '../../views/supplier/supplier_type/view/view-supplier-type.component';
import {EditSupplierTypeComponent} from '../../views/supplier/supplier_type/edit/edit-supplier-type.component';



const routes: Routes = [{ path: 'viewItemCategory', component: ViewItemCategoryComponent  },
{ path: 'addProject', component: AddProjectComponent },
  { path: 'viewProject', component: ViewProjectComponent },
  { path: 'editProject', component: EditProjectComponent },
  {path:'viewCamp', component: ViewCampComponent},
  {path:'addCamp', component: AddCampComponent},
  {path:'editCamp', component: EditCampComponent},
  {path: 'viewDesignation', component: DesignationsSetComponent},
  {path: 'addDesignation', component: AddDesignationComponent},
  {path: 'editDesignation', component: EditDesignationComponent},
  {path: 'addRole', component: AddRoleComponent},
  {path: 'viewRole', component: ViewRoleComponent},
  {path: 'editRole', component: EditRoleComponent},
  {path: 'addUnit', component: AddUnitComponent},
  {path: 'viewUnit', component: ViewUnitComponent},
  {path: 'editUnit', component: EditUnitComponent},
  {path: 'addItem', component: AddItemComponent},
  {path: 'viewItem', component: ViewItemComponent},
  {path: 'editItem', component: EditItemComponent},
  {path: 'viewUser', component: ViewUserComponent},
  {path: 'editUser', component: EditUserComponent},
  {path: 'addUser', component: AddUserComponent},
  {path:'viewCaved', component: CavedComponent},
  {path:'editCaved', component: EditCavedComponent},
  {path:'viewItemCategory', component: ViewItemCategoryComponent },
  {path: 'editItemCategory', component: EditItemCategoryComponent},
  {path: 'addItemCategory', component: AddItemCategoryComponent},
  {path: 'viewRequisition', component: ViewRequistionComponent},
  {path: 'createRequisition', component: CreateRequistionComponent},
  {path: 'addDevice', component: AddDeviceComponent},
  {path: 'viewDevices', component: ViewDeviceComponent},
  {path: 'viewWorkTypes', component: ViewWorkTypesComponent},
  {path: 'addWorkType', component: AddWorkTypeComponent},
  {path: 'editWorkType', component: EditWorkTypeComponent},
  {path: 'viewSupplierTypes', component: ViewSupplierTypeComponent},
  {path: 'editSupplierType', component: EditSupplierTypeComponent},
  {path: 'addSupplierType', component: AddSupplierTypeComponent},
  
  
  
  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
