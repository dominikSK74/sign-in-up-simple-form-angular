import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordMatchValidator} from "./password-match.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('textBox') textBox!: ElementRef;
  @ViewChild('login') login!: ElementRef;
  @ViewChild('loginForm') loginForm!: ElementRef;
  @ViewChild('registerForm') registerForm!: ElementRef;
  @ViewChild('text') text! : ElementRef;

  ACTIVE_REGISTER_CLASS = 'active-register';
  ACTIVE_TEXT_BOX_REGISTER_CLASS = 'active-text-box-register';
  ACTIVE_LOGIN_CLASS = 'active-login';
  ACTIVE_TEXT_BOX_LOGIN_CLASS = 'active-text-box-login';
  HIDDEN_CLASS = 'hidden';
  LOGIN_TEXT = 'If you already have an account log in here';
  REGISTER_TEXT = 'If you don\'t have an account yet register here';
  SIGN_IN_TEXT = 'sign in';
  SIGN_UP_TEXT = 'sign up';
  TOGGLE_BTN_TEXT = this.SIGN_UP_TEXT;
  pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*\d)[A-Za-z\d!@#$%&*]+$/;

  register_form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.pattern(this.pattern), Validators.required, Validators.minLength(8)]),
      password_repeat: new FormControl('', [Validators.pattern(this.pattern), Validators.required, Validators.minLength(8),])
  }, {validators: PasswordMatchValidator.passwordMatchValidator});

  login_form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(this.pattern), Validators.required, Validators.minLength(8)])
  });
  constructor() { }

  ngOnInit(): void {
  }

  get passwordMatchError() {
    return (
      this.register_form.getError('passwordMismatch') &&
      this.register_form.get('password_repeat')?.touched
    );
  }

  toggle(): void{

    const text_box = this.textBox.nativeElement as HTMLElement;
    const login = this.login.nativeElement as HTMLElement;
    const register_form = this.registerForm.nativeElement as HTMLElement;
    const login_form = this.loginForm.nativeElement as HTMLElement;
    const text = this.text.nativeElement as HTMLElement;


    if(text_box.classList.contains(this.ACTIVE_TEXT_BOX_REGISTER_CLASS)){

      text_box.classList.add(this.ACTIVE_TEXT_BOX_LOGIN_CLASS);
      login.classList.add(this.ACTIVE_LOGIN_CLASS);

      text_box.classList.remove(this.ACTIVE_TEXT_BOX_REGISTER_CLASS);
      login.classList.remove(this.ACTIVE_REGISTER_CLASS);

      login_form.classList.remove(this.HIDDEN_CLASS);
      register_form.classList.add(this.HIDDEN_CLASS);

      text.innerHTML = this.REGISTER_TEXT;
      this.TOGGLE_BTN_TEXT = this.SIGN_UP_TEXT;

    }else{
      text_box.classList.add(this.ACTIVE_TEXT_BOX_REGISTER_CLASS);
      login.classList.add(this.ACTIVE_REGISTER_CLASS);

      text_box.classList.remove(this.ACTIVE_TEXT_BOX_LOGIN_CLASS);
      login.classList.remove(this.ACTIVE_LOGIN_CLASS);

      login_form.classList.add(this.HIDDEN_CLASS);
      register_form.classList.remove(this.HIDDEN_CLASS);

      text.innerHTML = this.LOGIN_TEXT;
      this.TOGGLE_BTN_TEXT = this.SIGN_IN_TEXT;
    }

  }

  register():void {
    let email_validation : boolean | undefined;
    email_validation = this.register_form.get('email')?.valid ?? false;

    let password_validation : boolean | undefined;
    password_validation = this.register_form.get('password')?.valid ?? false;

    let password_repeat_validation: string | undefined;
    password_repeat_validation = this.register_form.get('password_repeat')?.value ?? ''

    if (email_validation && password_validation) {
      let email = this.register_form.get('email')?.value;
      let password = this.register_form.get('password')?.value;

      if (password == password_repeat_validation){
        console.log('Sending data to API...');
        console.log('email: ', email);
        console.log('password: ', password);
      }
    }
  }

  login_():void {
    let email_validation : boolean | undefined;
    email_validation = this.login_form.get('email')?.valid ?? false;

    let password_validation : boolean | undefined;
    password_validation = this.login_form.get('password')?.valid ?? false;

    if (email_validation && password_validation){
      console.log("Sending data to API...")
      /* if (data.correct) {
        login to page...
      }else{
        INFO: this data isn't correct
      }
       */
    }
  }
}
