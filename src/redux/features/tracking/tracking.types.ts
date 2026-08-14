export type TOrderStatus =
  | "pending"
  | "preparing"
  | "ready_for_pickup"
  | "waiting_for_rider_acceptance"
  | "rider_assigned"
  | "picked_up"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface ITrackingLog {
  _id: string;
  trackingId: string;
  status: TOrderStatus;
  details: string;
  createdAt: string;
}
