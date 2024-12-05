import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({
      name: 'section_name',
      title: 'Section Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).error('Survey name is required'),
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'question' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Questions are required'),
    }),
  ],
});
