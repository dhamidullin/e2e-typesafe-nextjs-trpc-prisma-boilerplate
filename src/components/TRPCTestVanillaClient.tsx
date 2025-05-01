'use client';

import { useEffect } from "react";
import { vanillaClient } from "@/utils/trpc";

const tryToFetchData = async () => {
  try {
    const res = await vanillaClient.example.ping.query()
    console.log('Vanilla TRPC client test success, it returned', res)
  } catch (error) {
    console.log('Vanilla TRPC client test failed')
    console.error(error);
  }
}

const TRPCTestVanillaClient = () => {
  useEffect(() => {
    tryToFetchData();
  }, [])

  return null;
};

export default TRPCTestVanillaClient;
