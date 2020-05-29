import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'BookList',
      url: '/booklist',
      icon: 'book-outline'
    },
    {
      title: 'Add',
      url: '/addbook',
      icon: 'add-outline'
    }
  ]
  private unsubscribeBackEvent: any;
  public alertShown:boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  }
  async presentConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Exit',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            navigator['app'].exitApp()
          }
        }
      ]
    });
    await alert.present();
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
        // alert("back pressed home" + this.constructor.name);
        this.presentConfirm();
    });
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeBackButtonCustomHandler();
    });
  }
}
