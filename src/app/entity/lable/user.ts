import { FormGroup, FormControl, Validators } from '@angular/forms';


export class User{

    constructor(){
        this.userForm;

    }

     public userForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phone1: new FormControl('', Validators.required),
        phone2: new FormControl('', Validators.required),
        phoneIMEI: new FormControl('', Validators.required),
        address1: new FormControl('', Validators.required),
        address2: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
        joiningPlace: new FormControl('', Validators.required),
        joiningDate: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        qualification: new FormControl('', Validators.required),
        salary: new FormControl('', Validators.required),
        batta: new FormControl('', Validators.required),
        salaryEffectiveDate: new FormControl('', Validators.required),
        salaryOld: new FormControl('', Validators.required),
        battaOld: new FormControl('', Validators.required),
        loginAllowed: new FormControl(true, Validators.required),
        lastLogin: new FormControl('', Validators.required),
        lastLoginDevice: new FormControl('', Validators.required),
        refPerson: new FormControl('', Validators.required),
        refPersonPhone: new FormControl('', Validators.required),
        refPersonAddress: new FormControl('', Validators.required),
        IMEIAllowed: new FormControl(false, Validators.required),
        bankAccountNumber: new FormControl('', Validators.required),
        bankName: new FormControl('', Validators.required),
        bankBranchName: new FormControl('', Validators.required),
        bankBranchCity: new FormControl('', Validators.required),
        bankIIFSCCode: new FormControl('', Validators.required),
        bankAccountHolderName: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        modulesAllowed: new FormControl('', Validators.required),
        rolesAllowed: new FormControl('', Validators.required),
        campsAllowed: new FormControl('', Validators.required),
      });

}