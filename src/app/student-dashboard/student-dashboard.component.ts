import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, FormControl} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue!: FormGroup;

  studentobj: StudentModel = new StudentModel;

  allstudent: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      phone:[''],
      city:[''],
      position:['']
    })
    this.AllStudent();
  }

  AddEmployee(){

    this.studentobj.name = this.formValue.value.name;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.phone = this.formValue.value.phone;
    this.studentobj.position = this.formValue.value.position;

    console.log(this.studentobj);

    this.api.postStudent(this.studentobj).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        alert("Error")
        console.log(e)},
      complete: () => {
        console.log('complete')
        alert("Data Saved")
        this.AllStudent();
        this.formValue.reset();
    } })

  }

  AllStudent(){
    this.api.getStudent().subscribe(res => {
      this.allstudent = res;
    })
  }

  EditEmployee(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['position'].setValue(data.position)
    this.studentobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateEmployee(){
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.phone = this.formValue.value.phone;
    this.studentobj.position = this.formValue.value.position;
    this.api.putStudent(this.studentobj,this.studentobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllStudent();
      this.SaveShowBtn();
    })


  }


  DeleteEmployee(data:any){
    this.api.deleteStudent(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllStudent();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
