import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.interface'; 
import { Observable } from 'rxjs'
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.page.html',
  styleUrls: ['./booklist.page.scss'],
})
export class BooklistPage implements OnInit {
  public bookList: any[];
  public allBooks: any[];
  public loadedBookList: Observable<Book[]>;
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.loadedBookList = this.firestoreService.getBookList();
    this.loadedBookList.subscribe(val => {
      this.bookList = Object.values(val);
      this.allBooks = Object.values(val);
    });
    console.log(this.bookList);
    // this.initializeItems();
  }

  initializeItems(): void {
    this.bookList = this.allBooks;
    // console.log(this.bookList);
  }

  filterList(evt) {
    console.log("this are values");
    // this.loadedBookList.subscribe(val => console.log(val));
    this.initializeItems();
    console.log(this.bookList);

    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
    // console.log(this.bookList);

    this.bookList = this.bookList.filter(currentBook => {
      if (currentBook.name && searchTerm) {
        if (currentBook.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
}
