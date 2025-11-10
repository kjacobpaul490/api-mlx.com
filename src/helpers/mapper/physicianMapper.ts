import type { Physician } from "../../models/physician.js";

class PhysicianMapper {
    mapToPhysician(dbRecord: any): Physician {
        return {
            Guid: dbRecord.guid,
            Npi: dbRecord.npi,
            Name: dbRecord.name,
            PhoneNumber: dbRecord.phone_number,
            AlternativePhoneNumber: dbRecord.alternative_phone_number || null,
            EnumerationDate: new Date(dbRecord.enumeration_date),
            NpiType: dbRecord.npiType,
            IsSoleProprietor: dbRecord.is_sole_proprietor,
            IsActive: dbRecord.is_active,
            MailingAddress: dbRecord.mailing_address,
            PrimaryPracticeAddress: dbRecord.primary_practice_address,
            SecondaryPracticeAddress: dbRecord.secondary_practice_address || null,
        };
    }
}
export default PhysicianMapper;