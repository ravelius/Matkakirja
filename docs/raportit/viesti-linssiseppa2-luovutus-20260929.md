# Linssiseppä 2:n luovutus 29.9.2026 klo 16.1x (tilinvaihto, viikkokiintiö 94 %)

Rooli: Linssiseppä 2 (Opus, high), Päätoimittaja johtaa. Checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2 (haara
linssiseppa2-tyo-20260928). Proto-worktree /Users/Shared/Claude/wt/proto-linssiseppa2-saatimet (roolin ainoa; vaihda haaraa
siinä, älä luo uusia; poista `git worktree remove` kun haarat masterissa eikä radiotyö kesken — Postivahti kysyy).
Simulaattorit: linssiseppa2-iPhone F2D9B022-CBC4-41CD-85E2-E30CCA5D6446, linssiseppa2-iPad13 4CE6C737-B056-4F73-9CEA-D2DABFC9B8FC.
Käännös- ja laitevuorot Julkaisijalta ("NYT"; ilmoita "käännös valmis" ja "sammutettu"), käännökset nice 15.
Skriptit S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/1db40375-7217-4e74-82c8-e8101e4d9a26/scratchpad:
kaanna-jono.sh (`S=$S zsh $S/kaanna-jono.sh <nimi> "haara+haara"` → $S/<nimi>-app), ajo-kavely3.sh
(`APPNIMI=<nimi> LAITE=iphone|ipad [VAAKA=1] UDID=… zsh ajo-kavely3.sh`: kyyti, astro kavely -vaiheet kuvina, radio Rooma;
sallii 3 käynnissä olevaa simulaattoria), hehku_maski.py. Lokit proto-3d/lokit/linssiseppa2-laite-20260929-kavely{1,2,3}/.

## 1. MERGE-PYYNNÖSSÄ (Natiiviseppä, 1.0.48)

- **Avaruuskävely** proto linssiseppa2/avaruuskavely **bdea89bf** — OMISTAJA HYVÄKSYI 29.9. ("Hyväksyn"). Natiiviseppä yhdisti
  sivuhaaraan natiiviseppa/juna-1048 73cdb113 (testit ajossa) → 1.0.48-juna Julkaisijan luvalla. Tarkista: `git merge-base
  --is-ancestor linssiseppa2/avaruuskavely master` proto-gitissä. Sisältö: KyydinTila.Ulkona (katse kohti aurinkoa, 30° alas,
  kenttä 70°), Iss.Avaruuskavely (Ilmalukko → Ulos → Köysi → Auringonnousu-kelaus ≤ 5 s → Pulu 24× → Kuva → Vertailu →
  Takaisin), AvaruuskavelyNakyma Codexin kerroksilla (Resources/KavelyKerrokset, tuonti tyokalut/kavely_kerrokset.py),
  Pelikoodarin äänet Resources/KavelyAanet, Pulun taulun rivi, `astro kavely [napauta|pois|tila|alas <°>|suunta aurinko|sivu]`.
  Kuvaparit proto-3d/lokit/linssiseppa2-laite-20260929-kavely3/kuvapari-kavely-{iphone-pysty,ipad-vaaka}.jpg.
- **Radio aina päällä** proto linssiseppa2/radio-virta **b68dcdd3** (pohja 9ee9136e): ei-asemaa-teksti "EI ASEMAA / VALITSE
  KAUPUNKI" (ei "RADIO POIS"); kytkin sulkee linssin (jo 28.9.). Samassa juna-1048:ssa.

## 2. KÄRKI: Codexin puuradio v2 (odottaa)

- Omistaja 29.9. hylkäsi kuunvaloradion ("ihan kamala … sininen"): uusi tilaus posti/fable-codex-radio-yksikuva-20260929.md —
  alkuperäinen puuradio YHTENÄ kuvana (iso osa varjossa, omat lamput valaisevat pintoja, ohut sinertävä reunavalo), vain
  VU-neula erillisenä (sama akseli) ja näytön teksti tyhjänä; asemanimet piirtää peli. Ei kerroksia, hehkuja eikä pois-tilaa.
- Kun toimitus tulee (Julkaisija hakee ~/Documents/Codex/2026-09-29/…): uusi haara pohjasta linssiseppa2/radio-virta b68dcdd3,
  vaihda RadioNakyma.Codex.cs yhteen kuvaan + neulaan (poista cValot/hehkut/power-on|off), Resources/RadioUusi, alfa ≥ 240 → 255
  peittävissä (muisti ui-kuvien-alfa-255), kuvapari (iPhone pysty + iPad vaaka, Rooma; ennen = kavely3/ipad-radio-rooma.png).
  OMISTAJA HYVÄKSYY KUVAN ENSIN: ei merge-pyyntöä ennen Päätoimittajan välittämää OK:ta.
- Hylätty haara linssiseppa2/radio-kuunvalo e26ab11e: EI mergeä (käyttökelpoista: tyokalut/radio_hehku_maski.py,
  Pistenaytto.PisteVari).

## 3. MUUT

- Web: avaruuskävely päätetään erikseen natiivin jälkeen; radion uudistus vain natiivi (omistaja 24.9.).
- Siivous: vanhat .app-kopiot poistettu; scratchpad ~0,4 Gt.

## 4. OPIT

- UI Toolkitissa ei ole additiivista sekoitusta: tasaväriset hehkut alfa poltettuna (× voimakkuus) ja läpinäkyvyys ajossa;
  hehku merkkien päällä pesee ne → maski taulun kirkkaudesta tai hehku tekstin alle.
- Codexin koko kankaan kerrokset: rajaa sisällön kokoisiksi ja alfa ≥ 240 → 255 (tyokalut/kavely_kerrokset.py).
- ISS:n auringonnousun hetkellä maa alla on yötä (aurinko 20° alapisteen horisontin alla): katse kohti aurinkoa ja aika 24×
  Pulun ajan, jotta valo leviää. Reunavalokerrokset vain nousussa (muuten oranssi sädekehä).
- Katse 30° alas (ζ 67°, kenttä 70°) piirtää laatat; ongelma yli ~55° oli vain pitkällä objektiivilla.
- rm -rf muuttujalla estyy turvatarkistuksessa: kirjoita polut auki.
