import { Component, OnInit, OnDestroy } from '@angular/core';
//import {UserInfoModel} from '../models/userInfo';
import { HttpClient,HttpParams} from "@angular/common/http";
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit,OnDestroy {

  constructor(private http: HttpClient,private router : Router, private route: ActivatedRoute,private formBuilder2: FormBuilder, private formBuilder: FormBuilder) { }

     md5 = new Md5();

    registered = false;
  	user_form_submitted = false;
    pass_form_submitted = false;

  	userForm: FormGroup;
    passForm: FormGroup;
    user:any;

    subscriber:any;
    subscriber2:any;
    subscriber3: any;
    subscriber4: any;
    subscriber5: any;
    username_exists : boolean;
    password_incorrect :boolean;


  ngOnInit()  {

   this.subscriber = this.route.params.subscribe(param => {

	       this.http.get('http://localhost:3000/api/v1/profile/' + param.uid).subscribe((data:any) => {

        console.log(data);

				this.user = data[0];


		    });
	    });

      this.userForm = this.formBuilder.group({
        		first_name: ['', Validators.required],
            last_name: ['', Validators.required],
        		email: ['', [Validators.required, Validators.email]],
        		username: ['', Validators.required],
            phone : ['', [Validators.required,Validators.minLength(13), Validators.maxLength(13),Validators.pattern('^[0-9]+$')]]
        	});
      this.passForm= this.formBuilder2.group({
            current_password : ['', [Validators.required,Validators.minLength(8)]],
            confirm_password : ['', Validators.required],
        		new_password: ['', [Validators.required, Validators.minLength(8)]]
        	});
  }

  ngOnDestroy()
  {
    this.subscriber.unsubscribe();
    this.subscriber2.unsubscribe();
    this.subscriber3.unsubscribe();
    this.subscriber4.unsubscribe();
    this.subscriber5.unsubscribe();


  }

  invalidFirstName()
  {
  	return (this.user_form_submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName()
  {
    return (this.user_form_submitted && this.userForm.controls.last_name.errors != null);
  }


  invalidEmail()
  {
  	return (this.user_form_submitted && this.userForm.controls.email.errors != null);
  }

  invalidUsername()
  {
  	return (this.user_form_submitted && this.userForm.controls.username.errors != null);
  }

  invalidUsernameExists()
  {
  	return (this.user_form_submitted && this.username_exists);
  }

  invalidPhoneNumber()
  {
    return (this.user_form_submitted && this.userForm.controls.phone.errors != null);
  }

  invalidCurrentPassword()
  {
  	return (this.pass_form_submitted && (this.passForm.controls.current_password.errors != null || this.password_incorrect==true));
  }

  invalidNewPassword()
  {
  	return (this.pass_form_submitted && this.passForm.controls.new_password.errors != null);
  }

  invalidConfirmationPassword()
  {
    return (this.pass_form_submitted && (this.passForm.controls.confirm_password.errors != null
    || this.passForm.controls.confirm_password.value!=this.passForm.controls.new_password.value));
  }

  check_username_exists(username,callback)
  {
    let exists : boolean = true;
    let params : HttpParams = new HttpParams()
                              .set('username',username);

      this.subscriber2= this.http.get('http://localhost:3000/api/v1/profile/',{params}).subscribe((data:string) => {

      console.log("the data is heere :  "+data);
      if(data == '1')
         exists = true;
      else
         exists =  false;

      callback(exists);
   });


  }

   submit_user_info(body)
   {


     this.subscriber3= this.route.params.subscribe(param => {

           this.http.put('http://localhost:3000/api/v1/profile/info/' + param.uid, body).subscribe((res:any) => {

          console.log("the response is : "+res);

          });
        });   }

   check_pass_correct(pass,callback)
   {
     let correct : boolean = true;
     let pass_md5 = this.md5.appendStr(pass).end();
     let params : HttpParams = new HttpParams()
                               .set('pass',pass_md5);

       this.subscriber4= this.route.params.subscribe(param => {
         this.http.get('http://localhost:3000/api/v1/profile/pass/'+param.uid, {params}).subscribe((data:string) => {

       console.log("the data is heere :  "+data);
       if(data == '1')
          correct = true;
       else
          correct =  false;

       callback(correct);
    });
  });
   }

   submit_new_pass(new_pass)
   {
     let body = {new_pass : ''};
     body.new_pass = this.md5.appendStr(new_pass).end();
     this.subscriber5= this.route.params.subscribe(param => {

           this.http.put('http://localhost:3000/api/v1/profile/pass/' + param.uid, body).subscribe((res:any) => {

          console.log("the response is : "+res);

          });
        });
   }


    onSubmitUserInfo()
 {
   this.user_form_submitted = true;


   let username : string =  this.userForm.controls.username.value;

   console.log(username);

   this.check_username_exists(username,(exists) => {
     this.username_exists = exists;
     console.log(this.username_exists);

   });

   let body={
     first_name : "",
     last_name : "",
     username : "",
     email : "",
     tel : ""
            };
   var changed : boolean=false;
   if(this.userForm.controls.username.errors == null && this.username_exists == false)
   {
        body.username= this.userForm.controls.username.value;
        changed=true;
   }
   if(this.userForm.controls.first_name.errors == null)
   {
        body.first_name= this.userForm.controls.first_name.value;
        changed=true;

   }
   if(this.userForm.controls.last_name.errors == null)
   {
        body.last_name= this.userForm.controls.last_name.value;
        changed=true;

   }
   if(this.userForm.controls.email.errors == null)
   {
        body.email= this.userForm.controls.email.value;
        changed=true;

   }
   if(this.userForm.controls.phone.errors == null)
   {
        body.tel= this.userForm.controls.phone.value;
        changed=true;

   }

   if(changed)
   {
     if(confirm("are you sure you want to make these changes ?"))
     {
      this.submit_user_info(body);
       if(body.username!="")
       {
         let path = '/profile/'+body.username;
         this.router.navigate([path]);
       }
     }


   }





   }




 onSubmitPassword()
 {
   this.pass_form_submitted = true;

   if(this.passForm.invalid == true)
   {
     return;
   }

   let current_pass = this.passForm.controls.current_password.value;
   this.check_pass_correct(current_pass,(correct) =>
   {
     console.log("i'm 0");

     if(correct==true)
     {
       console.log("i'm 1");

       this.password_incorrect = false;

       if(confirm("Are you sure you want to change your password ?"))
       {
         console.log("i'm 2");

         let new_pass = this.passForm.controls.new_password.value;
         this.submit_new_pass(new_pass);
       }

     }
     else
     {
       this.password_incorrect=true;
     }
   }
 );



 }

}
