import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const [sender] = await hre.viem.getWalletClients();
  const recipient = process.env.RECIPIENT_ADDRESS;
  const amount = parseEther("1");

  const hash = await sender.sendTransaction({
    to: recipient,
    value: amount,
  });

  const publicClient = await hre.viem.getPublicClient();
  await publicClient.waitForTransactionReceipt({ hash });

  console.log(
    `Sent ${formatEther(
      amount
    )} ETH from ${sender.account.address} to ${recipient}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
