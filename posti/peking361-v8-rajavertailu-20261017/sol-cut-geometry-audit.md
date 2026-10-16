# Sol — #361 V8 cut geometry audit

**All eight retained holes are source-backed water or deliberate technical retention regions. No whole hole is demonstrated to be an unsupported dry gap. Closing them solely from the image silhouettes is not supported.** This is an independent geometry/source audit; no screenshot-to-world registration or runtime water-surface identification is claimed. #362 roof/red remains separate.

## Exact cut/source results

The V6/V7 cut files are byte-identical. All 12 ordinary Polygon features are valid. Their union differs from the hole reference by 0.000000275 m²; summed part area minus union is 0.000000000 m². The union therefore preserves the eight holes numerically; no large missing strip between pieces is found by this comparison.

Raw round51/source/source-inputs/peking-osm.geojson was read independently. All nine water polygons and twelve non-tunnel waterway geometries in the reservation plan match raw source after the exact source enu() projection to less than 1e-6 m Hausdorff distance. The original technical corridors use 10 m buffer half-width, quad_segs=2, round caps, mitre joins. Their width is not measured water width. Source tags and IDs are retained in JSON.

| Hole (reference order) | Area m² | Exact source water m² | Beyond water, technical retention m² | Own ground design overlap m² | Source IDs |
|---|---:|---:|---:|---:|---|
| 1 | 4755.206 | 2035.403 | 2719.803 | 0.001159 | way/638204006, way/638204007 |
| 2 | 19689.258 | 1114.860 | 18574.398 | 0.001628 | way/891271559, way/40437997, way/41645236, way/41645244, way/41645246 |
| 3 | 223.759 | 223.759 | 0.000 | 0.000024 | way/42353097 |
| 4 | 231.796 | 231.796 | 0.000 | 0.000019 | way/42353096 |
| 5 | 1642.820 | 0.000 | 1642.820 | 0.000069 | way/41645233, way/41645242 |
| 6 | 9287.481 | 1410.349 | 7877.132 | 0.000945 | way/685378546, way/685378547, way/685378549, way/40422109, way/41657457, way/41657459 |
| 7 | 2891.657 | 376.113 | 2515.544 | 0.000362 | way/685378539, way/40422113 |
| 8 | 899.241 | 255.309 | 643.932 | 0.000059 | way/41657452, way/649967254 |

Total holes: 39621.217 m². Exact source water inside holes: 5647.589 m². Technical retention outside those polygons: 33973.628 m². Outside the independently reconstructed water/corridor union: 0.000000378 m² (floating point boundary residual). The difference from a mapped water polygon is **not proof of dry land**: it is the documented centerline buffer, whose real wet width is unresolved.

## Long and small candidates

Hole 2 is the long western reservation, common-source XY about [-357.972,-296.993]–[-98.909,444.055], matching the long WGS84 bounds previously reported. It comprises drains way/40437997, way/41645236, way/41645244 and way/41645246 plus river polygon way/891271559. Its 19,689.258 m² silhouette is mostly conservative corridor reservation; 1,114.860 m² is mapped water polygon. This makes it a plausible long-image-island candidate, **not a registered identification**. It extends through western neighbor tile1_* rather than being wholly pilot tile2_3.

Holes 3 and 4 are small exact water polygons way/42353097 and way/42353096: preserve. Hole 5 is two drains near the northwestern corner: preserve pending actual channel/bank geometry. Hole 6 is an eastern multi-drain/river corridor; hole 7 is another long narrow eastern drain reservation; hole 8 is pond way/41657452 plus drain way/649967254 (layer=-1). Holes 6–8 intersect pilot tile2_3. Hole 8 or another eastern reservation could look small from k3, but the screenshot contains no proven world-point correspondence. layer=-1 alone does not establish a tunnel or justify removing the reservation.

## Actual own-ground coverage

I independently decoded indexed triangles from the six intersecting LOD0 GLBs (i=1,2; j=2,3,4), using V7 pilot plus unchanged V6 overlay files. Identity node transforms were asserted by the readback iterator. Only upward ground/footway/road/paving material triangles were unioned; marble/ramp/shore surfaces were measured separately. This excludes building roofs from land coverage. Sources, hashes and material counts are in JSON.

