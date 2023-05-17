import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts: any[]  = [
    // { title:"This is first Title", content: "First Post Content"},
    // { title:"This is second Title", content: "Second Post Content"},
    // { title:"This is third Title", content: "Third Post Content"},
  //];
  posts:Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {

  }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (post: Post[]) => {
        this.posts = post;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();

  }

}
