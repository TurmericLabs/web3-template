import { Button } from "@chakra-ui/react"
import SuperfluidWidget, { WidgetProps } from "@superfluid-finance/widget"

const data: WidgetProps = {
  "productDetails": {
    "name": "Y Subscription",
    "description": "This product will give you a blue tick on your username",
    "imageURI": ""
  },
  "paymentDetails": {
    "paymentOptions": [
      {
        "receiverAddress": "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
        "chainId": 80001,
        "superToken": {
          "address": "0x42bb40bf79730451b11f6de1cba222f17b87afd7"
        },
        "flowRate": {
          "amountEther": "9",
          "period": "month"
        }
      }
    ]
  },
  "theme": {
    "typography": {
      "fontFamily": "Helvetica"
    },
    "palette": {
      "mode": "light",
      "primary": {
        "main": "rgb(29, 161, 242)"
      },
      "secondary": {
        "main": "rgb(229, 244, 253)"
      }
    },
    "shape": {
      "borderRadius": 8
    },
    "components": {
      "MuiStepIcon": {
        "styleOverrides": {
          "text": {
            "fill": "rgb(229, 244, 253)"
          }
        }
      },
      "MuiOutlinedInput": {
        "styleOverrides": {
          "root": {
            "borderRadius": 8
          }
        }
      },
      "MuiButton": {
        "styleOverrides": {
          "root": {
            "borderRadius": 8
          }
        }
      }
    }
  }
}

export default function SubscribeButton() {
    return (
        <SuperfluidWidget
            {...data}
            type="drawer"
            >
            {({ openModal }) => (
                <Button onClick={() => openModal()}>Subscribe</Button>
            )}
        </SuperfluidWidget>
    )
}
