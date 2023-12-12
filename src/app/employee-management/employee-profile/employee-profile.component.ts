import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employee: Employee;
  email: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (history.state.user) {
      this.employee = history.state.user;
      this.email = this.employee.email.split('@')[0];
    }
  }

  editEmployee() {
    this.router.navigate(['employee/create'], { queryParams: { action: 'edit' }, state: { user: this.employee } });
  }

}
