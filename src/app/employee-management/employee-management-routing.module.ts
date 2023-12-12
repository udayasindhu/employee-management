import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: EmployeeListComponent,
  },
  {
    path: 'create',
    component: EmployeeManageComponent,
  },
  {
    path: 'profile',
    component: EmployeeProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeManagementRoutingModule {}
