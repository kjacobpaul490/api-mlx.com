export interface Physician {
    Guid: string;
    Npi: string;
    Name: string;
    PhoneNumber: string;
    AlternativePhoneNumber: string | null;
    EnumerationDate: Date;
    NpiType: string;
    IsSoleProprietor: boolean;
    IsActive: boolean;
    MailingAddress: string;
    PrimaryPracticeAddress: string;
    SecondaryPracticeAddress: string | null;
}
