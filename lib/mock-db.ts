const store: { links: any[]; clicks: any[]; profiles: any[]; bio_links: any[] } = {
  links: [], clicks: [], profiles: [], bio_links: []
};

const tables = ["links", "clicks", "profiles", "bio_links"] as const;
type Table = typeof tables[number];

function clone<T>(x: T): T { return JSON.parse(JSON.stringify(x)); }

function query(table: Table) {
  const filters: Array<(item: any) => boolean> = [];
  let sortField = "created_at";
  let sortAsc = false;
  let limitN = 0;

  const exec = (single: boolean) => {
    let results = clone(store[table]);
    for (const f of filters) results = results.filter(f);
    results.sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      if (av == null) return 1; if (bv == null) return -1;
      return av < bv ? (sortAsc ? -1 : 1) : av > bv ? (sortAsc ? 1 : -1) : 0;
    });
    if (limitN > 0) results = results.slice(0, limitN);
    if (single) return { data: results[0] || null, error: results.length === 0 ? { message: "Not found" } : null };
    return { data: results, error: null };
  };

  const b: any = {};
  b.then = (resolve: any) => resolve(exec(false));
  b.eq = (f: string, v: any) => { filters.push((i: any) => i[f] === v); return b; };
  b.neq = (f: string, v: any) => { filters.push((i: any) => i[f] !== v); return b; };
  b.order = (f: string, o?: { ascending?: boolean }) => { sortField = f; sortAsc = o?.ascending ?? false; return b; };
  b.limit = (n: number) => { limitN = n; return b; };
  b.single = async () => exec(true);
  b.maybeSingle = async () => { const r = exec(true); return { data: r.data, error: null }; };
  return b;
}

export const mockDb = {
  from: (table: Table) => ({
    select: (_fields?: string) => query(table),
    insert: async (values: any) => {
      const record = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        clicks: 0, is_active: true, one_time: false,
        ...values,
      };
      store[table].push(record);
      return { data: clone(record), error: null };
    },
    update: (values: any) => ({
      eq: async (field: string, value: any) => {
        const idx = store[table].findIndex((i: any) => i[field] === value);
        if (idx >= 0) Object.assign(store[table][idx], values);
        return { data: null, error: null };
      }
    }),
    delete: () => ({
      eq: async (field: string, value: any) => {
        const idx = store[table].findIndex((i: any) => i[field] === value);
        if (idx >= 0) store[table].splice(idx, 1);
        return { data: null, error: null };
      }
    }),
    upsert: async (values: any, options?: { onConflict?: string }) => {
      const conflictField = options?.onConflict;
      if (conflictField && values[conflictField]) {
        const idx = store[table].findIndex(
          (i: any) => i[conflictField] === values[conflictField]
        );
        if (idx >= 0) {
          Object.assign(store[table][idx], values);
          return { data: clone(store[table][idx]), error: null };
        }
      }
      const record = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        ...values,
      };
      store[table].push(record);
      return { data: clone(record), error: null };
    },
  })
};
