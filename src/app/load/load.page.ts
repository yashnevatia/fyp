import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NavController } from '@ionic/angular';
import { DataStorageService } from '../data-storage.service'

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  constructor(private http: HTTP, private navCtrl: NavController, private data_store : DataStorageService) { }

  ngOnInit() {
  }

  get_workout(arg) {
  	this.navCtrl.navigateForward('/workout-details');
  	var data;
  	var workout;
	fetch("assets/data/workouts.json").then(async res => {
  		data = await res.json();
  		workout = data[arg];
  		this.data_store.setWorkoutDetails(workout);  
	});

	// let url = `/workout-details?curl_sets=${this.curl_sets}&squat_sets=${this.squat_sets}&reps_per_set=${this.reps_per_set}&rest_time=${this.rest_time}&`;
 //    this.router.navigateByUrl(url);
  	 
  }

}
