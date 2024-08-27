import { Mongoose, Schema, Model } from 'mongoose';
import { GnosisTokenBalanceSnapshotDocumentType } from '../database/gnosisTokenBalanceSnapshot';
import { mongooseSchemaAddressField, mongooseSchemaWeekIdField } from './sharedSchemaFields';

export const gnosisTokenBalanceSnapshotModelName = 'GnosisTokenBalanceSnapshot' as const;

export const gnosisTokenBalanceSnapshotSchema = new Schema<GnosisTokenBalanceSnapshotDocumentType>({
  weekId: mongooseSchemaWeekIdField,
  safe: {
    ...mongooseSchemaAddressField,
    ref: 'GnosisPaySafeAddress',
    required: true,
  },
  balanceRaw: { type: String, required: true },
  balance: { type: Number, required: true },
  blockNumber: { type: Number, required: true },
  blockTimestamp: { type: Number, required: true },
})
  // composite index
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .index({ safe: 1, blockNumber: 1 }, { unique: true });

type GnosisTokenBalanceSnapshotModel = Model<GnosisTokenBalanceSnapshotDocumentType>;

export function createGnosisTokenBalanceSnapshotModel(mongooseConnection: Mongoose): GnosisTokenBalanceSnapshotModel {
  // Return cached model if it exists
  if (mongooseConnection.models[gnosisTokenBalanceSnapshotModelName]) {
    return mongooseConnection.models[gnosisTokenBalanceSnapshotModelName] as GnosisTokenBalanceSnapshotModel;
  }

  return mongooseConnection.model(gnosisTokenBalanceSnapshotModelName, gnosisTokenBalanceSnapshotSchema);
}
