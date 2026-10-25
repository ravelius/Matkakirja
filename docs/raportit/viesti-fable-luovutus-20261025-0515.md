# Päätoimittajan luovutus 25.10.2026 klo 05.15 talviaikaa (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261025-0350 (lue vain tämä). Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-25-klo-0352-0514.md.
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md).
Session alussa: Asemataulu open, set_remote_control self, Monitor odottajat-vahti.py + codex-posti-vahti.sh, git fetch origin claude/postilaatikko.
Kellot siirtyivät talviaikaan 25.10. klo 04 → 03 (EET). Omistaja nukkuu (00.49 alkaen); yö oletuksilla. Ei TF:ää ilman omistajan sanaa.

## 0. OMISTAJAN PÄÄTÖKSET (voimassa, ennallaan)
- Havainteesta identtiseksi = ULKOASU; paikat ja mitat oikeat (20.10. 07.30). Kaikki junaan 210; TF vasta omistajan sanasta. Kuvakulma 810.
- Alkulennon elokuvateksti "KIELLETTY KAUPUNKI" + "1914", Beijing pois (24.10. 23.52/23.53). Muistokupla 4 lautaspöytä (00.30).

## 1. YÖN PT-PÄÄTÖKSET 03.50–05.15 (lokissa; PR #5219 JU:lla mergeen)
- Salin penkki #959 tummemmaksi (avoimet-v42) kuitattu, ämpärissä. Rakennukset-v36 (06: Meridiaaniportin ovilehdet) kuitattu.
- Havainne 06/07 kohdittain (LR, taulukko Matkakirja-linnanrakentaja docs/raportit/havainne-810-kohdittain-20261025.md).
- JINGSHAN tehty todellisilla mitoilla (7.15 maasto): rakennukset-v37 + ulkorengas-v3 (mitat kirjallisuuden likiarvoja). Pihapuut:
  kielletty-lahipuut-v3 (+630 sivupihoille ja puutarhoihin, seremonia-akseli puuton), PK kaukopuut + keskipuut c18a8a0b5.
- METAL-VIKA (piha näkyi sinisenä/taivaana): kolme runkoa oli "vihreä" viallisena, koska variantit käännetään vasta ajossa.
  Juurikorjaus VS grafiikka-211 2923706a4 (kaikki half → float juoksupelin varjostimissa, testit EiHalfJuoksupelissa + GPU-kaatumiskorjaus).
  Raamattu 9.1 METAL-VARIANTTITARKISTUS: tyokalut/metal-tarkistus.sh (xcrun + Macin GPU) NS:n runkotarkistukseen.
- JU: LR:n välittämä PT-kuittaus + täsmäävä tunniste riittää vientiin (ei erillistä varmistusta PT:ltä).
- Levy: siirra_t7 4,2 Gt, NS ja PK .app-kopiot pois → ~80–83 Gi.

## 2. KÄYNNISSÄ (juna 210, runko 029bb8aa1 VIHREÄ, isossa iPadissa 05.14; METAL 440/0, PIPELINE 432/0)
- PK: yksi kuva-ajo rungosta: 01/02/03/05 + piha (iPhone), muurikujan kameravideo, lautaspöytä (edessä, rikki, kupla 4),
  03A/B (iPad, B 7°), 04 juhlasali (−147,6, 420,5; penkit/kaapit tumma puu, ei mattoja/sermejä, pylväät jalustoilla).
  PT tarkistaa täysikokoisina omistajan sanoja vasten (9.5): EI sinistä/taivasta/mustaa pihalla.
- NUI: nimitekstin 4 kuvaa (iPhone/iPad, pysty/vaaka) rungosta; teksti jo ok (ipad-vaaka bdb75bad1), vain piha oli vika.
- LT: half → float -ruutuaika isolla iPadilla rungosta 029bb8aa1 (kuten 23.10. 17,13 ms); yli 20 ms:n ruutu = vika → tulos PT:lle.
- VS (nollattu 05.1x, luovutus f42a011cf + 0b42af4ea): valon viritysajo B6 f288dd40d (aurinko/ympäristö 4 yhdistelmää) → tulokset;
  avoinna aukion täyttö (~195), 05 oikea muuri ei mustaa, lattia/sokkeli lämmin kivi, terassin marmori kirkkaan valkoinen (03).
- LR: lepää; PK:n pelikuvista mahdolliset muotoerot sille.
- Äänittäjä lepää oikeutetusti (ei työlistan työtä).

## 3. AAMULLA
- OMISTAJAKYSYMYS KK:lle (vasta PT:n tarkistamilla kuvilla): "Havainne 03 näyttää Taihedianin lähempänä ja matalampana kuin oikea
  palatsi. Pidetäänkö oikeat mitat (suositus)?" Kuvat PK 03A (tavallinen) ja 03B (kallistus 7°).
- KK:lle tiedoksi: vuosi 1914; aurinko 45°; nimiteksti valmis kuvien kanssa; salien sisustus havainteen mukaan; Jingshan ja pihapuut.
- Videot, kun ulkoasu (valo) kunnossa. Asemataulu: ElevenLabsin päivittäinen haku ASEMATAULU-ROOLI.md:hen (päivällä).

## 4. Opit
- Laitekäännöksen "0 Shader erroria" ei todista Metal-varjostimia: ajonaikaiset variantit käännetään vasta pelissä (nyt 9.1).
- Sama vikaluokka neljästi → vaihda tapaa (juurikorjaus + nopea paikallinen silmukka) eikä kohta kohdalta.
- .app-kopiot jakavat levylohkoja: du-luku ei kerro vapautuvaa tilaa.

## 5. LISÄYS 05.2x: OMISTAJA HEREILLÄ?
- KK välitti omistajan kysymyksen 05.14 "Onhan kaikki nopeutukset käytössä?": NUI:lle ETUSIJA havainnenäkymä (proto tyokalut/havainne/editori.sh)
  toimintakuntoon (810/01–07 editorissa ilman simua, 3 toistoa samat) → PK ja VS käyttöön, vertailuparit ilman simujonoa; sitten nimitekstin kuvat.
  Seuraa ja kuittaa KK:lle, kun käytössä.
