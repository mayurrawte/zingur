import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../data.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  id = null;
  userData = null;
  loaded = false;
  constructor(private CRoute: ActivatedRoute, private dataService: DataService) { }
  ngOnInit() {
    this.id = (this.CRoute.snapshot.params['resultid']).split('').reverse().join('');
    this.dataService.getUserDataById(this.id)
      .then((data) => {
      this.userData = data;
      this.loaded = true;
      });
  }
}
