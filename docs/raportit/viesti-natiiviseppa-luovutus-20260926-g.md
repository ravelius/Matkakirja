# Natiivisepän luovutus 26.9.2026 (g)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: viikkokiintiö ~86–90 % (Fablen käsky: luovutus valmiiksi 90 %:ssa).
Edellinen: -f.md. Löydöslista: docs/raportit/omistajan-loydokset-b13-20260925.md (Fablen haara; rivimerkinnät Fablelle VIESTINÄ).

## Tila

- **BUILD 17** = proto-master **6a65ead1** (merge juna/b13 d04841a0; puu 6648d8e9 = käännös 6fd19114) = TF **1.0.17**
  (Fablen päätös: lähtee sellaisenaan; Laitetestaajan lepopiirto-FAIL ja löydös 143 build 18:aan). SHA lähetetty Fablelle
  ja Julkaisijalle (pyydetty merkitsemään yo-testflight-viimeisin).
- **BUILD 18 -juna** juna/b13 **99bf0fe5** (99eaf8d9 + Linssisepän esilataus 05e54878, ihmisen-matka-2 2850ac37 (II 5, 148/151/152), pariteettiaanet c46ff6e6; testit 278/279/300) (koemerge: unity-tarkistus 0 virhettä, testit Kartta 278 / Peli 279 / Linssit 259):
  linssiseppa/radio-esikuuntelu 9434b244, pelikoodari/loydos149 0e534bef (+ vieritys 059f7709), pelikoodari/tehoste-rekisteri
  ba1547ba, siirtoseppa/paketti-paivitys 99f049ec (simulaattoriloki lokit/siirtoseppa-paketti-paivitys-20260926.txt).

## Omat haarat (proto-git, masterista bf70290d, kaikki 0 käännösvirhettä, EI vielä junassa)

1. **natiiviseppa/sumea-132 9e6c488a** (wt/proto-natiiviseppa-loydos46): löydös 132 pallon puoli. enum KuvaSumennus
   {Ei, Kortti, Kokoruutu}; PalloKierto.KuvaTaso (KuvaSumea yhteensopiva bool), kokoruutuSumennusPt 4 pt. Kokoruutu + täysi
   sumennus → PalloSumennus.Kaappausvaihe (AfterRenderingPostProcessing, pieni sRGB-RT) → PalloKierto.Pysaytyskuva +
   PysaytysValmis, Peitetty → Ruudunpaivitys sammuttaa kameran. Purku: kamera päälle, 1 piirretty kehys (endCameraRendering,
   katto 0,5 s) → PysaytysPoistui. UiNakymat.KuvaTaso/KuvaTasoMuuttui/PakotaKuvaTaso runkona; testi `ui kuvasumea kokoruutu`.
   Natiivi-UI kuittasi rajapinnan: laskee Kokoruudun (Kuvasuurennos.Kokoruutu, löydös 150, natiivi-ui/kuva-150 bed66d98),
   taustaelementti PysaytysValmis→PysaytysPoistui, tummennus 0,86 → 0,6. Merge yhdessä Natiivi-UI:n haaran kanssa, kun
   kuvapari (simulaattori) on otettu. LAITTEELLA TESTAAMATTA: kaappaus Metalilla (isActiveTargetBackBuffer-ohitus, värit).
2. **natiiviseppa/liput-144 8324a291** (wt/proto-natiiviseppa-nimikerros; agentti): Liput.Aaltoile(Texture, w, h) → Aalto
   {Kuva, Paivittyi, Nakyy}, Liput.Vapauta; Kartta/Resources/Lippuaalto.shader (Blit, 2 aaltoa, ~3 s, 4 %), lippu 92 % RT:stä
   (Liput.Reuna), kello Joutosyke (asettuu levossa suoraksi 3 s:ssa), PallonLepo-animaatio "liput", komento `liput tila|jatkuva|
   syke|koe <nimi> [aika]` (koe → Documents/<nimi>.png), RAJAPINTA.md 3e. Varjostin kääntämättä. SEURAAVAKSI: `liput koe`
   simulaattorissa → pysäytyskuvat/koevideo Fablelle ja omistajalle ENNEN tuotantoa; kysy omistajalta, sopiiko levossa suoristus.
   Natiivi-UI kytkee kartussiin omassa haarassaan.
