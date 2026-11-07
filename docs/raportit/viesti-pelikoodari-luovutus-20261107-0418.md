# Pelikoodari: luovutus 07.11.2026 klo 04.18

Korvaa kaikki aiemmat. Lue myös `git show ee5465047:docs/raportit/viesti-pelikoodari-luovutus-20261107-0326.md` kohdat 3–6 (Lontoo) ja `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 3–5 (juoksupelin avoimet, ohjaus, opit). **Työ nyt: JU:n ajot `sk-y` ja `sk-y2` ovat jonossa lahi-1:n jälkeen. Katso kuvat, nimeä sha, rivit KK:lle ja PT:lle.** Nollaus pehmeällä rajalla (25 %), ei työn loppu.

## 1. Juoksupeli, taso 1 (PT 04.2x, ei junaan)
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `3ba5bb57e`, puhdas. Runko `natiivi-backup/julkaisija/runko-219-muisti` (`1104d0994`) yhdistetty: `db4c9f555`. Protorepossa ei ole mainia; kerroin PT:lle, ei vastalausetta tullessa luovutusta. Haaran `1104d0994`:n viesti sanoo "NUI-yhdistelmä, ei vielä runkoon", vaikka ref on runkohaaran kärki.
- **Ajot:** `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/sk-y.txt` (ipad, 10 kuvaa, lokit `/Users/Shared/Claude/proto-3d/lokit/pelikoodari-juoksu-y-3ba5bb57e`) ja `sk-y2.txt` (iphone-vaaka, 1 kuva, `.../pelikoodari-juoksu-y2-3ba5bb57e`). JU kuittaa tähän sessioon; jos ei kuittausta, tarkista kansiot ja kysy JU:lta. Luo oma vahti, edellinen päättyy nollaukseen.
- **Katso:**
  - `y1`, `y2`: rajaviesti portilla. Lokista `kynnysviesti raja` (ei `ovi`) ja "Sisälle pääsee seuraavalla tasolla." Rajapisteet (-138,25; 442,25) ja (-138,75; 446,75); JuoksuOvet.jsonissa ei ole ovea lähellä. Jos loki sanoo muuta tai rivi puuttuu, kerro, että rajaviesti on yhä näkemättä.
  - `r1`–`r3`: ruukun rikkoutuminen. **`292afcef2` pysyy pois junasta, kunnes kuvassa näkyy osuma (PT).** Ajo synkronoi lokirivillä `rikkoi kulttuuriaarteen`.
  - `r4`: loppukortti rikkoutumisen jälkeen, ei ruukun riviä eikä kuplaa. Käytti reittiä `sk-x`:stä samoin ajoituksin (`k1`, `k2` vain ajoituksen vuoksi).
  - `t1`, `t2` iPad ja `t3` iPhone: Taso läpi -kortti. Kortin alareuna noin 785/1500 iPadilla (ennen 935); keisarin pään pitää näkyä.
- **Taso läpi -korjaus:** `JuoksuLoppukortti.cs`, `AsetaNosto`: vain `TasoLapi`, alamarginaali 20 % ruudun korkeudesta, enintään vapaa tila. Ei koske Uuvuit- eikä Kiinni-korttia. **PT:n raja: kaksi yritystä.** Tämä on ensimmäinen. Poikkeaa keskitetystä KORTTI-pohjasta: kerro NUI:lle, kun kuva on nähty.
- **QA:** `ui juoksupeli tasoaika <s>` asettaa juoksun ajan; lokirivi `kynnysviesti ovi|raja`.
- **Ei testaa:** renkaiden häivytys, ensikertalaisen opetus, oikea laite, ääni.
- **Botti:** `sk-x`:ssä kiersi samaa lenkkiä noin (-237; 346) noin 470 m. Taso läpi ei todista reittiä. Syy selvittämättä, ei tehtävänä.

## 2. Eunukki otteessa: EI VIKA, älä korjaa
OMISTAJAN PÄÄTÖS 27.10. 18.12 (`docs/raamattu-loki/paatokset-2026-10.md:2947`): eunukin selkä peittää keisarin myös toisessa kiinniotossa ja Uuvuit-ruudulla, kamera ennallaan; 15.41 yläkulmasta (`:2925`), 19.52 valmis junaan (`:2963`). Ilmoitin sen viaksi ja PT käski korjata. Oikaisin KK:lle ja PT:lle 04.1x. Muistissa: `juoksupeli-ote-eunukki-peittaa-paatos`.

## 3. Sk-x tulos (`lokit/pelikoodari-juoksu-x-36aa43ed3`, JU: 11/11, CS 0, Shader 0)
Nähty: oikea käännös, ovilehti yhdessä ruudussa (kamera ahtaalla, jalat kuvan alareunassa), kynnysviesti ovella, ote, Uuvuit-kortti (`dcad62532` nyt nähty pelistä), Taso läpi -kortti. Reitin 8 käännöstä kunnossa; 2 "ei" vain botin ajojen alussa.

## 4. Lontoo ja muut, ennallaan
- E4 KK:lla, ei kuittausta luovutushetkellä: kuvat `lokit/pelikoodari-lontoo-e4-fdbf8a0ef`. Proto `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, `fdbf8a0ef`.
- **NUI 03.5x:** kun kärki `60ca73fad` (`Kohdenostot.KartanPiste` paketin lat, lon) tulee Lontoon kokeeseen, poista oma ehto `k.Kaupunki != "lontoo"`. Testihaara `natiivi-ui/kainalo-lontoo-testi`.
- **Kartta (juoksupeli): LAV 03.5x: EI VIELÄ.** Älä aja karttaa eikä `JuoksuOvet.json`ia, ennen kuin LAV antaa lopullisen juuren nimen.

## 5. OPIT
- Tarkista päätökset ennen kuin sanot näkymää viaksi: koodin kommentit ja `node tools/loki-hae.mjs`.
- Älä oleta `oleta-uusi`-rivin osuvan: `sk-x`:n rikkoutuminen tuli ensimmäisellä juoksulla, koska ruukku on reitillä uudelleen paluumatkalla.
- Rajat ovat tiedostossa `JuoksuKulkuRajat.bytes` (int16 x*4, z*4), 16 574 pistettä, pohjan kehyksessä.
