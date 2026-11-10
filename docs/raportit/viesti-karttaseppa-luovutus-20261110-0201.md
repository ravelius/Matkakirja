# Karttaseppä: luovutus 10.11.2026 klo 02.01 (KS)
Syy: konteksti > 26 % (hook), pehmeä raja. Korvaa -0135:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **Faktavirheet mainissa b6a690b98** (PR 6530, checks pass, PT:lle ilmoitettu): Mona Lisa palasi Louvreen 4.1.1914;
   Tuileries'n palatsi + Impressionistit (nahtavyysjutut.js + fokusvirta-pariisi.js) "sinä kävelit" → "isoisäsi käveli".
   Työpuu /Users/Shared/Claude/wt/karttaseppa-faktat (haara yhdistetty, voi poistaa `git worktree remove`).
2. **Koe5 Mac-kuvat katsottu, PT:lle raportoitu**: sisäpihatalot saivat räystäät, mutta Pariisin lähikuvissa tummia rakoja.
   PT 03.0x: "jatka paikannusta; koe6 vasta kun raot 0 lähikuvissa ja räystäät säilyvät. Ei junaan ennen PT:n paria."
3. **Rakojen syy löydetty ja korjattu koe6:ksi** (kaikki `$K/koe5-tulos.md`): matalamman naapurin vieressä reuna oli "vapaa",
   koe5 yksinkertaisti sitä ulospäin, ja naapurin katon yläpuolelle jäi ohut tumma seinäkaista. Koe6 = KATOT_KOSKETUS=1:
   yksinkertaistus vain reunoilla ilman mitään naapuria (nh2). Pickle-mittari: kaistat naapuria vasten 254 → 43 m² (koe3 39),
   räystäät säilyvät, rypyt P 2317 (koe3 3438), L 260. Koodi katot.py + tee-palat-{,lontoo-}luuranko.py (varmuuskopiot *-koe5.py).
   Palat `$K/pariisi/palat-v23-katot-koe6`, `$K/lontoo/palat-d11-katot-koe6` (kansiot alustettu koe5:n paloilla, indeksi.txt).
   Uudet mittarit/kuvat `$K/profiloi/`: paadyt.py (A B N 0.6 = ohuet kaistat), sijainnit.py (pickle → kartan xy, tarkistettu 0 m),
   vino-alue.py (vinokuva pelin kameralla, ohuet kaistat sinisinä), alue-pari.py, aukot.py, askelmat.py, tayte-naapurit.py.
   Pickle-normaali on Unity-järjestyksessä (x, ylös, z).
4. **KK:n 3 viimeistä selitekorjausta TEHTY sanatarkasti** (PT 02.0x): Lontoo 02-b (Delamotte), 05-d (1825–1843), Pariisi 03-b (Curie).

## TYÖN ALLA / JONO (järjestyksessä)
a. **Koe6 Mac-ajot 11–12 JU:lla** (pyydetty 02.0x, `$K/ajopyynto-mac.md`, `$K/sk-*-koe6.txt`). Kun valmis:
   `python3 -I $K/skriptit/parit-koe.py koe5 koe6` (ja koe3 koe6); tarkista lähikuvista, että raot ovat poissa
   (vertaa `$K/kuvat/a/pt/lahi-pariisi-koe3-koe5-raot-{45,70}.png`; zoomaus `scratchpad`-tyyliin: crop + 2× NEAREST) ja että
   räystäät säilyvät (sisäpihatalo iphone-45). Parit + 3 riviä PT:lle. Ei junaan ennen PT:n paria.
b. **PT 03.1x (kaksi viestiä): hetkien kysymykset natiividataan** (KK hyväksyi NUI:n kysymysosion 2b7f2e7b7, natiivi-ui/hetki-pulu,
   repo natiivi-backup = ravelius/Matkakirja-natiivi; NUI:n raportti /Users/Shared/Claude/proto-3d/lokit/nui-hetki-pulu-2-iphone-2b7f2e7b7/raportti-nui.md).
   - KK:n korjattu lista, **2 kysymystä per hetki** (Pariisi 22 = 11 hetkeä, Lontoo 16 = 8): `$B/kysymykset-pariisi-luonnos.md` ja Lontoon
     vastaava `$B/`-kansiossa. Esimerkkikysymykset (NUI:n QA) eivät mene peliin.
   - Hetken kysymykset: lähde `js/packs/historian-hetket.js` (HISTORIAN_HETKET) → tools/vienti/kokoelmat.mjs (rivi ~247/269:
     `historianHetket`) → paketti `historian-hetket.json`; natiivi lukee hetken `kysymykset` (≤ 3). Tarkista, että vienti kopioi kentän
     (lisää kokoelmat.mjs:ään, jos ei). Päivitä myös tools/vienti/nosto-kysymykset.mjs (hetket nyt 0 "ei kysymyskenttää") ja
     tests/fixtures/nosto-kysymykset-poikkeukset.tsv tarvittaessa.
   - Pulun valmiit: ämpäri `pulu/vastaukset/v1/<maa>.json` → `kohdat["hetki:<id>"].kysymykset[{kysymys, vastaus, jatkot}]`
     (FRA-esimerkki: kohde:tuileries). Vastaukset Pulun äänellä = sisällön generointi: selvitä, kuka/mikä putki kirjoittaa
     valmiit (proto Peli-testit/nosto-kysymykset.py lukee niitä; kysy PT:ltä, jos putki ei löydy). Natiivin testi kultaiset
     Peli-testit/Kultaiset/nosto-kysymykset.tsv (python3 -I nosto-kysymykset.py --kirjoita).
   - Muiden kaupunkien hetket idealistaan. Junaan NUI:n muutoksen kanssa, kun data valmis. Valmis-rivi PT:lle sha:lla +
     Mac-kuva iPhone-koossa yhdestä hetkestä (JU:n vuorolla).
c. Pelikuvat (-0135 kohta a): Vrain-Lucas ≥ 600 px haku, Lontoon 02-a ja 07-b pelinäkymässä katsomatta. Korjattu lista PT:n kautta KK:lle
   (Pariisi ensin) – tehdään b:n yhteydessä.
d. Sisäkulmien rypyt (13 %) vasta koe6-kuvien jälkeen, jos tarvitaan.
e. Nimiäänet Lontoolle vasta Pariisin oton jälkeen (KK 01.0x); nimilista 43 (sijainnit.json lontoo:*).

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä.
