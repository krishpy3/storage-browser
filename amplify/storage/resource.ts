import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myProjectFiles',
  access: (allow) => ({
    'media/*': [
      allow.groups(['auditor']).to(['read']),
      allow.groups(['admin']).to(['read', 'write', 'delete'])
    ]
  })
});