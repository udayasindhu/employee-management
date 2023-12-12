import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'employee-management';
  itemList = [
    {
      itemIcon: 'fa fa-user-plus',
      itemLabel: 'Onboard',
      itemPath: 'employee/create',
    },
    {
      itemIcon: '	fa fa-bars',
      itemLabel: 'Employees',
      itemPath: 'employee/list',
    },
  ];
  constructor(private router: Router) { }

  selectedItem(event) {
    this.router.navigate([event.itemPath]);
  }
}
