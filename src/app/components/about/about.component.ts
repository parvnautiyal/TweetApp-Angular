import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  url = environment.swagger;

  constructor() {
  }

  ngOnInit(): void {
  }

}
