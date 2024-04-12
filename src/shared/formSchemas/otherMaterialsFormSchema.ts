import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, '*O nome é obrigatório.'),
  type: z.string(),
  imageLink: z.string(),
  value: z.string().min(1, '*O valor é obrigatório.'),
  weight: z.string().min(1, '*A medida é obrigatória.'),
  otherInformations: z.string(),
});

export type OtherMaterialsFormProps = z.infer<typeof formSchema>;

export const OtherMaterialsFormResolver = zodResolver(formSchema);
