import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { MyfilterPipe } from '../shared/pipes/myfilter.pipe';

@NgModule({
  declarations: [UsersComponent, UserEditComponent, UserListComponent, MyfilterPipe],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, FormsModule],
})
export class UsersModule {}
