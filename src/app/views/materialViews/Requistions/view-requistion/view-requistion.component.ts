import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-view-requistion',
  templateUrl: './view-requistion.component.html',
  styleUrls: ['./view-requistion.component.css'],
})
export class ViewRequistionComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public navigateToCreate(){
    this.router.navigate(['/createRequisition'])
  }

  ngOnInit(): void {}
}
