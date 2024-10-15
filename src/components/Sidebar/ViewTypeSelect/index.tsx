import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { SetStateAction } from 'react';

import { selectStyles, wrapperStyles } from 'components/Sidebar/ViewTypeSelect/styles';
import { VIEW_TYPES } from 'constants/main';

type Props = {
  viewType: string;
  setViewType: React.Dispatch<SetStateAction<string>>;
}

const ViewTypeSelect = ({viewType, setViewType}: Props) => {
  const { t } = useTranslation('house-connections', { keyPrefix: 'viewType' });

  const handleChange = (event: SelectChangeEvent) => {
    setViewType(event.target.value as string);
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
        {
          VIEW_TYPES.map((viewTypeOption) =>
            <MenuItem
              key={`view-type-${viewTypeOption}`}
              value={viewTypeOption}
            >
              {t(`options.${viewTypeOption}`)}
            </MenuItem>
          )
        }
      </Select>
    </Box>
  )
};

export default ViewTypeSelect;