import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-panel-edit-movie',
  templateUrl: './admin-panel-edit-movie.page.html',
  styleUrls: ['./admin-panel-edit-movie.page.scss'],
})
export class AdminPanelEditMoviePage implements OnInit {

  time
  movie = {} as any
  themes = [] as any
  tab = 'editmovie'
  show = {} as any
  showh = [] as any
  checkhalltab = 0
  halltab1 = 0
  halltab2 = 0
  halltab3 = 0
  halltab4 = 0
  halltab5 = 0
  halltab6 = 0
  halltab7 = 0

  hall2tab1 = 0
  hall2tab2 = 0
  hall2tab3 = 0
  hall2tab4 = 0
  hall2tab5 = 0
  hall2tab6 = 0
  hall2tab7 = 0

  datetime
  showcalendar = true


  constructor(private modal: ModalController, private navparam: NavParams) { }

  ngOnInit() {
    this.refresher()

  }

  refresher(){
    let temp = this.navparam.get('item')

    firebase.database().ref("movies/" + temp).on('value', a => {
      this.movie = a.val()
    })

    console.log(this.movie)

    firebase.database().ref("themes").on('value', (a) => {
      this.themes = a.val()
    })

  }

  focus(ev, num) {

    document.getElementById(num).style.border = "1px solid #696969"
  }

  blur(ev, num) {

    document.getElementById(num).style.border = "1px solid #DCDCDC"
  }

