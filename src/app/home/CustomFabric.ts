interface ExtendedFabric {
  DPI: number;
}

// apply additional types to fabric and export it for usage
export const CustomFabric: (ExtendedFabric & typeof fabric) = fabric as any;