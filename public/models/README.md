# 3D Models

The experience ships with **fully procedural placeholders** so it runs with
zero binary assets. Drop real GLB models here to upgrade the visuals — **no
scene rewrites required**.

## Expected files

| File               | Replaces                          |
| ------------------ | --------------------------------- |
| `soccer-ball.glb`  | Procedural panelled match ball    |
| `player.glb`       | Procedural emerging player figure |
| `goal.glb`         | Procedural posts + net            |
| `stadium.glb`      | Procedural floodlights / pitch    |

## How the swap works

1. Add the `.glb` file to this folder.
2. Open [`lib/models.ts`](../../lib/models.ts) and flip the asset's
   `available` flag to `true`:

   ```ts
   ball: { url: "/models/soccer-ball.glb", available: true },
   ```

3. That's it. The matching component (`SoccerBall`, `PlayerSilhouette`,
   `Goal`) detects the flag, preloads the GLB, and renders it in place of the
   procedural mesh. The camera rig, choreography, lighting and animation
   timeline are untouched.

## Authoring tips

- **Scale:** the ball component scales the GLB by `BALL_RADIUS` (0.42m). Model
  a unit-radius ball or adjust the scale in `SoccerBall.tsx`.
- **Origin:** keep model origins at the base/centre so they sit correctly on
  the choreographed path.
- **Shadows:** meshes are flagged `castShadow` automatically on load.
- **Draco/Meshopt:** compressed GLBs are supported by `useGLTF` out of the box.
