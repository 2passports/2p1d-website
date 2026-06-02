// This file controls the Travel Resources page.
//
// HOW TO ADD OR UPDATE A RESOURCE:
//   1. Find the category you want to add it to (e.g. 'Flights').
//   2. Copy one of the existing entries and paste it below the last one in that category.
//   3. Fill in the name, description, url, and optionally a note.
//   4. Save the file. The website updates automatically.
//
// HOW TO ADD A NEW CATEGORY:
//   1. Add the category name to the categories list below.
//   2. Add resources with that exact category name in the resources list.
//
// HOW TO REMOVE A RESOURCE:
//   Delete the entire block for that resource, from the opening { to the closing },
//
// NOTES ON COPY:
//   Keep descriptions factual. Only say things you have personally experienced
//   or can honestly stand behind.

export type Resource = {
  name: string
  description: string
  url: string
  category: string
  note?: string
}

// The order of categories here controls the order they appear on the page.
export const categories: string[] = [
  'Flights',
  'Accommodation',
  'Insurance & Safety',
  'Transport',
  'Money & Cards',
  'Apps & Tools',
]

export const resources: Resource[] = [

  // FLIGHTS
  {
    category: 'Flights',
    name: 'Replace with flight search site name',
    description: 'Replace with an honest description of why you use or recommend this site.',
    url: 'https://replace-with-your-link.com',
  },
  {
    category: 'Flights',
    name: 'Replace with flight search site name',
    description: 'Replace with an honest description of why you use or recommend this site.',
    url: 'https://replace-with-your-link.com',
  },

  // ACCOMMODATION
  {
    category: 'Accommodation',
    name: 'Replace with accommodation site name',
    description: 'Replace with an honest description of why you use or recommend this site.',
    url: 'https://replace-with-your-link.com',
  },
  {
    category: 'Accommodation',
    name: 'Replace with accommodation site name',
    description: 'Replace with an honest description of why you use or recommend this site.',
    url: 'https://replace-with-your-link.com',
  },

  // INSURANCE & SAFETY
  {
    category: 'Insurance & Safety',
    name: 'Replace with insurance or safety resource name',
    description: 'Replace with an honest description of why you use or recommend this resource.',
    url: 'https://replace-with-your-link.com',
    note: 'Optional: add a note here, such as a discount code or something specific to mention.',
  },

  // TRANSPORT
  {
    category: 'Transport',
    name: 'Replace with car hire or transport site name',
    description: 'Replace with an honest description of why you use or recommend this site.',
    url: 'https://replace-with-your-link.com',
  },

  // MONEY & CARDS
  {
    category: 'Money & Cards',
    name: 'Replace with travel card or money app name',
    description: 'Replace with an honest description of why you use or recommend this product.',
    url: 'https://replace-with-your-link.com',
    note: 'Optional: add a referral code or note here.',
  },

  // APPS & TOOLS
  {
    category: 'Apps & Tools',
    name: 'Replace with app or tool name',
    description: 'Replace with an honest description of why you use or recommend this app.',
    url: 'https://replace-with-your-link.com',
  },
  {
    category: 'Apps & Tools',
    name: 'Replace with app or tool name',
    description: 'Replace with an honest description of why you use or recommend this app.',
    url: 'https://replace-with-your-link.com',
  },

]
