import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FriendshipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Friendship {
  readonly id: string;
  readonly requestAccepted?: boolean | null;
  readonly Receiver: User;
  readonly Sender: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly friendshipReceiverId: string;
  readonly friendshipSenderId: string;
  constructor(init: ModelInit<Friendship, FriendshipMetaData>);
  static copyOf(source: Friendship, mutator: (draft: MutableModel<Friendship, FriendshipMetaData>) => MutableModel<Friendship, FriendshipMetaData> | void): Friendship;
}

export declare class User {
  readonly id: string;
  readonly Netflix?: boolean | null;
  readonly Prime?: boolean | null;
  readonly approvedContentIMDBID?: (string | null)[] | null;
  readonly unapprovedContentIMDBID?: (string | null)[] | null;
  readonly friends?: (string | null)[] | null;
  readonly username: string;
  readonly awsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}