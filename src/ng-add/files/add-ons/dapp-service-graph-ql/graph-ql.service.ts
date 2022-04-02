import { Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_POSTS = gql`
{
  gratitudeTokens(first: 5) {
    id
    status
    sender
    receiver
  }
  gratitudeCampaigns(first: 5) {
    id
    campaign_creator
    name
    status
  }
}
`;

@Injectable({
  providedIn: 'root',
})
export class GraphQlService {
  loading!: boolean;
  posts: any;
  postsQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  constructor(private apollo: Apollo) {}
  
  
 async  query() {
    // this.postsQuery = this.apollo.watchQuery<any>({
    //   query: GET_POSTS,
    //   pollInterval: 500,
    // });

  const posts = await  this.apollo.query<any>({
      query: GET_POSTS
    }).toPromise()

    console.log(posts)

    // this.querySubscription = this.postsQuery.valueChanges.subscribe(({ data, loading }) => {
    //   this.loading = loading;
    //   this.posts = data.posts;
    // });
  }
}
