import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'option',
    title: 'Option',
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
            name: 'point',
            title: 'Point',
            type: 'number',
            initialValue: 1
        }),
        defineField({
            name: 'subfieldtype',
            title: 'Subfield Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Option', value: 'option' },
                    { title: 'Question', value: 'question' },
                    { title: 'None', value: 'none' },
                ],
            },
            initialValue: 'none',
            validation: (Rule) => Rule.required().error('Subfield Type is required'),
        }),
        defineField({
            name: 'optionSubField',
            title: 'Subfields',
            type: 'array',
            of: [
                { type: 'reference', name: 'optionSubField', to: [{ type: 'option' }] },
            ],
            hidden: ({ parent }) => parent?.subfieldtype !== 'option',
        }),
        defineField({
            name: 'questionSubField',
            title: 'Subfields',
            type: 'array',
            of: [
                { type: 'reference', name: 'questionSubField', to: [{ type: 'question' }] }
            ],
            hidden: ({ parent }) => parent?.subfieldtype !== 'question',
        }),
    ],
});
