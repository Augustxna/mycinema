import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {


  reserve = [] as any
  seat = [] as any
  movie = [] as any
  user = [] as any

  constructor(private route: ActivatedRoute, private nav: NavController) { }

  ngOnInit() {

    this.route.queryParams.subscribe(a => {
      console.log(a)
      firebase.database().ref("reserve/" + a.id).on('value', a => {
        this.reserve = a.val()
        console.log(this.reserve)

        firebase.database().ref("movies/" + this.reserve.movieid).on('value', b => {
          this.movie = b.val()
          console.log(this.movie)
        })

        firebase.database().ref("seats/" + this.reserve.seatid).on('value', c => {
          this.seat = c.val()
          console.log(this.seat)

          this.movie.total = this.reserve.seat.length * this.movie.price
          this.seat.start = new Date(this.seat.starttime)
          console.log(this.seat.start)
          this.seat.end = new Date(this.seat.endtime)
          console.log(this.seat.end)
        })

        firebase.database().ref("users/" + this.reserve.userid).on('value', d => {
          this.user = d.val()
          console.log(this.user)
        })
      })

    })
  }

  lengthof(x) {
    return Object.keys(x || {}).length
  }



  async pay() {

    let temp = []
    if (this.seat.seat) {
      temp = this.seat.seat.concat(this.reserve.seat)
    }
    else {
      temp = this.reserve.seat
    }

    firebase.database().ref("seats/" + this.seat.sid).update({
      hall: this.seat.hall,
      movieid: this.seat.movieid,
      moviename: this.seat.moviename,
      sid: this.seat.sid,
      starttime: this.seat.starttime,
      endtime: this.seat.endtime,
      seat: temp
    }).then(a => {
      let key = firebase.database().ref("booking").push().key

      firebase.database().ref("booking/" + key).update({
        movieid: this.reserve.movieid,
        moviename: this.reserve.moviename,
        seatid: this.reserve.seatid,
        hall: this.reserve.hall,
        starttime: this.reserve.starttime,
        endtime: this.reserve.endtime,
        userid: this.reserve.userid,
        name: this.reserve.name,
        bid: key,
        priceperticket: this.reserve.priceperticket,
        seat: this.reserve.seat,
        reserveid: this.reserve.bid
      }).then(b => {
        // firebase.database().ref("reserve/" + this.reserve.bid).remove()
        this.nav.navigateRoot('home?uid=' + this.user.uid )
      }
      )
    })

  }

}
