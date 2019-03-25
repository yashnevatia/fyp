import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase/app';
// import firebase from 'firebase';

import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email: string="";
  password: string="";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  create(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
  	(data) 	=> {

  		let newUser: firebase.User = data.user;
  		newUser.updateProfile({
  		// displayName: this.name,
  		photoURL: ""
  		}).then( (res) =>{
  		console.log("Profile Updated")


  		}).catch((err)=>{
  		console.log(err)});

  	}).catch( (err) => {
  		console.log(err)

  	});

  }

  login(){
      console.log("here", this.email, this.password );


  firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  .then( (user) => {
    console.log(user)
    this.router.navigate(['exercise'])
    // if (user.user.displayName == "TaxiDriver") {
    //   this.navCtrl.setRoot(ReceiverPage);
    // }
    // else {
    //   this.navCtrl.setRoot(FeedPage);
    // }


  }).catch( (err) => {
      console.log(err)
    })
  }

}
