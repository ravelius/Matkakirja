# Linssiseppä: luovutus 9.10. klo 23.0x (PT:n nollauskäsky)

Rooli: Linssiseppä (Opus, high). Proto-worktreet: `wt/proto-linssiseppa-astro-auto` (todistusajo-työkalut) ja
`wt/proto-linssiseppa-kaupunkiaanet` (työhaarat, nyt `linssiseppa/intro-muisti-173c`). Simulaattori 00CF62C2 (T7), iPad Pro 13
00008103 (omistajan lupa 30.9.). Simu-, käännös- ja laitevuorot aina Julkaisijalta. Ainoa .app-kopio: `proto-3d/lokit/linssiseppa-app/tuuli-vasa-173d`.

## Juna 173 (avoin, PT kuittaa)

- KUITATTU: `linssiseppa/tuuli-vasa-173` **e0f2d4b37** (korvaa eb983f45a, c3dee6f41, 64f94e591 ja 2e784cc5c): puhdas tuuli v3,
  Vasan katsesuunta myös kierroksella, kierre ei laske katsesuuntakohteessa ja pitkien pallolentojen pehmeä jarrutus
  (Eiffel 63 → 39 m/s², Riemukaari 115 → 52). Natiivisepällä.
- **KRIITTINEN, KESKEN:** iPad Pro 13 kaatuu jetsamiin Pariisissa (9 ajoa, `proto-3d/lokit/muistiajo-173.txt`). Myös BUILD 172
  (= TF 172) kaatuu, joten kyse on vanhasta viasta. **Juurisyy:** kaupunki on vakaa vain latauksen tauolla (laatat 68 %, vapaa
  noin 1,35 Gt). Esityksen alkaessa laatat jatkavat 100 %:iin, ja Cesiumin laattatekstuurit (noin 5 Mt/laatta, eivät näy Unityn
  tekstuurilistassa) vievät muistin. Intro ei ole juurisyy. **Natiivisepän etusija 1:** laattatekstuurit budjettiin, ehto Pariisi
  100 % + esitys ilman jetsamia, vapaa ≥ 0,5 Gt.
- **Intron muistivara A** valmis koodina: `linssiseppa/intro-muisti-173c` **41fb97f44** (= Natiivisepän runko cbef6c66b + intro):
  kuvat otos kerrallaan, enintään 2 muistissa, ja Kuvat.Poista vapauttaa ne myös LRU:sta. Alle 12 Gt:n laitteilla (KaupunkiKuva.PieniMuisti)
  ei Eiffel-esilatausta eikä Trocadéron otosta. Eiffel-hetki tulee avauspaikalta kääntyvänä katseena (KaupunkiIntro.EiffelKaannos),
  jos vapaata on ≥ 1,2 Gt otoksen alussa; muuten otos näytetään 3D-avausnäkymänä (C). Muilla laitteilla esilataus vain, kun vapaata
  on ≥ 2,0 Gt, ja intro ohitetaan, kun vapaata on < 1,0 Gt. Muistiloki (Documents/kaupunki-muistiloki.txt) on mukana diagnostiikkana.
  Linssit 1252/1252, unity 0. EI KUITATTU: laitetodennus odottaa budjettikorjausta.

## Juna 174 (kuittaamatta)

- `linssiseppa/katse-kaari-174` **b812d51b0**: katse_kaari (akselikohteissa saapuminen sivusta ja loppu akselilla), data
  Pelikoodarin #4311 + esittely-v1e (Concorde ja Champs 12°) tuotannossa. Kuva-arkki ajamatta.

## Kesken ja seuraavaksi (jono)

1. **Natiivisepän budjettikorjauksen SHA** → yhdistä `linssiseppa/intro-muisti-173c`:hen → laite-sha.sh (Julkaisijan KÄÄNNÖS NYT)
   → iPad-ajot `proto-3d/tyokalut/linssiseppa-ajot/toisto3-ipad.sh <nimi> - <s> <intro 1|0>`: A = Pariisi + intro ja B = ilman introa, muistiloki ja "opas tekstuurit 25" 2 s ja
   10 s avauksesta → päivitä `proto-3d/lokit/muistiajo-173.txt` (OK <laite-SHA> <min vapaa Gt> / jetsam) → rivi PT:lle ja
   Julkaisijalle + **yksi ruutu Eiffel-hetkestä** (A tai C) PT:lle (`xcrun devicectl device capture screenshot`). Jos A kaatuu
   tai vapaa < 0,5 Gt, junaan C ja rivi PT:lle.
