import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
// import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import * as firebase from 'firebase/app';

var config = {
    apiKey: "AIzaSyBmLZ6eEQX-A8oLdKwo_oF1RpYLQdSeJIo",
    authDomain: "firstproject-130b3.firebaseapp.com",
    databaseURL: "https://firstproject-130b3.firebaseio.com",
    projectId: "firstproject-130b3",
    storageBucket: "firstproject-130b3.appspot.com",
    messagingSenderId: "146118107158"
  };
firebase.initializeApp(config);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    // SpeechRecognition,
    // TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
