# Tripo archive audit — mass-production preparation

**Scope:** read-only metadata inventory of selected T7 output roots and existing manifests/checkpoints. This is a verified subset, not a complete Tripo account job list.

## Findings

- **28 current-scope original Tripo GLBs are present locally**: 23 jobs across the 15–16 Nov building/group 5 set, plus 5 Grand Châtelet/Temple jobs. All 28 source records have local original paths and stored SHA-256 values in prior checkpoint/archive evidence. The local pass checked existence and recorded size; it did not rehash these large files.
- The 23 building/group 5 entries are: #2287–2289 (Kalmar, Kronborg, Karlštejn), #2301–2302 (Castel del Monte and two Chillon tries), #2313–2315 (Sukharev tower, Christiansborg, Saxon Palace), #2324–2327 (Caernarfon, Kuressaare, Häme, Helsinki old station), #2335–2337 (Neuschwanstein and two Turku candidates), #2344 Kamjanets-Podilskyi, #2373 Helsinki Cathedral, and five group 5 jobs #2386, #2387, #2400–2402 (Vasil, Hallgrímskirkja, Süleymaniye, Humayun, Parthenon). This includes a rejected/alternate Turku original; it is retained as an original, not treated as an approved selection.
- GC/Temple count is five originals: Grand Châtelet #2250; #2253 parts A/B/C; Temple #2251. GC #2261/#2269 and Temple #2271/#2403 outputs are correction, technical or local candidate derivatives, not new Tripo originals.
- The selected Nov Paris landmark subset has 12 documented Tripo job IDs across Grand Palais, Louvre 21h (4 attempts), Opéra 24j, Sacré-Cœur 24n, Invalides 24l (2 attempts), Panthéon 24i, and Sainte-Chapelle 22c (2 attempts). Matching raw archives are present for those 12 IDs. A further `opera24j-attempt02-raw.glb` is present locally, but the checkpoint does not identify its job ID; it remains an unlinked artifact, not counted as a verified unique job.
- The listed Paris landmark LOD GLBs are downstream reductions/UV/geometry outputs, not replacements for the raw Tripo originals. Other older Paris streams exist (e.g. Louvre 21c and character assets) and were not exhaustively audited.
- The four London bus/taxi GLBs under #2203–2206 came from deterministic low-poly geometry and Blender export according to the local checkpoint; they are not Tripo jobs. The Routemaster v2 was locally staged then cancelled/archived before mailbox delivery, also not a Tripo job.

## Coverage and gaps

- No complete account-wide Tripo job export was available in this bounded local pass. The 28 current-scope originals and 12 Paris records are **not** an all-time count.
- Parent live Chrome observation reported 203 Tripo model assets and 29 Usage History pages. Cloud assets can include uploads, derivatives and variants; 203 is not a generation-job or unique-building count. This audit did not reconcile the cloud history to T7.
- Existing hashes were taken from archive/checkpoint records. No large GLB hashes were recomputed, no Blender/render/browser jobs were run, and no downloads were made.
- Current PT order states Bastille first and Turku waiting; this audit initiated no production.

The full per-file inventory, recorded hashes, job IDs, statuses, and evidence roots are in `archive-audit.json`.