2. Pariisin kuvapari ennen/jälkeen budjettia samasta kulmasta (`kuvapari-ipad.sh`; kerroin pakotetaan Documents/kaupunki-sse-kerroin.txt:llä "1.70" ja "0";
   kamera "opas kamera 48.8530 2.3498 520 62 285 35").
3. katse-kaari-174:n kuva-arkki (sk-kulmat-pariisi) → kuittaus 174.
4. Steam Audio -mittaus iPadilla **Tukholmassa** (Pariisi kaatuu); kehysajat ABAB, `opas steamaudio 0|1` (`steam-ipad.sh`, vaihda Pariisi → Tukholma).
5. Pelikoodarin äänet kytkettäväksi: pallo-lento-soundly-v1 (poltin 01–04, palaa-lahi/kauka, kori-keinunta → PalloKori, 200),
   laatu-korvaajat-v1 (lapset-puisto-01 → KaupunkiAanimaisemaSoitin:158 tukholma/lapset, kanava-liplatus-01 → kerros kanava, 200),
   silmukat-korjaukset-v1 (laituri-02 korvaa laituri-01), ui-linssit-soundly-v1 ("LS", 31 ääntä, jaa LS2:n kanssa).
   Silmukkahavainnot: aanimaisema-v2 on 2,8 dB muita kovempi; mp3-silmukoiden noin 51 ms katko (VeneAanet, pariisi.kyyhkyt-kujerrus,
   lokkiparvi) → ristihäivytys kuten KaupunkiAanimaisemaSoittimessa.
6. Notre-Damen lähilento, kun LR:n malli on hyväksytty.

## Opetukset

- **Laitekaatumisessa älä luota yhteen ajoon:** intro näytti syylliseltä, mutta ajo ilman introa (B) paljasti juurisyyn.
  Aja aina A ja B.
- `os_proc_available_memory` ei näe ennen kaatumista mitään hälyttävää (vapaa 1,3 Gt sekuntia ennen jetsamia), koska Cesiumin
  laattatekstuurit tulevat purskeena.
- Unityn `currentTextureMemory` näkee Cesiumin laattatekstuurit, mutta Natiivisepän tekstuurilista (FindObjectsOfTypeAll) ei.
- `laite-sha.sh` käyttää Natiivisepän päächeckoutia: aja irrotettuna (perl setsid), älä keskeytä. Ensimmäinen ajo voi kaatua
  Burstin linkkeriin (ohimenevä), ja uusinta menee läpi.
- TestFlight-appiin ei voi kirjoittaa komentoja: regressiovertailu tehdään laitekäännöksenä masterista (1c2ecbe32).
- Kaarenpituusparametrointi vaatii splinin (lineaarinen interpolointi antoi kiihtyvyyspiikin 25 000 m/s³).
- Skenaarion yleinen `oleta` täyttyy edellisen komennon jälkeisestä rivistä; nimetyt odotukset toimivat.

## Aloitusviesti

```
Olet Linssiseppä (Opus, high), Matkakirja-pelin natiivin (Unity) linssien ja pallokierroksen rooli. Checkout /Users/Shared/Claude/Matkakirja-linssiseppa,
haara linssiseppa-tyo-20260923 (git fetch origin && git checkout linssiseppa-tyo-20260923 && git pull). Proto-työt worktreessä
/Users/Shared/Claude/wt/proto-linssiseppa-kaupunkiaanet (haara linssiseppa/intro-muisti-173c 41fb97f44).
Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT; ei koko Raamattua), luovutus docs/raportit/viesti-linssiseppa-luovutus-20261009-yo.md,
muistio linssiseppa-tila-20261009.md ja proto-3d/lokit/muistiajo-173.txt.
Sitovat: agentit vain Opus/Sonnet; simu-, käännös- ja laitevuorot vain Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT); viestit Päätoimittajalle vain valmis erä,
jumi tai kysymys, enintään 8 riviä; iPad Pro 13 00008103 lupa on 30.9. (ei iPhonea eikä iPad Pro 11:tä); kaikki suomeksi, tiiviisti.
ENSIMMÄINEN TEHTÄVÄ: junan 173 iPad-muistiajo. Kun Natiivisepän laattatekstuuribudjetin SHA on natiiviseppa/juna-173:ssa, yhdistä se
linssiseppa/intro-muisti-173c:hen, pyydä Julkaisijalta laitekäännös (laite-sha.sh), aja Pariisi A (intro) ja B (ilman), päivitä muistiajo-173.txt
(OK <laite-SHA> <min vapaa Gt> tai jetsam) ja lähetä rivi PT:lle ja Julkaisijalle sekä yksi ruutu Eiffel-hetkestä PT:lle.
```
