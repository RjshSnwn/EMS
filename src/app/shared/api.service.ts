import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // Post Method For Add Student
  postStudent(data:any)
  {
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=> {
      console.log(res);
      return res
    }))
  }

    //Get Method For All Student
    getStudent()
    {
      return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=> {
        return res
      }))
    }

      // Put Method For Update Student
  putStudent(data:any, id:number)
  {
    return this.http.put<any>("http://localhost:3000/posts/" + id,data).pipe(map((res:any)=> {
      return res
    }))
  }

  // Delete Method For Update Student
  deleteStudent(id:number)
  {
    return this.http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res:any)=> {
      return res
    }))
  }

}
