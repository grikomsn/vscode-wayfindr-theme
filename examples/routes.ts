// One route. Every shipment. A little less noise.
export type Region = 'APAC' | 'Europe' | 'North America';

export interface Shipment {
  readonly id: string;
  destination: Region;
  parcels: number;
  status: 'in-transit' | 'delivered';
}

const NETWORK_LIMIT = 110;

/** Group active shipments by their destination. */
export async function planRoutes(
  shipments: readonly Shipment[],
  region: Region = 'APAC',
): Promise<Map<string, Shipment>> {
  const routes = new Map<string, Shipment>();

  for (const shipment of shipments) {
    if (shipment.destination !== region) continue;
    if (shipment.status === 'delivered') continue;

    const route = `${region.toLowerCase()}/${shipment.id}`;
    routes.set(route, { ...shipment, parcels: Math.max(1, shipment.parcels) });
  }

  if (routes.size > NETWORK_LIMIT) {
    throw new Error(`Route limit exceeded: ${routes.size}`);
  }

  return routes;
}

export const shipment: Shipment = {
  id: 'WF-2026-108',
  destination: 'APAC',
  parcels: 24,
  status: 'in-transit',
};

void planRoutes([shipment]).then((routes) => {
  console.info('Ready to move', [...routes.keys()]);
});
