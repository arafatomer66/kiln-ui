export interface DocLink {
  readonly slug: string;
  readonly label: string;
}

export interface DocGroup {
  readonly heading: string;
  readonly items: DocLink[];
}

export const COMPONENT_GROUPS: DocGroup[] = [
  {
    heading: 'Foundation',
    items: [
      { slug: 'button',    label: 'Button' },
      { slug: 'input',     label: 'Input' },
      { slug: 'textarea',  label: 'Textarea' },
      { slug: 'checkbox',  label: 'Checkbox' },
      { slug: 'radio',     label: 'Radio' },
      { slug: 'switch',    label: 'Switch' },
      { slug: 'badge',     label: 'Badge' },
      { slug: 'chip',      label: 'Chip' },
      { slug: 'avatar',    label: 'Avatar' },
      { slug: 'spinner',   label: 'Spinner' },
      { slug: 'progress',  label: 'Progress' },
      { slug: 'divider',   label: 'Divider' },
      { slug: 'card',      label: 'Card' },
      { slug: 'alert',     label: 'Alert' },
    ],
  },
  {
    heading: 'Overlay',
    items: [
      { slug: 'tooltip',   label: 'Tooltip' },
      { slug: 'dropdown',  label: 'Dropdown' },
      { slug: 'menu',      label: 'Menu' },
      { slug: 'select',    label: 'Select' },
      { slug: 'modal',     label: 'Modal' },
      { slug: 'drawer',    label: 'Drawer' },
      { slug: 'toast',     label: 'Toast' },
    ],
  },
  {
    heading: 'Composite',
    items: [
      { slug: 'tabs',        label: 'Tabs' },
      { slug: 'accordion',   label: 'Accordion' },
      { slug: 'stepper',     label: 'Stepper' },
      { slug: 'pagination',  label: 'Pagination' },
      { slug: 'date-picker', label: 'Date Picker' },
      { slug: 'table',       label: 'Table' },
    ],
  },
  {
    heading: 'Advanced',
    items: [
      { slug: 'skeleton',           label: 'Skeleton' },
      { slug: 'empty-state',        label: 'Empty State' },
      { slug: 'otp-input',          label: 'OTP Input' },
      { slug: 'phone-input',        label: 'Phone Input' },
      { slug: 'combobox',           label: 'Combobox' },
      { slug: 'file-upload',        label: 'File Upload' },
      { slug: 'date-range-picker',  label: 'Date Range Picker' },
      { slug: 'command-palette',    label: 'Command Palette' },
    ],
  },
  {
    heading: 'Extended',
    items: [
      { slug: 'sparkline',  label: 'Sparkline' },
      { slug: 'stat-card',  label: 'Stat Card' },
      { slug: 'slider',     label: 'Slider' },
      { slug: 'tag-input',  label: 'Tag Input' },
      { slug: 'tree',       label: 'Tree' },
      { slug: 'calendar',   label: 'Calendar' },
    ],
  },
  {
    heading: 'Pro',
    items: [
      { slug: 'form-field',           label: 'Form Field' },
      { slug: 'time-picker',          label: 'Time Picker' },
      { slug: 'number-format-input',  label: 'Number Format Input' },
      { slug: 'color-picker',         label: 'Color Picker' },
      { slug: 'rating',               label: 'Rating' },
      { slug: 'avatar-group',         label: 'Avatar Group' },
      { slug: 'breadcrumbs',          label: 'Breadcrumbs' },
      { slug: 'page-state',           label: 'Page State' },
      { slug: 'loading-bar',          label: 'Loading Bar' },
      { slug: 'confirm',              label: 'Confirm Dialog' },
      { slug: 'bottom-sheet',         label: 'Bottom Sheet' },
      { slug: 'action-sheet',         label: 'Action Sheet' },
      { slug: 'pull-to-refresh',      label: 'Pull to Refresh' },
      { slug: 'tour',                 label: 'Tour' },
      { slug: 'virtual-table',        label: 'Virtual Table' },
    ],
  },
];

export const ALL_COMPONENT_SLUGS = COMPONENT_GROUPS.flatMap((g) => g.items.map((i) => i.slug));
