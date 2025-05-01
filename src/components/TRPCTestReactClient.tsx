'use client';

import { reactClient } from "@/utils/trpc";
import { useEffect } from "react";

const TRPCTestReactClient = () => {
  const pingQuery = reactClient.example.ping.useQuery(undefined, {
    enabled: false // Disable the query from automatically fetching
  });

  useEffect(() => {
    if (pingQuery.isSuccess) {
      console.log('React TRPC client test success, it returned', pingQuery.data);
    }

    if (pingQuery.isError) {
      console.log('React TRPC client test failed');
      console.error(pingQuery.error);
    }
  }, [pingQuery.status, pingQuery.data, pingQuery.error]); // Re-run effect when status, data, or error changes

  useEffect(() => {
    pingQuery.refetch();
  }, [])

  // Optionally, render loading/error states
  // if (pingQuery.isLoading) return <div>Loading...</div>;
  // if (pingQuery.isError) return <div>Error!</div>;

  // Or just return null if this component only logs
  return null;
};

export default TRPCTestReactClient;
