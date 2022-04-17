import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FriendshipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Friendship {
  readonly id: string;
  readonly sender?: User | null;
  readonly receiver?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly friendshipSenderId?: string | null;
  readonly friendshipReceiverId?: string | null;
  constructor(init: ModelInit<Friendship, FriendshipMetaData>);
  static copyOf(source: Friendship, mutator: (draft: MutableModel<Friendship, FriendshipMetaData>) => MutableModel<Friendship, FriendshipMetaData> | void): Friendship;
}

export declare class User {
  readonly id: string;
  readonly username?: string | null;
  readonly netflix?: boolean | null;
  readonly prime?: boolean | null;
  readonly approvedContentIMDBID?: string | null;
  readonly unapprovedContentIMDBID?: string | null;
  readonly awsID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}