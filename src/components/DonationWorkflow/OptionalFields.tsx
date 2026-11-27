'use client';
import { useQuery } from '@tanstack/react-query';
import { Controller, Control, UseFormRegister } from 'react-hook-form';
import { IFamily } from '@/core/family/model/IFamily';
import { ItemDetails, ItemType, workflow } from '@/data/services/donationWorkflow';

export function FamilyExtras({ control, register }: { control: Control<IFamily>; register: UseFormRegister<IFamily> }) {
   return <details className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">Informações adicionais</summary>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
         <Controller name="monthly_income_cents" control={control} render={({ field, fieldState }) =>
            <label>Renda familiar mensal aproximada (R$)
               <input className="input" inputMode="numeric" value={field.value == null ? '' : (field.value / 100).toFixed(2).replace('.', ',')}
                  onChange={e => { const digits = e.target.value.replace(/\D/g, ''); field.onChange(digits ? Number(digits) : null); }} />
               {fieldState.error && <span role="alert">{fieldState.error.message}</span>}
            </label>
         } />
         <label>Preferência de recebimento
            <Controller name="preferred_delivery_mode" control={control} render={({ field }) =>
               <select className="input" value={field.value ?? ''} onChange={e => field.onChange(e.target.value || null)}>
                  <option value="">Não informada</option><option value="PICKUP">Retirada</option><option value="DELIVERY">Entrega</option>
               </select>} />
         </label>
         <label className="sm:col-span-2">Condições de moradia
            <textarea className="input" maxLength={250} {...register('housing_description', { setValueAs: value => typeof value === 'string' ? value.trim() || null : value })} />
         </label>
      </div>
   </details>;
}

export function useItemTypes(category?: string, enabled = true) {
   return useQuery({ queryKey: ['item-types', category], enabled,
      queryFn: () => workflow<ItemType[]>('/item-types' + (category ? '?category_id=' + encodeURIComponent(category) : '')) });
}

export function SpecificationField({ code, value, onChange }: { code?: string; value: ItemDetails['specifications']; onChange: (value: ItemDetails['specifications']) => void }) {
   const key = code === 'SNEAKERS' ? 'shoe_size_br' : code === 'WHEELCHAIR' ? 'seat_width_cm' : null;
   if (!key) return null;
   return <label>{key === 'shoe_size_br' ? 'Numeração brasileira' : 'Largura do assento (cm)'}
      <input className="input" type="number" min={key === 'shoe_size_br' ? 1 : 0.01} step={key === 'shoe_size_br' ? 1 : 'any'}
         value={value?.[key] ?? ''} onChange={e => onChange(e.target.value === '' ? null : { [key]: Number(e.target.value) })} />
   </label>;
}

export function DonationExtras({ category, value, onChange }: { category?: string; value: ItemDetails; onChange: (value: ItemDetails) => void }) {
   const types = useItemTypes(category, Boolean(category));
   const selected = types.data?.find(item => item.id === value.item_type_id);
   return <details className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">Detalhes do item</summary>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
         <label>Tipo de item<select className="input" disabled={!category || types.isLoading} value={value.item_type_id ?? ''}
            onChange={e => onChange({ ...value, item_type_id: e.target.value || null, specifications: null })}>
            <option value="">Não informado</option>
            {value.item_type_id && !selected && <option value={value.item_type_id}>Tipo cadastrado</option>}
            {types.data?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
         </select></label>
         {types.isError && <button className="text-blue-700 underline" type="button" onClick={() => types.refetch()}>Tentar carregar tipos novamente</button>}
         <label>Condição<select className="input" value={value.condition ?? ''} onChange={e => onChange({ ...value, condition: (e.target.value || null) as ItemDetails['condition'] })}>
            <option value="">Não informada</option><option value="NEW">Novo</option><option value="USED_GOOD">Usado em bom estado</option><option value="REQUIRES_REVIEW">Conferir condição</option>
         </select></label>
         <SpecificationField code={selected?.code} value={value.specifications} onChange={specifications => onChange({ ...value, specifications })} />
      </div>
   </details>;
}
