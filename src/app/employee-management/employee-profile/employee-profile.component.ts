import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeManagementService } from '../employee-management.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  employeeData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeManagementService
  ) {}

  ngOnInit(): void {
    let employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeData = this.employeeService.getEmployeeDetails(employeeId);
  }
}
