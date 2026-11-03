# Karttaseppä: luovutus 3.11.2026 klo 23.33 (KS)
Edellinen: docs/raportit/viesti-karttaseppa-luovutus-20261103-2315.md (tällä haaralla, PR 6233; Y, R ja taustaajojen selitykset sieltä). Tämä korvaa sen TILA- ja AVOIN-listat. Syy: konteksti 25 % (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (python `/opt/homebrew/opt/python@3.14/bin/python3`). Tilataulukko Y/TILANNE-nahtavyydet.md on ajan tasalla.
**Aja heti vahti:** `Monitor` komennolla `zsh Y/vahti.zsh` (kaikki jo tulleet toimitukset on käsitelty; 30 min välein uudelleen).

## TILA
| Kohde | Tila |
|---|---|
| 9 G-nähtävyyttä | KK:n hyväksymiä; pelissä NS:llä (7ee81d262, koeajo a94d8e7fb) |
| Sainte-Chapelle | KK 23.21 hyväksyi. Kivi lämmitetty ND:n sävyyn Y/lammita-kivi.py. Taso + alue.json viestitty NS:lle; KK katsoo JU:n pelikuvasta |
| Notre-Dame | KK 23.26: 0,8 × julkisivun vasemman alakulman ympäri, kulma 48.853538, 2.346718. Y/nd-skaala-08.py → Y/tarkistus-nd-k4/skaala-08/ (sha256 8589240ae981…, irtopala poistettu, puut jäivät). Viestitty NS:lle; raivausmaski pitää tehdä tästä tasosta |
| Sillat a, b | Kirjastossa esine/silta-{a,b}-{2,3,6}-kaarta (Y/korjaa-sillat.py) |
| Sillat c (90°), d (30°) | KK 23.31 hyväksyi. Kirjastossa esine/silta-c-{lyhyt,keski,pitka}, esine/silta-d-{2,3,5}-kaarta, data/sillat-kannet v2 (Y/leikkaa-silta-arkki-2.py, Y/korjaa-sillat-c.py, Y/yhdista-sillat.py). NS:lle ilmoitettu; KK katsoo kannen leveyden pelikuvasta (d noin 11 px, muut 16–18 px) |
| Koko Pariisin puut ja esinepaikat | Valmis, NS:lle viestitty: _tyo/karttaseppa/pariisi-koko-esinepaikat-20261103/ (data/pariisi/esinepaikat, data/pariisi/puut). Isot aukiot katupalojen kuorista |

Kaikki NS:n viestit olivat lähtiessä NS:n jonossa ("queued"); tarkista list_events, jos NS ei kuittaa.

## AVOIN (järjestyksessä)
1. **Yhdestoista silta:** PT puhuu 11 sillasta, tilauksen lista on 10 (90° Alexandre III, Invalides, Alma; 30° Sully, Austerlitz, Charles de Gaulle, Bercy, Tolbiac, National, Saint-Louis). PT:ltä pyydetty kertomaan NS:lle.
2. **Pelikuvan arviot:** ND 0,8, Sainte-Chapellen sävy, siltojen leveys ja 30°:n kapeampi kansi. Tiedossa olevia pieniä: d-5:n neljäs kaari osin umpinainen, a/b:n kylkeen jää leikkauksesta 11–15 px kärki.
3. **Nimet:** natiivi-backup/karttaseppa/pariisi-nimet-219 c1832c0c2 JU:lla; odota kuvat, arvioi tiheys ja koko kohdasta esikatselu-20261103-225548/nd-keski.png, pari PT:lle (ohje 2315-luovutuksen AVOIN 2).
4. **ND:n kiekko** (nd-keski.png ~1810, 545): NS 23.2x: ei aukio eikä ND:n taso, piirtyy HdV:n ja ND:n alle, kaupunkimerkkiä ei suljettu pois. Katso koeajon kuvasta. ND:n pieneneminen voi muuttaa tilanteen.
5. **Korttelipinta k5:** pelissä VS:n k12:ssa (_tyo/linssiseppa2/pariisi-tyyli/k12/TULOS.md). Peli on k5:tä lämpimämpi, syy selvittämättä. ÄLÄ säädä ennen VS:n isoa iPad-kuvaa (a57c0b473); VS tuo sen.
6. **Taustaajot:** tasankoketju pid 65143 ja esittelypaikkasilmukka pid 68441 käynnissä 23.3x. HUOM: tasangot-poltto-20261103/ketju.virhe.11031218 on olemassa, en tutkinut (vanha aikaleima 12.18). Jatkot: 2232-luovutuksen AVOIN 3 ja 19.40-luovutuksen AVOIN 4–5.
7. **Worktree-poistot (PT):** 2315-luovutuksen LISÄYS; PR:t 6187 ja 6233 auki, tasankoketju ja silmukka kesken, joten mitään ei voi vielä poistaa.
8. Vanhat: v7/v8 iso-pari (JU), pitkät ruudut.

## Opit
- Pariisin OSM-välimuistissa on vain wayt: isot aukiot ovat avoimia katupaloja saman nimen alla. Tunnettujen aukioiden nimet kannattaa tarkistaa generaattorin jälkeen.
- Kannen maski: kiinteä väriviite ja suurin komponentti; kuvan keskimediaani osui väärin lyhyissä silloissa (a-2 leikkautui puoliksi). Tulos katsottava aina kuvasta.
- Laskettu koordinaatti viestiin vasta mitattuna: kahdesti lähti viesti arviolla ja korjaus perässä (kyljen kärki, ND:n irtopala).

## LISÄYS klo 23.34 (NS)
- Sainte-Chapelle pelissä 48ba7cf88, sillat 53b34a340 (33 siltaa). **AVOIN 1 ratkesi:** yhdestoista silta on Simone de Beauvoir, 30°-listalla.
- Koko Pariisin puut pelissä 159acdf0c. Aukiot ovat toistaiseksi pois datasta (VS/KK kiekot), joten esinepaikkojen aukioita ei nyt käytetä.
- NS ei maininnut ND 0,8:aa tässä viestissä: varmista, että se ja raivausmaski on tehty tasosta 8589240ae981…. Pelikuvat JU:lta.
