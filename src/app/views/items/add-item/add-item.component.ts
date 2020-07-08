import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  private responseGetter : any;
  public unitsList: any;
  public itemCategoryList: any;
  private unitId : String;
  private itemCategoryId : String;
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
     this.getAvailableUnits()
     this.getAvailableItemCategories()
   }

  private getAvailableUnits(){
    this.apollo.watchQuery({
      query: gql `{
         units{
           _id,
           name
         }
       }`,
   }).valueChanges.subscribe( result =>{
       this.responseGetter = result.data;
       this.unitsList = this.responseGetter.units;
   })
  }

  private getAvailableItemCategories(){
    this.apollo.watchQuery({
      query: gql `{
        itemcategories{
          _id,name
        }
       }`,
   }).valueChanges.subscribe( result =>{
       this.responseGetter = result.data;
       this.itemCategoryList = this.responseGetter.itemcategories;
   })
  }
  

  public onSubmit() {
    console.log(this.itemForm);
    this.createNewItem();
    this.router.navigateByUrl('/viewItem');
   
  }

  private createNewItem(){
    
    const CREATE_UNIT = gql`    
    mutation createItemFunction($itemname: String!, $itemCode: String!, $hsnNumber: String, $itempartNumber: String, $itemdescription: String, $itemunit: ID!, $itemCategory: ID!) {
      createItem(itemInput: {name: $itemname, unit: $itemunit, itemCategory: $itemCategory, itemCode: $itemCode, partNumber: $itempartNumber, hsnNumber: $hsnNumber, description: $itemdescription}) {
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
             mutation: CREATE_UNIT,
              variables: {
                    itemname:  this.itemForm.controls['name'].value,
                    itemdescription: this.itemForm.controls['description'].value,
                    itempartNumber: this.itemForm.controls['partNumber'].value ,
                    itemunit: this.unitId,
                    hsnNumber: this.itemForm.controls['hsnNumber'].value ,
                    itemCode: this.itemForm.controls['itemCode'].value ,
                    itemCategory: this.itemCategoryId,

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

   public onChangeCategory(itemCategory: any){
    this.itemCategoryId = itemCategory._id
  }  
  
  public onChangeUnit(unit: any){
    this.unitId = unit._id
  }

   ngOnInit(): void {
  }

}
