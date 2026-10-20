# Päätoimittajan luovutus 20.10.2026 klo 23.30 (konteksti 30 %; PT local_cf5b4eca, päätili)

Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix (paikallinen kansio
/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo/). Edellinen -2250 on historiaa (kohdat 2 karsinta ja 4 auki
ovat yhä voimassa sieltä: karsinnan SEURAAVAKSI 1–5, Codex BLOCKED aamuun, aamun yhteenveto KK:n kautta).
Keskustelu: /Users/Shared/Claude/keskustelut/ (Paatoimittaja-2026-10-20-klo-2255-2326.md). PT:n worktree /Users/Shared/Claude/wt/fable-paatokset-2253.

## 1. JUNA 209 (EI lukitusta ilman "OMISTAJA PYYSI JULKAISUA")
- 209d EI OK (kamera muurissa 46 s, 2 latausruutua, kujalla korkea, Puyi ~1/25). PK korjasi 825c0cc22 + b50c66c2e (tele myös
  aukioilla; PT hyväksyi EHDOLLA: aukiolla esteet näkyvät ~2 s edessä, muuten laajempi ja Puyi ~1/8 riittää). NS 209e-simu valmis
  23.18 (ae78d2ff6) → PK ottaa kuvat 209e → PT tarkistaa 100 % (Puyi ~1/6, ei muuria, ei latausruutuja) → KK.
- Runkoon jonossa: NUI 8632f237e (tyylikirja-auto, tarkista.sh) rungossa 941607e9f (testit käynnissä 23.18); NUI 94b69e11b
  (Poistu ☰:iin, lautapelien ☰, tuloskortin jatko) NS:lle 209e-tarkistuksen jälkeen. Asemataulun junarivi päivitetty.

## 2. OMISTAJAN PÄÄTÖKSET 22.53–23.25 (kaikki kirjattu Raamattuun + lokiin, mergetty ellei toisin mainita)
- 22.53 linja kaikkiin pohjiin, museokuvien riski kaikille maille, KK hyväksyy museotekstit (#5085). 22.55 linssin värit PT:lle,
  kiistanalaiset omistajalle; 4 TARKISTETTAVAA ratkaistu (#5088). 22.58 yhtenäisyys, pohjat viittaavat tyylikirjaan (#5088).
  23.17 yhteiset säännöt: 2.70 natiivin mukaan + uusi 2.201 PELIT (#5093); ⚙-rakenne 2.70 (#5094). 23.22 taidemuseon pohja
  SITOVA, dokumenttikartta 13.52 (#5095 AUKI, CI). 23.25 YHTEISET OSAT ENSIN 2.201 + pohjiin (#5096). 23.12 TYÖLISTAVAHTI 7.39
  (#5091 AUKI, CI hidas). 2.62/4.29-ristiriita korjattu natiivin mukaan (#5088).
- AUKI MERGE: #5091 (Raamattu vahti), #5092 (Valosepän tyolistavahti.py + ROOLI.md: PT:n dokumentit joka kierros), #5095.
  Tarkista `gh pr view N`; vihreä → `gh pr merge N --squash`. #5092:n jälkeen sano Asemataululle (local_7347d54e) "lue ROOLI.md".

## 3. ROOLIT TYÖSSÄ
- NUI: yhteiset säännöt kohta 5 (yksi ⚙: näkymä, viiva, Tekstitys, äänitasot; offline kehittäjälle; museo ilman) + lentopelin
  Poistu + 94b69e11b yhteiseksi osaksi (yksi pelin ☰, yksi tuloskortti) → KUVAT PT:lle ennen/jälkeen (lautapelin ☰, tuloskortti,
  ISS/opas/aikajanan ⚙) ennen runkoa. Sitten: uusi-linssi.md:n NUI-osuus (KK: pohja ei läpikäyntikunnossa ilman sitä).
- PK: juna 209 kuvat; JÄLKEEN juoksupeli 2.201:n mukaan NUI:n yhteisillä osilla (☰ = tauko, Esc/tausta → ☰, kytkimet, Poistu).
- Olavinlinnan 2 eroa (ei taukoa, Pulun eleet) odottavat: linna tauolla.
- KARTOITUS: Sonnet-agentti kirjoittaa /Users/Shared/Claude/Matkakirja-fable/scratchpad/paatoimittaja/2253/yhteiset-saannot/
  paallekkaiset-osat.md (päällekkäiset valikot, kortit, napit) → lue, anna NUI:lle seuraavaksi eräksi, tiivistelmä KK:lle.
- Työlista siivottu 23.15 (38 → 11; varmuus scratchpad/paatoimittaja/2253/tyolista-ennen-siivousta.json), taululla v103.
- Puuttuvat roolit tililtä (Työkaluseppä, Karttaseppä, Sisältökirjuri): luo kun pohjan työ vaatii (ensimmäinen: uusi museomaa →
  Sisältökirjuri). Seuraava maa ja Italia kysytään omistajalta vasta, kun uusi maa alkaa.
- Postivahti 23.04: levy 55 Gi laskussa → pyydetty uusi mittaus ja LEVYJAKO-siivous tarvittaessa; kotikansiot jäljessä → Postivahti.
