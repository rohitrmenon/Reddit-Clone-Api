import Base from "./model.base";
import { Post } from "./model.post";
import { User } from "./model.user";
export class SubReddit extends Base {

  id!: string;
  name!: string;
  creatorId?: string;
  creator?: User;
  posts?: Post[];
  subscribers?: Subscription[];
  
  static get tableName() {
    return "subreddits";
  }

  static get idColumn(){
    return "id";
  }

  static get relationMappings() {
    return {
      creator: {},
      posts: {},
      subscribers: {},
    };
  }
}
