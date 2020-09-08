import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Lable , LABELS } from '../../entity/lable/lable';




@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
 

  navItemS: any[];
  

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {
  

  }


 navigateToModule(label: any){
  //  console.log(label)
   this.router.navigate([`${label.path}`], { queryParams: label})
 }

 navigateToRequistions(){
   this.router.navigate(['/viewRequisition'])
 }

  ngOnInit(): void {
     this.navItemS = LABELS;

  }

}
