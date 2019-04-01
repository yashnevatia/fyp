import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  // Bluetooth stuff
    unpairedDevices: any;
    pairedDevices: any;
    gettingDevices: Boolean;
    model: any;
    HC05 : string = "HC-05";

  constructor(private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController) {
  	
    this.model = {};
   }

  async ngOnInit() {
  	console.log("Here");
  	await this.bluetoothSerial.enable();
  	
  	await this.bluetoothSerial.list().then((successfulPairing) => {
        this.pairedDevices = successfulPairing;
        console.log(this.pairedDevices);
      },
      (err) => {
        console.log(err);
      });
  	var address = "";
  	for (var i = this.pairedDevices.length - 1; i >= 0; i--) {
  		if(this.pairedDevices[i].name == this.HC05)
  		{
  			address = this.pairedDevices[i].address;
  			break;
  		}
  	}
  	await this.selectDevice(address);

  	// .then( (success) => {
  	// 	console.log(success);
  	// 	this.turnOn();},
  	// 	(err) => {console.log("fail");
  	// 	this.startScanning();

  	// });
  	}
  	
  	// console.log(paired);







/* Slide 1 - Find, Connect, Disconnect */
  async startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;

    this.gettingDevices = true;
     await this.bluetoothSerial.discoverUnpaired().then((success) => {
        this.unpairedDevices = success;
        this.gettingDevices = false;
        success.forEach(element => {
        	if(element.name==this.HC05)
        	{
        		this.selectDevice(element.address);
        	}
          console.log(element);
        });
      },
      (err) => {
        console.log(err);
      });
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  async selectDevice(address: any) {
    let alert = await this.alertCtrl.create({
      header: 'Connect',
      message: 'Do you want to connect with?'+address,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: async () => {
            console.log(address);
            await this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();

  }

  async disconnect() {
    let alert = await this.alertCtrl.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
   await alert.present();
  }

  /* Slide 2 - Turn LED On and OFF */
  async turnOn(){
    var ctrl = this;
    await this.bluetoothSerial.write('h').then(function (success) {
      console.log(success);
      ctrl.model.ledResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.ledResponse = failure;
    });
  }

 async turnOff(){
    var ctrl = this;
    await this.bluetoothSerial.write('0').then(function (success) {
      console.log(success);
      ctrl.model.ledResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.ledResponse = failure;
    });
  }


  /* Slide 3 - Custom text read and write. */
  readThings(){
    var ctrl = this;
    this.bluetoothSerial.read().then(function (success) {
      console.log(success);
      ctrl.model.readResponse = success;
    }, function (failure) {
      console.log(failure);
      ctrl.model.readResponse = failure;
    });
  }

  writeThings(){
    var ctrl = this;
    this.bluetoothSerial.write(this.model.writeThis).then(function (success) {
      console.log(success);
    }, function (failure) {
      console.log(failure);
    });
  }


  /* Slide 4 */
  async util(){
    await this.bluetoothSerial.isEnabled().then(function (res) {
      console.log("isEnabled() : " + res);
    });
    await this.bluetoothSerial.isConnected().then(function (res) {
      console.log("isConnected() : " + res);
    });
  }

  async showSettings(){
    await this.bluetoothSerial.showBluetoothSettings();
  }

  listThings(){
    this.bluetoothSerial.list().then(function (data) {
      console.log(data);
    })
  }

  writeThingsExample(){

    // Write a string
    this.bluetoothSerial.write('hello world').then(function (res) {
      console.log(res);
    }, function (res) {
      console.log(res);
    });

}

}
