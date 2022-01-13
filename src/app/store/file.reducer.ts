import * as Action from './file.actions';
import { FileFolder } from '../model/file-folder';

const initState = {
    folders: [],
    dataLoaded: false,
}

export function fileReducer(
    state = initState,
    action: {
        type: string,
        payload?: any,
    }
) {

    switch (action.type) {

        // SET LOADED DATA
        case Action.SET_DATA:
            return {
                ...state,
                folders: action.payload,
                dataLoaded: true
            }

        // FILE REDUCER
        // ADD FILE
        case Action.ADD_FILE:
            return {
                ...state,
                folders: [
                    ...state.folders,
                    action.payload
                ]
            }

        // EDIT FILE
        case Action.EDIT_FILE:
            const allFiles: FileFolder[] = [...state.folders];
            const fileIndex = allFiles.findIndex((item: FileFolder) => item.id === action.payload.id);
            const selectedFile: FileFolder = allFiles[fileIndex];
            const updatedFile: FileFolder = { ...selectedFile, ...action.payload };
            allFiles[fileIndex] = updatedFile;
            return {
                ...state,
                folders: allFiles,
            }

        // DELETE FILE
        case Action.DELETE_FILE:
            const undeletedFiles = [...state.folders].filter((item: FileFolder) => item.id !== action.payload);
            return {
                ...state,
                folders: undeletedFiles,
            }

        // FOLDERS REDUCER
        // ADD FOLDER
        case Action.ADD_FOLDER:
            return {
                ...state,
                folders: [
                    ...state.folders,
                    action.payload
                ]
            }

        // EDIT FOLDER
        case Action.EDIT_FOLDER:
            const allFolders: FileFolder[] = [...state.folders];
            const folderIndex = allFolders.findIndex((item: FileFolder) => item.id === action.payload.id);
            const selectedFolder: FileFolder = allFolders[folderIndex];
            const updatedFolder: FileFolder = { ...selectedFolder, ...action.payload };
            allFolders[folderIndex] = updatedFolder;
            return {
                ...state,
                folders: allFolders,
            }

        // DELETE FOLDER
        case Action.DELETE_FOLDER:
            const filteredFolders = [...state.folders].filter((item: FileFolder) => item.id !== action.payload);
            return {
                ...state,
                folders: filteredFolders,
            }

        // RETURN DEFAULT STATE
        default: return state;
    };
}

