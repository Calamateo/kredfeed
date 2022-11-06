export interface FormInput{
    companyData: CompanyData;
    representativeDetails: RepresentativeDetails
}

interface CompanyData {
    email: string;
    name: string;
    date: string;
    address: Address;
}

interface RepresentativeDetails {
    email: string;
    name: string;
    nationality: string;
    date: string;
    phone: number;
    address: Address;
}

interface Address {
    zipCode: number;
    street: string;
    numExt: string;
    numInt: string;
    settlement: string;
    Municipality: string;
    city: string;
    state: string;
    country: string;
}
