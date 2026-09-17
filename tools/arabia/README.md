# Ihmisen matka: Arabia-only audio correction, 16 September 2026

> **CANCELLED 17 September 2026 — do not run, do not activate.** The owner
> corrected the order at 03.40 UTC: *"Se simpukka tarkoitti pulun simpukka
> kommenttia. Ei kertojan."* The narrator's sentence was restored to
> `js/linssit/ihmisen-matka-kertomus.js` word for word, so the live
> recording and `kertomus-manifesti.json` are correct as they are (Arabia
> keeps its six sentence starts). The staged objects stay archived and the
> live aliases are not touched. The `aanitePaivitettava` flag and the
> `AANITE_PAIVITETTAVA` constant mentioned below no longer exist.

Fable order: `posti/fable-codex-ihmisen-matka-aanite-uusinta-20260916.md`.
Approved source is `claude/bold-ride-vow4ki-ihmisen-matka-kappaleet`,
base `3b441b68a31843c5dabfe830f16cb4ac79b6092a`.

No new synthesis is needed. Delete the existing words **Etelän rannikolla
ehdittiin hioa okraa punaiseksi ja pujotella simpukankuoria helmiksi**.
Keep the original recordings of “Sitten kului taas pitkä aika” and “ennen
kuin ylitys Arabian niemimaalle onnistui” and all subsequent speech.
The other 20 sections, including their separate shell references, stay intact.

## Verified local build

`node --test tools/arabia/trim-narration.test.mjs` — four tests passed.

`node tools/arabia/trim-narration.mjs` — downloads hash-pinned inputs and
builds into ignored `media/arabia-simpukkalause-pois-20260916/`.
Requires Node, ffmpeg, ffprobe; no ElevenLabs account/key/API calls.

- Original MP3: 394.710 s; edited MP3: **387.510 s**.
- Cut precisely **110.600–117.800 s**, removing **7.200 s**.
- Both cut edges are below −45 dBFS; two 5 ms fades affect only silence.
- The join retains approximately **416 ms of silence** at the comma.
- Master PCM before/after the splice is byte-identical to decoded original
  outside those fades; final MP3 is re-encoded, not byte-identical.
- All 21 passages' words and sentence counts match the approved source.
- Arabia: 50 → **40 words**, 6 → **5 sentence starts**.
- New sentence starts: **108620, 115360, 122260, 127140, 129920 ms**.
- All later section/word/sentence timestamps shift by exactly −7200 ms;
  preceding timings stay identical. No new paid alignment request.
- Same voice performance (Viisas Kertoja / eleven_v3), mono 44.1 kHz,
  MP3 128 kbps. Local measured level −17.91 LUFS (original −17.45),
  true peak −2.35 dBTP, LRA 5.7 LU. No volume normalization applied.
- A replacement Arabia fallback is extracted from the same edited master:
  **25.960 s**, with 150 ms before the first word.

Local ffmpeg build hashes (Actions may differ due to encoder/container version):

| File | SHA-256 |
|---|---|
| Full narration | `ff0e6a2673daf6bc978c6f59a653268404dabcef806c6a478b3541b723ddec17` |
| Arabia fallback | `ffc52928ba2b6a88db2e7c278242ef32541da45b6e3b5a9b443b30f15786112e` |
| Updated manifest | `73939adee141b56f55e648891dcf7488e918635aaf486ded3b78a1d301a7d0b2` |

**Not human-listened.** Before activation, listen at 108–115 s of the full
file (or the beginning of the fallback) for a natural comma join. The
lexical and timing checks do not substitute for perceptual listening.

## Bounded staging workflow for Fable

1. Cherry-pick only this tool delivery; retain the current approved
   `ihmisen-matka-kertomus.js`. Tests deliberately fail if other speech
   has changed since the pinned source recordings.
2. Copy `tools/arabia/stage-arabia.yml.proposed` to
   `.github/workflows/stage-arabia.yml` and run it from the exact reviewed
   commit. It requires only existing R2 secrets, NOT `ELEVEN_API_KEY`.
3. `--stage` checks all three current public inputs against pinned SHA-256s,
   archives all originals, stages the new content-addressed full MP3 plus
   the fallback and manifest, and reads every output back. Both audio
   objects must support HTTP 206 Range and game-origin CORS.
4. Obtain actual output SHA/durations/URLs from `delivery-receipt.json`
   and the Actions artifact. Status is **staged-verified-not-activated**.

The script deliberately does NOT overwrite live aliases/manifest, clear
`aanitePaivitettava`, or publish the game. No general upload destination,
URL, command, text or voice can be supplied as input. Repeat builds are
free; immutable staging objects may only be reused with identical bytes.

## Release activation (Fable)

After the listening check, use the exact staged receipt and perform a
bounded R2 copy during the v1926 release:

- Confirm the three current legacy objects still have the original SHA-256s
  listed in `SOURCES`; do not overwrite a newer correction.
- Keep all three archived originals permanently.
- Copy the staged fallback to `aikajana/ihmisen-matka/puhe/ihmisen-matka-kertomus-arabia.mp3`.
- Copy the staged full MP3 to the legacy `ihmisen-matka-kertomus.mp3` alias.
- Copy the staged manifest to `kertomus-manifesti.json` LAST, with
  revalidation/no-cache. Its `tiedosto` points to the new content-addressed
  MP3, preventing an old cached MP3 from being paired with new timings.
- Read back all hashes, test Range/CORS, then clear Arabia's stale-audio
  flag and `AANITE_PAIVITETTAVA` as appropriate. Do not clear them merely
  because this source package exists.
- Send Actions run, release commit, final manifest URL/SHA and all audio
  SHA/durations for the live app's Arabia/timing recheck.

No other audio, text, images or music belong to this delivery.
