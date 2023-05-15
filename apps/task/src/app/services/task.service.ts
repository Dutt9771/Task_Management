import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  Task_Arr=new BehaviorSubject([]);
  TaskData=this.Task_Arr.asObservable();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) {}
  baseurl = environment.baseurl;
  AddTask(data: any){
    try {
      return this.http.post<any>(this.baseurl, data);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  EditTask(data: any,id:any){
    try {
      return this.http.put<any>(this.baseurl+'/'+id, data);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  GetTask(){
    try {
      return this.http.get(this.baseurl);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  GetTaskById(id: any) {
    try {
      return this.http.get(this.baseurl +'/'+ id)
    } catch (error: any) {
      return throwError(() => new Error(error))
    }
  }

  DeleteTask(id:any){
    try {
      return this.http.delete(this.baseurl+'/'+id);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
}
