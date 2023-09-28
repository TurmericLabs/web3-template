import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        blue: {
            50: "#E5F4FD",      // Lightest blue, can be used for backgrounds
            100: "#BFDFFA",
            200: "#99CAF7",
            300: "#74B5F3",
            400: "#4EA1EF",      // Regular Twitter blue
            500: "#2787DB",      // Slightly darker blue, often used for primary actions
            600: "#1F65B5",
            700: "#17438F",
            800: "#102168",      // Dark mode primary text color
            900: "#090146"       // Darkest blue, can be used for dark mode backgrounds
        },
    },
    // You can extend other parts of the theme here if needed
});

export default theme;
