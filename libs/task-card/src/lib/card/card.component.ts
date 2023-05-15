import { TaskService } from './../../../../../apps/task/src/app/services/task.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'task-management-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  
  @Input() taskObj:any;
  @Output() CardId = new EventEmitter<[any,any,any,any,any]>();
  title: any = 'Edit User Details'

  Style={
    background:"#fff",
  }
  obj={
    id:"",
    title:"Edit Task",
    btn_value:"Edit",
    modal:"Edit"
  }
  
  constructor(private _usersService: TaskService) {
    
  }
  
  EditTask(id:any) {
    const isEdit = true;
    const isDelete = false;
    this.CardId.emit([id, isDelete, isEdit,null,null]);
  }


  Completed(id:any) {
    const isEdit = false;
    const isDelete = false;
    this.CardId.emit([id, isDelete, isEdit,null,id]);
  }
  
  ShowDetails(id:any) {
    const isEdit = false;
    const isDelete = false;
    this.CardId.emit([null, isDelete, isEdit,id,null]); 
  }
    DeleteTask(id:any){
      const isEdit = false;
    const isDelete = true;
    this.CardId.emit([id, isDelete, isEdit,null,null]);
        
    }
}
