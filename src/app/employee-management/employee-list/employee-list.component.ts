import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../employee-management.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeData: Array<Employee>;
  errorMessage: string = "";
  constructor(
    private employeeService: EmployeeManagementService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeData = this.employeeService.getAllEmployees();
    if (!this.employeeData) {
      this.errorMessage = "Zero employee records found!";
    }
  }

  viewEmployee(employee) {
    this.router.navigate(['employee/profile'], { queryParams: { action: 'view' }, state: { user: employee } });
  }

  confirmDeleteEmployee(index) {
    let response = confirm('Do you want to delete employee');
    if (response == true) {
      this.deleteEmployee(index);
    }
  }

  deleteEmployee(index) {
    this.employeeService.deleteEmployee(index);
    this.toastr.success('Employee deleted successfully!');
    this.getEmployees();
  }

  editEmployee(employee) {
    this.router.navigate(['employee/create'], { queryParams: { action: 'edit' }, state: { user: employee } });
  }
}
