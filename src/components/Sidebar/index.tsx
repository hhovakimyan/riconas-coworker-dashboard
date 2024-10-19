import { Drawer } from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';

import { sidebarStyles } from 'components/Sidebar/styles';
import ProjectTree from 'components/Sidebar/ProjectTree';
import { FetchProjectsListResponseDto } from 'services/models/Projects';
import { projectService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import ViewTypeSelect from 'components/Sidebar/ViewTypeSelect';

type Props = {
  viewType: string;
  setViewType: React.Dispatch<SetStateAction<string>>;
  onFilterSelect: (filter: Record<string, string>) => void;
}

const Sidebar = ({viewType, setViewType, onFilterSelect}: Props) => {
  const [projects, setProjects] = useState<FetchProjectsListResponseDto | null>(null);

  useEffect(() => {
    projectService
      .fetchList()
      .then((data: FetchProjectsListResponseDto) => {
        setProjects(data);
      })
  }, []);

  return (
    <Drawer
      sx={sidebarStyles}
      variant="persistent"
      anchor="left"
      open
    >
      <ViewTypeSelect viewType={viewType} setViewType={setViewType} />
      {
        projects ?
          <ProjectTree treeItems={projects} onFilterSelect={onFilterSelect} /> :
          <LoadingSpinner />
      }
    </Drawer>
  )
}

export default Sidebar;