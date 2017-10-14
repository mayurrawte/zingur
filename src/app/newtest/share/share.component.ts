import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  shareurl = null;
  name = null;
  resulturl = null;
  reverseId = null;
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.shareurl = this.dataService.shareUrl;
    this.name = this.dataService.requestUser['name'];
    this.resulturl = this.dataService.resultUrl;
    if (localStorage.getItem('reverseId')) {
      this.reverseId = localStorage.getItem('reverseId');
    }
  }
}
