import { useQuery, useQueryClient } from "@tanstack/react-query";

type UseProceedingIdsProps = {
  queryKey: string[];
};

export const useProceedingIds = ({ queryKey }: UseProceedingIdsProps) => {

  const queryClient = useQueryClient();

  const getProceedingIds = (): string[] => {
    return queryClient.getQueryData(queryKey) as string[] || [];
  };

  const setProceedingIds = async (updaterFn: (prev: string[]) => string[]): Promise<string[]> => {
    const currentIds = getProceedingIds();
    const newIds = updaterFn(currentIds);
    queryClient.setQueryData(queryKey, newIds);
    return newIds;
  };

  const { data: proceedingIds = [] } = useQuery({
    queryKey,
    queryFn: () => getProceedingIds(),
    initialData: getProceedingIds(),
  });

  return {
    proceedingIds,
    setProceedingIds,
  };
};