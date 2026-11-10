# Pelikoodari: luovutus 10.11.2026 klo 18.10 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-1745.md (kohta 2 PJ7 ja renkaiden uusinta v2-sk:lla yhä voimassa; 1724:n kohdat 0, 1 ja 3 voimassa).
Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, NYT haarassa pelikoodari/osa1-3-linjat (remote natiivi-backup).

## 0. TEHTY TÄLLÄ VUOROLLA
- iPad-peili VALMIS 17.51 (1244 tiedostoa, 1,5 Gt) → JU:lle kerrottu; JU kuittasi (kopio isolle iPadille lukon vapauduttua, v131 odottaa kuitua).
- OSA 9 VALMIS b7f0d62de (haara pelikoodari/osa9-kulku-v129, pohja 5f8780605): kulkukartta v129d Resourcesiin (Kulku, Rajat, Ovet, Kierros,
  uusi JuoksuKulkuVersiot.json + .meta; Esineet ENNALLAAN). Avoimen taivaan rajakohtia talon pohjalla 0 (v129 64, v129c 13); kuljettava +2172 m²
  (pihoja, isoin 长春宫 974 m², maan tasolla), katosi 0. Peli-testit 894/894. PT:lle ja KK:lle ilmoitettu 17.5x.
  ODOTTAA: PT:n sana junaan; iPad-video aukiolta JU:n vuorolla, kun PT sanoo.
