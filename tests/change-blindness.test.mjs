import assert from "node:assert/strict";
import test from "node:test";
import { createChangeTest } from "../src/lib/changeBlindnessScene.mjs";

const expectedShapes = ["cube", "cuboid", "cylinder", "sphere"];

function objectMap(objects) {
  return new Map(objects.map((object) => [object.id, object]));
}

test("the same seed reproduces the same test", () => {
  assert.deepEqual(createChangeTest(20260712), createChangeTest(20260712));
});
test("only the selected object changes between views", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const scene = createChangeTest(seed);
    const before = objectMap(scene.before);
    const after = objectMap(scene.after);
    const ids = new Set([...before.keys(), ...after.keys()]);
    const changedIds = [...ids].filter((id) => JSON.stringify(before.get(id)) !== JSON.stringify(after.get(id)));

    assert.deepEqual(changedIds, [scene.targetId]);
  }
});

test("all five change modes preserve their count contracts", () => {
  const observedTypes = new Set();

  for (let seed = 1; seed <= 300; seed += 1) {
    const scene = createChangeTest(seed);
    observedTypes.add(scene.change.type);

    if (scene.change.type === "move" || scene.change.type === "replace" || scene.change.type === "colour") {
      assert.equal(scene.before.length, 20);
      assert.equal(scene.after.length, 20);
    } else if (scene.change.type === "disappear") {
      assert.equal(scene.before.length, 20);
      assert.equal(scene.after.length, 19);
    } else {
      assert.equal(scene.before.length, 19);
      assert.equal(scene.after.length, 20);
    }
  }

  assert.deepEqual([...observedTypes].sort(), ["appear", "colour", "disappear", "move", "replace"]);
});

test("movement spans at least one rotated footprint and every object remains inside the floor", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const scene = createChangeTest(seed);
    const allObjects = [...scene.before, ...scene.after];

    allObjects.forEach((object) => {
      assert.ok(object.x >= 0.05 && object.x <= 0.95);
      assert.ok(object.z >= 0.05 && object.z <= 0.95);
    });

    if (scene.change.type === "move") {
      const before = scene.before.find((object) => object.id === scene.targetId);
      const after = scene.after.find((object) => object.id === scene.targetId);
      const changedKeys = Object.keys(before).filter((key) => before[key] !== after[key]);
      const cosine = Math.cos(before.rotation);
      const sine = Math.sin(before.rotation);
      const footprint = scene.change.axis === "x"
        ? Math.abs(before.width * cosine) + Math.abs(before.depth * sine)
        : Math.abs(before.width * sine) + Math.abs(before.depth * cosine);
      assert.deepEqual(changedKeys, [scene.change.axis]);
      assert.ok(scene.change.distance + 0.0001 >= footprint);
    }
  }
});

test("colour changes select a different palette entry without changing geometry", () => {
  for (let seed = 1; seed <= 300; seed += 1) {
    const scene = createChangeTest(seed);
    if (scene.change.type !== "colour") continue;
    const before = scene.before.find((object) => object.id === scene.targetId);
    const after = scene.after.find((object) => object.id === scene.targetId);
    const changedKeys = Object.keys(before).filter((key) => before[key] !== after[key]);
    assert.deepEqual(changedKeys, ["color"]);
    assert.notEqual(before.color, after.color);
  }
});

test("every view remains dense and contains all four primitive families", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const scene = createChangeTest(seed);
    [scene.before, scene.after].forEach((objects) => {
      assert.ok(objects.length >= 19);
      assert.deepEqual([...new Set(objects.map((object) => object.shape))].sort(), expectedShapes);
      const orientedSolids = objects.filter((object) => object.shape === "cube" || object.shape === "cuboid");
      assert.ok(orientedSolids.some((object) => {
        const quarterTurns = object.rotation / (Math.PI / 2);
        return Math.abs(quarterTurns - Math.round(quarterTurns)) > 0.04;
      }));
    });
  }
});

test("different seeds create different spatial arrangements", () => {
  assert.notDeepEqual(createChangeTest(10).before, createChangeTest(11).before);
});

test("changed objects are visible and balanced across back, middle, and front depth bands", () => {
  const bandCounts = [0, 0, 0];

  for (let seed = 1; seed <= 900; seed += 1) {
    const scene = createChangeTest(seed);
    const uniqueObjects = objectMap([...scene.after, ...scene.before]);
    const depthOrdered = [...uniqueObjects.values()].sort((a, b) => (a.x + a.z) - (b.x + b.z));
    const targetRank = depthOrdered.findIndex((object) => object.id === scene.targetId);
    const target = depthOrdered[targetRank];
    const targetDepth = target.x + target.z;
    const targetCenter = {
      x: 0.5 + (target.x - target.z) * 0.36,
      y: 0.19 + targetDepth * 0.21 - target.height * 0.22,
    };
    const occluded = depthOrdered.some((object) => {
      if (object.id === target.id || object.x + object.z <= targetDepth + 0.015) return false;
      const centerX = 0.5 + (object.x - object.z) * 0.36;
      const baseY = 0.19 + (object.x + object.z) * 0.21;
      const halfWidth = Math.max(0.018, (object.width + object.depth) * 0.2);
      return targetCenter.x >= centerX - halfWidth
        && targetCenter.x <= centerX + halfWidth
        && targetCenter.y >= baseY - object.height * 0.44 - 0.012
        && targetCenter.y <= baseY + 0.018;
    });

    assert.equal(occluded, false);
    const band = Math.min(2, Math.floor(targetRank * 3 / depthOrdered.length));
    bandCounts[band] += 1;
  }

  bandCounts.forEach((count) => assert.ok(count > 240, `depth band selected only ${count} times`));
});
