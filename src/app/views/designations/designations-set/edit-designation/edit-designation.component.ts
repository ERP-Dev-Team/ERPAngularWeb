import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {

   public designationForm = new FormGroup({
     designationName: new FormControl('', Validators.required)
   })
  private designationId: string; 
  private responseGetter: any;

  constructor(private apollo: Apollo,private router: Router,private route: ActivatedRoute) {
      this.getDesignationbyId();
     
   }

    /*
    to get the required designation ID  
    */
   private getDesignationbyId(){
      this.route.queryParams.subscribe(params =>{
          this.designationId = params['designationId']
      })
      this.queryDesignationBasedOnId();
   }
   
   private queryDesignationBasedOnId(){

    this.apollo.watchQuery({
       query: gql`
         query getDesignationById($designationId: ID!){
          designation(_id: $designationId){
            _id,
            name,
            }
         }
    `, variables:{
        designationId: this.designationId
    }
    }).valueChanges.subscribe( result =>{
         this.responseGetter = result.data;
         this.designationForm.patchValue({
          designationName : this.responseGetter.designation.name
         })
    })

   }

   public onSubmit(){
      console.log(this.designationForm)
   }

  ngOnInit(): void {
  }

}
