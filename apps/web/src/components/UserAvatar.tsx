import { useEnsAvatar, useEnsName } from 'wagmi'
import { Blockie } from "ui";
 
export default function UserAvatar({ address }: { address: `0x${string}` }) {
const { data: name, isError: e1, isLoading: l1 } = useEnsName({
    address,
    })
  const { data, isError: e2, isLoading: l2 } = useEnsAvatar({
    name: name,
  })

  if (l1 || l2) return <></>
  if (e1 || e2) return <Blockie address={address} />
  return data
}