  editmovie() {
    this.movie.startmilli = new Date(this.movie.startdate).getTime()
    this.movie.endmilli = new Date(this.movie.enddate).getTime()

    if (Object.values(this.movie).length == 0 || Object.values(this.movie)[0] == '') {
      Swal.fire(
        {
          title: 'Please insert the form',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    }
    else if (!this.movie.name) {
      Swal.fire(
        {
          title: 'Enter movie name',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else if (!this.movie.description) {
      Swal.fire(
        {
          title: 'Enter movie description',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else if (!this.movie.duration) {
      Swal.fire(
        {
          title: 'Enter duration',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else if (!this.movie.price) {
      Swal.fire(
        {
          title: 'Enter price',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else if (!this.movie.theme) {
      Swal.fire(
        {
          title: 'Enter movie theme',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else if (!this.movie.startdate) {
      Swal.fire(
        {
          title: 'Enter start date',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else if (!this.movie.enddate) {
      Swal.fire(
        {
          title: 'Enter end date',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    }
    // else if(!this.movie.imageurl){
    //   Swal.fire(
    //     {
    //       title: 'Enter Image Url',
    //       timer: 2000,
    //       confirmButtonColor: 'black',
    //       heightAuto: false
    //     }
    //   )
    // }

    else if (this.movie.startmilli > this.movie.endmilli || this.movie.endmilli < this.movie.startmilli) {
      Swal.fire(
        {
          title: 'End date cannot smaller than start date',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    } else {

      firebase.database().ref("movies/" + this.movie.mid).update({
        mid: this.movie.mid,
        name: this.movie.name,
        description: this.movie.description,
        duration: this.movie.duration,
        price: this.movie.duration,
        startdate: this.movie.startdate,
        enddate: this.movie.enddate,
        theme: this.movie.theme,
        imageurl: this.movie.imageurl || ''
      })

      this.modal.dismiss("edit");
    }

  }

  checkhall() {

    this.checkhalltab = 1

    this.halltab1 = 0
    this.halltab2 = 0
    this.halltab3 = 0
    this.halltab4 = 0
    this.halltab5 = 0
    this.halltab6 = 0
    this.halltab7 = 0

    this.time = new Date(this.datetime).getTime()
    let end = this.movie.duration * 60000
    let endtime = end + this.time
    this.show.starttime = this.time
    this.show.endtime = endtime
    this.show.moviename = this.movie.name
    this.show.movieid = this.movie.mid


    this.showh = []

    firebase.database().ref("shows").on("value", a => {
      a.forEach(b => {
        this.showh.push(b.val())
        this.updatehall()
      })
    })
  }


  updatehall(){

    let temp = []
    let index = 0

    for (let i = 0; i < this.showh.length; i++) {
      if (this.time >= this.showh[i].starttime && this.time < this.showh[i].endtime) {
        temp.push(this.showh[i].hall)
        index++
      }

      if (index > 0) {
        for (let j = 0; j < temp.length; j++) {
          if (temp[j] == 'H1') {
            this.halltab1 = 1
          }
          else if (temp[j] == 'H2') {
            this.halltab2 = 1
          }
          else if (temp[j] == 'H3') {
            this.halltab3 = 1
          }
          else if (temp[j] == 'H4') {
            this.halltab4 = 1
          }
          else if (temp[j] == 'H5') {
            this.halltab5 = 1
          }
          else if (temp[j] == 'H6') {
            this.halltab6 = 1
          }
          else if (temp[j] == 'H7') {
            this.halltab7 = 1
          }
        }
      }

    }

  }

  gethall(x) {
    if (x == 'H1') {

      if(this.hall2tab1 == 0)
      {
        this.hall2tab1 = 1
        this.hall2tab2 = 0
        this.hall2tab3 = 0
        this.hall2tab4 = 0
        this.hall2tab5 = 0
        this.hall2tab6 = 0
        this.hall2tab7 = 0

        this.show.hall = x
      }
      else{
        this.hall2tab1 = 0

        this.show.hall = ''
      }
     
    }
    else if (x == 'H2') {
      if(this.hall2tab2 == 0)
      {
        this.hall2tab2 = 1
        this.hall2tab1 = 0
        this.hall2tab3 = 0
        this.hall2tab4 = 0
        this.hall2tab5 = 0
        this.hall2tab6 = 0
        this.hall2tab7 = 0
        this.show.hall = x
      }
      else{
        this.hall2tab2 = 0
        this.show.hall = ''
      }
    }
    else if (x == 'H3') {
      if(this.hall2tab3 == 0)
      {
        this.hall2tab3 = 1
        this.hall2tab2 = 0
        this.hall2tab1 = 0
        this.hall2tab4 = 0
        this.hall2tab5 = 0
        this.hall2tab6 = 0
        this.hall2tab7 = 0
        this.show.hall = x
      }
      else{
        this.hall2tab3 = 0
        this.show.hall = ''
      }
    }
    else if (x == 'H4') {
      if(this.hall2tab4 == 0)
      {
        this.hall2tab4 = 1
        this.hall2tab2 = 0
        this.hall2tab3 = 0
        this.hall2tab1 = 0
        this.hall2tab5 = 0
        this.hall2tab6 = 0
        this.hall2tab7 = 0
        this.show.hall = x
      }
      else{
        this.hall2tab4 = 0
        this.show.hall = ''
      }
    }
    else if (x == 'H5') {
      if(this.hall2tab5 == 0)
      {
        this.hall2tab5 = 1
        this.hall2tab2 = 0
        this.hall2tab3 = 0
        this.hall2tab4 = 0
        this.hall2tab1 = 0
        this.hall2tab6 = 0
        this.hall2tab7 = 0
        this.show.hall = x
      }
      else{
        this.hall2tab5 = 0
        this.show.hall = ''
      }
    }
    else if (x == 'H6') {
      if(this.hall2tab6 == 0)
      {
        this.hall2tab6 = 1
        this.hall2tab2 = 0
        this.hall2tab3 = 0
        this.hall2tab4 = 0
        this.hall2tab5 = 0
        this.hall2tab1 = 0
        this.hall2tab7 = 0
        this.show.hall = x
      }
      else{
        this.hall2tab6 = 0
        this.show.hall = ''
      }
    }
    else if (x == 'H7') {
      if(this.hall2tab7 == 0)
      {
        this.hall2tab7 = 1
        this.hall2tab2 = 0
        this.hall2tab3 = 0
        this.hall2tab4 = 0
        this.hall2tab5 = 0
        this.hall2tab6 = 0
        this.hall2tab1 = 0
        this.show.hall = x
      }
      else{
        this.hall2tab7 = 0
        this.show.hall = ''
      }
    }
  }

  createshow() {

    let time = new Date(this.datetime).getTime()
    let end = this.movie.duration * 60000
    let endtime = end + time

    this.show.starttime = time
    this.show.endtime = endtime
    this.show.moviename = this.movie.name
    this.show.movieid = this.movie.mid

    if(!this.show.starttime)
    {
      Swal.fire(
        {
          title: 'Please select start time for the showing',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    }
    else if(!this.show.hall){
      Swal.fire(
        {
          title: 'Please select a hall',
          timer: 2000,
          confirmButtonColor: 'black',
          heightAuto: false
        }
      )
    }
    else if(this.show.hall)
    {
      let key = firebase.database().ref("shows").push().key

      this.show.sid = key
      
      firebase.database().ref("shows/" + this.show.sid).update({
        sid: this.show.sid,
        starttime: this.show.starttime,
        endtime: this.show.endtime,
        hall: this.show.hall,
        // moviename: this.movie.name,
        // movieid: this.movie.mid,
        moviename: this.show.moviename,
        movieid: this.show.movieid,
      })
  
      firebase.database().ref("seats/" + this.show.sid).update({
        sid: this.show.sid,
        starttime: this.show.starttime,
        endtime: this.show.endtime,
        hall: this.show.hall,
        // moviename: this.movie.name,
        // movieid: this.movie.mid,
        moviename: this.show.moviename,
        movieid: this.show.movieid,
      })
  
      this.refreshercreateshow()
      this.checkhall()

    }
  }

  refreshercreateshow(){
    this.show.hall = ''
    this.hall2tab1 = 0
    this.hall2tab2 = 0
    this.hall2tab3 = 0
    this.hall2tab4 = 0
    this.hall2tab5 = 0
    this.hall2tab6 = 0
    this.hall2tab7 = 0
  }


  changetab(x) {
    this.tab = x
  }

  closemodal() {
    this.modal.dismiss();
  }

}
