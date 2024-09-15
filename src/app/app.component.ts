import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormControl,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { empolyeeModule } from './emp';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  employeeForm :FormGroup =new FormGroup({}) ;
  employeeobj :empolyeeModule =new empolyeeModule();
  employeelist: empolyeeModule [] =[];

constructor( ){


  const oldData=localStorage.getItem('empData')
  if (oldData!=null) {
    const paresData  = JSON.parse(oldData);
   this.employeelist=paresData;
  }
}

createform(){
this.employeeForm = new FormGroup({
empid:new FormControl(this.employeeobj.empid,[ Validators.required]),
name:new FormControl(this.employeeobj.name),
email:new FormControl(this.employeeobj.email,[ Validators.required,Validators.email]),
contactNo:new FormControl(this.employeeobj.contactNo),
state:new FormControl(this.employeeobj.state),
city:new FormControl(this.employeeobj.city),
pincode:new FormControl(this.employeeobj.pincode,[ Validators.required,Validators.minLength(6)]),
address:new FormControl(this.employeeobj.address),



})
}







ngOnInit() {

this.createform()

}

onsave(){
  const oldData=localStorage.getItem('empData')
  if (oldData!=null) {
    const paresData  = JSON.parse(oldData);
    this.employeeForm.controls['empid'].setValue(paresData.length+1)
     this.employeelist.unshift( this.employeeForm.value)
  }else{
    this.employeelist.unshift( this.employeeForm.value)

  }

  localStorage.setItem('empData',JSON.stringify(this.employeelist))
  this.employeeobj=new empolyeeModule();
  this.createform()




}

onEdite(item:empolyeeModule){
  this.employeeobj=item;
this.createform();

}


onupdata(){

const record=this.employeelist.find(m=>m.empid===this.employeeForm.controls['empid'].value);
if(record !=undefined){
  record.address= this.employeeForm.controls['address'].value;
  record.name = this.employeeForm.controls['name'].value;
  record.contactNo = this.employeeForm.controls['contactNo'].value;
  localStorage.setItem('empData',JSON.stringify(this.employeelist))
  this.employeeobj=new empolyeeModule();

}
localStorage.setItem('empData',JSON.stringify(this.employeelist))
this.employeeobj=new empolyeeModule();
this.createform()

}




onDelete(id:number):void{

  const isDalete= confirm('Are you sure delete')
if(isDalete){
const index= this.employeelist.findIndex(m=>m.empid=== id)
  this.employeelist.splice(index,1)
  localStorage.setItem('empData',JSON.stringify(this.employeelist))
}



}





}
