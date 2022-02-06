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
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};
