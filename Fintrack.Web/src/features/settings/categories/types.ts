export interface Category {
    id:          string;
    name:        string;
    description: string;
    type:        string;
    parentId:    ParentID | null;
}

export interface ParentID {
    value: string;
}
