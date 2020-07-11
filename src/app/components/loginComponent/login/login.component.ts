import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passWord: new FormControl('', Validators.required)
  })

  constructor(private apollo: Apollo, private route: ActivatedRoute ,  private router: Router ) {}

  onPress() :void{
   console.log(this.loginForm.controls['userName'].value)

    this.apollo
    .query({
      query: gql`
      query getUser($userName:  String!, $password: String!){
        login(userName: $userName,password: $password){
         userName,
         token,
         tokenExpiration
        }
      }
      `,
      variables: {
        userName: this.loginForm.controls['userName'].value ,
        password: this.loginForm.controls['passWord'].value
      }
    })
    .subscribe(result => {
    this.router.navigate(['/viewProject'])
    console.log("Success")
     
    },(error) => {
    console.log(JSON.stringify(error));
    });     
    
   
  }

  ngOnInit(): void {
  }

}
