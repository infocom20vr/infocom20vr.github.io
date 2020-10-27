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
  // @ViewChild('vid4') vid4: ElementRef;
  // @ViewChild('vid5') vid5: ElementRef;
  // @ViewChild('vid6') vid6: ElementRef;
  // @ViewChild('vid7') vid7: ElementRef;
  // @ViewChild('vid8') vid8: ElementRef;
  // @ViewChild('vid9') vid9: ElementRef;
  // @ViewChild('vid10') vid10: ElementRef;

  @ViewChild('vidA') vidA: ElementRef;
  @ViewChild('vidB') vidB: ElementRef;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  userchoice: string="";
  hide_switch: boolean = true;
  hide_training_session_1: boolean = true;
  hide_training_session_2: boolean = true;
  hide_testing_session_1: boolean = true;
  hide_testing_session_2: boolean = true;
  hide_save_session: boolean = true;
  hide_personal_info: boolean = false;
  show_images: boolean = false;
  src_video_path: string="";
  src_video_path_2: string="";
  training_video_path_5M_1: string="";
  training_video_path_5M_2: string="";
  training_video_path_5M_3: string="";
  training_video_path_10M_1: string="";
  training_video_path_10M_2: string="";
  training_video_path_10M_3: string="";
  test_length: number=29;
  user_file_index: number;
  user_file_path: string;
  video_specs_path: string;
  src_dir: string="http://127.0.0.1/";
  start_button_disable_1: boolean = false;
  start_button_disable_2: boolean = false;
  orders: any;
  test_session: number = 1;
  file_index: number = 0;
  file_count: number = 0;
  finish_time: string="";
  save_result: result_all=new result_all();
  GenderControl = new FormControl('', Validators.required);
  ChooseTestControl = new FormControl('', Validators.required);
  choices: string[] = ['Left is much better than Right', 'Left is a little better than Right', 'Left and Right are similar', 'Left is a little worse than Right', 'Left is much worse than Right'];

  

  ngOnInit(): void {
    this.save_result.name = "";
    this.save_result.age = 0;
    this.save_result.gender = "";
    //this.save_result.chosen_file = "";
    //this.save_result.chosen_test= "";
    this.save_result.recorded_result = [];
    this.training_video_path_5M_1=this.src_dir+"vid1_1v1_5M.webm";
    this.training_video_path_5M_2=this.src_dir+"vid1_1v4_5M.webm";
    this.training_video_path_5M_3=this.src_dir+"vid1_1v1_5M.webm";
    this.training_video_path_10M_1=this.src_dir+"vid1_1v1_10M.webm";
    this.training_video_path_10M_2=this.src_dir+"vid1_1v4_10M.webm";
    this.training_video_path_10M_3=this.src_dir+"vid1_1v1_10M.webm";
   

    
  }
  StartTest_1() {
    
    this.start_button_disable_1 = true;
    this.video_specs_path = "../assets/json/one_part/specs_G1.json";
    console.log(this.video_specs_path);
    console.log(this.user_file_path);
    console.log("test starts");

    this.httpClient.get(this.video_specs_path).subscribe(data =>{
      this.orders = data;
      console.log(this.orders);// This array contains info on which videos to display
      console.log(this.test_length);      
      this.src_video_path = this.src_dir + "vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+"_5M_"+this.orders[this.file_index][2]+".webm";
      console.log(this.src_video_path)
      this.show_images=false;
      if (this.show_images == false){

      // (async () => { 
      //   // Do something before delay
      //   console.log('before delay')
  
      //   await this.delay(1000);
  
      //   // Do something after
      //   console.log('after delay')
  
      //   this.vidA.nativeElement.play();
  
      // })();
    }
    })
  }
  StartTest_2() {
    this.start_button_disable_2 = true;
    this.video_specs_path = "../assets/json/one_part/specs_G2.json";
    console.log(this.video_specs_path);
    console.log(this.user_file_path);
    console.log("1");
    this.httpClient.get(this.video_specs_path).subscribe(data =>{
      this.orders = data;
      console.log(this.orders);// This array contains info on which videos to display
      console.log(this.test_length);      
      this.src_video_path_2 = this.src_dir + "vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+"_10M_"+this.orders[this.file_index][2]+".webm";
      console.log(this.src_video_path_2)
      this.show_images=false;
      if (this.show_images == false){

      (async () => { 
        // Do something before delay
        console.log('before delay')
  
        await this.delay(1000);
  
        // Do something after
        console.log('after delay')
  
        this.vidB.nativeElement.play();
  
      })();
    }
    })
  }


  

  FinishTraining() {
      this.vid1.nativeElement.pause();
      this.vid1.nativeElement.removeAttribute('src'); // empty source
      this.vid1.nativeElement.load();
      this.vid2.nativeElement.pause();
      this.vid2.nativeElement.removeAttribute('src'); // empty source
      this.vid2.nativeElement.load();
      this.vid3.nativeElement.pause();
      this.vid3.nativeElement.removeAttribute('src'); // empty source
      this.vid3.nativeElement.load();
      
    if (this.test_session == 1){
      this.hide_training_session_1 = true;
      this.hide_testing_session_1 = false;
  }
    else if (this.test_session == 2){
      this.hide_training_session_2 = true;
      this.hide_testing_session_2 = false;
    }
  }


  StartTraining_1() {
    this.hide_personal_info = true;
    //this.hide_testing_session = true;
    this.hide_training_session_1 = false;
    (async () => { 
      // Do something before delay
      console.log('before delay')
      await this.delay(3000);
      // Do something after
      console.log('after delay')
    })();
  }

  StartTraining_2() {
    this.hide_training_session_2 = false;
    (async () => { 
      // Do something before delay
      console.log('before delay')
      await this.delay(3000);
      // Do something after
      console.log('after delay')
    })();
  }


  JumpTo() {
    //console.log('file number:'+this.file_index);
    if (this.test_session==1){
      if (this.userchoice === ""){
        this.hide_switch = false;
        //this.alertService.error("Try again!");
      }else{
        this.hide_switch = true;
        this.save_result.recorded_result.push(new result());
        this.save_result.recorded_result[this.file_index].id = this.file_index;
        this.save_result.recorded_result[this.file_index].spec = this.orders[this.file_index];
        this.save_result.recorded_result[this.file_index].rate = 5;
        this.save_result.recorded_result[this.file_index].choice = this.userchoice;
        
        if (this.file_index === this.test_length-1){
          console.log(this.save_result);
          this.hide_testing_session_1 = true;
          this.hide_training_session_2 = false;
          this.test_session = 2;
          this.hide_switch = false;
          //this.src_video_path="";
          this.file_index = 0;
          this.vidA.nativeElement.pause();
          this.vidA.nativeElement.removeAttribute('src'); // empty source
          this.vidA.nativeElement.load();
          this.userchoice="";

        }else{
          this.file_index = this.file_index + 1;
          this.userchoice = null;
          this.src_video_path = this.src_dir + "vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+"_5M_"+this.orders[this.file_index][2]+".webm";
          //console.log(this.src_video_path);
          // if (this.show_images == false){

          //   (async () => { 
          //     // Do something before delay
          //     console.log('before delay');
        
          //     await this.delay(5000);
        
          //     // Do something after
          //     console.log('after delay');
        
          //     this.vidA.nativeElement.play();
          //     console.log('current file index:'+this.file_index);
          //     console.log(this.src_video_path);
        
          //   })();
          // }
          
        }
      }
    }
    else if (this.test_session==2){
      if (this.userchoice === ""){
        this.hide_switch = false;
        //this.alertService.error("Try again!");
      }else{
        this.hide_switch = true;
        this.file_count = this.file_index+this.test_length;
        this.save_result.recorded_result.push(new result());
        this.save_result.recorded_result[this.file_count].id = this.file_index;
        this.save_result.recorded_result[this.file_count].spec = this.orders[this.file_index];
        this.save_result.recorded_result[this.file_count].rate = 10;
        this.save_result.recorded_result[this.file_count].choice = this.userchoice;
        

        if (this.file_index === this.test_length-1){
          console.log(this.save_result);
          this.hide_testing_session_2= true;
          this.hide_save_session = false;
          //this.file_index = 0;

        }else{
          this.file_index = this.file_index + 1;
          this.userchoice = null;
          this.src_video_path_2 = this.src_dir + "vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+"_10M_"+this.orders[this.file_index][2]+".webm";
          //console.log(this.src_video_path_2);
          if (this.show_images == false){

            (async () => { 
              // Do something before delay
              console.log('before delay');
        
              await this.delay(5000);
        
              // Do something after
              console.log('after delay');
        
              this.vidB.nativeElement.play();
              console.log('current file index:'+this.file_index);
              console.log(this.src_video_path_2);
        
            })();
          }
        }
      }

      
    }


  }


       

  get dataUri(): SafeUrl {
    let dateTime= new Date().toLocaleString();
    this.save_result.finish_time = dateTime;
    const jsonData = JSON.stringify(this.save_result);
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
