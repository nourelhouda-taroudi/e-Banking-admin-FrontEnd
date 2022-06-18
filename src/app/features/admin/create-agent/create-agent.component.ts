import { Router } from '@angular/router';
import { UploadService } from './../../../core/services/upload.service';
import { Agent } from './../../../core/models/agent';
import { Component, OnInit } from '@angular/core';

import { AgentService } from './../../../core/services/agent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css'],
})
export class CreateAgentComponent implements OnInit {
  isSelected = true;
  c = 1;
  imageError: string = '';
  selectedImg: File | undefined;
  imagePath: string = '';
  imgURL: any;
  sameEmail= false;
  hasFormErrors= false;
  error!:string;
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    typeIdentity: new FormControl(null, [Validators.required]),
    identity: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null),
    address: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    emailValidation: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(null, [Validators.required]),
    matricule: new FormControl(null, [Validators.required]),
    patente: new FormControl(null, [Validators.required]),
  });
  fileForm: FormGroup = new FormGroup({
    description0: new FormControl(null, [Validators.required]),
    file0: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly agentService: AgentService,
    private readonly uploadService: UploadService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}
  addFile() {
    this.fileForm.addControl(
      `description${this.c}`,
      new FormControl('', Validators.required)
    );
    this.fileForm.addControl(
      `file${this.c}`,
      new FormControl('', Validators.required)
    );
    this.c++;
  }
  deleteFile(index: number) {
    console.log(this.c, index);

    if (this.c == 0) return;
    this.fileForm.removeControl(`description${index}`);
    this.fileForm.removeControl(`file${index}`);
    for (let i = index; i < this.c; i++) {
      console.log(`description${i + 1}`);

      console.log(
        this.fileForm.controls,
        this.fileForm.controls[`description${i + 1}`]
      );

      const desc = this.fileForm.controls[`description${i + 1}`].value;
      const fl = this.fileForm.controls[`file${i + 1}`].value;
      this.fileForm.removeControl(`description${i + 1}`);
      this.fileForm.removeControl(`file${i + 1}`);
      this.fileForm.addControl(
        `description${i}`,
        new FormControl(desc, Validators.required)
      );
      this.fileForm.addControl(
        `file${i}`,
        new FormControl(fl, Validators.required)
      );
    }
    console.log(this.fileForm);

    this.c--;
  }
  // TODO : Delete file from html DOM
  counter() {
    return new Array(this.c);
  }
  createAgent() {
    this.checkFormIsValid();
    console.log(this.hasFormErrors,this.selectedImg);
    
    if(this.hasFormErrors)return;
    // upload image
    if(this.selectedImg==undefined)return;
    // let data = new FormData();
    // data.append('image', this.selectedImg);
    this.uploadService.upload(this.selectedImg).subscribe(
      (res: {filename:string}) => {
        console.log(res);
        const {
          username,
          typeIdentity,
          identity,
          birthday,
          address,
          email,
          phone,
          matricule,
          patente,
        } = this.form.value;
        const {description0} = this.fileForm.value;
        let agent = new Agent();
        agent.username = username;
        agent.description = description0;
        agent.immatriculation = matricule;
        agent.birthday = birthday;
        agent.patente = patente;
        (agent.pieceIdentite = typeIdentity);
        agent.phoneNumber = phone;
        agent.email = email;
        agent.idcard = identity;
        agent.address = address;
        agent.image=res.filename;
        console.log({agent});
    
        this.agentService.addAgent(agent).subscribe(
          (response) => {
            this.router.navigateByUrl('/');
          },
          (error) => {
            this.error=error.error.message
            setTimeout(()=>{
              this.error=''
            },3000)
          }
        );
      },
      (err: any) => {
        console.log(err);
        if (err.error.statusCode == 400) {
          this.imageError = err.error.message;
        }
      }
    );

    
  }
  preview(event: any) {
    if (event.target.files.length === 0) return;

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.imageError = 'Vous devez choisir une image!!!';
      return;
    } else {
      this.imageError = '';
      this.selectedImg = <File>event.target.files[0];
      
      var reader = new FileReader();
      this.imagePath = event.target.files;

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  onSelected(event: any) {}

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  isSameEmail() {
    const email = this.form.controls['email'];
    const emailValidation = this.form.controls['emailValidation'];
    console.log(email,emailValidation);
    
    const tst =
      email.value !== emailValidation.value &&
      (email.dirty || email.touched) &&
      (emailValidation.dirty || emailValidation.touched);
    this.sameEmail = tst;
  }

  // Check Form is valid
  checkFormIsValid() {
    this.hasFormErrors = false;
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
  }
}
