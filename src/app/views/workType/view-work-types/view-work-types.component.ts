import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ViewWorkTypeService } from '../../../services/workType/view-work-type/view-work-type.service';
@Component({
  selector: 'app-view-work-types',
  templateUrl: './view-work-types.component.html',
  styleUrls: ['./view-work-types.component.css']
})
export class ViewWorkTypesComponent implements OnInit {
  workTypesList: any;
  private res: any;

  constructor(
    private router: Router,
    private viewWorkTypesGQL: ViewWorkTypeService
  ) {
    this.viewWorkTypesGQL
      .fetch({
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        this.res = result.data;
        this.workTypesList = this.res.worktypes;
      });
  }

  ngOnInit(): void {
  }

  addWorkType() {
    this.router.navigate(['/addWorkType']);
  }

  onWorkTypeEdit(workType) {
    this.router.navigate(['/editWorkType'], { queryParams: { id: workType._id }, skipLocationChange: true })
  }

}
