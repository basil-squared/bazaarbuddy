import Fuse, { IFuseOptions } from "fuse.js";

export const FUSE_OPTIONS: IFuseOptions<HypixelItem> = {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "id", weight: 0.3 },
  ],
  threshold: 0.3,
  distance: 100,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function createFuseInstance(content: HypixelItem[]) {
  return new Fuse(content, FUSE_OPTIONS);
}
