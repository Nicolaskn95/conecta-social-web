export interface ICategory {
   id: string;
   name: string;
   measure_unity: string;
   active: boolean;
   created_at: Date;
}

export interface IDonation {
   id?: string;
   category_id: string;
   category?: ICategory;
   name: string;
   description?: string | null;
   initial_quantity: number;
   current_quantity?: number;
   donator_name?: string | null;
   gender?: string | null;
   size?: string | null;
   active?: boolean;
   available?: boolean;
   created_at?: Date | null;
   updated_at?: Date | null;
}

export type DonationCreatePayload = Omit<
   IDonation,
   'id' | 'created_at' | 'updated_at' | 'current_quantity' | 'category'
>;

export type DonationUpdatePayload = Partial<
   Omit<
      IDonation,
      'id' | 'created_at' | 'updated_at' | 'initial_quantity' | 'current_quantity' | 'available' | 'category'
   >
>;

export type DonationStockAdjustmentReason =
   | 'SPOILAGE'
   | 'LOSS'
   | 'DAMAGE'
   | 'EXPIRATION'
   | 'INVENTORY_CORRECTION'
   | 'OTHER';

export interface DonationStockAdjustmentPayload {
   delta_quantity: number;
   reason: DonationStockAdjustmentReason;
   note?: string;
}
