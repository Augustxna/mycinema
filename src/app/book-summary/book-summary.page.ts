import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-book-summary',
  templateUrl: './book-summary.page.html',
  styleUrls: ['./book-summary.page.scss'],
})
export class BookSummaryPage implements OnInit {

  constructor(private navparam: NavParams ) { }

  user = [] as any
  books = [] as any
  summary = [] as any
  movies = [] as any

  ngOnInit() {

    let temp = this.navparam.get('item')
    firebase.database().ref("users/" + temp).on("value" , a=> {
      this.user = a.val()
    })

    console.log(this.user)

    firebase.database().ref("booking").on("value", a=>{
      a.forEach(b =>
        {
          this.books.push(b.val())
        })

          let temp = []

          temp = this.books.filter(x => x['userid'].toLowerCase().includes(this.user.uid.toLowerCase()))
          console.log(temp)
          this.summary = temp

          for (let i = 0; i < this.summary.length; i++) {
            
          this.summary[i].start = new Date(this.summary[i].starttime)
          this.summary[i].end = new Date(this.summary[i].endtime)



          }

          

    })
    console.log(this.books)

    // firebase.database().ref("movies").on('value', a=>{
    //   a.forEach(b =>{
    //     this.movies.push(b.val())
    //   })


    //   let temp = []
    //   temp = this.movies.filter
    // })



  }

}
