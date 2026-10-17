# Pelikoodarin luovutus 17.10.2026 aamupäivä (KOVA RAJA 41 %, Postivahti, klo 10.04)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-aamu (378a647f7).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä AINA osoitekirjasta
  (/Users/Shared/Claude/osoitekirja.md; NUI:n id arvattuna meni ohi 17.10.): PT local_5df52e10-…, JU local_5cb16c00-…,
  NS local_674b9ec4-e2f3-…, NUI local_44392b3c-86ee-…, KS local_eec7f158-…, Postivahti local_a24c43c0-….
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti. Käännökset JU:n kautta (L2).
- Ennen käännöspyyntöä `zsh tyokalut/tarkista.sh` (paluukoodi 0). Linssit-testit: `sh Linssit-testit/kaanna.sh <nimen osa>`.

## TEHTY TÄLLÄ VUOROLLA (kaikki NS:llä, PT kuittasi)
- **Juna 199:** UTM-vyöhyke 1–9 ilman etunollaa ("1GGL" kaatoi ISS-kuvauksen): pelikoodari/utm-vyohyke-199 **bbad4c6cb**.
- **Juna 200:**
  - SEURAA a03177279 siirtyi junaan 200 (PT); NUI kytki sen kamerapöytään a07ce043a (tarkistettu: sisältää a03177279 + dfa8e69a2).
  - Cupolan testikomento `kohde … valoisa` kelaa pimeän kohteen päivänvaloon (Troyes-yökuva 06.12 UTC): pelikoodari/valoisa-kohde-200 **3faa6ffcd**.
  - S2-päivämäärärajan ruudut (60UXB Ranskan näkymässä) + KS:n indeksi v2g: pelikoodari/antimeridiaani-200 **dc177cc58** (vaatii bbad4c6cb:n).
  - Raketin latauskuvan esilataus levylle (2 s musta ennen kuvaa pois): pelikoodari/latauskuva-esilataus-200 **194a8897f**.
- **Latauskuva v2 -video** junan 199 käännöksellä: OK pysty + vaaka, lokit/todistus-latauskuva-v2-199-20261017-0955 (PT kuittasi).

## KESKEN: FFT-MERI (omistaja 09.30 "Kyllä, kokeilu", PT) – EI JUNAAN ennen omistajan videohyväksyntää
- Haara pelikoodari/fft-meri **191b2e8d8** (juna-199:n päällä): Iss.MeriSpektri (Ydin, JONSWAP + Donelan–Banner + maininki),
  Resources/Varjostimet/RakettiMeri.compute (3 × 128², radix-2 IFFT), RakettiMeri.shader (LEAN-kimallus, vaahto, sumu),
  Linssit/Unity/RakettiMeri.cs (kytkin `linssi raketti meri kaytossa 1`, oletus pois), RakettiMaasto.cs/.shader (_FftMeri: laatan meri
  pois 3 km:n säteeltä), värit Valopohja/ValoKohteet.Meri*, LAHTEET.md (web-ocean, Noniv, MIT esikuvana; koodia ei kopioitu – lataus ei
  ollut luvallinen). Testit MeriSpektriTestit 7 + MeriFftTestit 2 (CPU-viite varjostimen kaavoille). tarkista.sh 0.
- **Käännös valmis:** a8bc96819 (JU 10.00), app /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-meri-200-app/Matkakirja3D.app.
  Varjostimet kääntyivät Metalille virheittä (linja2 tulokset/sim.log: RakettiMeri vp/fp + compute 4 varianttia).
- **ENSIMMÄISENÄ:** JU:n "SIMU NYT" (arvio ~10.35, iPhone 96044270, 2 × 5 min) →
  `APP=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-meri-200-app/Matkakirja3D.app SHA=a8bc96819 UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-raketti-meri-200.zsh`
  (ajaa MERI=0 ja MERI=1, kello iltaan: ilta-kello.py aurinko 4°). Sitten "SIMU VAPAA" JU:lle.
- Tuotos PT:lle (→ KK): video rinnakkain (ffmpeg hstack raketti-meri-0.mp4 + raketti-meri-1.mp4, -fflags +igndts), kuva-arkit ja
  kehysajat p50/p95 molemmista (konsoli "MATKAKIRJA kehysajat" + mittaus-*.txt), maininta "simulaattorin ruutuaika ≠ laite".
- Jos meri ei näy: loki "raketti: meri: …" (ei laskentavarjostimia / varjostin puuttuu / spektri Hs …). Jos laatan merestä jää reikiä
  tai meri näkyy maalla: säde `linssi raketti meri sade <m>`, veden tunnistus RakettiMaasto.shader _FftMeri-lohko (vesiF, v.y < MeriY + 2).
  Valaistuksesta voi kysyä VS:ltä (PT).

## Muut huomiot
- Esilatauksen (194a8897f) simukuva tulee junan 200 käännöksestä (PT: pelkkä kuva, ei erillistä ajoa).
- KS:n väestöpinta ja Kiinan armeijat: KS hoitaa; PK vain pyynnöstä.
- Worktreet (poista mergen jälkeen `git -C proto worktree remove`): edellisen luovutuksen lista + utm-vyohyke-199, valoisa-kohde-200,
  antimeridiaani-200, latauskuva-esilataus-200, fft-meri.
- _tyo/pelikoodari: yhteis-199-app, raketti-meri-200-app (≤ 2; yhteis-198-app JU poisti levyn takia). Levyä ~35 Gt.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-aamupaiva.md (haara
pelikoodari-luovutus-20261014-paiva). Ensin FFT-meren vertailuajo JU:n SIMU NYT -luvalla ja video + ruutuajat PT:lle."
