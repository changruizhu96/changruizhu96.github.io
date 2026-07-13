const GRID_COLUMNS = 5;
const GRID_ROWS = 4;
const MIN_POSITION = 0.08;
const MAX_POSITION = 0.92;
const REQUIRED_SHAPES = ["sphere", "cube", "cylinder", "cuboid", "sphere", "cube", "cylinder", "cuboid"];
const SHAPE_POOL = ["sphere", "cube", "cube", "cylinder", "cuboid", "cuboid", "cuboid"];
const CHANGE_TYPES = ["move", "disappear", "appear", "replace", "colour"];

export function createRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function round(value) {
  return Number(value.toFixed(4));
}

function shuffledCells(rng) {
  const cells = Array.from({ length: GRID_COLUMNS * GRID_ROWS }, (_, index) => index);
  for (let index = cells.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [cells[index], cells[swapIndex]] = [cells[swapIndex], cells[index]];
  }
  return cells;
}

function createDimensions(shape, rng) {
  if (shape === "sphere") {
    const diameter = 0.055 + rng() * 0.04;
    return { width: diameter, depth: diameter, height: diameter };
  }

  if (shape === "cube") {
    const size = 0.058 + rng() * 0.038;
    return { width: size, depth: size, height: size * (0.95 + rng() * 0.18) };
  }

  if (shape === "cylinder") {
    const diameter = 0.05 + rng() * 0.045;
    return { width: diameter, depth: diameter, height: 0.085 + rng() * 0.15 };
  }

  return {
    width: 0.055 + rng() * 0.07,
    depth: 0.048 + rng() * 0.055,
    height: 0.075 + rng() * 0.16,
  };
}

function projectedBounds(object) {
  const centerX = 0.5 + (object.x - object.z) * 0.36;
  const baseY = 0.19 + (object.x + object.z) * 0.21;
  const halfWidth = Math.max(0.018, (object.width + object.depth) * 0.2);
  return {
    left: centerX - halfWidth,
    right: centerX + halfWidth,
    top: baseY - object.height * 0.44 - 0.012,
    bottom: baseY + 0.018,
    centerX,
    centerY: baseY - object.height * 0.22,
  };
}

function isProjectedCenterVisible(target, objects) {
  const targetDepth = target.x + target.z;
  const targetBounds = projectedBounds(target);
  return !objects.some((object) => {
    if (object.id === target.id || object.x + object.z <= targetDepth + 0.015) return false;
    const bounds = projectedBounds(object);
    return targetBounds.centerX >= bounds.left
      && targetBounds.centerX <= bounds.right
      && targetBounds.centerY >= bounds.top
      && targetBounds.centerY <= bounds.bottom;
  });
}

function selectTargetIndex(objects, rng) {
  const depthOrdered = objects
    .map((object, index) => ({ object, index, depth: object.x + object.z }))
    .sort((a, b) => a.depth - b.depth);
  const bands = [[], [], []];

  depthOrdered.forEach((candidate, rank) => {
    if (!isProjectedCenterVisible(candidate.object, objects)) return;
    const band = Math.min(2, Math.floor(rank * 3 / depthOrdered.length));
    bands[band].push(candidate.index);
  });

  const availableBands = bands.filter((band) => band.length > 0);
  const selectedBand = availableBands[Math.floor(rng() * availableBands.length)];
  return selectedBand[Math.floor(rng() * selectedBand.length)];
}

export function createChangeTest(seed, objectCount = 20) {
  const rng = createRng(seed);
  const count = Math.max(8, Math.min(objectCount, GRID_COLUMNS * GRID_ROWS));
  const cells = shuffledCells(rng).slice(0, count);

  const objects = cells.map((cell, index) => {
    const column = cell % GRID_COLUMNS;
    const row = Math.floor(cell / GRID_COLUMNS);
    const jitterX = (rng() - 0.5) * 0.095;
    const jitterZ = (rng() - 0.5) * 0.09;
    const shape = REQUIRED_SHAPES[index] ?? SHAPE_POOL[Math.floor(rng() * SHAPE_POOL.length)];
    const dimensions = createDimensions(shape, rng);
    return {
      id: `object-${index}`,
      shape,
      x: round(0.1 + column * 0.2 + jitterX),
      z: round(0.12 + row * (0.76 / (GRID_ROWS - 1)) + jitterZ),
      width: round(dimensions.width),
      depth: round(dimensions.depth),
      height: round(dimensions.height),
      rotation: round((rng() * 2 - 1) * Math.PI),
      color: Math.floor(rng() * 4),
    };
  });

  const targetIndex = selectTargetIndex(objects, rng);
  const targetId = objects[targetIndex].id;
  const type = CHANGE_TYPES[Math.floor(rng() * CHANGE_TYPES.length)];
  let before = objects.map((object) => ({ ...object }));
  let after = objects.map((object) => ({ ...object }));
  let change = { type };

  if (type === "move") {
    const target = after.find((object) => object.id === targetId);
    const axis = rng() > 0.5 ? "x" : "z";
    const cosine = Math.cos(target.rotation);
    const sine = Math.sin(target.rotation);
    const footprint = axis === "x"
      ? Math.abs(target.width * cosine) + Math.abs(target.depth * sine)
      : Math.abs(target.width * sine) + Math.abs(target.depth * cosine);
    const distance = round(footprint * (1 + rng() * 0.35));
    const preferredDirection = rng() > 0.5 ? 1 : -1;
    const preferredPosition = target[axis] + distance * preferredDirection;
    const direction = preferredPosition >= MIN_POSITION && preferredPosition <= MAX_POSITION ? preferredDirection : -preferredDirection;
    target[axis] = round(target[axis] + distance * direction);
    change = { type, axis, distance, direction };
  } else if (type === "disappear") {
    after = after.filter((object) => object.id !== targetId);
  } else if (type === "appear") {
    before = before.filter((object) => object.id !== targetId);
  } else if (type === "colour") {
    const target = after.find((object) => object.id === targetId);
    const originalColor = target.color;
    target.color = (target.color + 1 + Math.floor(rng() * 3)) % 4;
    change = { type, fromColor: originalColor, toColor: target.color };
  } else {
    const target = after.find((object) => object.id === targetId);
    const replacementShapes = REQUIRED_SHAPES.slice(0, 4).filter((shape) => shape !== target.shape);
    const replacementShape = replacementShapes[Math.floor(rng() * replacementShapes.length)];
    const replacementDimensions = createDimensions(replacementShape, rng);
    const originalShape = target.shape;
    target.shape = replacementShape;
    target.width = round(target.width * 0.68 + replacementDimensions.width * 0.32);
    target.depth = round(target.depth * 0.68 + replacementDimensions.depth * 0.32);
    target.height = round(target.height * 0.68 + replacementDimensions.height * 0.32);
    target.rotation = round(target.rotation + 0.2 + rng() * 0.55);
    change = { type, fromShape: originalShape, toShape: replacementShape };
  }

  return {
    seed: seed >>> 0,
    before,
    after,
    targetId,
    change,
  };
}
