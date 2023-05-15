import { DialogService } from '@task-management/dialog'

import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-management-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(private _taskService: TaskService,private _dialogService: DialogService,private toastEvokeService: ToastEvokeService,private confirmBoxEvokeService: ConfirmBoxEvokeService) {}
Tasks=[]

  ngOnInit(){
    
    this._taskService.TaskData.subscribe({next:(task_res)=>{
      this.Tasks=task_res
      this.Sort_Arr(this.Tasks)
    },error:(err)=>{
      console.log("Error",err)
    }})
    this.Get_User_Details()
  }

  Sort_Arr(arr:any){
    arr.sort((a:any,b:any)=>{
      if(a.created_At<b.created_At) return -1
      else if(a.created_At>b.created_At) return 1
      else return 0
    })
    arr.sort((x:any, y:any)=>{
      return (x.completed === y.completed)? 0 : x? -1 : 1;
  });
  }
  User_Add_Data:any
  ADD_Task() { 
    const title = "Add Task"
    const button = "Add"
    this._dialogService.openModal(title, null, button)
    const subscription = this._dialogService.getUserDetails().subscribe((userDetails: any) => {
      console.log(userDetails, "userDetails in userlist")
      const userDetail = userDetails
      this._taskService.AddTask(userDetail).subscribe({next:(res:any) => {
        this._dialogService.closeModal()
        this.toastEvokeService.success(userDetail.name, 'Add Successfully').subscribe();
        // console.log(res)
        this.Get_User_Details()
        // alert("user added successfully")
        subscription.unsubscribe(); // unsubscribe here
      },error:(err:any) => {
        console.log("error", err)
        this._dialogService.closeModal()
        this.toastEvokeService.danger('Error','There Was an Error Occur').subscribe();
        subscription.unsubscribe(); // unsubscribe on error as well
      }})
    })
      // this.ADD()

   }
   Edit_Data:any

 


  Get_User_Details() { 
    this._taskService.GetTask().subscribe({next:(task_res:any)=>{
      if(task_res){
        this.Tasks=task_res
        console.log("User Res",this.Tasks)
        this._taskService.Task_Arr.next(this.Tasks)
      }
    },error:(task_error:any)=>{
      console.log("Error",task_error)
    }})
   }


   Edit_User(id:any) { 

    console.log(id, "edit user detials")
    this._taskService.GetTaskById(id).subscribe((user:any) => {
      const title = "Edit user"
      const button = "Update"
      console.log(user, "user") 
      this._dialogService.openModal(title, user, button);
      const subscription = this._dialogService.getUserDetails().subscribe((user: any) => {
        if (user) {

          this._taskService.EditTask(user,id).subscribe({next:(task_res:any)=>{
            if(task_res){
              console.log("task_res",task_res)
              this.Get_User_Details()
              this._dialogService.closeModal()
              this.toastEvokeService.success(user.name,'Update Data Successfully').subscribe();
              subscription.unsubscribe()
            }
          },error:(task_error:any)=>{
            console.log("Error",task_error)
            this.toastEvokeService.danger('Error','There Was an Error Occur').subscribe();
            this._dialogService.closeModal()
            subscription.unsubscribe()
          }})
        }
      })
    })
    
  }

  Delete(id:any){

    this.confirmBoxEvokeService.danger('Are you Sure ?', 'You Want to Delete Task', 'Yes', 'No')
            .subscribe((resp:any) => {
              console.log('resp', resp)
            if(resp.success){
    this._taskService.DeleteTask(id).subscribe({next:(task_res:any)=>{
      if(task_res){
        console.log("User Res",task_res)
  
          this._taskService.GetTask().subscribe({next:(task_res:any)=>{
            if(task_res){
              this._taskService.Task_Arr.next(task_res)
            }
          },error:(task_error:any)=>{
            console.log("Error",task_error)
          }})
      
      }
    },error:(task_error:any)=>{
      console.log("Error",task_error)
    }})
  }
  });
}
userId:any
ShowDetails(detailid:any){
  console.log(detailid, "show task detials")
    this._taskService.GetTaskById(detailid).subscribe((user:any) => {

      this._dialogService.taskModal(detailid,user);
      const subscription = this._dialogService.getTaskDetails().subscribe((user: any) => {
        if (user) {
          console.log("User",user)
        }
      })
    })
}


Completed(id:any) { 

  this._taskService.GetTaskById(id).subscribe((task:any) => {
    console.log(task, "task") 
    task.completed=!task.completed
    task.completed_At=new Date()
    // task.created_At=null
    console.log(task, "task") 
   


    const subscription= this._taskService.EditTask(task,id).subscribe({next:(task_res:any)=>{
          if(task_res){
            console.log("task_res",task_res)
            this.Get_User_Details()
            this._dialogService.closeModal()
            this.Tasks.sort((a:any,b:any)=>{
              if(a.created_At<b.created_At) return -1
              else if(a.created_At>b.created_At) return 1
              else return 0
            })
            // this.Tasks.sort((a:any,b:any)=>{
            //   if(a.completed_At<b.completed_At) return 1
            //   else if(a.completed_At>b.completed_At) return -1
            //   else return 0
            // })
            this.Tasks.sort((x:any, y:any)=>{
              return (x.completed === y.completed)? 0 : x? -1 : 1;
          });
            subscription.unsubscribe()
            if(!task.completed){
              this.toastEvokeService.success(task.title,'Not Completed Successfully').subscribe();

            }else{
              this.toastEvokeService.success(task.title,'Completed Successfully').subscribe();
            }

          }
        },error:(task_error:any)=>{
          console.log("Error",task_error)
          this._dialogService.closeModal()
          subscription.unsubscribe()
          this.toastEvokeService.danger('Error','There Was an Error Occur').subscribe();
        }})
  })
  
}



get_CardId(id: any, isDelete: any, isEdit: any,detailid:any,completedId:any) {
  this.userId = id
  console.log(id, "evemt Emitter")
  if (isDelete == true) {
    this.Delete(id)
  }
  if (isEdit == true) {
    this.Edit_User(id)
  }
  if(detailid){
    this.ShowDetails(detailid)
  }
  if(completedId){
    this.Completed(completedId)
  }
  }
}