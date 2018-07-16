import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-type-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.css']
})
export class MultipleComponent implements OnInit {
    activeButton = null;
    @Input() title:string;
    @Input() choices;
  
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
