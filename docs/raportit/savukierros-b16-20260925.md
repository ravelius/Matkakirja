> **KORJAUS (Linssiseppä 25.9. ~21.5x):** kohdan 6 "Ihmisen matka II" ja
> avoinna-osion CC-havainnot koskevat oikeasti **Ihmisen matka I:tä**
> (`linssi ihmisen-matka`; otsikko "IHMISEN MATKA", tekstityslaatikko, ei
> valokeilaa). II on oma linssinsä **`linssi ihmisen-matka-2`** (johdantokortin
> otsikko "Ihmisen matka II", lämmin valokeila Afrikan yllä, hämärä muu pallo).
> CC on vain II:ssa, aikajanan vuosiluvun oikeassa päässä (toinen rivi), tekstitys
> oletuksena pois. Ihmisen matka II ja CC ovat siis TODENTAMATTA — ajetaan
> `ihmisen-matka-2`:lla seuraavalla kierroksella. Muut PASS-kohdat ennallaan.

# Savukierros: build 16 (juna/b13 1aa7c558, käännös 7f3979b0), iPhone + iPad

25.9.2026 20.5x–21.3x. PASS-commit: **1aa7c558** (juna/b13, käännös 7f3979b0;
sisältää natiivi-ui/lampo d0a187db, Ihmisen matka II, maakuntien oletusrajat,
lento v2). Laitteet: iPhone 18 Pro 1572C658 (koko kulku), iPad Pro 13" 3B4CDACB
(lämpövartija, aloitusnäyttö, Ihmisen matka II). Molemmat sammutettu lopuksi.
Kehittäjätila `defaults write … matkakirja-kehittaja 1`.

## PASS

1. **Lämpövartija (iPhone + iPad, ~80 s lepoa):** levossa (taysi=0) fps = 30
   kaikilla riveillä, lepo.p50 = 33,3 ms. **Lepopiirto nyt todennettu:**
   `paikallaan` > 0 alkaen t≈35 s, syvässä levossa piirretty 2–3 / 151 kehystä
   (iPhone ja iPad samat luvut); välillä lyhyt piirtopurske (lepo 6–90 / 151).
2. **Pakotuskomennot (iPhone):** `lampo auto` 60 fps / renderScale 0,8;
   `kuuma` 30 fps / 0,7; `kriittinen` 20 fps / 0,7; `ruutu` palauttaa tilan.
   (simulaattorissa thermal=0, akku=-1: oikea telemetria vain fyysisellä laitteella.)
3. **Kylmä käynnistys → aloitusnäyttö:** musta → aloitusnäyttö ilman yläpalkkia;
   iPadilla punainen reittiviiva taustalla. Kuvat 1, 10.
4. **Uusi matka → valinta kartalta → lento:** valintanäkymä puhdas (ei
   reittejä), Ateena kartalta napautuksella, lento v2 (kone, "Ohita" näkyy),
   Ateena-esittelykortti (kuva + "ATEENA") → kartta + postikortti. Kuvat 2–5.
5. **Ateena:** matkakirja "Ateena 🔊" vaalea, postikortti auki, Ohita toimii.
6. **Ihmisen matka II avautuu (iPhone + iPad):** johdantokortti "Ihmisen matka"
   + Käynnistä; käynnistyy: pallo, tekstitys, aikajana, Tauko/☰ (Aloita alusta,
   Kertoja, Taustamusiikki). iPadilla värilegenda (Päävirta, Eurooppa, Siperia,
   Amerikat, Tyynimeri). Kuvat 6, 11.
7. **Maakunnat "Pois" (iPhone):** ☰-viereinen lista-nappi → MAAKUNNAT-välilehti
   näyttää vain oman maan (KREIKKA) ja listan; "Pois" ensimmäisenä. Attiki
   värjää maakunnat kartalle + kuvaus + "Lue lisää", "Pois" poistaa värit.
   Kuvat 7, 8. (iPadilla ei erikseen ajettu — sama UI.)
8. **Liikkuminen:** `kulkutapa liftaus` + `ui liiku` → reittiviuhka;
   `siirto <avain>` (avain aina peli-tila.json siirtoKohteet[0].avain, sis. `|`)
   → Ateena → (välietappi, paluu Ateenaan noppatuloksella) → **Sofia**, perillä
   ei reittejä. Kuva 9.

## Täydennys (Fablen lisäkohdat, 21.3x)

- **Äänimaisema kuuluu (IM II, iPhone):** `aani mittaa` → rms 0,092, huippu 0,53,
  soivia 2 (`linssi-ihmisen-matka-lyria.mp3` + Kertoja), reitti Speaker,
  voimakkuus 0,6 — PASS.
- **Aloituslento, kone kuvassa:** kontaktilehti kuva 12 (9 kuvaa ~1,5–2 s välein):
  kone näkyy kuvissa 2–6, "Ohita" näkyy kaikissa paitsi ensimmäisessä (musta
  alkukuva, t=0), lopussa Ateena-verho "ATEENA · Päivä 1/80" → esittelykortti.
  Kesto napautuksesta verhoon ≈ 12–14 s (mittaus sisältää simctl-kuvien viiveen)
  — vastaa 12 s -tavoitetta. Pieni huomio: "Ohita" puuttuu aivan ensimmäisestä
  mustasta kuvasta.

## Ihmisen matka II + CC (iPhone, 21.5x, `linssi ihmisen-matka-2`) — PASS

- II avautuu: johdantokortin otsikko "Ihmisen matka II" (kuva 13); käynnistyksen
  jälkeen otsikko katkeaa "IHMISEN MATK…", lämmin valokeila Afrikan yllä, hämärä
  muu pallo, äänimaisemia 15 (loki). Tekstitys oletuksena pois. Kuva 14.
- **CC-nappi näkyy** vuosiluvun rivin oikeassa päässä (toinen rivi). Napautus →
  nappi korostuu (kultareunus) ja tekstityslaatikko näkyy (kuva 15); toinen
  napautus → nappi normaali ja laatikko pois (kuva 16). Toimii.
- iPadin CC (Tauon vasemmalla puolella) ja iPadin maakunnat "Pois" ajamatta —
  seuraavalla kierroksella (Natiivi-UI:n pyyntö).

## Avoinna (VANHENTUNUT — ratkaistu yllä)

- **CC-nappia ei havaittu** Ihmisen matka II:n yläriviltä (vuosiluvun rivin
  oikea pää; commit 15827520 sanoo että sen pitäisi olla siellä) eikä iPhonella
  (kuva 6) eikä iPadilla (kuva 11), ei myöskään ☰-valikossa (vain Aloita alusta /
  Kertoja / Taustamusiikki). En tiedä mitä "CC" tarkoittaa (tekstitys? lisenssi?)
  eikä milloin se näytetään — Linssiseppä/Natiivi-UI kertokoon ehdon ja sijainnin,
  niin ajan uudelleen. Ei todettu rikkinäiseksi, vain ei löydetty.
- Maakunnat "Pois" iPadilla ei ajettu erikseen.

## Sivuhavainnot

- Peli-loki merkitsi `ruutu`/`lampo` VIRHE:ksi vielä tässä buildissa; Pelikoodarin
  korjaus tulee build 17:ssä (esilataaja-4).
- iPad-simulaattorin käynnistyksessä `simctl boot` + heti `defaults write` osui
  vanhaan konttiin (sovelluksen data-UUID vaihtui): odota `bootstatus -b` ennen
  kehittäjälippua ja lokien tyhjennystä.

## Kuvat

`docs/raportit/kaappaukset/savukierros-b16-20260925/` (1–11).
