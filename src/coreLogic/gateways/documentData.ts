export interface DocumentData {
    [key: string]: DocFile;
}

export interface DocFile {
    name:         string;
    data:         Data;
    size:         number;
    encoding:     string;
    tempFilePath: string;
    truncated:    boolean;
    mimetype:     string;
    md5:          string;
    idDocument?:  string;
}

export interface Data {
    type: string;
    data: number[];
}