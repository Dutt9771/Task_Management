import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'task-management-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

	completed:any
  @Input() modal: NgbActiveModal | null = null;
	@Output() TaskDetails = new EventEmitter<any>()
	@Input() title!:string
	@Input() button!:string
  
	userForm!: FormGroup;
  
	constructor(private _dialogservice: DialogService) {
	  this.Task_Form();
	}
	task_form:any
		Task_Form() {
		  this.task_form = new FormGroup({
			title: new FormControl('', [Validators.required]),
			description: new FormControl('', [
			  Validators.required
			]),
			category: new FormControl('', [
			  Validators.required
			]),
		  });
		}
		get get_user() {
		  return this.task_form.controls;
		}
	
	
	onCancel() {
	  this._dialogservice.closeModal()
	}
	onSubmit() {
		this.task_form.markAllAsTouched()
		if(this.task_form.valid){
			this.completed={
				"completed":false,
				"created_At":new Date(),
				"completed_At":"",
			}
			// Do something with form data
			const userData = this.task_form.getRawValue()
			const Task = Object.assign(userData,this.completed)
			console.log(userData,"from form")
			this.TaskDetails.emit(Task)
		}
	  
	}
	
}
