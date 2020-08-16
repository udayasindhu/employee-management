import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../employee-management.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeData: any;
  constructor(
    private employeeService: EmployeeManagementService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeData = this.employeeService.getAllEmployees();
  }

  ngDoCheck() {
    this.employeeData = this.employeeService.getAllEmployees();
  }

  viewEmployee(empId: string) {
    this.router.navigate([`/employee/profile/${empId}`]);
  }

  confirmDeleteEmployee(empId: string) {
    let response = confirm('Do you want to delete employee');
    if (response == true) {
      this.deleteEmployee(empId);
    }
  }

  deleteEmployee(empId: string) {
    if (this.employeeService.deleteEmployee(+empId) == 201)
      this.toastr.success('Employee deleted successfully!');
  }

  editEmployee(employeeId) {
    let empData = JSON.parse(localStorage.getItem('employees'));
    empData.forEach((data) => {
      if (data.empId == employeeId) {
        this.router.navigate([`employee/edit/${employeeId}`]);
      }
    });
  }
}
