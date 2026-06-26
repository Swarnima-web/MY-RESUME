import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      icosahedronGeometry: any;
      octahedronGeometry: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      color: any;
    }
  }
}
