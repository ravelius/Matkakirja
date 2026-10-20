# Laitetestaaja → seuraava sessio: luovutus (24.9.2026 n. klo 13.10 Suomen aikaa)

Jatkaa: docs/raportit/viesti-laitetestaaja-luovutus-20260924-c.md
(pariteettikierros) → tämä sessio teki build 6 -tarkistuslistan,
ajoi sen kahdesti, ja jatkoi build 7:n B7-listalla kahdella SHA:lla.

## 1. Lue ensin

1. CLAUDE.md, Raamatun Ydinajatus kohta 2, kohta NATIIVI PELI ETUSIJALLE
2. Tämä raportti kokonaan
3. docs/raportit/build6-tarkistuslista-20260924.md — KOKO TIEDOSTO,
   se sisältää sekä build 6:n että B7:n tulokset yksissä kansissa

## 2. Tila

**PR #3059** (OPEN, kärki `ce9446ece`, haara `laitetestaaja-navat-pass`
— HUOM: PR #3034 (vanha haara `laitetestaaja-pariteetti-b`) MERGETTIIN
kesken session Julkaisijan toimesta, joten avasin uuden PR:n samaan
tiedostoon uudesta haarasta origin/mainista). **Tarkista onko #3059
mergetty ennen jatkoa** — jos on, jatka uudesta haarasta origin/mainista.

**Build 6 -tulos: 17/19 PASS.** Vain löydös 18 (Liiku-nappi umpikulta
kulkutapavalitsimessa — korjattu build 7:ään Natiivi-UI:lla) ja
20/21 (siirretty build 7:ään tietoisesti) jäivät auki.

**Build 7 (B7-lista) -tulos, kaksi SHA:ta testattu (161fa35, sitten 24c9194):**

| # | Tulos | Huomio |
|---|-------|--------|
| B7-1 Liiku aktiivinen | ✅ PASS | |
| B7-2 tekstit piilossa | ✅ PASS (kaiutinta ei testattu) | |
| B7-3 huntu/väritaso | ❌ FAIL | Rikkinäinen suorakulmainen laatta Espanjan/Marokon päällä + puoliksi väärä naapurilaatta Kreikan vieressä. Meri ja Kreikan oma raja OK. Näyttää laattalatausbugilta. Välitetty Karttasepälle/Natiivisepälle → build 8. |
| B7-4 VU-mittari | ⚠️ EI VOITU TESTATA | En onnistunut virittämään radioasemaa kosketuksella tässä ympäristössä |
| B7-5 lennon lähikuva | ✅ TODENNÄKÖINEN PASS | Taivas+horisontti koneen takana, pyörivät potkurit, ei jättivarjoa, UI piilossa. Vaiheiden ajoitus jäi hieman epäselväksi. |
| B7-6 yläreuna (löydös 20) | ❌ FAIL (odotettua) | Vanha yksipilleri-layout yhä, mutta ☰-valikko jo oikein (Linssit ylimpänä) |
| B7-7 lennon teksti+ääni | UI-piilotus ✅ PASS; ääni EI VARMISTETTU | Ks. kohta 4 — todennäköinen syy löytyi mutta ei todennettu loppuun |
| B7-8 ☰ Uusi peli -rivi | ⚠️ EI VOITU TESTATA | Kosketus ei osunut listan vieritykseen; Natiivi-UI: pyyhkäise ylös, linssilista on pitkä |
| B7-9 aloitusportti | ✅ PASS (**HUOM: vaatimus PERUTTU** — ks. kohta 5) | Nykyinen sisältö (otsikko+ingressi+napit) on OIKEA, ei bugi |
| Löydös 14 (navat) | ✅ PASS (161fa35) | Molemmat navat siistejä korjauksen jälkeen |
| Hehkurenkaat | ✅ PASS (161fa35) | Kultainen rengas näkyy pelaajan nappulan ympärillä |

Kuvat: `/Users/Shared/Claude/proto-3d/lokit/build6-tarkistus-20260924/`
(ei repossa, jaettu Mac-polku).

## 3. Kesken — tee nämä ensin

1. **B7-7 lennon ääni (intro vs. lento-alku)** — TÄRKEIN AVOIN KOHTA.
   Todennäköinen syy löydetty: istunnon alussa ajettu `komento.txt:
   hiljaa` (kuulokoekäytännön mukainen mykistys) sammuttaa
   TODENNÄKÖISESTI koko narraatio/puhejärjestelmän, ei vain
   äänenvoimakkuutta — siksi `peli-tila.json`:n `puhe.url` pysyi `null`
   koko testin ajan vaikka reitti oli oikea (portti → "Uusi matka" →
   Heathrow/avausruutu → ensimmäinen lento). **Toista ÄÄNET PÄÄLLÄ**:
   1) vaihda Mac-kaiuttimet turvalliseen ulostuloon jos tarvitaan
      hiljainen ajo (SwitchAudioSource, ks. kohta 7), TAI aja täysin
      äänettömässä ympäristössä jos se on ok
   2) ÄLÄ aja `komento.txt: hiljaa` tässä testissä
   3) reitti: kylmäkäynnistys → portti → `ui napauta 200 484` TAI
      etsi oikea "Uusi matka" -kosketuskoordinaatti → Heathrow-ruutu
      → `ui napauta` "1873"-nappiin TAI vastaava kaupunkivalinta →
      ENSIMMÄINEN lento alkaa
   4) heti kun `peli-komento.txt: tila <nimi>` näyttää `lento`-kentän
      ei-nullina, tarkista SAMAAN AIKAAN `puhe.url` — pitäisi olla
      `puhe-lento-alku.mp3` (`lento-alku`-id) EI `intro-puhe.mp3`
   5. kirjaa build6-tarkistuslistan B7-7-kohtaan ja taulukkoon