3. **natiiviseppa/lepo-suspend 651ad27b** (wt/proto-natiiviseppa-saapuminen): BUILD 18 kohta 5. PallonLepoTauko
   (execution order −10000): suspendUpdate kaikille tileseteille, kun PallonLepo lepäsi edellisessä kehyksessä ja kehystä ei
   piirretä; PallonLepo.Aseta kumoaa heti, kun ei levätä; pudonnut tileset vapautetaan. `pallo tauko pois|paalle` (A/B),
   `pallo lepo` näyttää osuuden. SEURAAVAKSI: A/B-mittaus (Pelikoodarin cpu-mittari/kehys-cpu) levossa ennen mergeä.
   Huom: saapuminen-worktreen vanha haara natiiviseppa/lento-esilataus 34d31dbd on ennallaan (ei mergetty).

## Selvitykset

- **Lennon MUSTA VERHO** (kohta 6): lokit/verho-b16/TULOS.md loppuun kirjattu. Verhoa pitää PALLO (katto:pallo, aste 39–64 %),
  EI reitti (278/278 aina). ESIKAMERAn "100 %" oli yksi ajo, jossa aste täyttyi vasta katossa. Pääepäilty: Sentinel (s2, Z11)
  luodaan verhon takana (OtaValmisPinta, "s2 luotu nyt"), koska kerma varaa paikan 2 valinnassa (tilesetissä 3 paikkaa); uusi
  raster-kerros nollaa asteen. KOE: sama kylmä ajo huntu pois (pinta "bmng+s2" valmiina). Korjausvaihtoehdot TULOS.md:ssä.
- **Napakansi hämärässä** (kohta 7): Linssisepän elävän kartan kuva lokit/linssiseppa-elava-20260926/omistajalle/
  elava-kartta-iphone-18.3.png: pohjoisnavalla tummempi harmaa kiekko. Hämärä = ElavaKartta → KarttaKerrokset.PallonSavy
  (_pallonTummuus), jonka Napakansi.shader jo ottaa huomioon → ero on muualla: kannen Lambert (valo·NdotL + SH) vs. laattojen
  URP Lit, ja kannen kerma vain maalle. SEURAAVAKSI: simulaattorissa pikseliarvot kansi vs. viereinen laatta tummuudella 0 ja
  0,62 → säädä kannen valaistus laattojen mukaiseksi.
- **Elävä kartta** (kohta 4): Pelikoodarin musterajapinta pelikoodari/elava-kartta (a323f110, tippi nyt 3069bb9a):
  PeliOhjain.NostonMuste(valoId) → {Luokka Paakohde|Kohde|Pieni, Loydetty, Nakyy, Salaisuus}, tapahtumat MusteValmis,
  NostoLoytyi, MaakuntaHeraa, MaakuntaValmis; komennot `muste tila|loyda|maakunnat`. Katselmoi ennen mergeä; pallon 7
  rajapintaa sovitaan Linssisepän kanssa (linssiseppa/elava-kartta cf5d21e0 käyttää paikkamerkkinä Huntu.shaderia).

## Jono (build 18)

Pelikoodarin elava-kartta; omat 1–3 yllä;
verhokoe; napakansi; Elävän kartan pallon rajapinnat. Omistajan valinnat 127/128 odottavat yhä (ks. -f).

## Käytännöt

Kuten -f (koemerge, jumivahti, simulaattorin mutex ja ikkunalippu, vientilippu /tmp/natiiviseppa-vienti-tulossa oli päällä
03.45 alkaen). Worktreet (3/3 käytössä yllä olevilla haaroilla). Unity-työkopio Matkakirja-proto: puhdas master 6a65ead1.

**Alin rivi:** build 17 masterissa (6a65ead1), build 18 -juna 99bf0fe5 käynnissä. Seuraavaksi: 144-koekuvat, suspend-A/B,
132 yhdessä Natiivi-UI:n kanssa, verhokoe huntu pois, napakansi.
