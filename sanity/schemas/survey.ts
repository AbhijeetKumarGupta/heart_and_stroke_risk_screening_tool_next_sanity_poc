import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'survey',
  title: 'Survey',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).error('Name is required'),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'section' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Sections are required'),
    }),
    defineField({
      name: 'max_score',
      title: 'Max Score',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).error('Max score is required'),
    }),
  ],
});
