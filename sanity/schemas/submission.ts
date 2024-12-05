import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'submission',
  title: 'Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).error('Name is required'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required().error('Email is required'),
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'point',
              title: 'Point',
              type: 'number',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'score',
      title: 'Score',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).error('Score is required'),
    }),
    defineField({
      name: 'max_score',
      title: 'Max Score',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).error('Max score is required'),
    }),
  ],
});
