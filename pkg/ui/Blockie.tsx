import Blockies from "react-blockies";
import { Box } from "@chakra-ui/react";
import { isAddress } from "viem";

const PX_RATIO = typeof devicePixelRatio === "undefined" ? 2 : devicePixelRatio;
const BLOCKIES_SQUARES = 8; // commonly used to represent Ethereum addresses
const BASE_SCALE = 3;

type BlockieProps = {
    address: `0x${string}`;
    scale?: number;
    radius?: string;
    opacity?: number;
};

function BlockiesScaling({
  children,
  size,
}: {
  children: React.ReactNode;
  size: number;
}) {
  return (
    <Box
      boxSize={`${size}px`}
      background={"white"}
      transformOrigin={"0 0"}
      /* display:flex to remove the display:inline on the child without using a
       * selector (Blockies doesn’t allow the style prop to be passed). */
      display={"flex"}
      /* add high-res screens support to Blockies */
      transform={`scale(${1 / PX_RATIO}, ${1 / PX_RATIO})`}
    >
      {children}
    </Box>
  );
}

/**
 * A component to get the Ethereum Identicon, an image that identifies Ethereum Accounts.
 *
 * @param radius - Allows same values as `box-radius` property from ChakraUI default theme.
 * @param address - A valid Etherum Adress.
 * @param scale - Size of the image.
 * @param opacity - Softens the colors of the image.
 *
 */
export default function Blockie({
  address,
  scale,
  radius,
  ...props
}: BlockieProps) {
  const isValidAddress = isAddress(address);
  const opacity = props.opacity || 0.3;

  const blockiesScale = (scale || 1) * BASE_SCALE;
  const blockieSize = BLOCKIES_SQUARES * blockiesScale;

  return isValidAddress ? (
    <Box
      borderRadius={radius}
      boxSize={`${blockieSize}px`}
      display={"inline-flex"}
      overflow={"hidden"}
      /*
       * `vertical-align` prevents the inline parent to have an incorrect height.
       *
       * See
       * - https://bugzilla.mozilla.org/show_bug.cgi?id=491549#c9
       * - https://bugzilla.mozilla.org/show_bug.cgi?id=737757#c1
       */
      vertical-align={"middle"}
      // Fix an issue where the border-radius wasn’t visible on Blink browsers.
      // See https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
      sx={{
        "mask-image": "linear-gradient(red, red)",
      }}
    >
      <BlockiesScaling size={blockieSize * PX_RATIO}>
        <Box opacity={1 - opacity}>
          <Blockies
            seed={address.toLowerCase()}
            size={BLOCKIES_SQUARES}
            scale={blockiesScale * PX_RATIO}
          />
        </Box>
      </BlockiesScaling>
    </Box>
  ) : null;
}

Blockie.defaultProps = {
  radius: "none",
};
