import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommunityModel } from 'src/app/community/community-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { CommunityService } from 'src/app/community/community.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import {ImageUploadService} from '../../shared/image-upload/image-upload.service';
import {ToastrService} from 'ngx-toastr';
import {isNullOrUndefined} from "util";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  toFile;
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  communities: Array<CommunityModel>;

  constructor(private router: Router, private postService: PostService,
              private communityService: CommunityService, private imageUploadService: ImageUploadService,
              private toastr: ToastrService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      communityName: '',
      imageKey: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageKey: new FormControl('', Validators.required)
    });
    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    const file = this.toFile.item(0);
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.communityName = this.createPostForm.get('communityName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.imageUploadService.fileUploadToAws(file);
    this.postPayload.imageKey = file.name;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
      this.toastr.success('Post was created');
    }, error => {
      throwError(error);
      this.toastr.error('All fields should be filled!');
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

  submit() {
    const file = this.toFile.item(0);
    this.imageUploadService.fileUploadToAws(file);
  }

  onChange(event) {
    this.toFile = event.target.files;
  }

}
