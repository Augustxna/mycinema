import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import { AdminPanelCreateMoviePage } from '../admin-panel-create-movie/admin-panel-create-movie.page';
import { AdminPanelEditMoviePage } from '../admin-panel-edit-movie/admin-panel-edit-movie.page';
import { CalendarPage } from '../calendar/calendar.page';
import { CreateshowPage } from '../createshow/createshow.page';
import { EditshowPage } from '../editshow/editshow.page';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {

  user = {} as any
  tab = 'createmovie'
  movies = [] as any

  shows = [] as any
  booking = [] as any

  keyword 

  constructor(private modal: ModalController, private nav: NavController, private route: ActivatedRoute) { }

  p = 1

  ngOnInit() {

    this.route.queryParams.subscribe(a => {
      firebase.database().ref("users/" + a.uid).on('value', a => {
        this.user = a.val()
        console.log(this.user)
      })
    })

    this.dataer()

    firebase.database().ref("booking").on('value', a=> {
      a.forEach(b =>{
        this.booking.push(b.val())
      })

      console.log(this.booking)

      for(let i =0 ; i < this.booking.length; i++)
      {
        this.booking[i].start = new Date(this.booking[i].starttime)
        this.booking[i].end = new Date(this.booking[i].endtime)
      }
    })
  }



  dataer() {
    this.movies = []
    firebase.database().ref("movies").on("value", a => {
      a.forEach(b => {
        this.movies.push(b.val())
      })
    })
    console.log(this.movies)

    firebase.database().ref("shows").on('value' , c =>
    {
      c.forEach(d =>{
        this.shows.push(d.val())
      })
      
      for(let i = 0; i < this.shows.length; i++)
      {
        this.shows[i].start = new Date(this.shows[i].starttime)
        this.shows[i].end = new Date(this.shows[i].endtime)
      }
      

    })

    console.log(this.shows)
  }

  changetab(string) {
    this.tab = string
  }

  signout() {
    firebase.auth().signOut();
  }

  async callmodal(x) {

    if (x == 'createmovie') {
      const modal = await this.modal.create({
        cssClass: 'modal',
        component: AdminPanelCreateMoviePage
      })


      await modal.present()


      modal.onDidDismiss().then(data => {

        console.log(data["data"])

        if (data["data"] != undefined) {
          console.log(data["data"])
          if (data["data"] == "create") {
            this.dataer()
          }
        }
      })
    }
    else if(x == 'createshow')
    {
      const modal = await this.modal.create({
        cssClass: 'modal',
        component: CreateshowPage,
      });


      await modal.present();
    }

  }


  async edit(x) {
    const modal = await this.modal.create({
      cssClass: "modal",
      component: AdminPanelEditMoviePage,
      componentProps: {
        item: x
      }
    })


    await modal.present()


    modal.onDidDismiss().then(data => {



      if (data["data"] != undefined) {

        if (data["data"] == "edit") {
          this.dataer()

        }

      }

    })

  }


  async editshowing(x){

    const modal = await this.modal.create({
      cssClass: 'modal',
      component: EditshowPage,
      componentProps: {
        item: x
      }
      
    })

    await modal.present()

  }

  selecteddate
  selecteddateshow

  async calendar(){
    const modal = await this.modal.create({
      cssClass: 'modal',
      component: CalendarPage
    })

    await modal.present()


    modal.onDidDismiss().then(data => {

      this.selecteddate = data["data"]
      let temp1
      let temp2
      let temp3

      temp1 = this.selecteddate.split('T')
      temp2 = temp1[1].split('+')
      temp3 = temp1[0] + ' ' + temp2[0]


      let temp4 
      let temp5
      let temp6
      temp4 = temp1[0] + ' '+ '00:00:00'
      temp5 = new Date(temp4).getTime()
      temp6 = new Date(temp3).getTime()

      let temp7
      temp7 = temp5 + 86400000
      
      this.selecteddateshow = this.shows.filter(a => a['starttime'] > temp6 && a['starttime'] < temp7)

      console.log(this.selecteddateshow)

    })
  }

  backfromselecteddate(){
    this.selecteddate = null
  }

  filterer(x, tab)
  {
    if (tab == 'movies') {

      if(this.keyword)
      {
        console.log(x)
        let temp = []
        
        temp = x ? x.filter(a => (( (a['name'] || '') + (a['description'] || '') +  (a['theme'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())) : []
        return temp
      }
      else{
        return x
      }
  
    }

    else if(tab == 'booking')
    {      
      if(this.keyword)
      {
        console.log(x)
        return x ? x.filter(a => (( (a['name'] || '') + (a['moviename'] || '') + (a['hall'] || '') +  (a['seat'] || '') + (a['start'] || '') + (a['end'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())) : []
      }
      else{
        return x
      }

    }

    else if(tab == 'shows')
    {
      if(this.keyword)
      {
        console.log(x)
        return x ? x.filter(a => (( (a['moviename'] || '') + (a['hall'] || '') +  (a['start'] || '') + (a['end'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())) : []
      }
      else{
        return x
      }
    }

    else if(tab == 'selecteddateshow')
    {
      if(this.keyword)
      {
        console.log(x)
        return x ? x.filter(a => (( (a['moviename'] || '') + (a['hall'] || '') +  (a['start'] || '') + (a['end'] || '')).toLowerCase()).includes(this.keyword.toLowerCase())) : []
      }
      else{
        return x
      }
    }
  }

  clear(){
    this.keyword = ''
  }



}
