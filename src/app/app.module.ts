import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/navigationBar/nav-bar/nav-bar.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './customModules/authentication/authentication.module';
import { AuthenticationComponent } from './customModules/authentication/authentication.component';
import { AdminLayoutComponent } from './customModules/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './customModules/admin-layout/admin-layout.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ComponentLabelComponent } from './components/component-label/component-label.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';





@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AdminLayoutComponent,
    SideBarComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    AdminLayoutModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
