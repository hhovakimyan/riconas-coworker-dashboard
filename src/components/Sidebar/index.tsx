import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { sidebarStyles } from 'components/Sidebar/styles';
import ProjectTree from 'components/Sidebar/ProjectTree';
import { FetchProjectsListResponseDto } from 'services/models/Projects';
import { projectService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import ViewTypeSelect from 'components/Sidebar/ViewTypeSelect';

const Sidebar = () => {
  const [projects, setProjects] = useState<FetchProjectsListResponseDto | null>(
    null,
  );

  useEffect(() => {
    projectService.fetchList().then((data: FetchProjectsListResponseDto) => {
      setProjects(data);
    });
  }, []);

  return (
    <Drawer sx={sidebarStyles} variant="persistent" anchor="left" open>
      <ViewTypeSelect />
      {projects ? <ProjectTree treeItems={projects} /> : <LoadingSpinner />}
    </Drawer>
  );
};

export default Sidebar;
