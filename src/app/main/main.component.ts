import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { result, result_all } from "../result";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  @ViewChild('vid1') vid1: ElementRef;
  @ViewChild('vid2') vid2: ElementRef;
  @ViewChild('vid3') vid3: ElementRef;
  @ViewChild('vid4') vid4: ElementRef;
  @ViewChild('vid5') vid5: ElementRef;
  @ViewChild('vid6') vid6: ElementRef;
  @ViewChild('vid7') vid7: ElementRef;
  @ViewChild('vid8') vid8: ElementRef;
  @ViewChild('vid9') vid9: ElementRef;
  @ViewChild('vid10') vid10: ElementRef;

  @ViewChild('vidA') vidA: ElementRef;
  @ViewChild('vidB') vidB: ElementRef;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  userchoice: string="";
  hide_switch: boolean = true;
  hide_training_session: boolean = true;
  hide_testing_session: boolean = true;
  hide_save_session: boolean = true;
  hide_personal_info: boolean = false;
  hide_choosing_session: boolean  = true;
  show_images: boolean = false;
  src_video_path1: string="";
  src_video_path2: string="";
  user_file_index: number;
  user_file_path: string;
  start_button_disable: boolean = false;
  orders: any;
  file_index: number=0;
  save_result: result_all=new result_all();
  GenderControl = new FormControl('', Validators.required);
  ChooseTestControl = new FormControl('', Validators.required);
  choices: string[] = ['Left is much better than Right', 'Left is a little better than Right', 'Left and Right are similar', 'Left is a little worse than Right', 'Left is much worse than Right'];

  

  ngOnInit(): void {
    this.save_result.name = "";
    this.save_result.age = 0;
    this.save_result.gender = "";
    this.save_result.chosen_file = "";
    this.save_result.chosen_test= "";
    this.save_result.recorded_result = [];

    //(async () => { 
      // Do something before delay
    //  console.log('before delay')

    //  await this.delay(4000);

      // Do something after
    //  console.log('after delay')

    //  this.vid1.nativeElement.play();

    //})();

    
  }

  async StartTest() {
    this.start_button_disable = true;
    this.user_file_index = Math.floor(Math.random() * 40)+1;
    //this.user_file_index = 1;
    this.user_file_path = "../assets/json/file"+this.user_file_index+".json";
    this.save_result.chosen_file = "file"+this.user_file_index+".json";
    console.log(this.user_file_path);
    console.log("1");
    this.httpClient.get(this.user_file_path).subscribe(data =>{
      this.orders = data;
      console.log(this.orders);
      this.src_video_path1="../assets/videos/"+this.orders[this.file_index].first_A;
      this.src_video_path2="../assets/videos/"+this.orders[this.file_index].second_B;
      //this.show_images=this.orders[this.file_index].IfImage;
      this.show_images=(this.orders[this.file_index].IfImage =="true");

      if (this.show_images == false){

      (async () => { 
        // Do something before delay
        console.log('before delay')
  
        await this.delay(1000);
  
        // Do something after
        console.log('after delay')
  
        this.vidA.nativeElement.play();
        this.vidB.nativeElement.play();
  
      })();
    }

    })

  }

  FinishTraining() {
    //this.hide_testing_session = false;
    this.hide_choosing_session = false;
    this.hide_training_session = true;
  }

  FinishChoosing(){
    this.hide_testing_session = false;
    this.hide_choosing_session = true;
  }

  StartTraining() {
    this.hide_personal_info = true;
    this.hide_testing_session = true;
    this.hide_training_session = false;


    (async () => { 
      // Do something before delay
      console.log('before delay')

      await this.delay(1000);

      // Do something after
      console.log('after delay')

      this.vid1.nativeElement.play();
      this.vid2.nativeElement.play();
      this.vid3.nativeElement.play();
      this.vid4.nativeElement.play();
      this.vid5.nativeElement.play();
      this.vid6.nativeElement.play();
      this.vid7.nativeElement.play();
      this.vid8.nativeElement.play();
      this.vid9.nativeElement.play();
      this.vid10.nativeElement.play();

    })();
  }

  JumpTo() {
    if (this.userchoice === ""){
      this.hide_switch = false;
      //this.alertService.error("Try again!");
      //this.router.navigate(['/iloveu']);
    }else{
      this.hide_switch = true;

      this.save_result.recorded_result.push(new result());
      this.save_result.recorded_result[this.file_index].id = this.file_index;
      this.save_result.recorded_result[this.file_index].choice = this.userchoice;

      this.file_index = this.file_index + 1;

      if (this.file_index === 10){
        console.log(this.save_result);
        this.hide_testing_session = true;
        this.hide_save_session = false;

      }else{
        this.userchoice = null;
        this.src_video_path1="../assets/videos/"+this.orders[this.file_index].first_A;
        this.src_video_path2="../assets/videos/"+this.orders[this.file_index].second_B;
        this.show_images=(this.orders[this.file_index].IfImage =="true");
        //this.show_images=this.orders[this.file_index].IfImage;
        if (this.show_images == false){

          (async () => { 
            // Do something before delay
            console.log('before delay')
      
            await this.delay(1000);
      
            // Do something after
            console.log('after delay')
      
            this.vidA.nativeElement.play();
            this.vidB.nativeElement.play();
      
          })();
        }
      }
      //this.Ifvalid = false;
      //this.alertService.error("Try again!");
    }
  }

  get dataUri(): SafeUrl {
    const jsonData = JSON.stringify(this.save_result);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
