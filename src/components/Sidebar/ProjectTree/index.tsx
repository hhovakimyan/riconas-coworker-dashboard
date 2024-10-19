import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

import { FetchProjectsListResponseDto } from 'services/models/Projects';
import { wrapperStyles } from 'components/Sidebar/ProjectTree/styles';

type Props = {
  treeItems: FetchProjectsListResponseDto;
  onFilterSelect: (filter: Record<string, string>) => void;
}

const ProjectTree = ({treeItems, onFilterSelect}: Props) => (
  <SimpleTreeView sx={wrapperStyles}>
    {
      treeItems.items.map((client) => (
        <TreeItem
          key={`client-${client.id}`}
          itemId={`client-${client.id}`}
          label={client.name}
          onClick={() => {
            onFilterSelect({clientId: client.id})
          }}
        >
          {
            client.projects.map((project) => (
              <TreeItem
                key={`project-${project.id}`}
                itemId={`project-${project.id}`}
                label={project.name}
                onClick={() => {
                  onFilterSelect({projectId: project.id})
                }}
              >
                {
                  project.subprojects.map((subproject) =>
                    <TreeItem
                      key={`subproject-${subproject.id}`}
                      itemId={`subproject-${subproject.id}`}
                      label={subproject.code}
                      onClick={() => {
                        onFilterSelect({subprojectId: subproject.id})
                      }}
                    >
                      {
                        subproject.nvt.map((nvt) =>
                          <TreeItem
                            itemId={`nvt-${nvt.id}`}
                            key={`nvt-${nvt.id}`}
                            label={nvt.code}
                            onClick={() => {
                              onFilterSelect({nvtId: nvt.id})
                            }}
                          />
                        )
                      }
                    </TreeItem>)
                }
              </TreeItem>
            ))
          }
        </TreeItem>
      ))
    }
  </SimpleTreeView>
)

export default ProjectTree;