import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setViewType } from 'store/sidebarSlice';

import {
  selectStyles,
  wrapperStyles,
} from 'components/Sidebar/ViewTypeSelect/styles';
import { VIEW_TYPES } from 'constants/main';
import { ViewType } from 'types/sidebar';

const ViewTypeSelect = () => {
  const dispatcher = useAppDispatch();

  const { t } = useTranslation('house-connections', { keyPrefix: 'viewType' });
  const viewType = useAppSelector((state) => state.sidebar.viewType);

  const handleChange = (event: SelectChangeEvent) => {
    dispatcher(setViewType(event.target.value as ViewType));
  };

  return (
    <Box sx={wrapperStyles}>
      <Typography fontWeight="bold">{t('label')}:</Typography>
      <Select
        variant="outlined"
        size="small"
        value={viewType}
        onChange={handleChange}
        sx={selectStyles}
      >
        {VIEW_TYPES.map((viewTypeOption) => (
          <MenuItem key={`view-type-${viewTypeOption}`} value={viewTypeOption}>
            {t(`options.${viewTypeOption}`)}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ViewTypeSelect;
