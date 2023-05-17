import { Component, } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from "../post.model";
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.less']
})
export class PostCreateComponent {

  constructor(public postsService:PostsService) {

  }

  onAddPost(form: NgForm){
    if(form.invalid) {
      return;
    }
    const addPost: Post = {
      id:null,
      title: form.value.txtTitle,
      content: form.value.txtContent
    };
    this.postsService.addPosts(null,form.value.txtTitle, form.value.txtContent);

    form.resetForm();
  }
}
