import type { MedicalRecord } from './medical-record.models';

export class MedicalAttachment {
  id: string;
  medicalRecordId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;

  // Relacionamentos (carregados quando necessário)
  medicalRecord?: MedicalRecord;
}
