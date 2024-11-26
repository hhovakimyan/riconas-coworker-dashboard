import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import {
  setClientId,
  setProjectId,
  setSubprojectId,
  setNvtId,
} from 'store/sidebarFilterSlice';
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
            dispatcher(setClientId(client.id));
          }}
        >
          {client.projects.map((project) => (
            <TreeItem
              key={`project-${project.id}`}
              itemId={`project-${project.id}`}
              label={project.name}
              onClick={() => {
                dispatcher(setProjectId(project.id));
              }}
            >
              {project.subprojects.map((subproject) => (
                <TreeItem
                  key={`subproject-${subproject.id}`}
                  itemId={`subproject-${subproject.id}`}
                  label={subproject.code}
                  onClick={() => {
                    dispatcher(setSubprojectId(subproject.id));
                  }}
                >
                  {subproject.nvt.map((nvt) => (
                    <TreeItem
                      itemId={`nvt-${nvt.id}`}
                      key={`nvt-${nvt.id}`}
                      label={nvt.code}
                      onClick={() => {
                        dispatcher(setNvtId(nvt.id));
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
