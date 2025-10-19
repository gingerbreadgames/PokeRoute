import { EncounterLog, RouteMeta } from '@/types';

export function calculateCompletion(
  routes: RouteMeta[],
  logs: EncounterLog[]
): {
  completedRoutes: number;
  totalRoutes: number;
  percentage: number;
} {
  const routesWithEncounters = new Set(
    logs
      .filter(log => log.result === 'caught')
      .map(log => log.routeId)
  );

  const completedRoutes = routesWithEncounters.size;
  const totalRoutes = routes.length;
  const percentage = totalRoutes > 0 
    ? Math.round((completedRoutes / totalRoutes) * 100) 
    : 0;

  return { completedRoutes, totalRoutes, percentage };
}

export function getRouteStatus(
  routeId: string,
  logs: EncounterLog[]
): 'completed' | 'pending' | 'empty' {
  const routeLogs = logs.filter(log => log.routeId === routeId);
  
  if (routeLogs.length === 0) return 'empty';
  
  const hasCaught = routeLogs.some(log => log.result === 'caught');
  return hasCaught ? 'completed' : 'pending';
}