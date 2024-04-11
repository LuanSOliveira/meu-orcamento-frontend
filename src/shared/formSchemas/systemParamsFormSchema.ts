import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  salary: z.string().min(1, '*O salario mensal é obrigatório.'),
  hours: z.string().min(1, '*As horas de trabalho são obrigatórias.'),
  percent: z.string().min(1, '*A porcentagem de lucro é obrigatória.'),
});

export type SystemParamsFormProps = z.infer<typeof formSchema>;

export const systemParamsFormResolver = zodResolver(formSchema);
