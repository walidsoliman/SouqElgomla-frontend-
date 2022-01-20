import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appDefaultBackground]'
})
export class DefaultBackgroundDirective {
@Input() defaultcolor:string = "gray"
  constructor() { }

}
