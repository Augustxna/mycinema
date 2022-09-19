import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-choosedate',
  templateUrl: './choosedate.page.html',
  styleUrls: ['./choosedate.page.scss'],
})
export class ChoosedatePage implements OnInit {

  datetime

  constructor(private modal : ModalController) { }

  ngOnInit() {
    console.log(this.datetime)
  }

  showdate(){
    console.log(this.datetime)
  }

  selectdate(){
    if(this.datetime == undefined)
    {
      Swal.fire({
        title: 'Empty Date',
        text: 'Please select your date and time',
        timer: 2000,
        confirmButtonColor: 'black',
        heightAuto: false
      })
    }
    else
    {
      let temp1
      let temp2
      let temp3

      temp1 = this.datetime.split('T')
      console.log(temp1)
      temp2 = temp1[1].split('+')
      temp3 = temp1[0] + ' ' + temp2[0]
      console.log(temp3)


      Swal.fire({
        title: 'Are you sure to select',
        text: temp3,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        confirmButtonColor: 'black',
        heightAuto: false
      }).then((result) =>{
        if (result.isConfirmed) {
          this.modal.dismiss(this.datetime)
        }
        else if(result.isDenied)
        {
          Swal.fire('Select your date again')
        }
      })
    }
    
  }

  closemodal(){
    this.modal.dismiss()
  }

}
