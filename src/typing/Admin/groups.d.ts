
export interface GroupItemParams {
  page: number;
  size: number;
  sortField?: string
  direction?: string
  [propName: string]: string
}
export interface GroupItem {
	id: string;
	comment: string;
	dashboardGroupName: string;
  lastModifiedTime: number
  used: boolean
}


export interface CreateGroup {
	id?: string;
	comment: string;
	dashboardGroupName: string;
	allDashboardGroupMappings: DashInfoItem[];
	dashboardGroupMappings: { dashboardId }[];
}

export interface DashItem {
	id: string;
	title: string;
	positionJson: null;
	key: string;
  dashboardName: string;
	dashboardId: string;
}

export interface DashInfoItem {
	dashboardId: string;
}

export interface BoardDetail {
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
	displayName: string;
  id: string;
  key: string;
  index: number;

}
export interface NavListInfo {
  id: string;
  navigationName: string;
  dashboardGroupName: string;
	navigationGroups: Array<NavGroupItem>;
}

export type NavListData = Array<NavListInfo>

export interface SorterResult<RecordType> {
  column?: ColumnType<RecordType>;
  order?: SortOrder;
  field?: Key | readonly Key[];
  columnKey?: Key;
}
