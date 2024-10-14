import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetUserDetailsResponseDto } from 'services/models/User';
import { projectService, userService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import { cardListWrapperStyles, wrapperStyles } from 'pages/HomePage/styles';
import { FetchProjectsListResponseDto } from 'services/models/Projects';
import ProjectTree from 'pages/HomePage/ProjectTree';


const HomePage = () => {
  const { t } = useTranslation('homepage');
  const navigate = useNavigate();

  const [coworkerData, setCoworkerData] = useState<GetUserDetailsResponseDto | null>(null);
  const [projects, setProjects] = useState<FetchProjectsListResponseDto | null>(null);

  useEffect(() => {
    userService
      .getDetails()
      .then((userDetails: GetUserDetailsResponseDto) => {
        setCoworkerData(userDetails);
      })
  }, []);

  useEffect(() => {
    projectService
      .fetchList()
      .then((data: FetchProjectsListResponseDto) => {
        setProjects(data);
      })
  }, []);

  const onBrowseBtnClick = () => {
    navigate('/house-connections');
  }

  return (
    <Box sx={wrapperStyles}>
      <Box sx={cardListWrapperStyles}>
        <Card>
          <CardHeader title={t('myTeam.title')} />
          <CardContent>
            {
              coworkerData ?
                <Typography>{coworkerData.company_name}</Typography> :
                <LoadingSpinner />
            }
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={t('myProjects.title')} />
          <CardContent>
            {
              projects ?
                <ProjectTree treeItems={projects} /> :
                <LoadingSpinner />
            }
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Button variant="contained" color="info" onClick={onBrowseBtnClick}>
          {t('houseConnectionsBtn')}
        </Button>
      </Box>
    </Box>
  )
};

export default HomePage