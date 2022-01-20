import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appProductCard]'
})
export class ProductCardDirective implements OnChanges {
  @Input() BGColor :string='';
  @Input() default : string ="0px 0px 0px rgb(0,0,0,0)";
  constructor(private element:ElementRef) { }

  ngOnChanges(): void {
    this.element.nativeElement.style = "box-shadow:"+this.default+";background-color : "+this.BGColor;
  }

  @HostListener('mouseover') onMouseOver(){
    this.element.nativeElement.style = "background-color : "+this.BGColor+";box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;";
  }

  @HostListener('mouseout') onMouseOut(){
    this.element.nativeElement.style = "background-color : "+this.BGColor+";box-shadow:"+this.default;
  }

}
