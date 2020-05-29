import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooklistPageRoutingModule } from './booklist-routing.module';

import { BooklistPage } from './booklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooklistPageRoutingModule
  ],
  declarations: [BooklistPage]
})
export class BooklistPageModule {}
