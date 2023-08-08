class Customer {
    FirstName = '';
    LastName = '';
    Gender = '';
    MobileNumber = '';
    Age = 0;
    //Methods
    customerInfo() {
        return `Name: ${this.FirstName}${this.LastName}\nAge: ${this.Age}\nGender ${this.Gender}\n Contact: ${this.MobileNumber}\n`;
    }
}
export {};
