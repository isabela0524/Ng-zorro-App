import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AgeCategoryPipe } from './user.pipe';
import { User } from './user.model';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzPaginationModule,
    NzGridModule,
    AgeCategoryPipe
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  pageIndex = 1;
  pageSize = 8;
  users: User[] = [
    { id: 1, name: 'Ana Popescu', email: 'ana@gmail.com', age: 24, role: 'Admin' },
    { id: 2, name: 'Ion Ionescu', email: 'ion@gmail.com', age: 30, role: 'User' },
    { id: 3, name: 'Maria Georgescu', email: 'maria@gmail.com', age: 27, role: 'User' },
    { id: 4, name: 'George Enescu', email: 'george@gmail.com', age: 22, role: 'Moderator' },
    { id: 5, name: 'Andrei Vasilescu', email: 'andrei@gmail.com', age: 28, role: 'Admin' },
    { id: 6, name: 'Elena Dima', email: 'elena@gmail.com', age: 26, role: 'User' },
    { id: 7, name: 'Cristina Radu', email: 'cristina@gmail.com', age: 25, role: 'User' },
    { id: 8, name: 'Paul Stan', email: 'paul@gmail.com', age: 29, role: 'Moderator' },
    { id: 9, name: 'Roxana Neagu', email: 'roxana@gmail.com', age: 31, role: 'User' },
    { id: 10, name: 'Florin Mihai', email: 'florin@gmail.com', age: 32, role: 'Admin' },
    { id: 11, name: 'Diana Savu', email: 'diana@gmail.com', age: 30, role: 'User' },
    { id: 12, name: 'Alin Terzea', email: 'alin@gmail.com', age: 35, role: 'User' },
    { id: 13, name: 'Ianis Petre', email: 'ianis@gmail.com', age: 20, role: 'Admin' },
    { id: 14, name: 'Alex Ratescu', email: 'alex@gmail.com', age: 22, role: 'Moderator' },
    { id: 15, name: 'Cristina Dragan', email: 'cristina@gmail.com', age: 33, role: 'Admin' },
    { id: 16, name: 'Camil Petrescu ', email: 'camil@gmail.com', age: 26, role: 'Admin' }
  ];
  displayData: User[] = [];
  total = this.users.length;

  ngOnInit() {
    this.updateDisplayData();
    setTimeout(() => {
      this.form.updateValueAndValidity();
    })
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.updateDisplayData();
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.users.slice(startIndex, endIndex);
    console.log('Date afișate:', this.displayData);
  }

  isModalVisible = false;
  isEditMode = false;
  selectedUserIndex = -1;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
      role: ['', Validators.required]
    });
  }

  showModal(index?: number): void {
    this.isModalVisible = true;
    this.isEditMode = index !== undefined;

    if (this.isEditMode) {
      this.selectedUserIndex = index!;
      const user = this.users[index!];
      this.form.patchValue({
        name: user.name,
        email: user.email,
        age: user.age,
        role: user.role
      });
    } else {
      this.selectedUserIndex = -1;
      this.form.reset();
    }
  }


  handleCancel(): void {
    this.isModalVisible = false;
    this.form.reset();
  }

  handleOk(): void {
    if (this.form.invalid) return;

    const userData = this.form.value;

    if (this.isEditMode) {
      this.users[this.selectedUserIndex] = {
        ...this.users[this.selectedUserIndex],
        ...userData
      };
    } else {
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      this.users.push({ id: newId, ...userData });
      this.total = this.users.length;
    }

    this.updateDisplayData();
    this.handleCancel();
  }


  nameValidator(control: any) {
    return control.value && control.value.length >= 3
      ? null
      : { custom: true };
  }

  getNameError(): string {
    const nameControl = this.form.get('name');
    if (!nameControl) return '';
    if (nameControl.hasError('required')) return 'Required';
    if (nameControl.hasError('custom')) return 'Name too short';
    return '';
  }
}
