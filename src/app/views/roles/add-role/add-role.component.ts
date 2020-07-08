import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  public roleForm = new FormGroup({
    roleName: new FormControl('', Validators.required),
  });
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public onSubmit() {
    console.log(this.roleForm);
    this.createNewRole();
   
  }


  private createNewRole(){

    var roleName = this.roleForm.controls['roleName']
    .value;

  const CREATE_ROLE = gql`
    mutation createRoleFunction($name: String!) {
      createRole(roleInput: { name: $name }) {
        name
      }
    }
  `;

  this.apollo
    .mutate({
      mutation: CREATE_ROLE,
      variables: {
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
