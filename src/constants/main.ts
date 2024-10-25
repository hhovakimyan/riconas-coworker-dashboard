export const sidebarWidth = 300;

export const TABLE_DEFAULT_ROWS_PER_PAGE = 20;
export const TABLE_DEFAULT_START_PAGE = 0;

export const TABLE_ROWS_PER_PAGE_OPTIONS = [20, 50, 100];

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const VIEW_TYPE_MOUNTING = 'mounting';

export const VIEW_TYPE_BLOW_IN = 'blow_in';

export const VIEW_TYPES = [
  'overview',
  VIEW_TYPE_MOUNTING,
  VIEW_TYPE_BLOW_IN,
];

// This is the maximum size of all files which are being uploaded in one chunk
export const TOTAL_UPLOADED_FILES_MAX_SIZE = 30;