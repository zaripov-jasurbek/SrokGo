import { Types } from 'mongoose';

export function toObjectId(id: string) {
  return Types.ObjectId.createFromHexString(id);
}
