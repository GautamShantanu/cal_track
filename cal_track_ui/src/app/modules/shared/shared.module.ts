import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchModule} from './modules/search/search.module';
import {CategorisedSearchComponent} from './modules/search/components/categorised-search/categorised-search.component';

@NgModule({
  exports: [SearchModule],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
