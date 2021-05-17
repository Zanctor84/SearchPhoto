import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BookmarksService } from '../services/bookmarks.service';
import { FlickrPhoto, FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit, OnDestroy {
  images$: Observable<FlickrPhoto[]>;
  inputControl = new FormControl('');
  private destroyed$: Subject<void> = new Subject();

  constructor(private flickrService: FlickrService, private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.inputControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe(filter => this.search(filter));

    this.bookmarksService.loadBookmarks();
  }

  search(filter: string): void {
    this.images$ = filter ? this.flickrService.search_keyword(filter) : of([]);
  }

  addImageToBookmarks(image: FlickrPhoto): void {
    this.bookmarksService.addImageToBookmarks(image);
  }

  removeImageFromBookmarks(image: FlickrPhoto): void {
    this.bookmarksService.removeImageFromBookmarks(image);
  }

  isBookmarked(image: FlickrPhoto): boolean {
    return this.bookmarksService.bookmarks.some(bookmark => bookmark.id === image.id);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}


