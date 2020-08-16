import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../employee-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.css'],
})
export class EmployeeManageComponent implements OnInit {
  isEdit: boolean;
  employeeForm: FormGroup;
  submitted: boolean = false;
  id: string;

  empFormFields: any = {
    empName: [''],
    company: [''],
    email: ['', [Validators.email]],
    phone: [''],
    designation: [''],
  };

  constructor(
    private employeeService: EmployeeManagementService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url.indexOf('create') > -1) {
      this.empFormFields.empId = [''];
      this.employeeForm = this.fb.group(this.empFormFields);
    } else {
      this.empFormFields.empId = [{ value: '', disabled: true }];
      this.employeeForm = this.fb.group(this.empFormFields);

      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      const employeePatch = this.employeeService.getEmployeeDetails(this.id);
      this.employeeForm.patchValue({
        empName: employeePatch['empName'],
        company: employeePatch['company'],
        email: employeePatch['email'],
        phone: employeePatch['phone'],
        designation: employeePatch['designation'],
        empId: employeePatch['empId'],
      });
    }
  }

  saveEmployee() {
    this.submitted = true;
    let formValue = this.employeeForm.value;
    let employeeData = {
      empName: formValue.empName,
      company: formValue.company,
      email: formValue.email,
      phone: formValue.phone,
      designation: formValue.designation,
      empId: formValue.empId,
    };
    if (this.employeeForm.invalid) {
      return;
    }
    let empData = this.employeeService.getAllEmployees();
    let employee = empData.filter((data) => data.empId == formValue.empId)[0];
    if (!employee) {
      this.employeeForm.controls.empId.setErrors({ duplicate: false });
      if (this.id) {
        employeeData.empId = this.id;
        this.updateEmployee(employeeData, this.id);
      } else {
        this.createEmployee(employeeData);
      }
    } else {
      this.employeeForm.controls.empId.setErrors({ duplicate: true });
    }
  }

  updateEmployee(employeeData, id) {
    if (this.employeeService.updateEmployeeDetails(employeeData, id) == 201)
      this.toastr.success('Employee details updated successfuly');
    this.router.navigate(['employee/list']);
  }

  createEmployee(employeeData) {
    if (this.employeeService.createEmployee(employeeData) == 201)
      this.toastr.success('Employee created successfuly');
    this.router.navigate(['employee/list']);
  }

  formReset() {
    this.submitted = false;
  }

  get formValidation() {
    return this.employeeForm.controls;
  }
}
