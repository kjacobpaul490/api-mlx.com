/**
 * Facility entity representing a single facility record.
 */
export interface Facility {
    Guid: string;                 // Unique ID
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

    // Details of the facility's primary point of contact
    PrimaryInchargeName: string;
    PrimaryInchargeMobileNumber: string;
    PrimaryInchargeDesignation: string | null;

    IsActive: boolean;            // Whether the facility is active
    ResultCommunicationMethod: string; // Email/SMS/Portal, etc.
}
