# Natiivi-UI: luovutus 15.10.2026 klo 20.14 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261015-ilta4.md (Opit, säännöt, asettelutestin käyttö).
Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-worktreet:
- /Users/Shared/Claude/wt/proto-natiivi-ui-aloitus-195 (haara natiivi-ui/aloitus-195, juna 195/196)
- /Users/Shared/Claude/wt/proto-natiivi-ui-nimet-196 (haara natiivi-ui/nimet-196, juna 196; uusi tänään)
Remote natiivi-backup. Ennen käännöspyyntöä: sh Linssit-testit/unity-tarkistus.sh + python3 tyokalut/kielivahti.py + tyokalut/pohjavahti.py.
Asettelutesti: `MATKAKIRJA_ASETTELU_KOOT="iphone-pysty,ipad-vaaka" MATKAKIRJA_ASETTELU_NAKYMAT="<näkymä>" MATKAKIRJA_ASETTELU_KUVAT="*" zsh <worktree>/tyokalut/ui-asettelutesti.sh <sha> linna > /Users/Shared/Claude/proto-3d/lokit/<nimi>.out` (taustalle; kuvapolku .out-tiedoston alussa). Ei `cd … ;` -etuliitettä.

## TEHTY (pushattu)
natiivi-ui/aloitus-195:
- 580f28994 Isoisän unen 3 kuvaa (naamio, jadesinetti, Kolme veljestä) buildiin; sähke-ääni oli jo 70c6c4f76. IsoisanUni.Kaytossa yhä false.
- ef82400db asettelutestin paneeli-RT:hen syvyys/stencil (24): SIJAINTI-LCD ei enää valkoinen (pyöristetyn overflow-maskin vika, vain testi).
- 962204f68 ISS-kohdevalikko väistää hakunapin (iPhone) + eteläisen valtameren rajaus 2,0× y 0,29 (revontulet keskellä).
- 8fea00a75 testin LCD-rivit Helsinki/SUOMI (IssOhjaamo.TestiSijainti, vain editori). PT sai kuvaparin (…190854…-kuvat). Debug-haara debug-lcd poistettu.
- 54b0ac897 … 34aaec027 ALOITUSKARTAN VIHJEET (omistaja 19.04, PT 19.3x; KS-data 64207c0f9 mergetty): UI/Aloitusvihjeet.cs, kytkin vihjeet.json
  `kaytossa` (false; Aloitusvihjeet.TestiKaytossa). Merkit valintanäkymässä (Aloitusnakyma.ValitseePallolla) kerroksessa Pelidialogit, Erikoisnostot-
  pohja; kuvalliset 112×56 (2:1), 5 Codex-kuvaa puuttuu → paperilevy + kompassi. Napautus → Nostokortti.Avaa("vihje:<id>") → Hetki-laji, suoraan
  vaiheeseen 2: pienoismalli (2:1-kangas = hero-kehys), nimi, Meta = tila, Teksti = rivi (SK). Kuvat StreamingAssets/mukana/aloitusvihje-*.png
  (LAHDE.txt). Asettelunäkymä "aloitusvihje". PT kuittasi 34aaec027 (junaan 196).
- 572050cf6 NOSTOKORTTI-pohja (Pohja.NostokortinPaikka): leveällä sivukortti ja ✕ kulmanappien (Karttaselite.LinssitNappi) alta — PT:n korjauspyyntö
  (iPad vaaka ✕ peitti ☰:n). Koskee kaikkia sivukortteja.
natiivi-ui/nimet-196 (pohja SS 83229986b + LS1 124185350 + SS 1db3e1a87):
- bfa99c784 … c7b7f7653 NIMET-nappi (omistaja 20.01): IssKohdevalikko.NimetNappi (kytkin, false), ylärivin oikea pää LIVEn perään (LIVE piiloutuu
  SS:n IssParasHetki.Kaytossa-kytkimellä), asettaa LS1:n KupoliNimet.Piilossa, PlayerPrefs "iss.nimet.piilossa". Testi `ui linssi kohdevalikko nimet 1|0`,
  asettelunäkymä "iss kohdevalikko nimet". Merge-korjaukset 29e7fd8a1, c7b7f7653 (5d648b87b → 1db3e1a87: junaan nimet-196:n kärki).
- 8fd68fde8 ilmiöryhmät (Valoseppä, omistaja 20.05): IssKohderyhmat.Ilmioryhmat (Tunnus, OtsikkoAvain, TaivasPaikka[], Func<bool> Kaytossa) piirtyy taivaan
  jälkeen; napautus → IssKohdevalikko.IlmioValittu(ryhmä, paikka). Valoseppä lisää datan + TulivuoriEfekti, Siirtoseppä lennon. Rajapinnat viestitty.
Katselmointi: LS1:n skannerin taivastila hyväksytty (0a330ae0e); pyöreä reuna 5449241b9 OK.

## AVOIMET (järjestyksessä)
1. Aloitusvihjeiden ✕ iPadilla (PT): korjaus 572050cf6 tehty, kuvatarkistus ajossa → /Users/Shared/Claude/proto-3d/lokit/nui-asettelu-aloitusvihje-572050cf6.out
   (ipad-vaaka, ipad-pysty, iphone-vaaka). Tarkista: ✕ ja kortti ☰:n/haun alla, ei päällekkäin; sitten SHA + kuvapolku PT:lle.
2. NIMET-nappi: valikkokuva ajossa → /Users/Shared/Claude/proto-3d/lokit/nui-asettelu-nimet-bfa99c784.out (vanha SHA ilman LIVE-poistoa; aja tarvittaessa
   c7b7f7653:lla + `ui linssi kohdevalikko hetki 1`). Ikkunakuvat nimet 1/0 tekee LS1 (linssiseppa/kuvat-196) ja lähettää PT:lle. Kuva PT:lle ennen kytkentää.
3. Ilmiöryhmät: odota Valosepän datahaaran SHA → mergeä nimet-196:een, kuvatarkistus asettelulla ("iss kohdevalikko ryhmät" kytkin päällä).
4. Aloitusvihjeet: omistajalle myöhemmin kuva oikean kartan päällä SK:n rivillä, kun rivit hyväksytty; 5 Codex-kuvaa (posti 40845b421) → 2:1-kankaalle
   (rajaa alfan mukaan, 1000×500, ks. LAHDE.txt) + .meta.
5. Isoisän uni päälle vasta: teksti hyväksytty + äänitetty + omistajan OK (IsoisanUni.Kaytossa = true).
6. Tyylikirjan synkka: webin PR #4639 (karttapaletti) oli 19.0x yhä OPEN → mergen jälkeen `node tools/tyylikirja.mjs --natiivi <proto-worktree>`.
7. Edellisten luovutusten avoimet (intro-pehmennys laitteella, lasipohjan riskit, levyn app-kopiot) ennallaan.

## Opit
- Asettelutestin valkoiset alueet: testin RenderTexture ilman stenciliä piirsi pyöristetyn overflow-maskin valkoisena.
- Nostokortin kuvasarja on 2:1-hero (scale-and-crop): läpinäkyvät pienoismallit 2:1-kankaalle, muuten kupolit leikkautuvat.
- Toisen roolin haaran uudelleenkirjoitettu commit (5d648b87b → 1db3e1a87) tuplasi rivit mergessä: tarkista grepillä ja unity-tarkistuksella ennen commitia
  (älä ketjuta `git add` tarkistuksen perään).
