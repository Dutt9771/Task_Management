import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgbModalModule],
  declarations: [DialogComponent, TaskDetailsComponent],
  exports: [DialogComponent, TaskDetailsComponent],
})
export class DialogModule {}
