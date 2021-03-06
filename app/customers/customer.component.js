"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var customer_1 = require('./customer');
function ratingRange(c) {
    if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
        return { 'range': true };
    }
    return null;
}
function ratingRangeWithParams(min, max) {
    return function (c) {
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
}
function badNames(names) {
    return function (c) {
        var hasBadName = names.find(function (name) { return c.value.toLowerCase() === name.toLowerCase(); });
        if (c.value !== undefined && hasBadName) {
            return { 'name': true };
        }
        return null;
    };
}
function emailMatcher(c) {
    var emailControl = c.get('email');
    var confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}
var CustomerComponent = (function () {
    function CustomerComponent(FormBuilder) {
        this.FormBuilder = FormBuilder;
        this.customer = new customer_1.Customer();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.customerForm = this.FormBuilder.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3), badNames(['haven', 'judy'])]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(3)]],
            emailGroup: this.FormBuilder.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', [forms_1.Validators.required]]
            }, { validator: emailMatcher }),
            phone: [''],
            notification: ['email'],
            rating: ['', [forms_1.Validators.required, ratingRangeWithParams(1, 3)]],
            sendCatalog: ['']
        });
    };
    CustomerComponent.prototype.setNotification = function (notifyVia) {
        var phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(forms_1.Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };
    CustomerComponent.prototype.populateTestData = function () {
        this.customerForm.patchValue({
            firstName: 'fister'
        });
    };
    CustomerComponent.prototype.giveMeAll = function () {
        this.customerForm.setValue({
            firstName: 'a',
            lastName: 'b',
            email: 'c',
            sendCatalog: false
        });
    };
    CustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'my-signup',
            templateUrl: './app/customers/customer.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map