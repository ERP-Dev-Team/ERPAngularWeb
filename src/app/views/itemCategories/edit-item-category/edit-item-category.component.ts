import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const QUERY_ITEMCATEGORY = gql`
  query getItemCategoryById($itemCategoryId: ID!) {
    itemcategory(_id: $itemCategoryId) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

const EDIT_ITEMCATEGORY = gql`
  mutation updateItemCategoryFunction(
    $itemCategoryName: String!
    $itemCategoryId: ID!
  ) {
    updateItemCategory(name: $itemCategoryName, _id: $itemCategoryId) {
      _id
      name
    }
  }
`;

@Component({
  selector: 'app-edit-item-category',
  templateUrl: './edit-item-category.component.html',
  styleUrls: ['./edit-item-category.component.css'],
})
export class EditItemCategoryComponent implements OnInit {
  private responsegetter;
  private categoryId;
  public categoryForm = new FormGroup({
    itemCategoryName: new FormControl('', Validators.required),
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['id'];
    });
  }

  public onEdit() {
    this.updateItemCategory();
  }

  private updateItemCategory() {
    this.apollo
      .mutate({
        mutation: EDIT_ITEMCATEGORY,
        variables: {
          itemCategoryName: this.categoryForm.controls['itemCategoryName']
            .value,
          itemCategoryId: this.categoryId,
        },
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewItemCategory']);
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  private getAndMapItemCategoryName() {
    this.apollo
      .query({
        query: QUERY_ITEMCATEGORY,
        variables: {
          itemCategoryId: this.categoryId,
        },
      })
      .subscribe((result) => {
        this.responsegetter = result.data;
        this.categoryForm.patchValue({
          itemCategoryName: this.responsegetter.itemcategory.name,
        });
      });
  }

  ngOnInit(): void {
    this.getAndMapItemCategoryName();
  }
}
