import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeManageComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    EmployeeManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule,
    CommonModule
  ],
  exports: [AvatarModule],
})
export class EmployeeManagementModule {}
