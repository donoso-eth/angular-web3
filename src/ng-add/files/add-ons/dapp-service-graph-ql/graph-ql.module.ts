import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQlService } from './graph-ql.service';
import {Apollo, ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GraphQlModule {
  static forRoot(config:{uri:string}): ModuleWithProviders<GraphQlModule> {
    return {
      ngModule: GraphQlModule,
      providers: [GraphQlService,Apollo,{
        provide: APOLLO_OPTIONS,
        useFactory: (httpLink: HttpLink) => {
          return {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: config.uri,
            }),
          };
        },
        deps: [HttpLink],
      }],
    };
  }
 }
