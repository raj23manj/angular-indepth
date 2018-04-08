import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signUpForm: NgForm;
  defaultSelection = 'pet';
  answer='';
  genders=['male','female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // // 1st approach
  // onSubmit(form: NgForm){
  //   //form: ElementRef => we get the dom element refference
  //   console.log(form);
  // }

  // 2nd approach
  onSubmit(){
    console.log(this.signUpForm);
  }
}
