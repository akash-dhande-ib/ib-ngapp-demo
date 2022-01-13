import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class FileService {
    itemSelected = new Subject<number | null>();
    addEditAction = new Subject<{}>();

    constructor(private http: HttpClient) { }

    public fetchFiles(): Observable<any> {
        return this.http.get("./assets/dummy-data.json");
    }
}