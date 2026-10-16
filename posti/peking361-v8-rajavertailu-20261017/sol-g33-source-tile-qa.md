# Sol — G33 source tile QA

**Reject G33 for direct periodic texture use. It can be discussed as an immutable appearance-reference candidate, not an approved or bound 3D material.** Native1254×1254 RGB was personally inspected; its SHA matches the receipt. OriginalNAS copy match: True. No original pixels were edited.

## Native appearance and actual layout

The stone grain, chipped/worn edges and natural color variation are richer than flat analytic rectangles. This supports appearance discussion, not a seamless/PBR approval. Actual strong mortar measurements show **29courses and10–11vertical joints per course**, not the requested16×32. The29course bands and10/11joint counts are stable across .55/.70/.80 row-persistence thresholds. Exact chipped mortar remains uncertain.

Ordinary median stone width is **122.000px**, mean course pitch **43.241379px**, pixel aspect **2.8214:1**. Ordinary width10/50/90percentiles: [117.0, 122.0, 126.5]. Thus square-world sampling would yield roughly2.8:1 stones rather than the nominal1.9:1.

An illustrative median-based calibration is about **9.76475m horizontally ×14.5m vertically** for nominal .95×.50m stones. Count-based averaging instead gives9.95862×14.5m. These differing calibrations reflect irregular counts/phase; neither establishes an approved seamless physical period. The old30.4×32m field period must not be carried over blindly.

## Measured repeat-seam rejection

| Border pair | Mean RGB difference /255 | Ordinary adjacent-pixel mean /255 | Ratio | Border95th percentile |
|---|---:|---:|---:|---:|
|top_bottom|31.6869|12.8284|2.470|70.0|
|left_right|12.2376|9.2702|1.320|33.0|

Border jumps alone are not a universal perceptual seam threshold, but here they accompany grout-phase and stone-width inconsistency. Top/bottom is the strongest discontinuity. Cyclic horizontal course spacings are42–46px; the image-border line at y0 is weaker than the29real course bands and is not counted as an extra course.

Joining left/right edges creates inferred seam-stone widths spanning **28.50–165.50px**, versus median ordinary122.00px. Wrap width/row ordinary-median ratios span **0.232–1.362**. Some seam stones become conspicuously short/long. Wrap labeling cannot establish continuity when the actual joints/grain do not close. The prompt’s word seamless is not source evidence.

## Segmentation feasibility, not an accepted mask

SciPy,cv2 andskimage are unavailable in the permitted runtime; no installation was attempted. NumPy/PIL analysis used dark local residual and periodic binary closing, then scanline-run component labeling with wrap joins. Derived masks existed only in memory. SourceRGB remained untouched.

| Dark residual threshold | Close kernel | Inferred mortar fraction | All white components | Stone-sized components1000–12000px | Merged>12000px |
|---|---:|---:|---:|---:|---:|
|8|3|0.365|4274|274|0|
|12|3|0.213|680|249|6|
|16|3|0.129|222|148|27|
|12|5|0.411|3603|252|0|

The sensitivity is substantial: low thresholds mistake grain for grout and fragment stones; high thresholds leave joint gaps and merge stones. Strong course/vertical-joint seeds are useful, but automatic closed-cell segmentation is not established. Closing/filling components is acceptable for analysis masks, not evidence that the original stones or image wrap were repaired. A row-aware segmentation with confidence/uncertain-gap review could be investigated. No invented complete label map is supplied.

## Registered maps and bounded next options

Any future normal/MR and whole-cell mix mask must derive from the **same validated G33 stone/mortar network**. C7’s analytic row/column masks do not register to this image and would cut photographic stones. Derive artistic bevel/height only from validated grout/boundaries; grain brightness does not measure physical height. Roughness remains inferred from this single RGB source. All UV sampling, periodic labels and collars must stay registered across the derived maps. No maps or masks were generated/approved here.

The source can be shared as an appearance-reference candidate with these seam/count caveats. A possible later investigation is UV resynthesis or registered individual-stone donors read from G33 without directly wrapping the whole image; that is neither implemented nor accepted. Alternatively, make another complete source generation and verify its actual border phase/layout. Preserve G33 unchanged and do not partially repaint it or attach old analytic normals/MR/masks.

Only this MD/JSON pair was written through the externalT7 wrapper. No asset/image editing, rendering, generation, Git, receiver message or delegation.
