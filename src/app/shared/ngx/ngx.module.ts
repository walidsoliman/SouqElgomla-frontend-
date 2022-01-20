import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {AccordionModule} from "ngx-bootstrap/accordion"
import {ModalModule} from 'ngx-bootstrap/modal'

import {CarouselModule} from 'ngx-bootstrap/carousel'
import {PaginationModule} from 'ngx-bootstrap/pagination'
import {PopoverModule} from 'ngx-bootstrap/popover'
import {TooltipModule} from 'ngx-bootstrap/tooltip'


const ngxComponents = [
  CarouselModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  PopoverModule.forRoot(),
  AccordionModule.forRoot(),
  PaginationModule.forRoot(),
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxComponents
  ]
})
export class NgxModule {
}
