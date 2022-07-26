export interface GroupItemParams {
  page: number;
  size: number;
  name?: string;
  sortField?: string;
  direction?: string;
  [propName: string]: string;
}

export interface AnchorInfo {
  anchorId: string;
  anchorName: string;
  id?: string;
  dashboardId?: string;
}
export interface GroupItem {
  id: string;
  comment: string;
  dashboardGroupName: string;
  lastModifiedTime: number;
  used: boolean;
  initValue: boolean;
}

export interface CreateGroup {
  id?: string;
  comment: string;
  dashboardGroupName: string;
  allDashboardGroupMappings: DashInfoItem[];
  dashboardGroupMappings: { dashboardId }[];
  [anchors: string]: AnchorInfo[];
}

export interface DashItem {
  id: string;
  title: string;
  positionJson: null;
  key: string;
  dashboardName: string;
  dashboardId: string;
  dashboardGroupId: string;
  dashboardGroupChartIdMappingList?: AnchorInfo[];
}

export interface DashInfoItem {
  dashboardId: string;
}

export interface BoardDetail {
  initValue: any;
  allDashboardGroupMappings: DashItem[];
  comment: string;
  createTime: string;
  dashboardGroupMappings: DashItem[];
  dashboardGroupName: string;
  id: string;
  lastModifiedTime: string;
  updateByName: string;
  used: boolean;
}

export interface NavGroupItem {
  dashboardGroupId: string;
  dashboardId: string;
  dashboardName: string;
  deleted: string;
  navigationId: string;
  displayName: string;
  id: string;
  key: string;
  index: number;
  [propName: string]: number;
}
export interface NavListInfo {
  id: string;
  navigationName: string;
  dashboardGroupName: string;
  dashboardGroupId: string;
  navigationGroups: Array<NavGroupItem>;
}

export type NavListData = Array<NavListInfo>;

export interface SorterResult<RecordType> {
  column?: ColumnType<RecordType>;
  order?: SortOrder;
  field?: Key | readonly Key[];
  columnKey?: Key;
}

export interface ViewPoint {
  id: string;
  content: string;
}
