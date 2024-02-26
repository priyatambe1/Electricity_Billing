import {NgForm,FormGroup,Validators,FormBuilder,FormControl} from '@angular/forms';

export class login{
    id=0;
    emailid:string='';
    password:string='';
    fullname:string='';
    phonenumber=0;
    address:string='';
    isadmin=0;
    
    formLoginGroup:FormGroup;
    constructor(){
        var _builder=new FormBuilder();
        this.formLoginGroup=_builder.group({});
        this.formLoginGroup.addControl("FullNameControl",new FormControl('',Validators.required));
        this.formLoginGroup.addControl("EmailIdControl",new FormControl('',Validators.required));
        this.formLoginGroup.addControl("AddressControl",new FormControl('',Validators.required));
        this.formLoginGroup.addControl("PasswordControl",new FormControl('',Validators.required));
        this.formLoginGroup.addControl("PhoneNumberControl",new FormControl('',Validators.required));
        this.formLoginGroup.addControl("IsAdminControl",new FormControl('',Validators.required));


    }
}

