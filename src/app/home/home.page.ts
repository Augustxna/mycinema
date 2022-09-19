import { Component, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import { BookSummaryPage } from '../book-summary/book-summary.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movies = [] as any
  filtermovie = [] as any
  user = {} as any
  themes = ['All'] as any
  selected = [] as any
  keyword = ""

  constructor(private route: ActivatedRoute, private nav: NavController, private modal : ModalController) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(a => {
      firebase.database().ref("users/" + a.uid).on('value', a => {
        this.user = a.val()
        console.log(this.user)
      })
    })

    firebase.database().ref("movies").on('value', (a) => {
      a.forEach((b) => {
        this.movies.push(b.val())
      })

      console.log(this.movies)
    })

    firebase.database().ref("themes").on("value", a => {
      a.forEach((b) => {
        this.themes.push(b.val())
      }
      )

      console.log(this.themes)
    })

    this.selected = ['All']
    this.filtered(this.selected)
  }

  select(x, i) {

    console.log(document.getElementById(i).style.color)
    if (document.getElementById(i).style.backgroundColor == 'rgb(254, 231, 21)') {
      document.getElementById(i).style.color = "rgb(255, 255, 255)"
      document.getElementById(i).style.backgroundColor = "rgb(0, 0, 0)"
    }
    else {
      document.getElementById(i).style.backgroundColor = "rgb(254, 231, 21)"
      document.getElementById(i).style.color = "rgb(0, 0, 0)"
    }
    console.log(x)

    if (x == 'All') {
      this.selected = ['All']

      document.getElementById(i+"").style.backgroundColor = "rgb(254, 231, 21)"
      document.getElementById(i+"").style.color = "rgb(0, 0, 0)"
      for (let i = 0; i < this.themes.length; i++) {
        if (i > 0) {
          document.getElementById(i+"").style.backgroundColor = "rgb(0, 0, 0)"
          document.getElementById(i+"").style.color = "rgb(255, 255, 255)"
        }
 
      }
    }
    else {
      let findindex = this.selected.findIndex(s => s == x)
      let findAll = this.selected.findIndex(a => a == 'All')
      if (findAll != -1) {
        this.selected.splice(findAll, 1)
        document.getElementById(0+"").style.backgroundColor = "rgb(0, 0, 0)"
        document.getElementById(0+"").style.color = "rgb(255, 255, 255)"
      }
      if (findindex == -1) {
        this.selected.push(x)
      }
      else {
        this.selected.splice(findindex, 1)
        if(this.selected.length == 0)
        {
          this.selected = ['All']
          document.getElementById(0+"").style.backgroundColor = "rgb(254, 231, 21)"
          document.getElementById(0+"").style.color = "rgb(0, 0, 0)"
        }
      }
    }

    console.log(this.selected)

    this.filtered(this.selected)
  }


  filtered(x) {

    let temp = []
    this.filtermovie = []

    if (x[0] == 'All') {
      temp = this.movies
      this.filtermovie = temp
    }
    else {

      for (let k = 0; k < x.length; k++) {
        for (let i = 0; i < this.movies.length; i++) {
          for (let j = 0; j < this.movies[i].theme.length; j++) {

            if (x[k] == this.movies[i].theme[j]) {

              let findsame = this.filtermovie.findIndex(a => a.name == this.movies[i].name)

              if (findsame == -1) {
                this.filtermovie.push(this.movies[i])
              }
            }
          }
        }
      }
    }
  }


  filtersearch(x){
    let temp = []
    temp = x ? x.filter(a => a['name'].toLowerCase().includes(this.keyword.toLowerCase())) : []
    console.log(temp);
    return temp
  }

  clear(){
    this.keyword = ""
  }

  detail(x){
    console.log(x)
    this.nav.navigateForward('movie-detail?id=' + x +'&uid=' + this.user.uid)
  }

  signout() {
    firebase.auth().signOut();
  }

  async booksummary(){
    const modal = await this.modal.create({
      cssClass: 'modal3',
      component: BookSummaryPage,
      componentProps: {
        item : this.user.uid
      }

    })


    await modal.present()
  }

}
