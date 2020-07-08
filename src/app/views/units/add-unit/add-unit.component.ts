import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  public unitForm = new FormGroup({
    unitName: new FormControl('', Validators.required),
  });
  
    constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { }

    public onSubmit() {
      console.log(this.unitForm);
      this.createNewUnit();
      this.router.navigateByUrl('/viewUnit');
     
    }
  
  
    private createNewUnit(){
  
      var unitName = this.unitForm.controls['unitName']
      .value;
  
    const CREATE_UNIT = gql`
      mutation createUnitFunction($name: String!) {
        createUnit(unitInput: { name: $name }) {
          name
        }
      }
    `;
  
    this.apollo
      .mutate({
        mutation: CREATE_UNIT,
        variables: {
          name: unitName,
        },
      })
      .subscribe(
        (result) => {
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