Own-ground intersection with the hole union is 0.004265 m² in intended source XY. With captured historic ECEF tile frames mapped through layout.json to common ENU it is 14.383001 m². These very small boundary overlaps do not supply replacement ground over the reservation interiors. The captured frame files are historical inputs, not verified dc48614f frames; footprint projection is not a live Ion clearance or visibility test.

| Hole | Historic actual-frame ground overlap m² | Marble/ramp/shore overlap m² | Nominal pilot tile overlap m² |
|---|---:|---:|---:|
| 1 | 2.176239 | 243.903 | 0.000 |
| 2 | 6.229989 | 1371.152 | 0.000 |
| 3 | 0.174461 | 81.948 | 0.000 |
| 4 | 0.172584 | 88.234 | 0.000 |
| 5 | 1.061487 | 416.577 | 0.000 |
| 6 | 3.147534 | 527.129 | 5022.761 |
| 7 | 1.222932 | 87.062 | 2219.510 |
| 8 | 0.197774 | 76.394 | 899.241 |

The original source plan explicitly excluded these water/corridor reservations from both own ground and Ion clipping. A cut-only fill can therefore remove the background without adding own land, yielding an empty gap. Support floors, native preview water and runtime city-water meshes are distinct; this audit does not infer a missing water surface from an image or create water geometry.

## Centerline tags and preview-water/support coverage

For long hole 2, all four actual raw OSM centerlines are tagged only `id` and `waterway=drain`. None has a `width`, `covered` or `tunnel` tag in this source. Missing tags do not establish a dry surface or a tunnel. The chosen 10 m buffer half-width (20 m nominal full corridor) is therefore a conservative retention policy, not surveyed surface water; an over-wide reservation is plausible but its dry subregion is not proven.

The source preview-water ring/triangle plan contains only way/4845030 (moat), relation/5451458, relation/3531212 and relation/68127 (three lakes). The basin floor support plan uses the same four IDs. Their triangulated XY intersection with **each of all eight internal holes is exactly 0 m²** in the source coordinate model. These source plans supply no internal-drain water or basin floor; the runtime separate water layer may still do so and remains unverified. No water/vesi/basin-named material was found in the six actual GLBs read here. This agrees with the previous export-exclusion diagnostic and does not identify the screenshot water.

Own ground covers only F32 boundary residuals inside the reservations. Some marble/ramp/shore projection does overlap them; these may be banks, bridges or stone edges and are not replacement dry ground across the whole corridor. JSON partitions material intersections against technical retention outside exact water. In particular, long hole 2 has 1,371.152 m² of marble/ramp/shore projection versus 19,689.258 m² retained hole area, but only 0.001628 m² own-ground overlap. Closing its full cut hole would therefore remove its retained background without a continuous own-land replacement.

## Bounded correction proposal

- Preserve all eight current holes until actual source-water/technical retention is intentionally replaced; no unsupported dry hole established by this audit.
- Do not close whole long hole2 or any smaller hole based on image silhouette; eight source-supported reservations are exact geometrical facts, screenshot correspondence remains a hypothesis.
- If parent/receiver establishes a dry subregion, derive candidate C = confirmed dry region intersect current retained region intersect verified own-ground coverage, excluding verified water polygons and required water banks/bridges; add C to cut only after providing own ground there.
- For narrowing 10m technical corridors, obtain actual non-tunnel drain/bank width and geometry first; 10m is a policy retention half-width, not measured water width. Current own ground was intentionally cut out there, so clipping Ion alone may expose an empty gap.
- Re-union/decompose candidate cuts and require numeric equivalence, no source-water intersection, all components loaded, matched game before/after normal/hide checks. No water elevation/DEM/floor change is justified here.

## Unresolved evidence

- Exact screenshot camera/pixel-to-world registration and nominated long/small target coordinates.
- Actual dc48614f runtime cut arrays/root matrices and receiver-converted KTX2 GLBs.
- Actual water-layer network/mask activation and heights; native source-water/support plans do not prove runtime water surfaces.
- Survey/source bank geometry or measured width for centerline-only drains, and bridge/tunnel status at each intended correction.
- Continuous local own-ground coverage and Ion clearance at proposed correction; current proof is source footprint, not a runtime visibility/depth test.

Only this MD/JSON pair was written, through the external T7 launcher. Existing D/geometry-deps was used; no new dependency install, helper script, Blender, GUI/browser, asset/generator edit, Git write, receiver message or delegation.
