import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {

  public unitId : any;
  private responseGetter : any;
  public unitForm = new FormGroup({
  unitName: new FormControl('', Validators.required),
});

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {
    this.getUnitbyId();

}

/*
  to get the required designation ID  
  */
 private getUnitbyId(){
  this.route.queryParams.subscribe(params =>{
      this.unitId = params['unitId']
  })
  this.queryUnitBasedOnId();
}


private queryUnitBasedOnId(){
this.apollo.watchQuery({
   query: gql`
     query getUnitById($unitId: ID!){
      unit(_id: $unitId){
        _id,
        name,
        }
     }
`, variables:{
  unitId: this.unitId
}
}).valueChanges.subscribe( result =>{
     this.responseGetter = result.data;
     this.unitForm.patchValue({
      unitName : this.responseGetter.unit.name
     })
})

}



public onSubmit() {

  console.log(this.unitForm);
  this.updateUnit();
  this.router.navigate(['/viewUnit']);
 
}


private updateUnit(){

    var unitName = this.unitForm.controls['unitName']
  .value;

    const UPDATE_UNIT = gql`
        mutation updateUnitFunction($unitid: ID!, $unitname: String!) {
          updateUnit(_id: $unitid ,name: $unitname ) {
            _id,name
            }
          }
        `;

        this.apollo
          .mutate({
             mutation: UPDATE_UNIT,
              variables: {
                    unitid: this.unitId,
                    unitname: unitName,
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
