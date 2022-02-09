export const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "full", // <-- border radius is same for all variants and sizes
    px: 2,
  },
  // Two variants: outline and solid
  variants: {
    solid: {
      bg: "white",
      color: "black",
    },
    instagram: {
      bg: "radial-gradient(circle at 30% 107%,#D4AC0D 0%, #D4AC0D 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
      color: "white",
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};
