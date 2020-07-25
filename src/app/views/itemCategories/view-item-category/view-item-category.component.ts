import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ITEMCATEGORIES_QUERY = gql`
  query {
    itemcategories {
      _id
      name
    }
  }
`;

@Component({
  selector: 'app-view-item-category',
  templateUrl: './view-item-category.component.html',
  styleUrls: ['./view-item-category.component.css'],
})
export class ViewItemCategoryComponent implements OnInit {
   public itemCategoryList: any;
   private responseGetter: any;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { this.getAvailableItemCategories()}

  private getAvailableItemCategories(){

    this.apollo.query({
   query: ITEMCATEGORIES_QUERY
    }).subscribe( (result) => {
        this.responseGetter = result.data;
        this.itemCategoryList = this.responseGetter.itemcategories
    },   (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  public onItemCategoryEdit(itemCategory:any){
    this.router.navigate(['/editItemCategory'], {queryParams: {id: itemCategory._id}, skipLocationChange: true})
  }

  public navigativeToAddItemCategory(){
    this.router.navigate(['/addItemCategory'])
  }


  ngOnInit(): void {
    this.getAvailableItemCategories()
  }
}
