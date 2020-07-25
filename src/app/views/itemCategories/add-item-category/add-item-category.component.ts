import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const ADD_ITEMCATEGORYNAME = gql`
  mutation createItemCategoryFunction($itemCategoryName: String!) {
    createItemCategory(itemCategoryInput: { name: $itemCategoryName }) {
      _id
      name
    }
  }
`;

@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrls: ['./add-item-category.component.css'],
})
export class AddItemCategoryComponent implements OnInit {
  public categoryForm = new FormGroup({
    itemCategoryName: new FormControl('', Validators.required),
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public onAddItemCategory() {
    this.apollo
      .mutate({
        mutation: ADD_ITEMCATEGORYNAME,
        variables: {
          itemCategoryName: this.categoryForm.controls['itemCategoryName']
            .value,
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

  ngOnInit(): void {}
}
