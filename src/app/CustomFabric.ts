interface ExtendedFabric {
  DPI: number;
}

// apply additional types to fabric and export it for usage
export const CustomFabric: (CustomFabric & typeof fabric) = fabric as any;