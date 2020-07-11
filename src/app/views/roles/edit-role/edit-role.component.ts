import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {


    public roleId : any;
    private responseGetter : any;
    public roleForm = new FormGroup({
    roleName: new FormControl('', Validators.required),
  });

    constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {
      this.getRolebyId();

  }

  /*
    to get the required designation ID  
    */
   private getRolebyId(){
    this.route.queryParams.subscribe(params =>{
        this.roleId = params['roleId']
    })
    this.queryRoleBasedOnId();
 }


 private queryRoleBasedOnId(){
  this.apollo.query({
     query: gql`
      query getRoleById($roleId: ID!){
        role(_id: $roleId){
          _id,
          name,
          }
       }
  `, variables:{
    roleId: this.roleId
  }
  }).subscribe( result =>{
       this.responseGetter = result.data;
       this.roleForm.patchValue({
        roleName : this.responseGetter.role.name
       })
  })

 }

 

  public onSubmit() {

    console.log(this.roleForm);
    this.updateRole();
   
  }


  private updateRole(){

      var roleName = this.roleForm.controls['roleName']
    .value;

      const UPDATE_ROLE = gql`
          mutation updateRoleFunction($roleid: ID!, $name: String!) {
            updateRole(_id: $roleid ,name: $name ) {
              _id,name
              }
            }
          `;

          this.apollo
            .mutate({
               mutation: UPDATE_ROLE,
                variables: {
                      roleid: this.roleId,
                      name: roleName,
                             },
                      })
                .subscribe(
                      (result) => {
                      this.router.navigate(['/viewRole']);
                         console.log('Success');
                        },
                  (error) => {
               console.log('there was an error sending the query', error);
               }
            );
          }
  

    ngOnInit(): void {
    }

 }
