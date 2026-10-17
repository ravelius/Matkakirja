# Astra — source-network1 actual-frame review

**PASS for the bounded material-boundary correction in these actual GLB renders.** This is a substantial visible improvement over V7: the broad sharp-to-blurred material jump disappears, the new area reads as the same kind of worn paving, and neither C7's flat-cell character nor its source-fragment patchwork is conspicuous. This is not full paving-quality, runtime, receiver or canonical-adoption approval. Remaining visible defects and the loss of V7 zone directions are recorded below, rather than using untested runtime matters to reject a demonstrated image improvement.

## Evidence

Read D/AGENTS.md. Personally viewed **all 30 original 1600×900 PNGs**, paired by camera, from `boundary-actual-renders-source-network1/before-v7` and `after-v8-sourceNetwork1`. The 15 views are `ilma`, `taihedian`, `aukio`, `beihai`, `jingshan`, `hutong_ilma`, `boundary-wide`, `boundary-close`, `boundary-side`, `north-boundary`, `south-boundary`, `northwest-corner`, `southwest-corner`, `paving-top-repeat`, and `interior-regression`. These are actual-import ambient source renders, with separate AO, not game captures.

Verified all 30 file hashes against the completed root receipt through the external launcher; no mismatches. Receipt SHA-256: `68cbeb646673bbb4f56720a0f462a3e9d1dadcd16de9b286ef4036145935b235`. No image resizing, editing, atlas substitution or new rendering was used for this verdict.

## Boundary and corner findings

| Matched view | Actual observation | Bounded decision |
|---|---|---|
| boundary-close | The former sharp left / blurred right division around x800 is replaced by coherent worn stones. The new side is a little softer, especially toward the lower foreground, but there is no comparable large material or stone-size jump. | Pass material-continuity improvement; not a claim of pixel-identical sharpness. |
| boundary-wide | The right-hand courtyard no longer reads as a separate blurry carpet. Stone density and subdued palette carry across the former divide. | Pass. |
| boundary-side | At the oblique crossing, grain and joints now remain legible on both sides. A thin light line along the underlying boundary remains, and new-side detail is slightly softer. | Pass texture-boundary correction; thin existing line remains unresolved. |
| north-boundary | The visible band around y400, previously smeared above/along the roof, now contains coherent stones. | Pass for the visible strip; the roof still hides much of the inward area. |
| south-boundary | The strong horizontal sharp/blur break around y330 disappears. Lower foreground stone scale and contrast fit the upper source region. | Pass; clear evidence of the intended correction. |
| northwest-corner | The former rectangular blurry inset is replaced by the same masonry character. No obvious new donor islands, corner patchwork or open hole. | Pass for visible material transition. |
| southwest-corner | The foreground corner now continues the source paving instead of switching to a soft rectangular field. | Pass for visible material transition. |

I do not see a conspicuous inward eight-meter sharp/soft join in these views. I also do not see obvious donor-grout double outlines or picture-frame halos around stone cores at this render scale. This is a rendered observation, not a certification of every source label or every subpixel mask boundary. The conservative donor contribution appears integrated; these frames do not isolate its benefit from the larger benefit of restoring the old joint network.

The large dark angular/polygon lines remain visible in the same locations as before: particularly the center of boundary-close/side and across south/corner views. A thin light boundary line is also present before and after in the side view. These defects should not be described as repaired, nor attributed to newly introduced donor stone joints. The pictures alone do not establish their exact geometric or shading cause.

## Interior, repetition and six fixed views

`interior-regression` is materially changed, but the result is more coherent and better resolved than the broad V7 mosaic in this diagnostic. The paving stays in a subdued gray/warm-gray range, with natural edge/grain structure. It avoids C7's clean flat rectangles and does not become a collection of bright replacement-stone islands. I accept this as a useful interior result for the bounded prototype.

It is nevertheless **source-network character, not preservation of the exact V7 material design**. The new field looks denser/finer than the blurred V7 representation; that apparent size difference is not evidence that the physical source dimensions changed. The implementation explicitly removes V7 zone orientation. These frames show no glaring new local orientation break, but they do not prove all wall-aligned paving directions are preserved. That tradeoff remains part of the receiver's style decision; do not label the entire V7 direction unchanged.

Repeating short-stone/repair and pale-stone groupings remain recognizable across the close and wide fields. They are inherited in character from the old repeating source visible on the unchanged side. The 28.8 m donor appearance period has not made the surface visually nonrepeating. The high `paving-top-repeat` view does not expose a conspicuous new 28.8 m block grid, but it is too distant to clear the inherited 4.8 m joint motif or moving-view repetition. This is a remaining quality limitation, not a reason to discard the successful boundary correction.

| Fixed view | Finding |
|---|---|
| taihedian | Foreground paving becomes coherent across the former material split. Architecture, platform and roof appearance show no obvious unrelated change. |
| ilma | No obvious new city-scale silhouette, layout or protected-environment regression; paving detail is too small for a quality judgment. |
| aukio | No obvious unrelated regression; the pilot correction is not a close paving test here. |
| beihai | No obvious unrelated visual change. Water is not assessed by this source render. |
| jingshan | No obvious unrelated visual change; foreground foliage hides much of the paving context. |
| hutong_ilma | No obvious unrelated visual change in roofs, buildings, trees or street pattern. |

No obvious new normal-orientation shading break appears in this ambient comparison. That does not establish a receiver tangent-basis pass or prove detailed normal/albedo physical registration; a different light and actual target runtime can reveal behavior absent here.

## Decision and next use

Keep source-network1 as the **preferred reviewed private candidate for the boundary fix**, ahead of the rejected C7. The strongest comparison packet is boundary-close, boundary-side, south-boundary, both corners, interior-regression and taihedian, with the remaining diagnostics available. Do not restart the joint-network redesign merely because device and runtime checks are still open.

The next evidence should establish whether the receiver accepts the restored source-style paving and direction tradeoff, and how this exact candidate behaves after the target material conversion. Preserve these matched renders as the before/after proof. A later refinement should not reintroduce mismatched networks or broad blur to disguise the remaining polygon lines or repetition.

Parent reports raw whole-72 size **163,233,828 bytes**, below **164,326,250**, leaving **1,092,422 bytes**. This is attributed technical information, not an independent geometry/byte audit by this visual reviewer. The 52 face donors, 60 old-source confidence islands, source UV phase and retiled legacy data maps are implementation context from the parent; the verdict above comes from the actual frames.

Runtime normal basis, converted KTX2, motion/LOD/shimmer, water, cut requests, draw calls, memory/performance, device and owner acceptance remain separate open gates. No canonical adoption is authorized by this report. Original RGB, source footprints/heights, 69 frozen V6 GLBs and six cameras remain protected; #362 remains separate. Only this assigned report pair was written. No asset edits, generation, Blender, Git, receiver messages or delegation occurred.
