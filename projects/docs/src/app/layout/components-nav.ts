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
];

export const ALL_COMPONENT_SLUGS = COMPONENT_GROUPS.flatMap((g) => g.items.map((i) => i.slug));
