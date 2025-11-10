export interface Facility {
    Guid: string;
    Name: string;
    MobileNumber: string;
    AlternativeMobileNumber: string | null;
    AddressLine1: string;
    AddressLine2: string | null;
    City: string;
    State: string;
    Zipcode: string;
    Country: string;
    Email: string;
    FaxNumber: string | null;
    PrimaryInchargeName: string;
    PrimaryInchargeMobileNumber: string;
    PrimaryInchargeDesignation: string | null;
    IsActive: boolean;
    ResultCommunicationMethod: string;
}
