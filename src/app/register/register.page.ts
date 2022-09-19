import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import "firebase/database";
import "firebase/auth";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {


    firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(a => {

      Swal.fire({
        title: 'Register Successfully',
        text: 'Click "Login" to redirect to login page',
        icon: 'success',
        confirmButtonText: 'Login',
        heightAuto: false
      }).then((result => {
        if (result.isConfirmed) {
          this.goToLogin();
        }
      }))
      this.user.uid = a.user.uid
      this.user.role = "user"
      firebase.database().ref('users/' + a.user.uid).update(this.user).then((b) => { })
    }).catch(a => {
      switch (a.code) {
        case 'auth/email-already-in-use':
          Swal.fire({
            text: a.message,
            heightAuto: false
          });
        case 'auth/invalid-email':
          Swal.fire({
            text: a.message,
            heightAuto: false
          });
          break;
        case 'auth/operation-not-allowed':
          Swal.fire({
            text: a.message,
            heightAuto: false
          });
          break;
        case 'auth/weak-password':
          Swal.fire({
            text: a.message,
            heightAuto: false
          });
          break;
        default:
          Swal.fire({
            text: a.message,
            heightAuto: false
          });
          break;
      }
    });
  }

  goToLogin() {

    // this.sohaiFunction2()

    // this.sohaiFunction().then(() => {
    //   //
    // })

    // new Promise((resolve, reject) => {
    //   resolve(123)
    // }).then((res) => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log(error)
    // })


    // let newArr = [this.sohaiFunction(), this.sohaiFunction3()]

    // this.sohaiFunction().then(() => {
    //   this.sohaiFunction3().then((res) => {

    //   })
    // })

    // Promise.all(newArr).then((res) => {

    // })

    this.router.navigateByUrl('/login')
  }

  sohaiFunction2(){
    return true
  }


  // sohaiFunction(){
  //   return new Promise((resolve,reject) => {
  //     resolve(true)
  //   })
  // }

  // sohaiFunction3(){
  //   return new Promise((resolve,reject) => {
  //     resolve(true)
  //   })
  // }
}
