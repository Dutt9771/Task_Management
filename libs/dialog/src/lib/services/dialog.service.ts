import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private taskSubject = new Subject<any>();
  private taskDetailsSubject = new Subject<any>();
  
  constructor(private modal: NgbModal) {

  }

  openModal(title: string, taskdetails: any,button:string) {
    const modalRef = this.modal.open(DialogComponent);

    if (taskdetails) {
      modalRef.componentInstance.task_form.patchValue({
        title: taskdetails.title,
        description: taskdetails.description,
        category: taskdetails.category
      });
    }
    

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.button = button
    modalRef.componentInstance.TaskDetails.subscribe((userData: any) => {
      this.taskSubject.next(userData);
    });
  }


  taskModal(id:any,taskDetails:any) {
    const modalRef = this.modal.open(TaskDetailsComponent);

    modalRef.componentInstance.title = taskDetails.title;
    modalRef.componentInstance.description = taskDetails.description
    modalRef.componentInstance.category = taskDetails.category
    modalRef.componentInstance.TaskDetails.subscribe((Data: any) => {
      this.taskDetailsSubject.next(Data);
    });
  }

  closeModal() {
    const modalRef = this.modal.dismissAll(DialogComponent);
  }
  
  closeTaskModal() {
    const modalRef = this.modal.dismissAll(TaskDetailsComponent);
  }

  getUserDetails() {
    return this.taskSubject.asObservable();
  }
  
  
  getTaskDetails() {
    return this.taskDetailsSubject.asObservable();
  }
}
