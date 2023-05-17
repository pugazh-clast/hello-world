import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import{ Post } from './post.model';
import { Subject } from 'rxjs';
import{ map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {

  }

  getPosts() {
    this.httpClient.get<{message:string, posts:any}>("http://localhost:3000/api/posts")
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
        title: post.title,
        content: post.content,
        id: post._id
      };
    });
    }))
    .subscribe((formattedPost) => {
      this.posts = formattedPost;
      this.postUpdated.next([...this.posts]);
    });
    //return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  addPosts(id:null, title:string, content:string) {
    const post: Post = {id:null, title:title, content:content};
    this.httpClient.post<{message:"string"}>("http://localhost:3000/api/posts", post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });


  }
}
