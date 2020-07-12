import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  public itemId : any;
  private responseGetter : any;
  private unitId : String;
  private itemCategoryId : String;
  public unitsList: any;
  public itemCategoryList: any;
  public itemForm = new FormGroup({
  name: new FormControl('', Validators.required),
  hsnNumber: new FormControl('', Validators.required) ,
  description: new FormControl('', Validators.required) ,
  partNumber: new FormControl('', Validators.required),
  itemCategory: new FormControl('', Validators.required),
  itemCode: new FormControl('', Validators.required),
  unit: new FormControl('', Validators.required)
});

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {
    this.getAvailableUnits();
    this.getAvailableItemCategories();

}

private getAvailableUnits(){
  this.apollo.query({
    query: gql `{
       units{
         _id,
         name
       }
     }`,
 }).subscribe( result =>{
     this.responseGetter = result.data;
     this.unitsList = this.responseGetter.units;
 })
}
private getAvailableItemCategories(){
  this.apollo.query({
    query: gql `{
      itemcategories{
        _id,name
      }
     }`,
 }).subscribe( result =>{
     this.responseGetter = result.data;
     this.itemCategoryList = this.responseGetter.itemcategories;
 })
}

/*
  to get the required Item ID  
  */
 private getItembyId(){
  this.route.queryParams.subscribe(params =>{
      this.itemId = params['itemId']
  })
  this.queryItemBasedOnId();
}


private queryItemBasedOnId(){
this.apollo.query({
   query: gql`
   query getItemById($itemId: ID!){
    item(_id: $itemId ){
      _id
      name
      description
      partNumber
      unit {
        _id
        name
      }
      hsnNumber
      itemCode
      itemCategory {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`, 
variables:{
  itemId: this.itemId
}
}).subscribe( result =>{
     this.responseGetter = result.data;
     console.log(this.responseGetter)
     console.log("ID's" + this.responseGetter.item.itemCategory._id + this.responseGetter.item.unit._id)   
     this.itemCategoryId = this.responseGetter.item.itemCategory._id;
     this.unitId =  this.responseGetter.item.unit._id;
     this.itemForm.patchValue({
      name : this.responseGetter.item.name,
      itemCategory : this.responseGetter.item.itemCategory._id,
      itemCode : this.responseGetter.item.itemCode,
      unit: this.responseGetter.item.unit._id,
      partNumber: this.responseGetter.item.partNumber,
      hsnNumber: this.responseGetter.item.hsnNumber,
      description: this.responseGetter.item.description,


     })
})

}



public onSubmit() {

  console.log(this.itemForm);
  this.updateItem();
  this.router.navigate(['/viewItem']);
 
}


private updateItem(){
    

    const UPDATE_UNIT = gql`    
    mutation updateItemFunction($itemName: String!, $itemCode: String!, $hsnNumber: String, $partNumber: String, $description: String, $unitId: ID!, $itemCategoryId: ID!, $itemId: ID!) {
      updateItem(_id: $itemId, name: $itemName, unit: $unitId, itemCategory: $itemCategoryId, itemCode: $itemCode, partNumber: $partNumber, hsnNumber: $hsnNumber, description: $description) {
        _id
        name
        description
        partNumber
        unit {
          _id
          name
        }
        hsnNumber
        itemCode
        itemCategory {
          _id
          name
        }
        createdAt
        updatedAt
      }
    }  
        `;

        this.apollo
          .mutate({
             mutation: UPDATE_UNIT,
              variables: {

                itemName: this.itemForm.controls['name'].value,
                itemCode: this.itemForm.controls['itemCode'].value ,
                unitId: this.itemForm.controls['unit'].value,
                itemCategoryId: this.itemForm.controls['itemCategory'].value,
                description: this.itemForm.controls['description'].value,
                partNumber: this.itemForm.controls['partNumber'].value,
                hsnNumber: this.itemForm.controls['hsnNumber'].value,
                itemId: this.itemId,
                           },
                    })
              .subscribe(
                    (result) => {
                       console.log('Success');
                      },
                (error) => {
            console.log(JSON.stringify(error));
             }
          );
        }
 

  ngOnInit(): void {
    this.getItembyId();

  }

}
