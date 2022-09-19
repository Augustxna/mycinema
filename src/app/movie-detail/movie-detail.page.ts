import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2'
import { ChoosedatePage } from '../choosedate/choosedate.page';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  constructor(private route: ActivatedRoute, private nav : NavController, private modal : ModalController) { }

  movies = [] as any
  temp = [] as any
  seats = [] as any
  user = [] as any
  date1
  date1milli
  date2
  date2milli
  date3
  date3milli
  date4
  date4milli
  date5
  date5milli
  date6
  date6milli

  datenow
  datenowmilli

  datetoseat

  date1show = [] as any
  date2show = [] as any
  date3show = [] as any
  date4show = [] as any
  date5show = [] as any

  selecteddate
  selecteddateshow

  rowA = ['A1' , 'A2', 'A3', 'A4', 'A5'] as any
  rowB = ['B1', 'B2', 'B3', 'B4', 'B5'] as any
  rowC = ['C1', 'C2' , 'C3', 'C4', 'C5'] as any

  ngOnInit() {

    this.route.queryParams.subscribe(a => {
      console.log(a)
      firebase.database().ref("movies/" + a.id).on('value', a=> {
        console.log(a.val())
        this.movies = a.val()
        console.log(this.movies)
      })

      firebase.database().ref("users/" + a.uid).on('value', b=>
      {
        this.user = b.val()
        console.log(this.user)
      })
    })

    // firebase.database().ref("seats").orderByChild("movieid").equalTo(this.movies.id).on('value', a=>{
    //   console.log(a.val())
    // })

    firebase.database().ref("seats").on('value', a=>{
      a.forEach(b => {
        this.temp.push(b.val())

        let temp2 = []
        temp2 = this.temp.filter(a => a['movieid'].toLowerCase().includes(this.movies.mid.toLowerCase()))
        this.seats = temp2
        // console.log(this.seats)
      })


    this.datenow = new Date()
    this.datenowmilli = new Date(this.datenow).getTime()
    this.date1 = this.datenow.getFullYear() + "-" + (this.datenow.getMonth()+1) + "-" + this.datenow.getDate()
    this.date1milli = new Date(this.date1).getTime()
    this.date2milli = this.date1milli + 86400000 * 1 
    this.date2 = new Date(this.date2milli)
    this.date3milli = this.date1milli + 86400000 * 2 
    this.date3 = new Date(this.date3milli)
    this.date4milli = this.date1milli + 86400000 * 3 
    this.date4 = new Date(this.date4milli)
    this.date5milli = this.date1milli + 86400000 * 4
    this.date5 = new Date(this.date5milli)
    this.date6milli = this.date1milli + 86400000 * 5
    this.date6 = new Date(this.date6milli)

   
 
    // for(let i = 0; i < this.seats.length; i ++)
    // {
    //   console.log(new Date(this.seats[i].starttime))
    // }
    

    this.date1show = this.seats.filter(a => a['starttime'] > this.datenowmilli && a['starttime'] < this.date2milli)
    this.date2show = this.seats.filter(a => a['starttime'] > this.date2milli && a['starttime'] < this.date3milli)
    this.date3show = this.seats.filter(a => a['starttime'] > this.date3milli && a['starttime'] < this.date4milli)
    this.date4show = this.seats.filter(a => a['starttime'] > this.date4milli && a['starttime'] < this.date5milli)
    this.date5show = this.seats.filter(a => a['starttime'] > this.date5milli && a['starttime'] < this.date6milli)

    // console.log(this.date1show)
    // console.log(this.date2show)
    // console.log(this.date3show)
    // console.log(this.date4show)
    // console.log(this.date5show)
})


  }

  gotoseat(x){
    this.datetoseat = x
    this.nav.navigateForward('selectseat?id=' + this.datetoseat.sid + '&uid=' + this.user.uid)
    console.log(x)
  }

  // seattab = []
  // tab(x , i)
  // {
  //   let findseat = this.seattab.findIndex(a => a == x)

  //   if(findseat == -1)
  //   {
  //     this.seattab.push(x)
  //   }
  //   else
  //   {
  //     this.seattab.splice(findseat, 1)
    
  //   }
    
  //   console.log(this.seattab)

  //   if (document.getElementById(i).style.backgroundColor == 'blue') {

  //     document.getElementById(i).style.backgroundColor = "red"
  //   }
  //   else {
  //     document.getElementById(i).style.backgroundColor = "blue"

  //   }
  // }

  // checkout(){
  //   firebase.database().ref("seats/" + this.datetoseat.sid).update({
  //     hall : this.datetoseat.hall,
  //     movieid : this.datetoseat.movieid,
  //     moviename: this.datetoseat.moviename,
  //     sid: this.datetoseat.sid,
  //     starttime: this.datetoseat.starttime,
  //     endtime: this.datetoseat.endtime,
  //     seat: this.seattab
  //   })
  // }


  async choosedate(){
    const modal = await this.modal.create({
      cssClass: 'modal2',
      component: ChoosedatePage,
    })

    await modal.present()


    modal.onDidDismiss().then(data => {

      this.selecteddate = data["data"]
      console.log(this.selecteddate)
      let temp1
      let temp2
      let temp3
      let temp4 
      let temp5
      let temp6
      let temp7

      if(this.selecteddate)
      {
        temp1 = this.selecteddate.split('T')

        temp2 = temp1[1].split('+')

        temp3 = temp1[0] + ' ' + temp2[0]

        temp4 = temp1[0] + ' '+ '00:00:00'

        temp5 = new Date(temp4).getTime()

        temp6 = new Date(temp3).getTime()
  
        temp7 = temp5 + 86400000

        this.selecteddateshow = this.seats.filter(a => a['starttime'] > temp6 && a['starttime'] < temp7)
      }
    })
  }

  backfromselecteddate(){
    this.selecteddate = null
    console.log(this.selecteddate)
  }

  back(){
    this.nav.pop();
  }

}
