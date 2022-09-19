import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController) { }


  eye = false

  user: any = {}

  ngOnInit() {


    // firebase.database().ref("users/" + "UKOQiZPHQsbyuAV9CL4ijCMPwTM2").update(
    //   {
    //     email: "admin@gmail.com",
    //     name: "admin",
    //     password: "admin123",
    //     role: "admin",
    //     uid: "UKOQiZPHQsbyuAV9CL4ijCMPwTM2"
    //   }
      
    // )

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log(user)
        this.user.uid = user.uid

        firebase.database().ref("users/" + this.user.uid).on('value', (a)=>{
          console.log(a.val())
          let temp = a.val()

          if(temp.role == "user")
          {
            Swal.fire(
              {
                title: 'Welcome',
                text: temp.name,
                timer: 1500,
                showConfirmButton: false,
                icon: 'success',
                heightAuto: false
              }
            ).then(a =>{
              this.nav.navigateRoot("home?uid=" + this.user.uid)
            })
            
          }
          else if(temp.role == "admin"){
            Swal.fire(
              {
                title: 'Welcome',
                text: temp.name,
                timer: 1500,
                showConfirmButton: false,
                icon: 'success',
                heightAuto: false
              }
            ).then(a => {
              this.nav.navigateRoot("adminpanel?uid=" + this.user.uid)
            })
            
          }

      })
      }
    })
  }


  focus(ev, num){
    document.getElementById(num).style.border = "1.5px solid #FEE715FF"
  }

  blur(ev, num){
    document.getElementById(num).style.border = "1.5px solid lightgrey"
  }
  

  login(){

    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(a => {
      console.log(a);
      console.log(a.user.uid)
      console.log(this.user)
      // this.nav.navigateForward('home')
    }).catch(e => {

      switch (e.code) {
        case 'auth/invalid-email': 
        Swal.fire({
          text: e.message,
          heightAuto: false
        });
        case 'auth/user-disabled':
          Swal.fire({
            text: e.message,
            heightAuto: false
          });
          break;
        case 'auth/user-not-found':
          Swal.fire({
            text: e.message,
            heightAuto: false
          });
          break;
        case 'auth/wrong-password':
          Swal.fire({
            text: e.message,
            heightAuto: false
          });
          break;
        default:
          Swal.fire({
            text: e.message,
            heightAuto: false
          });
          break;
      }
    });
  }

  gotoregister(){
    this.nav.navigateForward('register')
  }

}
