import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editshow',
  templateUrl: './editshow.page.html',
  styleUrls: ['./editshow.page.scss'],
})
export class EditshowPage implements OnInit {

  show = [] as any
  startdate

  constructor(private modal : ModalController, private navparam: NavParams) { }

  ngOnInit() {
    let temp = this.navparam.get('item')
    firebase.database().ref("shows/" + temp).on('value' , a => {
      this.show = a.val()

      this.show.start = new Date(this.show.starttime)
      console.log(this.show.start)
      this.show.end = new Date(this.show.endtime)

      this.formatdate()
    })

    console.log(this.show)

  }

  formatdate(){
    let temp = this.show.start
    let month = '' + (temp.getMonth() + 1)
    let day = '' + (temp.getDate())
    let year = temp.getFullYear()

    let hour = '' + (temp.getHours())
    let min = '' + (temp.getMinutes())
    let sec = '' + (temp.getSeconds())

    if(month.length < 2)
    {
      month = '0' + month
    }
    if(day.length < 2)
    {
      day = '0' + day
    }
    if(hour.length < 2)
    {
      hour = '0' + hour
    }
    if(min.length < 2)
    {
      min = '0' + min
    }
    if(sec.length < 2)
    {
      sec = '0' + sec
    }

    let temp1
    let temp2 

    temp1 = [year, month, day].join('-')
    temp2 = [hour, min, sec].join(':')

    this.startdate = [temp1, temp2].join('T')
    console.log(this.startdate)
  }

  editshow(){
    
  }

  closemodal(){
    this.modal.dismiss()
  }

}
