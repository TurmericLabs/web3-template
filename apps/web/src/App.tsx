import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Input,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { parseAbi, parseAbiItem } from "viem";
import { formatTimeAgo } from "./lib/time";
import UserName from "./components/UserName";

import logo from './assets/logo.svg';
import UserAvatar from "./components/UserAvatar";
import SubscribeButton from "./components/SubscribeButton";
import { contractAddress } from "./wagmi";

type Post = {
  content: string;
  timestamp: bigint;
  author: `0x${string}`;
};

function App() {

  const publicClient = usePublicClient()

  const [inputValue, setInputValue] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    let unwatch = () => {}
    publicClient.getLogs({  
      address: contractAddress,
      event: parseAbiItem('event PostCreated(uint256 index, string content, uint256 timestamp, address author)'),
      fromBlock: 0n,
    })
    .then(logs => logs.map(log => ({content: log.args.content!, timestamp: log.args.timestamp!, author: log.args.author!})))
    .then(posts => setPosts(posts))
    .then(() => {
      unwatch = publicClient.watchEvent({
        address: contractAddress,
        event: parseAbiItem('event PostCreated(uint256 index, string content, uint256 timestamp, address author)'),
        onLogs: (logs) => {
          setPosts((posts) => {
            const _posts = [...posts];
            logs.forEach((log) => {
              _posts[Number(log.args.index)] = {content: log.args.content!, timestamp: log.args.timestamp!, author: log.args.author!}
            });
            return _posts;
          })
        }
      })
    })
    return () => {
      unwatch()
    }
  }, []);

  const reversedPosts = [...posts].reverse()

  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()

  const postMessage = async function () {
    if (!address || !walletClient) return
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      functionName: "post",
      args: [inputValue],
      abi: parseAbi(["function post(string memory _content) public"]),
      account: address,
    })
    await walletClient.writeContract({...request})
  }

  return (
    <>
    <Flex
        justify="space-between"
        align="center"
        p="1rem"
        boxShadow="md"
        bg="twitter.400"
    >
        <Image src={logo} alt="Y" width="32px" />
        <HStack spacing={4}>
        <ConnectButton />
        <SubscribeButton />
        </HStack>
    </Flex>
    <Box maxW="1280px" m="0 auto" p="2rem" textAlign="center">
        <Flex justifyContent={'center'}><Image src={logo} width={32} /></Flex>
        <Box p="2em" borderRadius="md" boxShadow="md">
            <HStack spacing={4}>
                <Input autoFocus placeholder="What's happening?" value={inputValue} onChange={handleChange} flex="1" />
                <Button colorScheme="twitter" onClick={() => postMessage ? postMessage() : null}>Tweet</Button>
            </HStack>
            
            {reversedPosts.map((post) => (
              <HStack
                key={post.content}
                mt="4" p="4" bg="twitter.50" borderRadius="md" spacing={4}
                alignItems="flex-start"
                >
                  <UserAvatar address={post.author} />
                  <VStack alignItems="flex-start">
    <HStack spacing={2}>
        <Text fontWeight="bold"><UserName address={post.author} /></Text>
        <Text fontSize="sm" color="twitter.400">{formatTimeAgo(post.timestamp)}</Text>
    </HStack>
    <Text>{post.content}</Text>
</VStack>
              </HStack>
            ))}
        </Box>
    </Box>
</>
  );
}

export default App;
