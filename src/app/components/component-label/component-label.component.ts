import { Component, OnInit, Input } from '@angular/core';
import { Lable } from '../../entity/lable/lable';
import {  Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-component-label',
  templateUrl: './component-label.component.html',
  styleUrls: ['./component-label.component.css']
})


export class ComponentLabelComponent implements OnInit {

  @Input() lable : Lable;

  constructor(private route: ActivatedRoute ,  private router: Router) { 
  }
  private _buttonName: String;
  public get buttonName(): String {
    return this._buttonName;
  }
  public set buttonName(value: String) {
    this._buttonName = value;
  }

   
  public navigativeToAdd(){
    console.log("Clicked")
   this.router.navigate([`${this.lable.addPath}`])
  }

  ngOnInit(): void {
    this.buttonName = this.lable.name.substring(0,this.lable.name.length - 1)
  }

}