2. **B7-4 VU-mittari** — löydä oikea kosketuseleen/komento radioaseman
   viritykseen (yritin tap+drag ruudun eri kohtiin, ei toiminut).
   Kysy Linssisepältä/Natiivisepältä onko testikomentoa.
3. **B7-8 ☰ Uusi peli -rivi** — Natiivi-UI:n ohje: pyyhkäise valikkoa
   sormella YLÖS (linssilista on pitkä, "Uusi peli" on sen alla).
   Yritä `swipe`/`touch_path` -eleellä valikon SISÄLLÄ (ei taustakartalla
   — omat yritykseni osuivat vahingossa taustan karttaan).
4. **Zoom-kuminauhaefekti** (uusi pyyntö, ei vielä dokumentoitu
   tarkemmin) — Fable pyysi testaamaan ulos-zoomin "kuminauhan";
   en löytänyt tarkkaa spesifikaatiota tästä, kysy Fablelta mitä
   tarkalleen pitäisi nähdä ennen testausta.
5. **iPadin kuvasumea** — Fable pyysi tätä minulta mutta en käyttänyt
   iPadia tässä sessiossa (vain iPhone). Natiiviseppä mainitsi
   "sama .app kuin iPad-simulaattorin Kreikka-huntukuvassa" — joku
   muu sessio (Natiiviseppä?) on jo saattanut testata tämän iPadilla,
   tarkista ennen uusintaa.
6. **Build 8 -odotukset** (Fable mainitsi): varalaatta, kartuscha
   (Natiivi-UI korjaa `natiivi-ui/iphone-island`-haarassa: kartuscha
   piiloon aloituksen/aloituslennon ajaksi), iPad-sumea, valikon
   järjestys. Aja koko B7-lista uudelleen kun build 8 -SHA ilmoitetaan.

## 4. Tärkeä opetus: mykistys sammuttaa narraation

`komento.txt: hiljaa` (kuulokoekäytännön mukainen mykistys, käytin tätä
KOKO tämän session ajan) vaikuttaa sammuttavan koko puhe/narraatio-
järjestelmän (`peli-tila.json` → `puhe.paalla` pysyy aina `false`),
ei vain äänenvoimakkuutta. Tämä esti B7-7:n ja B7-4:n täyden
todentamisen. **Jos seuraava kierros ei tarvitse hiljaisuutta, harkitse
ETTÄ EI aja `hiljaa`-komentoa lainkaan** — käytä sen sijaan Mac-tason
äänenhallintaa (SwitchAudioSource) jos hiljaisuus on tarpeen.

## 5. Odottaa omistajan päätöstä / linjausmuutoksia tänään

- **B7-9/löydös 24A KUMOTTU**: omistaja perui klo 12.2x alkuperäisen
  vaatimuksen ("aloitusportti vain 3 elementtiä"). Nykyinen portti
  (otsikkolohko + ingressi + Jatka/Uusi-napit) ON OIKEA, ei korjata.
  "Uusi matka" -painallus vie Lontoo-zoomiin avausluennalla — testasin
  tämän polun ja se toimii (Heathrow-ruutu näkyi oikein).
- **B7-3 huntu-juurisyy PÄIVITETTY KESKEN SESSION**: ensin luultiin
  webin huntua "vain viivaksi" (js/maatummennus.js) — Karttaseppä
  osoitti tämän VANHENTUNEEKSI, oikea mekanismi on
  js/laattakerma-shader.js (kerma #faf4d6, 0,80 peitto muille maille).
  Tarkistuslistan B7-3-osio on jo päivitetty oikeaan lähteeseen.

## 6. Voimassa olevat työtavat (viittaukset, ei kopioita)

- Raamattu: "AGENTIT VAIN OPUS JA SONNET", "MAC STUDIO: UUDEN SESSION
  ALOITUS".
- docs/roolitus.md: työnjako ja julkaisusäännöt.

## 7. Ympäristö

- Työkansio: `/Users/Shared/Claude/Matkakirja-laitetestaaja` (git
  worktree, haara `laitetestaaja-navat-pass`).
- iOS-simulaattorit: iPhone 18 Pro (UDID `1572C658-6455-4E55-8C05-
  3F88CB3C32F6`, käytetty koko session), iPad Pro 11" M5 (UDID
  `503000D1-34AC-4C42-BDF8-7E36753A87CD`, EI käytetty tässä sessiossa —
  muut sessiot ovat lainanneet sitä päivän aikana). Molemmat booted.
  Nykyinen asennus iPhonessa: build 7 SHA `24c9194`.
  Simulator.app-GUI puuttuu → simctl/devicectl-kiertotie
  (`xcrun simctl io <udid> screenshot`, komennot Documents-kansion
  `ui-komento.txt`/`peli-komento.txt`/`komento.txt`/`linssi-komento.txt`).
