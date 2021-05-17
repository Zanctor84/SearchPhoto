import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlickrPhoto } from './flickr.service';

@Injectable({ providedIn: 'root' })
export class BookmarksService {
  private bookmarksSub = new BehaviorSubject<FlickrPhoto[]>(null);
  bookmarks$ = this.bookmarksSub.asObservable();

  get bookmarks(): FlickrPhoto[] {
    return this.bookmarksSub.getValue();
  }

  set bookmarks(bookmarks: FlickrPhoto[]) {
    this.bookmarksSub.next(bookmarks);
  }

  loadBookmarks(): void {
    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
  }

  addImageToBookmarks(image: FlickrPhoto): void {
    const bookmarks = [...this.bookmarks, image];
    this.bookmarks = bookmarks;
    this.saveBookmarks(this.bookmarks);
  }

  removeImageFromBookmarks(image: FlickrPhoto): void {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== image.id);
    this.saveBookmarks(this.bookmarks);
  }

  private saveBookmarks(bookmarks: FlickrPhoto[]): void {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}
