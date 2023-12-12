import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../employee-management.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.css'],
})
export class EmployeeManageComponent implements OnInit {
  constructor(
    private employeeService: EmployeeManagementService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  employeeForm: FormGroup;
  submitted: boolean = false;
  isEdit: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.loadFormData();
  }

  loadFormData() {
    let formData = history.state.user;
    if (formData) {
      this.employeeForm.patchValue(formData);
      this.isEdit = true;
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      empName: new FormControl(),
      company: new FormControl(),
      email: new FormControl('', Validators.email),
      phone: new FormControl(),
      designation: new FormControl(),
      empId: new FormControl(),
    });
  }

  createEmployee() {
    this.submitted = true;
    let statusCode = 0;
    if (!this.employeeForm.invalid) {
      const employeeData: Employee = {
        empName: this.employeeForm.value.empName,
        company: this.employeeForm.value.company,
        email: this.employeeForm.value.email,
        phone: this.employeeForm.value.phone,
        designation: this.employeeForm.value.designation,
        empId: this.employeeForm.value.empId,
      };
      statusCode = this.isEdit
        ? this.employeeService.updateEmployeeDetails(employeeData)
        : this.employeeService.createEmployee(employeeData);
      if (statusCode === 201) {
        this.toastr.success('Employee created successfully');
      } else {
        this.toastr.error('Employee onboared already');
      }
      this.router.navigate(['employee/list']);
    } else {
      return;
    }
  }

  formReset() {
    this.submitted = false;
  }

  get formValidation() {
    return this.employeeForm.controls;
  }

}
