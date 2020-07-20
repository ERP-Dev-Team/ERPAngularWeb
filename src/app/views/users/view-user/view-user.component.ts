import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const USERSQUERY = gql`
 query{
  users{
    _id,
    userName,
    password,
    firstName,
    lastName,
    email,
    phone1,
    phone2,
    phoneIMEI,
    address1,
    address2,
    city,
    state,
    country,
    zipcode,
    joiningPlace,
    joiningDate,
    dateOfBirth,
    qualification,
    salary,
    batta,
    salaryEffectiveDate,
    salaryOld,
    battaOld,
    loginAllowed,
    lastLogin,
    lastLoginDevice,
    refPerson,
    refPersonPhone,
    refPersonAddress,
    IMEIAllowed,
    bankAccountNumber,
    bankName,
    bankBranchCity,
    bankIIFSCCode,
    bankAccountHolderName,
    designation{
      _id,
      name
    },
    rolesAllowed{
      _id,
      name
    },
    modulesAllowed{
      _id,
      name,
    },
    campsAllowed{
      _id,
      name
    },
  }
}


`;

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  
  public userList: any;
  private responseGetter: any;
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { 
     this.getAllUsers()
  }


  public  navigatetoAddUser(){
    this.router.navigateByUrl('/addUser')
  }

  private getAllUsers(){
    this.apollo.query({
   query: USERSQUERY,
   fetchPolicy: 'network-only',
    }).subscribe((result) =>{
      this.responseGetter = result.data;
      this.userList = this.responseGetter.users
    })
  }
 

  public navigateToEditUser(user : any){
    console.log(user)
    this.router.navigate(['/editUser'], {queryParams : {userId : user._id}, skipLocationChange: true})
  }


  ngOnInit(): void {
  }

}
