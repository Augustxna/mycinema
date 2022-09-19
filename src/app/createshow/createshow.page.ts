import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';

@Component({
  selector: 'app-createshow',
  templateUrl: './createshow.page.html',
  styleUrls: ['./createshow.page.scss'],
})
export class CreateshowPage implements OnInit {

  constructor(private modal : ModalController) { }

  ngOnInit() {
    firebase.database()
  }


  closemodal(){
    this.modal.dismiss()
  }

}
