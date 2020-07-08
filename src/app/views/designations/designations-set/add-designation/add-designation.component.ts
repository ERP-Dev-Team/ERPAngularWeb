import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css'],
})
export class AddDesignationComponent implements OnInit {
  public designationForm = new FormGroup({
    designationName: new FormControl('', Validators.required),
  });
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public onSubmit() {
    console.log(this.designationForm);

    var designationName = this.designationForm.controls['designationName']
      .value;

    var CREATE_DESIGNATION = gql`
      mutation createDesignationFunction($name: String!) {
        createDesignation(designationInput: { name: $name }) {
          name
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: CREATE_DESIGNATION,
        variables: {
          name: designationName,
        },
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewDesignation']);
          console.log('Success');
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
  ngOnInit(): void {}
}
