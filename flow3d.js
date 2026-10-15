// Scroll-driven 3D funnel (needs three.js r128 loaded first). Returns true when running, false to fall back to the static layout.
(function () {
  window.ADZIVO_FLOW = function (sec) {
    const T = window.THREE;
    if (!T) return false;
    const cv = sec.querySelector("canvas"), box = cv && cv.parentElement;
    if (!cv) return false;
    sec.classList.add("flow-3d");
    let renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    } catch (e) { sec.classList.remove("flow-3d"); return false; }

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
    scene.add(new T.AmbientLight(0xffffff, 0.75));
    const key = new T.DirectionalLight(0xffffff, 1.15); key.position.set(4, 6, 7); scene.add(key);
    const rim = new T.PointLight(0x7c5cff, 1.4, 40); rim.position.set(-6, 2, 5); scene.add(rim);
    const group = new T.Group(); scene.add(group);

    const mat = (c) => new T.MeshPhysicalMaterial({ color: c, metalness: 0.15, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12, emissive: c, emissiveIntensity: 0.06 });
    // glass funnel (wide at top, narrow at bottom) + faint wireframe
    group.add(new T.Mesh(new T.CylinderGeometry(2.6, 0.7, 9, 48, 1, true), new T.MeshPhysicalMaterial({ color: 0xaab8ff, transparent: true, opacity: 0.16, roughness: 0.1, side: T.DoubleSide, depthWrite: false })));
    group.add(new T.Mesh(new T.CylinderGeometry(2.62, 0.72, 9, 36, 8, true), new T.MeshBasicMaterial({ color: 0x4361ee, wireframe: true, transparent: true, opacity: 0.22 })));

    // four stages: Ad (sphere), Click (octahedron), Lead (cube), Growth (rising bars)
    const ys = [3.2, 1.1, -1, -3];
    const growth = new T.Group();
    [[-0.42, 0.5], [0, 0.85], [0.42, 1.2]].forEach(([x, h]) => {
      const b = new T.Mesh(new T.BoxGeometry(0.3, h, 0.3), mat(0x10b981)); b.position.set(x, h / 2 - 0.6, 0); growth.add(b);
    });
    const shapes = [
      new T.Mesh(new T.SphereGeometry(0.85, 48, 48), mat(0x4361ee)),
      new T.Mesh(new T.OctahedronGeometry(0.9), mat(0x7c5cff)),
      new T.Mesh(new T.BoxGeometry(1.1, 1.1, 1.1), mat(0x0ea5e9)),
      growth,
    ];
    shapes.forEach((s, i) => { s.position.y = ys[i]; s.userData.k = 1; group.add(s); });
    const glow = (s, v) => s.traverse((o) => { if (o.material && o.material.emissiveIntensity !== undefined) o.material.emissiveIntensity = v; });

    const stages = Array.from(sec.querySelectorAll(".flow-stage"));
    const pinTop = 68;
    let cur = 0, mx = 0, my = 0, tmx = 0, tmy = 0, visible = true, raf = 0, active = -1;

    const measure = () => {
      const r = box.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    const progress = () => {
      const r = sec.getBoundingClientRect(), total = sec.offsetHeight - (window.innerHeight - pinTop);
      return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    };
    const frame = () => {
      raf = 0;
      if (!visible) return;
      cur += (progress() - cur) * 0.09; mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      const camY = ys[0] + (ys[3] - ys[0]) * cur;
      camera.position.set(0, camY + 0.4, 10.5); camera.lookAt(0, camY, 0);
      group.rotation.y = cur * Math.PI * 0.8 + mx * 0.6; group.rotation.x = my * 0.25;
      const idx = clamp(Math.round(cur * 3), 0, 3);
      shapes.forEach((s, i) => {
        const on = i === idx;
        s.userData.k += ((on ? 1.28 : 1) - s.userData.k) * 0.12;
        s.scale.setScalar(s.userData.k);
        s.rotation.y += on ? 0.02 : 0.006;
        glow(s, on ? 0.35 : 0.06);
      });
      if (idx !== active) { active = idx; stages.forEach((el, i) => el.classList.toggle("active", i === idx)); }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    measure();
    window.addEventListener("resize", measure);
    sec.addEventListener("pointermove", (e) => { tmx = e.clientX / window.innerWidth - 0.5; tmy = e.clientY / window.innerHeight - 0.5; });
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }, { rootMargin: "100px" }).observe(sec);
    raf = requestAnimationFrame(frame);
    return true;
  };
})();
