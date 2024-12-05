// schemas/categorySchema.ts
import { object, string, pipe, nonEmpty, minLength } from 'valibot'

export const CategorySchema = object({
  name: pipe(
    string(),
    nonEmpty('Category name is required'),
    minLength(3, 'Category name must be at least 3 characters long')
  ),
  description: pipe(string(), nonEmpty('Description is required')),
  status: pipe(string(), nonEmpty('Status is required'))
})
