import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-selectseat',
  templateUrl: './selectseat.page.html',
  styleUrls: ['./selectseat.page.scss'],
})
export class SelectseatPage implements OnInit {

  constructor(private route: ActivatedRoute, private nav: NavController) { }

  movies = [] as any
  temp = [] as any
  seats = [] as any
  user = [] as any

  rowA = [
    {
      seat: 'A1',
      occupied: false,
      selected : false
    }
    ,
    {
      seat: 'A2',
      occupied: false,
      selected : false
    },
    {
      seat: 'A3',
      occupied: false,
      selected : false
    },
    {
      seat: 'A4',
      occupied: false,
      selected : false
    },
    {
      seat: 'A5',
      occupied: false,
      selected : false
    }] as any

  rowB = [
    {
      seat: 'B1',
      occupied: false,
      selected : false
    }
    ,
    {
      seat: 'B2',
      occupied: false,
      selected : false
    },
    {
      seat: 'B3',
      occupied: false,
      selected : false
    },
    {
      seat: 'B4',
      occupied: false,
      selected : false
    },
    {
      seat: 'B5',
      occupied: false,
      selected : false
    }] as any

  rowC = [
    {
      seat: 'C1',
      occupied: false,
      selected : false
    }
    ,
    {
      seat: 'C2',
      occupied: false,
      selected : false
    },
    {
      seat: 'C3',
      occupied: false,
      selected : false
    },
    {
      seat: 'C4',
      occupied: false,
      selected : false
    },
    {
      seat: 'C5',
      occupied: false,
      selected : false
    }] as any

