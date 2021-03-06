import {ElementRef, Injectable} from '@angular/core';
import {animate, AnimationBuilder, style} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private el: ElementRef;
  private stopped: boolean;

  constructor(private animationBuilder: AnimationBuilder) {}

  /**
   * Initializes loader
   */
  init(element: ElementRef) {
    this.el = element;
  }

  /**
   * Hides loader
   */
  hide() {
    if (this.stopped)
      return;

    const player = this.animationBuilder.build([
      style({opacity: '1'}),
      animate(400, style({opacity: '0'}))
    ]).create(this.el.nativeElement);

    player.onDone(() => {
      if (typeof this.el.nativeElement.remove === 'function')
        this.el.nativeElement.remove();
      else
        this.el.nativeElement.style.display = 'none';
      this.stopped = true;
    });

    setTimeout(() => player.play(), 300);
  }
}
