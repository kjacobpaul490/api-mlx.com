/**
 * Facility entity representing a single facility record.
 */
export interface Facility {

    Guid: string;      // Unique facility identifier
    Name: string;

    // Contact information
    MobileNumber: string;
    AlternativeMobileNumber: string | null;
    Email: string;
    FaxNumber: string | null;

    // Address details
    AddressLine1: string;
    AddressLine2: string | null;
    City: string;
    State: string;
    Zipcode: string;
    Country: string;

    // Primary in-charge person details
    PrimaryInchargeName: string;
    PrimaryInchargeMobileNumber: string;
    PrimaryInchargeDesignation: string | null;

    IsActive: boolean;                    // Facility active status
    ResultCommunicationMethod: string;   // Email/SMS/Portal, etc.
}
