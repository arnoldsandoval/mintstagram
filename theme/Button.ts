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
      bg: "radial-gradient(circle farthest-corner at 35% 90%, #ee7600, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #ee7600, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)",
      _hover: {
        transition: "all 2s",
        bg: "radial-gradient(circle farthest-corner at 25% 80%, #ee7600, transparent 50%), radial-gradient(circle farthest-corner at 0 130%, #ee7600, transparent 40%), radial-gradient(ellipse farthest-corner at 0 -15%, #5258cf, transparent 40%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 20%, #e33f5f 40%, #f77638 60%, #fec66d 90%)",
      },
      color: "white",
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};
