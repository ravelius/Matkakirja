# Natiivisepän luovutus 11.11.2026 klo 08.25

Edellinen: -0706 (7a3bb101a) ja sen kautta -2010/-1705 VOIMASSA paitsi alla päivitetyt. Syy: kontekstivahti 25 % (7.37).
Cron (klo 9.04 unity-julkaisut.py) ja vahti ovat sessiokohtaisia: LUO UUDELLEEN. Vahti: Monitor
`bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (lisätty kuvio natiiviseppa-horisontti-ipad-*).
Oma wt: /Users/Shared/Claude/wt/proto-natiiviseppa-horisontti (haara natiiviseppa/horisontti, 7b7e12bfd, EI muutoksia).
HUOM: proto-3d/Matkakirja-proto (master) on VANHA – lue koodi aina wt:stä tai `git -C … show 7b7e12bfd:polku`.

## VALMIIT TÄLLÄ VUOROLLA
- USVARAJAUS A/B (JU 29383f882, iso iPad 2+2): 80° huippu a 3593/3671 vs b 3669/3704 Mt, −55 Mt = ei hyötyä → 60623ec85 EI junaan
  (PT 08.2x kuitannut). Taulukko _tyo/natiiviseppa/usvarajaus/tulos.md. Työlistan muistirivi päivitetty 08.14.
- Katto 3940 pitää (vara ≥ 236 Mt). Piikki syntyy liikkeessä (lepo ~2900 → ~3700).

## JONO (PT 08.2x: horisontti ENSIN, sitten liikkeen laattalataus)
1. HORISONTIN BEIGE VYÖ: kaikki _tyo/natiiviseppa/horisontti-beige/selvitys.md (lue "Diagnostiikka 2" -osa).
   Tila: Mac-diagnostiikka 2 (3 kylmää): vyö 1/3 ajossa (2a), usvamitta (raja, voima, liuku, Unityn sumu) sama kaikissa → EI usvan
   laskenta. Toistaiseksi nähty vain Mac-esikatselussa. iPad-ajo 3 (ajopyynto-3.md, sk-ipad-horisontti-3.txt, 3×) JU:lla käynnissä 08.2x:
   3a ajettu, MUTTA KUVAT PUUTTUVAT (JU nimesi kansion -3a-eikuvia; usvamitta konsolissa sama kuin Macilla). Selvitä JU:lta, miksi
   "kuva i0-perus" ei tallentunut (iPadilla ehkä "komento kuva X", muisti ipad-skenaario-komennot-odotus), korjaa skripti, aja uudelleen.
   Jos laitteella ei vyötä → rivi PT:lle "Mac-esikatselun ilmiö, ei pelin vika" + työlistarivi valmis/este PT:n sanalla.
   Jos laitteella vyö → vertaa 2a vs 2b: 2b:ssä pilvien varjot/harmaus, 2a kirkas; epäily KarttaPilvet (VS:n koe) tai shaderin tila.
2. LIIKKEEN LAATTALATAUS (80° piikki +800 Mt liikkeessä): PT:n lupa, ei kiire. Epäilty LiikeLaatat/varjokamera, Cesiumin välimuisti.
3. JUOKSUPELIN PIIRTO: JU d0eceabaf (7b7e12bfd + fb62178af), 2× → lokit/natiiviseppa-juoksu-piirto-{1,2}; lue kuten -2010 kohta 3.
4. AVAUSLENNON VARJOT ja -1705:n muut: ennallaan.

## VIESTIT TÄLLÄ VUOROLLA
PT: muistirivi (päivitetty), usvarajaus-ajo pyydetty uudelleen, tulos (ei junaan), horisontti ensin. JU: usva/juoksu/horisontti-2/-3 jonoon.

## LISÄYS 08.5x
- Kohta 1 (beige vyö) VALMIS: iPad 0/6, Mac-esikatselun ilmiö; PT 08.5x sulki, työlistarivi valmis, selvitys.md LOPPU-osa.
  iPad-skenaarioissa kuvat "komento kuva X" (sk-ipad-horisontti-3.txt korjattu).
- SEURAAVA = kohta 2 LIIKKEEN LAATTALATAUS (PT 08.5x "kuten sovittu"). Aloita lukemalla usva-a/b-ajojen muisti-tarkka.log 80° liikejaksosta,
  mikä kasvaa liikkeessä (Pallo-rivit, Cesium-välimuisti); koodi wt:stä /Users/Shared/Claude/wt/proto-natiiviseppa-horisontti (7b7e12bfd),
  LiikeLaatat.cs/LiikeLaatatPaatos.cs (varjokamera SSE 32 liikkeessä).
- Juoksu-piirto-1 käynnissä 08.5x (JU d0eceabaf).
