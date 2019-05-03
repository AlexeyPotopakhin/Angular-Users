import {Component, OnInit} from '@angular/core';
import {LoaderService} from './loader.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.pug',
  styleUrls: ['./loader.component.styl'],
  animations: [
    trigger('loader', [
      transition(':leave', [
        animate(400, style({opacity: '0'}))
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {

  }
}
