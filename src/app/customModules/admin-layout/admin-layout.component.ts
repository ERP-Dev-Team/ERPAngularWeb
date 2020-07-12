import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,  ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

}
