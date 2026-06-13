"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { experience } from "@/lib/experience";
import { introState } from "@/lib/intro";
import { ballPosition } from "@/lib/choreography";
import { getQualityTier } from "@/lib/quality";

/**
 * FLUID BACKGROUND — a Stripe-style flowing gradient in the JE palette.
 *
 * A single fullscreen, camera-independent quad (vertex shader writes clip
 * space directly) rendered behind everything. The fragment shader builds
 * domain-warped simplex fbm and melts four colours together — near-black →
 * deep pitch green → mid emerald → a touch of electric JE green — with a
 * vignette, the brightest light gravitating toward the ball, and a hash
 * dither to kill banding. Motion is intentionally slow (ink-in-water).
 *
 * TWEAK ME: uColorA..D (the colour stops) and uSpeed are uniforms with the
 * defaults below — change them here and the look updates live.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0); // fullscreen, ignore camera
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uAspect;
  uniform vec2  uBall;        // ball position in screen UV (0..1)
  uniform vec3  uColorA;      // near-black
  uniform vec3  uColorB;      // deep pitch green
  uniform vec3  uColorC;      // mid emerald
  uniform vec3  uColorD;      // electric JE green (highlight)
  uniform float uQuality;     // 1 = high detail, 0 = mobile (fewer octaves)

  // --- Ashima simplex noise (3D) — MIT licensed ---------------------------
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // up to 2-octave fbm — second octave drops out on low-power devices
  float fbm(vec3 p){
    float v = 0.60 * snoise(p);
    v += 0.30 * uQuality * snoise(p * 2.03 + 7.1);
    return v;
  }

  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = vec2(uv.x * uAspect, uv.y) * 1.6;
    float t = uTime * uSpeed;

    // --- Ball disturbance: the fluid flows around the ball ----------------
    // The ball stays a solid object rendered in front; here we push the noise
    // domain radially outward from its screen position and add a slow swirl,
    // so the surrounding fluid visibly reacts to and flows around it.
    vec2 bv = (uv - uBall) * vec2(uAspect, 1.0);
    float bdist = length(bv);
    float infl = exp(-bdist * 3.0);
    vec2 bdir = bv / (bdist + 1e-4);
    vec2 btan = vec2(-bdir.y, bdir.x);
    float ripple = sin(uTime * 0.9 - bdist * 9.0);
    p += (bdir * infl * (0.20 + 0.07 * ripple)
        + btan * infl * 0.13 * sin(uTime * 0.5)) * 2.2;

    // Domain warp — ink-in-water flow (second pass only on high quality)
    vec2 q = vec2(fbm(vec3(p, t)), fbm(vec3(p + 3.1, t + 1.7)));
    vec2 r = q;
    if (uQuality > 0.5) {
      r = vec2(
        fbm(vec3(p + 1.4 * q + vec2(1.7, 9.2), t * 0.9)),
        fbm(vec3(p + 1.4 * q + vec2(8.3, 2.8), t * 1.1))
      );
    }
    float f = fbm(vec3(p + 1.6 * r, t));
    f = clamp(f * 0.5 + 0.5, 0.0, 1.0); // -> 0..1

    // Brightest light gravitates toward the ball + the disturbance glows
    float ball = smoothstep(0.62, 0.0, bdist);
    f = clamp(f + ball * 0.30 + infl * 0.18, 0.0, 1.0);

    // Melt the four colours together — soft, continuous
    vec3 col = uColorA;
    col = mix(col, uColorB, smoothstep(0.05, 0.45, f));
    col = mix(col, uColorC, smoothstep(0.40, 0.72, f));
    col = mix(col, uColorD, smoothstep(0.80, 1.0, f) * 0.85);
    // emerald pool + electric kiss right around the ball
    col = mix(col, uColorC, ball * 0.28);
    col += uColorD * ball * 0.10;

    // Vignette — keep centre bright, edges in shadow for text legibility
    float d = length((uv - 0.5) * vec2(uAspect, 1.0));
    float vig = 1.0 - smoothstep(0.32, 0.92, d);
    col *= mix(0.26, 1.0, vig);

    // Dither / faint grain to kill banding
    float g = (hash21(uv * (uTime * 0.5 + 1.0)) - 0.5) * (2.2 / 255.0);
    col += g;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function FluidBackground() {
  const mesh = useRef<THREE.Mesh>(null);
  const { size, camera } = useThree();
  const ballNdc = useMemo(() => new THREE.Vector3(), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.05 }, // ← animation speed (slow)
        uAspect: { value: 1 },
        uBall: { value: new THREE.Vector2(0.5, 0.42) },
        uQuality: { value: getQualityTier() === "low" ? 0 : 1 },
        // ↓ colour stops — tweak freely
        uColorA: { value: new THREE.Color("#020806") }, // near-black
        uColorB: { value: new THREE.Color("#06180F") }, // deep pitch green
        uColorC: { value: new THREE.Color("#0A6138") }, // mid emerald
        uColorD: { value: new THREE.Color("#00E676") }, // electric JE green
      },
    });
  }, []);

  useFrame((_, dt) => {
    const u = material.uniforms;
    // Clamp dt so the noise never lurches (and slow further if reduced-motion)
    const step = Math.min(dt, 1 / 30) * (experience.reducedMotion ? 0.15 : 1);
    u.uTime.value += step;
    u.uAspect.value = size.width / size.height;

    // Project the ball to screen UV so the brightest fluid follows it.
    const [bx, by, bz] = ballPosition(experience.progress);
    ballNdc.set(bx, by + 0.3, bz).project(camera);
    u.uBall.value.set(
      THREE.MathUtils.clamp(ballNdc.x * 0.5 + 0.5, 0, 1),
      THREE.MathUtils.clamp(ballNdc.y * 0.5 + 0.5, 0, 1)
    );

    // Fade in with the intro reveal (avoid a flat colour pop on load).
    (material as THREE.ShaderMaterial).opacity = 1;
    if (mesh.current) mesh.current.visible = introState.reveal > 0.001;
  });

  return (
    <mesh ref={mesh} renderOrder={-10000} frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
