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
  test_length: number;
  user_file_index: number;
  user_file_path: string;
  video_specs_path: string;
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
    if (this.save_result.chosen_test =='A'){
    this.test_length=49;
    this.video_specs_path="../assets/json/specs_A.json";
}
    else if (this.save_result.chosen_test =='B'){
    this.test_length=48;
    this.video_specs_path="../assets/json/specs_B.json";
}
  

    //this.user_file_index = Math.floor(Math.random() * 40)+1;
    //this.user_file_path = "../assets/json/file"+this.user_file_index+".json";
    this.save_result.chosen_file = this.video_specs_path;
    console.log(this.video_specs_path);
    console.log(this.user_file_path);
    console.log("1");
    this.httpClient.get(this.video_specs_path).subscribe(data =>{
      this.orders = data;
      console.log(this.orders);// This array contains info on which videos to display
      console.log(this.test_length);
      //console.log(this.orders[0][3])
      if (this.orders[this.file_index][3]==0){// 0 means TSP is on left. 1 means Tiling is on left
      this.src_video_path1="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_TSP.mkv";
      this.src_video_path2="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_Tiling.mkv";
      }
      else{
      this.src_video_path1="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_Tiling.mkv";
      this.src_video_path2="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_TSP.mkv";
      }
      //this.src_video_path1="../assets/videos/"+this.orders[this.file_index].first_A;
      //this.src_video_path2="../assets/videos/"+this.orders[this.file_index].second_B;
      //this.show_images=this.orders[this.file_index].IfImage;
      console.log(this.src_video_path1)
      //this.show_images=(this.orders[this.file_index].IfImage =="true");
      this.show_images=false;
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

      if (this.file_index === this.test_length){
        console.log(this.save_result);
        this.hide_testing_session = true;
        this.hide_save_session = false;

      }else{
        this.userchoice = null;
        if (this.orders[this.file_index][3]==0){// 0 means TSP is on left. 1 means Tiling is on left
          this.src_video_path1="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_TSP.mkv";
          this.src_video_path2="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_Tiling.mkv";
        }
        else{
          this.src_video_path1="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_Tiling.mkv";
          this.src_video_path2="../assets/videos/vid"+this.orders[this.file_index][0]+'_'+this.orders[this.file_index][1]+'_'+this.orders[this.file_index][2]+"M_TSP.mkv";
        }
        //this.src_video_path1="../assets/videos/"+this.orders[this.file_index].first_A;
        //this.src_video_path2="../assets/videos/"+this.orders[this.file_index].second_B;
        //this.show_images=(this.orders[this.file_index].IfImage =="true");
        //this.show_images=this.orders[this.file_index].IfImage;
        console.log(this.src_video_path1);
        console.log(this.src_video_path2);
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