  allseat = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5']

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(a => {
      console.log(a)
      firebase.database().ref("seats/" + a.id).on('value', a => {
        this.seats = a.val()
        console.log(this.seats)

        if (this.seats.seat != undefined) {
          for (let i = 0; i < this.seats.seat.length; i++) {
            for (let j = 0; j < this.rowA.length; j++) {

              if (this.seats.seat[i] == this.rowA[j].seat) {
                this.rowA[j].occupied = true
              }
            }
          }

          for (let i = 0; i < this.seats.seat.length; i++) {
            for (let j = 0; j < this.rowB.length; j++) {

              if (this.seats.seat[i] == this.rowB[j].seat) {
                this.rowB[j].occupied = true
              }
            }
          }

          for (let i = 0; i < this.seats.seat.length; i++) {
            for (let j = 0; j < this.rowC.length; j++) {

              if (this.seats.seat[i] == this.rowC[j].seat) {
                this.rowC[j].occupied = true
              }
            }
          }
        
        }


        firebase.database().ref("movies/" + this.seats.movieid).on('value', a => {
          this.movies = a.val()
          console.log(this.movies)

          // for (let i = 0; i < this.allseat.length; i++) {
          //   console.log(i)
          //   if (this.seats.seat) {
          //     let findseat = this.allseat.findIndex(a => a == this.seats.seat[i])
          //     console.log(findseat)

          //     if (findseat != -1) {

          //       // console.log("run here")
          //       // document.getElementById(findseat + "").style.backgroundColor = "red"
          //     }



          //   }
          // }
        })
      })

      firebase.database().ref("users/" + a.uid).on('value', b => {
        this.user = b.val()
        console.log(this.user)
      })
    })
  }

  refresher() {
    this.route.queryParams.subscribe(a => {
      console.log(a)
      firebase.database().ref("seats/" + a.id).on('value', a => {
        console.log(a.val())
        this.seats = a.val()
        console.log(this.seats)


        firebase.database().ref("movies/" + this.seats.movieid).on('value', a => {
          this.movies = a.val()
          console.log(this.movies)
        })
      })


    })
  }

  seattab = []
  
  tab(x, i) {
    console.log(x)
    let findseat = this.seattab.findIndex(a => a == x)

    if (this.seats.seat) {
      if (findseat == -1 && !this.seats.seat.includes(x)) {
        this.seattab.push(x)
        this.checkselected()
      }
      else if (findseat != -1 && !this.seats.seat.includes(x)) {
        this.seattab.splice(findseat, 1)
        if (this.rowA.map(a => a.seat).includes(x)) {
          let findrow = this.rowA.findIndex(a => a.seat == x)

          if(findrow != -1)
          {
            this.rowA[findrow].selected = false
          }

        }

        if (this.rowB.map(a => a.seat).includes(x)) {
          let findrow = this.rowB.findIndex(a => a.seat == x)

          if(findrow != -1)
          {
            this.rowB[findrow].selected = false
          }

        }

        if (this.rowC.map(a => a.seat).includes(x)) {
          let findrow = this.rowC.findIndex(a => a.seat == x)

          if(findrow != -1)
          {
            this.rowC[findrow].selected = false
          }

        }
      }
      else {
        this.seattab = this.seattab
      }
    }
    else {
      if (findseat == -1) {
        this.seattab.push(x)
        this.checkselected()
      }
      else if (findseat != -1) {
        this.seattab.splice(findseat, 1)

        if (this.rowA.map(a => a.seat).includes(x)) {
          let findrow = this.rowA.findIndex(a => a.seat == x)

          if(findrow != -1)
          {
            this.rowA[findrow].selected = false
          }
        }

        if (this.rowB.map(a => a.seat).includes(x)) {
          let findrow = this.rowB.findIndex(a => a.seat == x)

          if(findrow != -1)
          {
            this.rowB[findrow].selected = false
          }
        }

        if (this.rowC.map(a => a.seat).includes(x)) {
          let findrow = this.rowC.findIndex(a => a.seat == x)

          if(findrow != -1)
          {
            this.rowC[findrow].selected = false
          }

        }
      }
      else {
        this.seattab = this.seattab
      }
    }


      // if (this.seats.seat) {
      //   if (document.getElementById(i).style.backgroundColor == 'blue' && !this.seats.seat.includes(x)) {

      //     document.getElementById(i).style.backgroundColor = "green"
      //   }
      //   else if (document.getElementById(i).style.backgroundColor == 'green' && !this.seats.seat.includes(x)) {
      //     document.getElementById(i).style.backgroundColor = "blue"
      //   }
      // }
      // else if (!this.seats.seat) {
      //   if (document.getElementById(i).style.backgroundColor == 'blue') {

      //     document.getElementById(i).style.backgroundColor = "green"
      //   }
      //   else if (document.getElementById(i).style.backgroundColor == 'green') {
      //     document.getElementById(i).style.backgroundColor = "blue"
      //   }
      // }




  }

  checkselected(){
    if (this.seats.seat)
    {
      for (let j = 0; j < this.seattab.length; j++) {
        for (let i = 0; i < this.rowA.length; i++) {
          if(this.seattab[j] == this.rowA[i].seat)
          {
            this.rowA[i].selected = true
          }

        }
      }


      for (let j = 0; j < this.seattab.length; j++) {
        for (let i = 0; i < this.rowB.length; i++) {
          if(this.seattab[j] == this.rowB[i].seat)
          {
            this.rowB[i].selected = true
          }
     
        }
        
      }

      for (let j = 0; j < this.seattab.length; j++) {
        for (let i = 0; i < this.rowC.length; i++) {
          if(this.seattab[j] == this.rowC[i].seat)
          {
            this.rowC[i].selected = true
          }
     
        }
        
      }
    }
    else if(!this.seats.seat)
    {
    for (let j = 0; j < this.seattab.length; j++) {
      for (let i = 0; i < this.rowA.length; i++) {
        if(this.seattab[j] == this.rowA[i].seat)
        {
          this.rowA[i].selected = true
        }

      }
    }


    for (let j = 0; j < this.seattab.length; j++) {
      for (let i = 0; i < this.rowB.length; i++) {
        if(this.seattab[j] == this.rowB[i].seat)
        {
          this.rowB[i].selected = true
        }
   
      }
      
    }

    for (let j = 0; j < this.seattab.length; j++) {
      for (let i = 0; i < this.rowC.length; i++) {
        if(this.seattab[j] == this.rowC[i].seat)
        {
          this.rowC[i].selected = true
        }
   
      }
      
    }
    }
  }

  checkout() {
    let temp = []
    if (this.seats.seat) {
      temp = this.seats.seat.concat(this.seattab)
    }
    else {
      temp = this.seattab
    }

    firebase.database().ref("seats/" + this.seats.sid).update({
      hall: this.seats.hall,
      movieid: this.seats.movieid,
      moviename: this.seats.moviename,
      sid: this.seats.sid,
      starttime: this.seats.starttime,
      endtime: this.seats.endtime,
      seat: temp
    })

    let key = firebase.database().ref("reserve").push().key

    firebase.database().ref("reserve/" + key).update({
      movieid: this.seats.movieid,
      moviename: this.seats.moviename,
      seatid: this.seats.sid,
      hall: this.seats.hall,
      starttime: this.seats.starttime,
      endtime: this.seats.endtime,
      userid: this.user.uid,
      name: this.user.name,
      bid: key,
      priceperticket: this.movies.price,
      seat: this.seattab
    })

    this.nav.navigateForward("checkout?id=" + key)
  }

  lengthof(x) {
    return Object.keys(x || {}).length
  }

  back() {
    this.nav.pop();
  }

}
