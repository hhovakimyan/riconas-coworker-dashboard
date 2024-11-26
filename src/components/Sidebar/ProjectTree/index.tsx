import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import {
  setFilterClientId,
  setFilterProjectId,
  setFilterSubprojectId,
  setFilterNvtId,
} from 'store/sidebarSlice';
import { useAppDispatch } from 'store/hooks';

import { FetchProjectsListResponseDto } from 'services/models/Projects';
import { wrapperStyles } from 'components/Sidebar/ProjectTree/styles';

type Props = {
  treeItems: FetchProjectsListResponseDto;
};

const ProjectTree = ({ treeItems }: Props) => {
  const dispatcher = useAppDispatch();

  return (
    <SimpleTreeView sx={wrapperStyles}>
      {treeItems.items.map((client) => (
        <TreeItem
          key={`client-${client.id}`}
          itemId={`client-${client.id}`}
          label={client.name}
          onClick={() => {
            dispatcher(setFilterClientId(client.id));
          }}
        >
          {client.projects.map((project) => (
            <TreeItem
              key={`project-${project.id}`}
              itemId={`project-${project.id}`}
              label={project.name}
              onClick={() => {
                dispatcher(setFilterProjectId(project.id));
              }}
            >
              {project.subprojects.map((subproject) => (
                <TreeItem
                  key={`subproject-${subproject.id}`}
                  itemId={`subproject-${subproject.id}`}
                  label={subproject.code}
                  onClick={() => {
                    dispatcher(setFilterSubprojectId(subproject.id));
                  }}
                >
                  {subproject.nvt.map((nvt) => (
                    <TreeItem
                      itemId={`nvt-${nvt.id}`}
                      key={`nvt-${nvt.id}`}
                      label={nvt.code}
                      onClick={() => {
                        dispatcher(setFilterNvtId(nvt.id));
                      }}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </SimpleTreeView>
  );
};

export default ProjectTree;
