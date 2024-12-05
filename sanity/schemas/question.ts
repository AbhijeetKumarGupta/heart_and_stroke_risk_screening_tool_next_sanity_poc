import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'question',
    title: 'Question',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().min(1).error('Title is required'),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(1).error('Name is required'),
        }),
        defineField({
            name: 'multipleSelect',
            title: 'Multiple Select',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'isRequired',
            title: 'Mandatory Field',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'options',
            title: 'Options',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'option' }],
                },
            ],
            validation: (Rule) => Rule.required().min(1).error('options are required'),
        }),
        defineField({
            name: 'subQuestions',
            title: 'Sub Questions',
            type: 'array',
            of: [
                { type: 'reference', name: 'subQuestions', to: [{ type: 'question' }] }
            ],
        }),
    ],
});
