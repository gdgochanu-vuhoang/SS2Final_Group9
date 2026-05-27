export const sidebarOptions = [
  {
    name: 'Home',
    icon: 'i-heroicons-home-solid',
    path: '/dashboard',
  },
  {
    name: 'Scholarships',
    icon: 'i-heroicons-academic-cap-solid',
    path: '/dashboard/scholarships',
  },

  {
    name: 'Manage Students',
    icon: 'i-heroicons-users-solid',
    path: '/dashboard/admin/manage-students',
    roles: ['ADMIN'],
  },
  {
    name: 'Manage Applications',
    icon: 'i-heroicons-clipboard-document-solid',
    path: '/dashboard/admin/manage-applications',
    roles: ['ADMIN', 'ORGANIZER'],
  },
  {
    name: 'Manage Scholarships',
    icon: 'i-heroicons-clipboard-document-solid',
    path: '/dashboard/admin/manage-scholarships',
    roles: ['ADMIN', 'ORGANIZER'],
  },
  {
    name: 'Manage Organizers',
    icon: 'i-heroicons-users-solid',
    path: '/dashboard/admin/manage-organizers',
    roles: ['ADMIN'],
  },
  {
    name: 'Manage Hub Assistant',
    icon: 'i-heroicons-sparkles-solid',
    path: '/dashboard/admin/manage-knowledge',
    roles: ['ADMIN'],
  },
]
