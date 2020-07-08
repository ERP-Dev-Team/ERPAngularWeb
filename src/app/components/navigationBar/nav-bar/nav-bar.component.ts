import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public focus; 
  editProject= true;
  constructor(private apollo: Apollo, private route: ActivatedRoute ,  private router: Router ) { 

  }



  ngOnInit(): void {
  }

}
