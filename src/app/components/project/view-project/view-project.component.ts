import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, ActivatedRoute } from '@angular/router';
import { AllProjectsService } from '../../../services/project//allProject/all-projects.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  projectList: [];
  openProjectsCount: number;
  closedProjectsCount: number;
  pausedProjectsCount: number;
  terminatedProjectsCount: number;
  responseGetter: any;
  dashboardGetter: any;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private service: AllProjectsService
  ) {

  }

  public onProjectEdit(event: any) {
    this.router.navigate(['/editProject'], {
      queryParams: event,
      skipLocationChange: true,
    });
  }

  private setupProjectsDashboard() {
    this.service.projectDashboardDetails.subscribe((result)=>{
        this.dashboardGetter = result.data;
        this.openProjectsCount = this.dashboardGetter.projectDashboard.openProjects;
        this.pausedProjectsCount = this.dashboardGetter.projectDashboard.pausedProjects;
        this.closedProjectsCount = this.dashboardGetter.projectDashboard.closedProjects;
        this.terminatedProjectsCount = this.dashboardGetter.projectDashboard.terminatedProjects;
      });
  }

  private setupProjectsTable() {
    this.service
      .fetch({
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        this.responseGetter = result.data;
        this.projectList = this.responseGetter.projects;
      });
  }

  public navigativeToAddProject() {
    this.router.navigate(['/addProject']);
  }

  public getDateFromTimestamp(args) {
    try {
      return new Date(Number.parseInt(args)).toISOString().substring(0, 10);
    } catch (err) {
      return '';
    }
  }

  ngOnInit(): void {
    this.openProjectsCount = 0;
    this.closedProjectsCount = 0;
    this.pausedProjectsCount = 0;
    this.terminatedProjectsCount = 0;
    this.setupProjectsDashboard();
    this.setupProjectsTable();

  }
}
