import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { selectStyles, wrapperStyles } from 'components/Sidebar/ViewTypeSelect/styles';

const viewTypes = [
  'overview',
  'mounting'
];

const ViewTypeSelect = () => {
  const { t } = useTranslation('house-connections', { keyPrefix: 'viewType' });
  const [viewType, setViewType] = useState<string>(viewTypes[0]);

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
          viewTypes.map((viewTypeOption) =>
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