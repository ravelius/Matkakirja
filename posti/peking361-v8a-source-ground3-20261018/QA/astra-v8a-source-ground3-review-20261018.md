# Astra — V8a source-ground3 actual-render review

**Bounded visual GO for the restored land and channel geometry in these actual-import renders.** The targeted broad missing-land areas become coherent paving/grass edges with narrow retained channels. I see no conspicuous new black crack, bright fill patch or abrupt stone-scale change at the inspected land ties. The six fixed views show no obvious unrelated regression. This decision supports the next technical/receiver validation stage; it is not a game-water, Ion-cut, full-city or owner acceptance.

## Evidence inspected

Read D/AGENTS.md. Personally viewed all **18 original 1600×900 PNGs** in `v8a-source-ground3-actual-renders`, comparing `before-sn1` with `after-v8a` for the fixed six (`ilma`, `taihedian`, `aukio`, `beihai`, `jingshan`, `hutong_ilma`) and `k3-piha-overhead`, `k3-west-channel`, `k3-east-channel`. All 18 frame SHA-256 values match the completed root receipt. Receipt SHA-256: `0e26832becad196b097421a1b93b04bb04c1c647a5bc4c19b6218de63f4f650c`.

The recorded fixed-six definitions, rendered diagnostic-camera definitions, common ECEF frame and ambient/cast-shadow settings match between stages. The receipt identifies 24 actual LOD0 imports, material images from the GLBs, and tile2_3 land/bank/submerged-floor additions. These are actual candidate renders, not the earlier extra-mesh white-line diagnostic. I did not independently re-audit the mesh/source-footprint proof.

## Land ties and channel views

| View | Observed result | Limits |
|---|---|---|
| k3-piha-overhead | The long western blank strip and large eastern branching blank area are largely replaced by ground. Existing small grass areas now connect to a continuous land edge. The remaining channel is narrow and follows the visible route instead of occupying the full former blank region. Paving scale and subdued color fit adjacent SN1 paving. | The separate upper-left/central oval blank area and the lower white continuations remain visible. This is not a claim that every white opening in the image is repaired. |
| k3-west-channel | Paving and grass extend coherently to the bank. Trees previously over the blank region now have visible ground beneath/around their bases. The land edge and recessed channel are readable, including the lower bend. No conspicuous black gap, white sliver or bright AO-shaped patch marks the shown old/new land tie. | Tree canopies and the long wall occlude parts of the bank. Fine contact shading and every hidden junction cannot be cleared from this camera. |
| k3-east-channel | The former large white cutout becomes continuous paving around a narrower channel. Banks and floor provide a readable recessed route through the curved and angular sections. Stone density and pattern character remain consistent across filled land. | The dark floor and bank faces look fairly plain in this ambient render. Road/channel crossings and wall passages need receiver context; this view does not prove bridge function or final water integration. |

The restored ground does not read as a separate smooth mat or an obviously brighter neutral-AO island. There is some ordinary mottling and repeating source texture, as on existing SN1; I do not see a new large discontinuity that would justify changing the existing SN1 material. The new neutral AO treatment is visually unobtrusive in the shown ambient setup. That is not equivalent to a correct baked contact-shadow solution for every nearby wall/tree or a directional-light validation.

Banks appear connected along the visible channel sections, with recognizable corners/bends and a lower floor. There is no conspicuous floating bank cap or cross-channel end wall in the visible open continuations. Their exact width, elevations, source correspondence and all hidden endpoint contacts belong to the geometry audit. I have not measured the nominal four-meter wet width from the pixels.

The broad dark straight road/path strips were already present before V8a and remain distinct from the newly exposed channel floor. They should not be counted as newly introduced black gap strips. Existing fine dark polygon lines remain visible in paving, including near the eastern crossing. This review does not clear or repair those lines.

## Fixed six and remaining white regions

- **ilma:** the target area's broad white opening is reduced and the channel becomes visible at city scale. No obvious new building, vegetation or city-silhouette regression.
- **taihedian:** SN1 foreground material continuity remains intact; no obvious unrelated roof, platform or architectural change.
- **aukio, beihai, jingshan, hutong_ilma:** no obvious unrelated regression in the corresponding visible environments. These views provide limited close evidence about the restored channel area.

White regions remain in the overhead and distant views, including the oval opening above the central large roof and the lower continuations beyond the new channel ends. They are present in the before view. I do not classify them as new V8a failures, or claim this bounded work solves them. Their exact ownership/scope should remain in the technical packet. The open ends must not be capped just to make this dry preview look enclosed.

## Decision boundary

Proceed with this candidate through the full technical audit and receiver's exact converted-artifact test. The approximately **5731 m²** restoration, use of correct V2/existing-field source planes, source-water/nominal-width retention, and unchanged original SN1 images/materials/corners are parent-reported implementation facts; this report independently supports the visible result, not those numeric or byte-exact assertions.

No water surface is included by contract. The dark gray/brown floor visible here is the exposed channel floor under diagnostic lighting, **not a prediction of final runtime water color or appearance**. Do not add a decorative water sheet based on this review. Actual receiver water level, shoreline intersection, Ion cuts, wall/road crossing behavior, converted-material response and motion must be tested in the intended environment.

The renderer uses ambient diagnostic lighting, no geometric cast shadows and a documented normal basis different from the game; AO is connected for this source diagnostic. Therefore no claim is made about game lighting, specular response, performance, physical device or owner acceptance. Do not call V8a delivered or canonical from this visual GO alone.

Only the assigned report pair was written. Original PNGs and source assets remain unchanged. Hash checks ran through the external launcher. No assets, renderer, Blender, Git, receiver messages or new delegates were used. Task #362 and the earlier thin-line cause work remain separate.
