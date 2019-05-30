import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusModel } from './status.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  status: StatusModel = {};
  statuses: Observable<StatusModel[]>;
  StatusModelCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore) {
    this.StatusModelCollection = afs.collection<StatusModel>('statusModel');
  }

  ngOnInit(): void {
    this.statuses = this.StatusModelCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StatusModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  public save() {
    this.StatusModelCollection.add(this.status);
    this.status = {};
  }

}
