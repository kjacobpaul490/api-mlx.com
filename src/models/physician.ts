/**
 * Physician entity representing provider details.
 */
export interface Physician {

    Guid: string;                         // Unique physician identifier
    Npi: string;                          // National Provider Identifier (NPI)
    Name: string;

    // Contact information
    PhoneNumber: string;
    AlternativePhoneNumber: string | null;

    EnumerationDate: Date;                     // Date when NPI was assigned
    NpiType: string;                           // Type 1 (Individual) / Type 2 (Organization)
    IsSoleProprietor: boolean;                 // Whether provider is a sole proprietor

    IsActive: boolean;                         // Active/inactive status

    // Practice location details
    MailingAddress: string;
    PrimaryPracticeAddress: string;
    SecondaryPracticeAddress: string | null;
}
