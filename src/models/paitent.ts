/**
 * Patient entity representing a single patient record.
 */
export interface Patient {

    Guid: string;                       // Unique patient identifier

    // Basic personal information
    FirstName: string;
    MiddleName: string | null;
    LastName: string;
    Gender: string;
    Dob: Date|null;

    // Contact details
    MobileNumber: string;
    AlternativeMobileNumber: string | null;
    Email: string;

    // Address information
    AddressLine1: string;
    AddressLine2: string | null;
    City: string;
    State: string;
    Zipcode: string;
    Country: string;

    // Demographic details
    Race: string | null;
    Ethnicity: string | null;

    // Medical-related info
    IsHomeboundPatient: boolean;
    IsHardStick: boolean;
    PatientNotes: string | null;
}
