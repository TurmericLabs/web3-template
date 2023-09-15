import {
  Box,
  Button,
  Link,
  Image,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { parseAbi } from "viem";

function App() {
  const {
    data: count,
    isError,
    isLoading,
  } = useContractRead({
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    functionName: "number",
    watch: true,
    abi: parseAbi(["function number() public view returns (uint256)"]),
  }) as { data: bigint | undefined; isError: boolean; isLoading: boolean };

  const { config } = usePrepareContractWrite({
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    functionName: "increment",
    abi: parseAbi(["function increment() public"]),
  });

  const { write: increment } = useContractWrite(config);
  const shadowColor = useColorModeValue("#646cffaa", "#61dafbaa");
  const textColor = useColorModeValue("#888", "#ddd");

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        p="1rem"
        boxShadow="md"
        bg="blue.500"
      >
        <Text color="white" mr="1rem" fontSize="2xl" fontWeight="bold">
          Your dApp Name
        </Text>
        <ConnectButton />
      </Flex>
      <Box maxW="1280px" m="0 auto" p="2rem" textAlign="center">
        <Flex justifyContent={"center"} my="4">
          <Link href="https://vitejs.dev" isExternal>
            <Image
              src={viteLogo}
              alt="Vite logo"
              h="6em"
              p="1.5em"
              transition="filter 300ms"
              _hover={{ filter: `drop-shadow(0 0 1em ${shadowColor})` }}
            />
          </Link>
          <Link href="https://react.dev" isExternal>
            <Image
              src={reactLogo}
              alt="React logo"
              h="6em"
              p="1.5em"
              transition="filter 300ms"
              _hover={{ filter: `drop-shadow(0 0 1em ${shadowColor})` }}
            />
          </Link>
        </Flex>
        <Text fontSize="2xl">Foundry + Bun + Turbo + Vite + React + TS</Text>
        <Box p="2em" borderRadius="md" boxShadow="md">
          <Button
            colorScheme="blue"
            onClick={() => (increment ? increment() : null)}
          >
            {isLoading ? (
              <Text>Loading...</Text>
            ) : isError ? (
              <Text>Error</Text>
            ) : (
              <Text>Count is {count?.toString()}</Text>
            )}
          </Button>
          <Text mt="4">
            Edit <Text as="code">src/App.tsx</Text> and save to test HMR
          </Text>
        </Box>
        <Text mt="4" color={textColor}>
          Click on the Vite and React logos to learn more
        </Text>
      </Box>
    </>
  );
}

export default App;
