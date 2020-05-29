import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Book, BookDetail } from '../../model/book.interface'; 
import { Observable, BehaviorSubject } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private loadedBookList: Observable<Book[]>;
  private booksCollection: AngularFirestoreCollection<Book>;
  // Upload Task 
  private task: AngularFireUploadTask;

  // Progress in percentage
  public percentage: Observable<number>;
  
  // Snapshot of uploading file
  private snapshot: Observable<any>;
  
  // Uploaded File URL
  private UploadedFileURL: Observable<string>;
  public isUploaded: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public isUploading: BehaviorSubject<Boolean> = new BehaviorSubject(true);

  constructor(
    public firestore: AngularFirestore,
    public firestorage: AngularFireStorage,
    ){ 
    this.booksCollection = this.firestore.collection<Book>('books');
    this.loadedBookList = this.booksCollection.valueChanges();
  }

  getBookList(): Observable<Book[]> {
    return this.loadedBookList;
  }

  getBookDetail(bookId: string): AngularFirestoreDocument<BookDetail>{
    return this.firestore.collection('bookdetail').doc(bookId);
  }

  getBookBasic(bookId: string): AngularFirestoreDocument<Book>{
    return this.firestore.collection('books').doc(bookId);
  }

  getImageURL(url: string): AngularFireStorageReference{
    console.log("called")
    return this.firestorage.ref(url);
  }

  async uploadFile(event: FileList, id: string) {
    // The File object
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    // The storage path
    const path = `/${id}` + "." + file.name.split(".")[1];
 
    //File reference
    // const fileRef = this.firestorage.ref(path);
 
    // The main task
    this.task = this.firestorage.upload(path, file, {});
    this.percentage = this.task.percentageChanges();
    
    this.task.then(() => {
      this.isUploading.next(false);
      this.isUploaded.next(true);
    });
  }

  async createBook(
    id: string,
    bookName: string,
    authorName: string,
    genre: string
  ): Promise<void> { 
    return this.firestore.collection("books").doc(id).set({
      id,
      name: bookName,
      author: authorName,
      genre,
    });
  }

  async addBookDetails(
    id: string,
    no_pg: number,
    bookDescription: string
  ): Promise<void> {
    return this.firestore.collection("bookdetail").doc(id).set({
      id,
      no_pg, 
      summary: bookDescription
    });
  }
}
