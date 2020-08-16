import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeManagementService {
  constructor() {}

  /**
   * This will create an employee
   * @param employeeData
   * @returns status of employee creation
   */
  createEmployee(employeeData: object): number {
    let employeeDetails = JSON.parse(localStorage.getItem('employees'));
    if (employeeDetails) {
      employeeDetails.push(employeeData);
      localStorage.setItem('employees', JSON.stringify(employeeDetails));
    } else {
      localStorage.setItem('employees', JSON.stringify([employeeData]));
    }
    return 201;
  }

  /**
   * This will get list all employees
   * @returns list of employees
   */
  getAllEmployees():any {
    const employeesData = JSON.parse(localStorage.getItem('employees'));
    return employeesData;
  }

  /**
   * This will delete an employee based on employee Id
   * @param index
   * @returns status of employee deletion
   */
  deleteEmployee(empId: number): number {
    let empData = JSON.parse(localStorage.getItem('employees'));
    empData.forEach((emp, index) => {
      if (emp.empId == empId) {
        empData.splice(index, 1);
      }
      localStorage.setItem('employees', JSON.stringify(empData));
    });
    return 201;
  }

  /**
   * This will get details of an employee based on employee Id
   * @param employeeId
   * @returns details of an employee
   */
  getEmployeeDetails(employeeId: string): object {
    let empData = JSON.parse(localStorage.getItem('employees'));
    let employeeData;
    empData.forEach((data) => {
      if (data.empId == employeeId) {
        employeeData = data;
      }
    });
    return employeeData;
  }

  /**
   * This will update details of an employee
   * @param employeeData
   * @returns status of updation of employee
   */
  updateEmployeeDetails(employeeData: object, id): number {
    let data = JSON.parse(localStorage.getItem('employees'));
    data.forEach((response, index) => {
      if (response.empId == id) {
        data[index] = employeeData;
      }
    });
    localStorage.setItem('employees', JSON.stringify(data));
    return 201;
  }
}
