import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeManagementService {
  constructor() { }

  /**
   * This will create an employee
   * @param employee
   * @returns status of employee creation
   */
  createEmployee(employee: Employee): number {
    let employeeDetails: Array<Employee> = JSON.parse(localStorage.getItem('employees'));
    if (employeeDetails) {
      let newEmployee = employeeDetails.find(emp => emp.empId !== employee.empId);
      if (newEmployee) {
        employeeDetails.push(employee);
      } else {
        return 409;
      }
      localStorage.setItem('employees', JSON.stringify(employeeDetails));
    } else {
      localStorage.setItem('employees', JSON.stringify([employee]));
    }
    return 201;
  }

  /**
   * This will get list all employees
   * @returns list of employees
   */
  getAllEmployees(): Array<Employee> {
    const employeesData = JSON.parse(localStorage.getItem('employees'));
    return employeesData;
  }

  /**
   * This will delete an employee based on employee Id
   * @param index
   * @returns status of employee deletion
   */
  deleteEmployee(index: number): number {
    let empData: Array<Employee> = JSON.parse(localStorage.getItem('employees'));
    if (empData.length === 0) {
      localStorage.removeItem('employees');
    } else {
      empData.splice(index, 1);
      localStorage.setItem('employees', JSON.stringify(empData));
    }
    return 201;
  }

  /**
   * This will get details of an employee based on employee Id
   * @param employeeId
   * @returns details of an employee
   */
  getEmployeeDetails(employeeId: number) {
    const employeeDetailsUrl = ``;
    return;
  }

  /**
   * This will update details of an employee
   * @param employeeData
   * @returns status of updation of employee
   */
  updateEmployeeDetails(employee: Employee) {
    let employeeDetails: Array<Employee> = JSON.parse(localStorage.getItem('employees'));
    if (employeeDetails) {
      employeeDetails.forEach((emp, index) => {
        if (emp.empId === employee.empId) {
          employeeDetails[index] = employee;
        }
      });
      localStorage.setItem('employees', JSON.stringify(employeeDetails));
    }
    return 201;
  }
}
