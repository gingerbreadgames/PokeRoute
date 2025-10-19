import { useStore } from '@/store';
import { getRouteStatus } from '@/utils/completion';

export function useRouteCompletion(routeId: string) {
  const currentRun = useStore(state => state.getCurrentRun());
  const logs = useStore(state => 
    currentRun ? state.getLogsForRoute(currentRun.id, routeId) : []
  );

  const status = getRouteStatus(routeId, logs);
  const firstEncounter = logs.find(log => log.result === 'caught');

  return {
    status,
    firstEncounter,
    allLogs: logs,
    isCompleted: status === 'completed',
    isPending: status === 'pending',
    isEmpty: status === 'empty',
  };
}