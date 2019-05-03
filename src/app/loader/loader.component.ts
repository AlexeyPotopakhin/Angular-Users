import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  template: `<div class="loader-container" #loader><div class="loader"></div></div>`
})
export class LoaderComponent implements OnInit {
  @ViewChild('loader') splashScreen: ElementRef;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.init(this.splashScreen);
  }
}
