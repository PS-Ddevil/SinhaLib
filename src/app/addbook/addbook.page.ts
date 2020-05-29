import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.page.html',
  styleUrls: ['./addbook.page.scss'],
})
export class AddbookPage implements OnInit {
  public createBookForm: FormGroup;
  public isUploading: Boolean = false;
  public isUploaded: Boolean = false;
  public fileName: String;
  public percentage: number;
  public uploadtext: string = '';
  public id: string;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    private router: Router,
    formBuilder: FormBuilder,
  ) { 
    this.createBookForm = formBuilder.group({
      bookName: ['', Validators.required],
      authorName: ['', Validators.required],
      bookDescription: ['', Validators.required],
      genre: ['', Validators.required],
      no_pg: ['', Validators.required], 
      uploadstatus: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.randomString(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.uploadtext = "";
  }

  uploadFile(event){
    this.isUploading = true;
    const file = event.item(0)
    this.fileName = file.name;
    this.firestoreService.uploadFile(event, this.id);
    this.firestoreService.percentage.subscribe((val) => {
      this.percentage = val;
    });
    this.firestoreService.isUploaded.subscribe((val) => {
      this.isUploaded = val;
      if(this.isUploaded){
        this.uploadtext = "uploaded"
      }
    });
    this.firestoreService.isUploading.subscribe((val) => {
      this.isUploading = val;
    });
  }

  randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  }
  
  async createBook() {
    const loading = await this.loadingCtrl.create();
    const bookName = this.createBookForm.value.bookName;
    const authorName = this.createBookForm.value.authorName;
    const bookDescription = this.createBookForm.value.bookDescription;
    const genre = this.createBookForm.value.genre;
    const no_pg = this.createBookForm.value.no_pg;

    this.firestoreService
    .createBook(this.id, bookName, authorName, genre)
    .then(
      () => {
        this.firestoreService.addBookDetails(this.id, no_pg, bookDescription).then(() => {
          loading.dismiss().then(() => {
            this.createBookForm.reset();
            this.isUploaded = false;
            this.isUploading = false;
            this.router.navigateByUrl('');
          });
        })
        
      },
      error => {
        console.error(error);
      }
    );
    
    return await loading.present();
  }
}
