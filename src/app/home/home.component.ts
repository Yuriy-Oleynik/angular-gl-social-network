import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import {TranslateService} from '@ngx-translate/core';
import {I18nServiceService} from '../shared/i18n-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService,
              private translate: TranslateService,
              private i18nService: I18nServiceService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post.sort().reverse();
    });
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
  }

}
