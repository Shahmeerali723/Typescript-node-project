class Customer{
    public FirstName:string='';
    public LastName:string='';
    public Gender:string='';
    public MobileNumber:string='';
    public Age:number=0;
    
//Methods

    public customerInfo():string{

        return `Name: ${this.FirstName}${this.LastName}\nAge: ${this.Age}\nGender ${this.Gender}\n Contact: ${this.MobileNumber}\n`
    }


}