- OMISTAJAN PÄÄTÖS 17.52 (KK:n kautta): osan 11 opastetekstit 1–11 HYVÄKSYTTY. Tekstit: KK:n suunnitelma
  /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-juoksupeli-linjat-ja-tarkastus.md, kohdat "Osa 11" ja
  "OMISTAJAN PÄÄTÖS kortilla 17.52" (kohta 1 = "Pakene vartijoita, kunnes palkki täyttyy ja portti aukeaa.", kohta 11 = "Vartija sai kiinni! Napauta
  nopeasti", sana kaista, liuku- ja aarreopaste pois tasolta 1). Koodi: JuoksuOpetus.cs (Teksti, Kaikki, Aloita). Jonossa PT:n järjestyksessä (kohta 6).

## 1. OSAT 1–3 KESKEN: 1783d550f (haara pelikoodari/osa1-3-linjat, pohja 5f8780605; EI junaan)
Mitä tehty (JuoksuV4.Vapaa.cs ellei toisin):
- Linjat(v, o, c): kujalla (molemmat seinät < 8,5 m, leveys ≤ 8 m) pari keskiviivan molemmin puolin; aukiolla kiinteät parit lähimmästä seinästä
  1,6 m välein (linjat 0–1, 2–3 …), ilman seinää maailman ruudukossa (parikeskukset 3,2 m:n välein). JatkaKartta laskee parin seinistä;
  jalan ero linjaan liukuu (KarttaSivuLiuku → JuoksuV4Saanto.LinjaLiuku, lisätty Sivu-getteriin JuoksuV4.cs:ssä).
- Omena linjalle luotaessa (OmenaLinjalle, kapeamman akselin poikki, aukiolla molemmat); reitille vain ≤ OmenaLinjaM 0,6 m linjasta.
- V4Omena.Juostava (JuoksuV4.cs): kartan omenat maassa 0,9 m, kerätään juoksemalla; korkeat (25 %, 1,8 m, hypyllä) vain yli 120 m lähdöstä.
  JuoksuV4Maailma.LuoOmena korkeus lipusta. Vanhan pelin omenat ennallaan (Juostava false).
- Käännös: KarttaKaantoKohta = lähin edessä oleva sivukujan linja (mitattu 3 m sivukujan sisältä); edessä → tapahtuma "kaanto odottaa",
  muisti (muistiRaja = kohta) kääntää linjalla; ohitettu → heti + liuku. JuoksuOpetus kuittaa käännösohjeen myös "kaanto odottaa" -tapahtumasta.
- SeinaLinjalle: pysähdys poikkikujan linjalle (enintään 0,8 m taakse, kappale ≥ 1 m; ovien kynnysviesti 225+ säilyy).
- Testit: PyyhkaisyKaantaaHeti päivitetty (käännös 0,5 s:n sisällä, linjalle); SivultaTuleva 48 siementä + tulosterivi; eunukin kontaktiin 0,01 m vara.

AUKI (ainoa kaatuva, 892/893): SivultaTulevaOttaaKiinniTaiKierretaan "väistämätön jää kiinni sivulta": ilman bottia sivulta tulevan kontaktissa
keisari on AINA vastakkaisella linjalla (väliaikainen DBG SivuvartijaAskeleen: 12/12 "sivu 1 kattaa 1 keisari −0,80" tai "sivu −1 kattaa 0 keisari 0,80").
Pohjassa 5f8780605 sama testi: lähti 60, kiinni 3. Syy selvittämättä; epäilyt: (a) KarttaSivuVartija valitsee sivun suhteessa o.A:han ja jokin
suodatin (Vuoro/Nahty/SuoraTila linjalle) karsii keisarin puolen; (b) kontakti-S osuu kappaleeseen, jonka pari on eri kuin keisarin
(kappaleraja 30 m). Huom: s.Tapahtumat luetaan testissä vasta silmukan jälkeen → tarkista, tyhjeneekö lista askeleittain (silloin testi laskee
vain viimeisen ruudun tapahtumat; DBG-tulostus on luotettavampi).
SEURAAVAKSI: korjaa yllä → oikean kartan tarkistus (omenat linjoilla: osuus ≤ 0,3 m linjasta, linjat eivät ajelehdi kujassa, käännöksen jälkeen
KarttaSivuLiuku ≈ 0) → koko Peli-testit → commit → valmis-rivi PT:lle + iPad-video (kuja, käännös, omenat) JU:n vuorolla PT → KK.

## 2. JONO (PT:n järjestys 1724-luovutuksesta)
osat 1–3 (yllä) → osa 8 ovet kiinni tasolla 1 (arvioi koko → rivi PT:lle) → osa 6 pienet logiikkaviat → osa 10 TasoAika (NUI fb3f19f31, ks. 1724 kohta 3)
→ osa 11 opastetekstit (hyväksytty 17.52). Renkaiden uusinta v2-sk:lla JU:lla (1745 kohta 2) osan 9 jälkeen.

## LISÄYS 18.1x: PT:n käsky (tuli luovutuksen jälkeen)
"Junaan iPad-videon jälkeen: anna JU:lle skenaario omistajan pysähdyspaikalle (aukio, taso 1), ajo isolla heti juoksupeli-kopion jälkeen;
video PT:lle. Jatka osat 1–3." → ENSIN: skenaario osan 9 haaralle b7f0d62de (pysähdyspaikka: KK:n kuvaus suunnitelman kohdassa 9, avoin kivetty
aukio, vasemmalla matala harmaa muuri + punainen seinä, edessä keltakattoiset hallit; ehdokas 长春宫:n pihat (-167; 374) tai v129:n rajakohdat
(-2.6; 77.2) 中和殿 / (-96.3; 218.6) 膳房, ks. v129/rajakohdat.json) → JU:lle (ajo isolla iPadilla heti juoksupeli-kopion jälkeen) → video PT:lle.
Sitten osat 1–3 jatkuvat (kohta 1).
- 18.1x tarkistettu: vapaassa maailmassa EI ole QA-komentoa lähtöpaikalle (LuoVapaaTaso käyttää aina JuoksuTaso.Alku; `palatsi alku` koskee vain
  vanhaa peliä). Skenaario vaatii pienen komennon osan 9 haaraan, esim. `ui juoksupeli lahto x,z [suunta]` → JuoksuTaso-alun ohitus seuraavaan
  juoksuun (JuoksuV4.Vapaa.cs LuoVapaaTaso + JuoksupeliNakyma.cs komennot ~2184). Vaihtoehto ilman käännöstä: `ui juoksupeli tarkastelu kamera x y z
  yaw pitch fov` (vain pysäytyskuva, ks. juoksu-leivottu/sk-ipad-tausta-v131.txt). JU:lle kerrottu, että skenaario tulee nollauksen jälkeen.
