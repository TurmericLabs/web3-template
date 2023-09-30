
import { useEffect, useState } from 'react';
import { createPublicClient, http, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'
import { usePublicClient } from 'wagmi';
import { contractAddress } from '../wagmi';

export default function UserName({ address }: { address: `0x${string}` }) {
  
  const mainnetClient = createPublicClient({ chain: mainnet, transport: http() });
  const publicClient = usePublicClient()

  const [name, setName] = useState<string>("loading...");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  useEffect(() => {
    mainnetClient.getEnsName({ address }).then((data) => {
      setName(data ? data : `${address.substring(0, 6)}..${address.substring(address.length-4)}`);
    })
  }, [address]);

  useEffect(() => {
    publicClient.readContract({
      address: contractAddress,
      abi: parseAbi(['function isSubscribed(address) view returns (bool)']),
      functionName: 'isSubscribed',
      args: [address]
    }).then((isSubscribed) => {
      console.log(isSubscribed, 'isSubscribed', address)
      setIsSubscribed(isSubscribed)
    })
  }, [address])

  return name + (isSubscribed ? " ✓" : "");
}