- **Kosketustestaus HUOM**: `mcp__Claude_Code_iOS_Simulator__control`
  -työkalun `tap`/`swipe`/`touch_path` toimivat mutta osuivat usein
  väärään elementtiin (varsinkin valikoissa/listoissa) — koordinaattien
  laskenta preview-kuvasta (920px leveä) oikeaan device-pisteeseen
  (402×874) vaatii kertoimen ~1.311 (orig-px) ja jaon 3:lla
  (device-piste), mutta EI ollut luotettava kaikissa tapauksissa.
  **LUOTETTAVAMPI VAIHTOEHTO**: `ui-komento.txt`: `ui napauta <x> <y>`
  simuloi kosketuksen SUORAAN PELIN OMAN OSUMATESTIN kautta ja
  lokittaa mihin elementtiin osui (esim. "osuma
  [unity-text-element.mk-nappi.mk-aloitus__aloita...]") — käytä tätä
  ensisijaisesti kun täytyy napauttaa jotain napin sijaan pelkkää
  komentoa.
- **Ääni**: Mac-kaiuttimet olivat Scarlett Solo USB:ssä koko session
  (ei tarvinnut vaihtaa Mac Studio -kaiuttimiin, koska en tehnyt
  varsinaista kuulokoetta — ainoastaan pelin OMA `hiljaa`-komento
  mykisti sovelluksen). **TARKISTA ettei tämä ole vaikuttanut muihin
  sessioihin** — en koskenut järjestelmän äänilaitteeseen.
- Kuvakansio (ei repossa, jaettu Mac-polku):
  `/Users/Shared/Claude/proto-3d/lokit/build6-tarkistus-20260924/`
  (30+ kuvaa, nimetty löydöskohtaisesti, ks. tiedostonimet
  tarkistuslistassa).
- Levy: siivosin `laitetestaaja-kontakti-web`-worktreen (mergetty),
  `xcrun simctl delete unavailable`, ja vanhemman Unity-iPhone
  DerivedData-kansion Postivahdin/Fablen pyynnöstä — vapaana 46 Gt
  siivouksen jälkeen (ks. loki klo n. 12.15).
- Avaimia ei tarvittu tässä vuorossa.

## 8. Aloitusviesti uudelle sessiolle

```
Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout laitetestaaja-navat-pass && git reset --hard origin/laitetestaaja-navat-pass
(jos PR #3059 on mergetty mainiin: git fetch origin main && git checkout -B laitetestaaja origin/main sen sijaan)

Lue: CLAUDE.md, Raamatun "AGENTIT VAIN OPUS JA SONNET" ja
"MAC STUDIO: UUDEN SESSION ALOITUS", ja tämä raportti kokonaan:
docs/raportit/viesti-laitetestaaja-luovutus-20260924-13.10.md

Olet iOS-simulaattorin ainoa käyttäjä (iPhone 18 Pro, UDID raportissa;
iPad-vuoro pyydetään erikseen jos tarvitset). Nykyinen asennus: build 7
SHA 24c9194.

TÄRKEIN OPETUS: `komento.txt: hiljaa` sammuttaa koko narraatio-
järjestelmän, ei vain äänenvoimakkuutta — älä käytä sitä jos täytyy
todentaa mikä ääniraita soi. Käytä `ui napauta <x> <y>` -komentoa
(ei kosketustyökalun tap/swipe) kun täytyy napauttaa nappeja
luotettavasti.

ENSIMMÄINEN TEHTÄVÄ: B7-7:n lennon ääni ÄÄNET PÄÄLLÄ (kohta 3.1
raportissa) — onko ensimmäisellä lennolla soiva narraatio
`puhe-lento-alku.mp3` vai `intro-puhe.mp3`? Sen jälkeen B7-4
(VU-mittarin viritys) ja B7-8 (☰-valikon vieritys). Kun build 8
ilmoitetaan, aja koko B7-lista uudelleen (docs/raportit/
build6-tarkistuslista-20260924.md).

Sitovat säännöt: agentit vain Opus/Sonnet, kysymykset omistajalle
AskUserQuestion-korttina, Fablen käskyt sitovia ilman omistajan lupaa
Raamatun sisällä.

Vastaa suomeksi, tiiviisti.
```
