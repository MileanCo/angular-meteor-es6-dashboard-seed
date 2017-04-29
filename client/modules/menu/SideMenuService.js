
export function SideMenuService ( $location ) {
  var sections = [
    { name: 'Home',
      state: 'home',
      type: 'link' },
    { name: 'Dashboard ',
      state: 'dashboard.home',
      type: 'link',
      icon: 'dashboard',
     },
  ];

  sections.push({
    name: 'Pages',
    type: 'toggle',
    pages: [
      {
        name: 'Login',
        type: 'link',
        state: 'login',
        icon: ''
      }, {
        name: 'Register',
        state: 'register',
        type: 'link',
        icon: ''
      }, {
        name: 'Reset Password',
        state: 'resetpw',
        type: 'link',
        icon: ''
      }
    ]
  });

  var self;

  return self = {
    sections: sections,

    toggleSelectSection: function (section) {
      self.openedSection = (self.openedSection === section ? null : section);
    },
    isSectionSelected: function (section) {
      return self.openedSection === section;
    },

    selectPage: function (section, page) {
      page && page.url && $location.path(page.url);
      self.currentSection = section;
      self.currentPage = page;
    }
  }
};
