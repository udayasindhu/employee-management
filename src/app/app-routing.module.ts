import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./employee-management/employee-management.module').then(
            (m) => m.EmployeeManagementModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
