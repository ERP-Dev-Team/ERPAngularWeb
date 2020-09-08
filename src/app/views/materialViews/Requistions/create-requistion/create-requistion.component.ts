import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AllCampsService } from '../../../../services/camp/allCamp/all-camps.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-requistion',
  templateUrl: './create-requistion.component.html',
  styleUrls: ['./create-requistion.component.css']
})
export class CreateRequistionComponent implements OnInit {
  private responseGetter : any;
  public campsList: any;
  public createRequisitionForm = new FormGroup({
    camp: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    items: new FormArray([
       new FormControl('', Validators.required)
    ]),
  });
  constructor(private router: Router, private route: ActivatedRoute, private allCampsGQL: AllCampsService) { }
 
  public addRequisition(){
    console.log("Hello")
  }
 
  private getAllCamps(){
    this.allCampsGQL.fetch({
      fetchPolicy: 'network-only',
    })
    .subscribe((result) => {
      this.responseGetter = result.data;
      console.log(result)
      this.campsList = this.responseGetter.camps;
      console.log(this.campsList)
  })
}

  ngOnInit(): void {
     this.getAllCamps()
  }

}
