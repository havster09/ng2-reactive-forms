import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {Customer} from './customer';

function ratingRange(c:AbstractControl): {[key:string]: boolean} | null {
    if(c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
        return {'range':true}
    }
    return null;
}

function ratingRangeWithParams(min: number, max: number): ValidatorFn {
    return (c:AbstractControl): {[key:string]: boolean} | null => {
        if(c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return {'range':true}
        }
        return null;
    }
}

function badNames(names:string[]): ValidatorFn {
    return (c:AbstractControl): {[key:string]: boolean} | null => {
        const hasBadName = names.find(name => c.value.toLowerCase() === name.toLowerCase());
        if(c.value !== undefined && hasBadName) {
            return {'name':true}
        }
        return null;
    }
}

function emailMatcher(c: AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');

    if(emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if(emailControl.value === confirmControl.value) {
        return null;
    }
    return {'match':true};
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();

    constructor(private FormBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.customerForm = this.FormBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3), badNames(['haven', 'judy'])]],
            lastName: ['', [Validators.required, Validators.maxLength(3)]],
            emailGroup: this.FormBuilder.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', [Validators.required]]
            }, {validator:emailMatcher}),
            phone: [''],
            notification: ['email'],
            rating: ['',[Validators.required, ratingRangeWithParams(1,3)]],
            sendCatalog: ['']
        });
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }

    populateTestData() {
        this.customerForm.patchValue({
            firstName: 'fister'
        });
    }

    giveMeAll() {
        this.customerForm.setValue({
            firstName: 'a',
            lastName: 'b',
            email: 'c',
            sendCatalog: false
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
}
