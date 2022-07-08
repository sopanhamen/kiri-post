import EAuth from "@shared/enum/auth.enum";

const icon = "/assets/menu-icon/default.png"
const admin = [
    // admin sidebar
    {
        href: '/admin/dashboard',
        icon: icon,
        title: 'Dashboard',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        showSubmenu: false
    },
    {
        href: '/admin/fundraisers',
        icon: icon,
        title: 'Campaigns',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        showSubmenu: false
    },
    {
        href: '/admin/donations#',
        icon: icon,
        title: 'Donations',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        items: [
          {
            href: '/admin/donations',
            key: 'Donations',
            title: 'Donations',
          },
          {
            href: '/admin/donations/top-donors',
            key: 'Donors',
            title: 'Top Donors',
          },
        ],
        showSubmenu: false
    },
    {
        href: '/admin/withdrawals',
        icon: icon,
        title: 'Withdrawals',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        showSubmenu: false
    },
    {
        href: '/admin/blog',
        icon: icon,
        title: 'Blog',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        showSubmenu: false
    },
    {
        href: '/admin/auction#',
        icon: icon,
        title: 'Auction',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        items: [
            {
              href: '/admin/auction/setup',
              key: 'Setup',
              title: 'Setup',
            },
            {
              href: '/admin/auction/winner',
              key: 'Winner',
              title: 'Winner',
            },
        ],
        showSubmenu: false
    },
    {
        href: '/admin/sponsorship#',
        icon: icon,
        title: 'Sponsorship',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        items: [
            {
              href: '/admin/sponsorship/sponsor',
              key: 'Sponsor',
              title: 'Sponsor',
            },
            {
              href: '/admin/sponsorship/advertisement',
              key: 'Advertisement',
              title: 'Advertisement',
            },
        ],
        showSubmenu: false
    },
    {
        href: '/admin/user',
        icon: icon,
        title: 'KhmerCare Users',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        showSubmenu: false
    },
    {
        href: '/admin/report',
        icon: icon,
        title: 'Report',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        showSubmenu: false
    },
    {
        href: '#',
        icon: icon,
        title: 'Admin',
        permissions: EAuth?.EAdminPermissions?.LOGIN,
        items: [
            {
              href: '/admin/admin-user/admin-members',
              key: 'Admin-Members',
              title: 'Admin Members',
            },
            {
              href: '/admin/admin-user/organization',
              key: 'Organization',
              title: 'Organization',
            },
        ],
        showSubmenu: false
    },
];

const navigation = {
	admin,
};

export default navigation;
