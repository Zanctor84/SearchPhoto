import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarksService } from '../services/bookmarks.service';
import { FlickrPhoto } from '../services/flickr.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {
  bookmarks$: Observable<FlickrPhoto[]>;

  constructor(private service: BookmarksService) {}

  ngOnInit(): void {
    this.service.loadBookmarks();
    this.bookmarks$ = this.service.bookmarks$;
  }

  removeImageFromBookmarks(image: FlickrPhoto): void {
    this.service.removeImageFromBookmarks(image);
  }
}
