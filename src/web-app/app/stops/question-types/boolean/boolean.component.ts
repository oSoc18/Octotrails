import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.css']
})
export class BooleanComponent implements OnInit {
  activeButton = null;
  @Input() title:string;

  constructor() { }

  ngOnInit() {
  }

  buttonClicked(event){
    if(this.activeButton !== event.currentTarget) {
      if(this.activeButton !== null){
        this.activeButton.classList.remove("active");
      }
      this.activeButton = event.currentTarget;
      event.currentTarget.classList.add("active");
    }else {
      this.activeButton.classList.remove("active");
      this.activeButton = null
    }
  }

}
