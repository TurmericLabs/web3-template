
import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains';

export default function UserName({ address }: { address: `0x${string}` }) {
  
  const mainnetClient = createPublicClient({ chain: mainnet, transport: http() });

  const [name, setName] = useState<string>("loading...");
  useEffect(() => {
    mainnetClient.getEnsName({ address }).then((data) => {
      setName(data ? data : `${address.substring(0, 6)}..${address.substring(address.length-4)}`);
    })
  }, [address]);

  return name;
}