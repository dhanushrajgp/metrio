
export interface Form {
    id: number | string;
    name: string;
    tags:FormTags[]
}

export interface FormTags {
    name: string;
    choices: string[];
}

export interface DataEntries{
    id:number | string;
    formId:number | string;
    date: string;
    note?: string;
    tags:object;
    value:number;
}