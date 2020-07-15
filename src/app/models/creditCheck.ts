export class CreditCheckValues {
    /**
     *
     */
    constructor(public maritalStatuses: dropDownValues[], public contractTypes: dropDownValues[],
        public employmentStatuses: dropDownValues[], public nationalities: dropDownValues[],
        public propertyStatuses: dropDownValues[], public user: user) { }
}


export class dropDownValues {
    /**
     *
     */
    constructor(public id: number, public name: string) { }
}


export class user {
    /**
     *
     */
    constructor(public contact: string, public dateOfBirth: string,
        public email: string, public firstName: string,
        public lastName: string, public prefix: string) { }
}

export class creditCheck {
    /**
     *
     */
    constructor(public PersonalDetails: personalDetails,public EmploymentDetails: employmentDetails) { }
}

export class personalDetails {
    /**
     *
     */
    constructor(public addressLine1: string, public addressLine2: string, public addressLine3: string,
        public city: string, public livedSince: string, public maritalStatus: string,
        public nationality: string, public postCode: string, public registrationNumber: string,) { }
}

export class employmentDetails {
    /**
     *
     */
    constructor(public addressLine1: string, public addressLine2: string,
        public city: string, public postCode: string, public contractType: string,
        public employerName: string, public employmentStatus: string, public monthlyRent: number,
         public netIncome: number, public propertyStatus: string,public rentalIncome: number,
         public startDate: string,public creditCost: number) { }
}


