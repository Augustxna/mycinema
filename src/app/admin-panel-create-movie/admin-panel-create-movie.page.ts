import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import firebase from 'firebase';
import 'firebase/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as EXIF from 'exif-js';

@Component({
  selector: 'app-admin-panel-create-movie',
  templateUrl: './admin-panel-create-movie.page.html',
  styleUrls: ['./admin-panel-create-movie.page.scss'],
})
export class AdminPanelCreateMoviePage implements OnInit {

  constructor(private modal: ModalController, private http: HttpClient) { }

  movie = {} as any

  themes = [] as any

  ngOnInit() {
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


  createmovie() {
    this.movie.startmilli = new Date(this.movie.startdate).getTime()
    this.movie.endmilli = new Date(this.movie.enddate).getTime()
    console.log(this.movie)
    console.log(Object.keys(this.movie))
    console.log(Object.values(this.movie))
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

      let key = firebase.database().ref("movies").push().key
      console.log(key)
      this.movie.mid = key
      firebase.database().ref("movies/" + key).update({
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

      this.modal.dismiss("create");
    }

  }

  closemodal() {
    this.modal.dismiss();
  }




  // imgur(event) {

  //   let imgurheaders = new HttpHeaders({
  //     'Authorization': 'Client-ID 2dc0beb00bb3279'
  //   });

  //   return new Promise((resolve, reject) => {
  //     if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
  //       var canvas = <HTMLCanvasElement>document.createElement("canvas");
  //       var ctx = canvas.getContext("2d");
  //       var cw = canvas.width;
  //       var ch = canvas.height;
  //       var maxW = 400;
  //       var maxH = 400;
  //       var type = event.target.files[0].type;
  //       var img = new Image;
  //       img.onload = () => {
  //         var iw = img.width;
  //         var ih = img.height;
  //         var scale = Math.min((maxW / iw), (maxH / ih));
  //         var iwScaled = iw * scale;
  //         var ihScaled = ih * scale;
  //         canvas.width = iwScaled;
  //         canvas.height = ihScaled;
  //         ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
  //         event.target.value = ''


  //         let imagec = canvas.toDataURL();
  //         console.log(imagec)

  //         let imgggg = imagec.replace(';base64,', "thisisathingtoreplace;")
  //         let imgarr = imgggg.split("thisisathingtoreplace;")
  //         let base64String = imgarr[1]

  //         let body = {
  //           image: base64String // this is the base64img from upper part
  //         }
  
  //         this.http.post('https://api.imgur.com/3/image', body, { headers: imgurheaders }).subscribe(res => {
  //           resolve(res['data'].link)
  //         }, awe => {
  //           reject(awe)
  //         })
  //       }

  //       img.src = URL.createObjectURL(event.target.files[0]);
  //     } else {
  //       reject({ success: false, message: '"Your Current Image Too Large, " + event.target.files[0].size / (10241024) + "MB! (Please choose file lesser than 8MB)"' })
  //       alert("Your Current Image Too Large, " + event.target.files[0].size / (10241024) + "MB! (Please choose file lesser than 8MB)")
  //     }
  //   })
  // }

  // fileChange(x) {
  //   this.imgur(x).then(a => {
  //     console.log(a);
  //     this.movie.imageurl = a
  //     // eval(z + "=a")
  //   })
  // }




}
