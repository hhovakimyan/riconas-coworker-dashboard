class NvtItem {
  id!: string;

  code!: string;
}

class SubprojectItem {
  id!: string;

  code!: string;

  nvt!: NvtItem[];
}

class ProjectApiItem {
  id!: string;

  name!: string;

  code!: string;

  subprojects!: SubprojectItem[];
}

class ClientApiItem {
  id!: string;

  name!: string;

  projects!: ProjectApiItem[]
}

export class FetchProjectsListResponseDto {
  items!: ClientApiItem[]
}