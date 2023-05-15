import { Component, Input } from '@angular/core';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'task-management-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {

  @Input() title!:string
	@Input() description!:string
	@Input() category!:string


  constructor(private _dialogservice: DialogService) {  }
  onCancel() {
	  this._dialogservice.closeTaskModal()
	}
}
