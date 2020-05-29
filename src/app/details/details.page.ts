import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookDetail } from '../model/book.interface'; 
import { Observable } from 'rxjs'
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public bookDetail: Observable<BookDetail>;
  public bookInfo: Observable<Book>;
  public url: Observable<String>;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const bookId: string = this.route.snapshot.paramMap.get('id');
    this.bookDetail = this.firestoreService.getBookDetail(bookId).valueChanges();  
    this.bookInfo = this.firestoreService.getBookBasic(bookId).valueChanges();
    this.url = this.firestoreService.getImageURL("/" + bookId + ".jpg").getDownloadURL();
  }

}
