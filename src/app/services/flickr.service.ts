import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
  prevKeyword: string;
  currPage = 1;

  constructor(private http: HttpClient) {}

  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;
      const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=99999&page=${this.currPage}`;

    return this.http.get(this.url + params).pipe(map((res: FlickrOutput) => {
      return res.photos.photo.map((ph: FlickrPhoto) => (
        {
          ...ph,
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
        }
      ));
    }));
  }
}
