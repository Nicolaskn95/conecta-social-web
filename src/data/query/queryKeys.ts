export const queryKeys = {
   // Eventos
   events: {
      all: ['events'] as const,
      lists: () => [...queryKeys.events.all, 'list'] as const,
      list: (filters: Record<string, any>) =>
         [...queryKeys.events.lists(), { filters }] as const,
      details: () => [...queryKeys.events.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.events.details(), id] as const,
      public: () => [...queryKeys.events.all, 'public'] as const,
      publicWithInstagram: (limit?: number) =>
         [...queryKeys.events.public(), 'instagram', { limit }] as const,
      actives: () => [...queryKeys.events.all, 'actives'] as const,
      paginated: (
         page?: number,
         size?: number,
         filters?: Record<string, any>
      ) =>
         [
            ...queryKeys.events.all,
            'paginated',
            { page, size, filters },
         ] as const,
      upcoming: (limit?: number) =>
         [...queryKeys.events.all, 'upcoming', { limit }] as const,
   },

   // Famílias (para futuras implementações)
   families: {
      all: ['families'] as const,
      lists: () => [...queryKeys.families.all, 'list'] as const,
      list: (filters: Record<string, any>) =>
         [...queryKeys.families.lists(), { filters }] as const,
      details: () => [...queryKeys.families.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.families.details(), id] as const,
   },

   // Voluntários (para futuras implementações)
   volunteers: {
      all: ['volunteers'] as const,
      lists: () => [...queryKeys.volunteers.all, 'list'] as const,
      list: (filters: Record<string, any>) =>
         [...queryKeys.volunteers.lists(), { filters }] as const,
      details: () => [...queryKeys.volunteers.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.volunteers.details(), id] as const,
   },

   // Doações (para futuras implementações)
   donations: {
      all: ['donations'] as const,
      lists: () => [...queryKeys.donations.all, 'list'] as const,
      list: (filters: Record<string, any>) =>
         [...queryKeys.donations.lists(), { filters }] as const,
      details: () => [...queryKeys.donations.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.donations.details(), id] as const,
   },
} as const;
