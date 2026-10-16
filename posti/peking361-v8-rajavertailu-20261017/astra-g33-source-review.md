# Astra — G33 appearance-source review

**Positive appearance direction; reject direct periodic use. G33 is an immutable appearance reference, not an approved or bound 3D material.** This is a separate source-image assessment following the C7 visual rejection. It does not reverse that rejection or establish receiver acceptance.

I inspected the actual 1254×1254 image at original detail. Source: `generated-source-assets/weathered-courtyard-paving-g33.png`; SHA-256 `3f850f72328a5faf7bb9b4908385199f303ea6ed50f9f6b4c05faa85370e4052`. The prompt/receipt records a whole new generation without reference-image editing. The prompt's requested resolution, stone count and seamlessness are intentions, not evidence of the actual result.

## Appearance finding

G33 addresses the most conspicuous C7 deficiency: individual stones have mottled grain, small worn or chipped edges, and subtly irregular joints. Their variation belongs to the same visible masonry structure rather than appearing as a different flat color assigned to each clean rectangle. The staggered courses remain readable, and the restrained gray/warm-gray palette avoids large stains or distracting saturated stones. No obvious perspective convergence appears in this top-down source. These are useful improvements in material character, not proof of in-scene quality.

The image still has repeated horizontal courses and fairly similar stone lengths. Its dense surface grain may become busy when reduced or viewed obliquely; native detail alone cannot clear that risk. Dark joint edges may include lighting or occlusion cues, so the RGB is not certified shadow-free albedo. Do not turn all bright grain into raised normal detail. Compared with the original 256-pixel source inspected in the preceding boundary review, this looks lighter and more neutral overall; that qualitative source comparison does not establish a required brightness adjustment. Judge palette and contrast under the same render lighting before changing them.

The existing V7 direction to preserve is a calm, legible mosaic with plausible stone scale, not the exact flat cell shading that caused C7's rejection. G33 is a defensible appearance reference for that direction. It is not historical evidence or a surveyed stone-size reference.

## Actual layout and wrap limitation

Native inspection shows about ten stones across and about 29 courses, not the requested 16×32. Sol's independent source audit measures 29 courses, 10–11 vertical joints per course, median ordinary width 122 px and mean course pitch 43.241379 px: approximately 2.82:1 in image pixels. A square physical repeat would therefore elongate the stones relative to the nominal 1.9:1 design. Sol's illustrative calibration of roughly 9.765×14.5 m brings median width and row pitch to approximately .95×.50 m; this is a possible metric interpretation, not an approved period. It must not inherit C7's 30.4×32 m period blindly.

Direct wrap is rejected. Sol measures top/bottom mean RGB difference 31.6869/255 versus ordinary internal adjacency 12.8284/255; left/right is 12.2376 versus 9.2702. More importantly, joint phase and partial-stone widths do not close coherently. The reported left/right seam stones range from 28.5 to 165.5 px against an ordinary median of 122 px. Numerical discontinuity alone is not a universal perceptual threshold, but the structural mismatch is sufficient to withhold repeat approval. The word “seamless” in the prompt does not change this finding. I did not generate a tiled contact sheet or claim a successful repeated render.

## Bounded next decision

Use G33 beside matched C7 before/after images to seek agreement on **natural masonry appearance only**, clearly captioned “appearance reference; not seamless or bound to the model.” C7 remains visually rejected despite its technical budget/geometry pass. This gives the receiver a concrete style decision before another generation or binding attempt.

If this direction is accepted, investigate one registered resynthesis prototype using G33 as a read-only donor of complete stone appearance. Do not directly wrap this whole image, partially repaint the source, or reuse C7's analytic joint network under it. The prototype would need a validated stone/joint segmentation, boundary-aware donor sampling, newly registered normal/MR, and a whole new output-map version. Sol's threshold-sensitive segmentation results mean this is a feasibility experiment, not a ready implementation. If reliable whole-stone segmentation cannot be established, prefer another whole new masonry generation over claiming that automatic closing repaired it. Additional generation is not guaranteed to deliver actual periodicity.

Any later candidate must pass wrap and stone-scale checks before binding, then the same west/north/south boundary and corner cameras, interior-regression and top-repeat views. Reject visible joint cuts, repeating distinctive donor marks, flat-cell regression, grain-induced shimmer, or a new source-to-interior character jump. Preserve the original source RGB, source footprint/heights, separate AO and the 69 frozen GLBs. Keep the existing raw-byte ceiling; more textures authorization is not a budget waiver.

## Scope and evidence limits

Read Sol's `sol-g33-source-tile-qa.md`; its measurements above are attributed, not independently recomputed here. Personally inspected native G33 and the existing C7 comparison images; C7 details are in `astra-periodic7-visual-review.md/.json`. No G33 normal, MR, segmentation, periodic map, GLB binding, Blender render or runtime test is approved. Unity/URP/Cesium behavior, KTX2 conversion, cut and water requests, draw calls, memory/performance and owner acceptance remain open. Task #362 remains separate.

Only this assigned report pair was added. No image generation, source/asset modification, Blender, Git, delegation, automation control or receiver message was performed.
