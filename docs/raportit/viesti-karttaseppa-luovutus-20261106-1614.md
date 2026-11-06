# Karttaseppä: luovutus 6.11.2026 klo 16.14 (KS)
Syy: konteksti yli 25 %, luonteva tauko: laikka tehty, ei omaa ajoa käynnissä. **Korvaa -1559:n; sen TEHTY- ja MUUTA-osiot pätevät edelleen** (git show e4cc5f3ba:docs/raportit/viesti-karttaseppa-luovutus-20261106-1559.md). Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 265c1ec3a). Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kokeen kohtalo on päätetty).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ei avointa ajoa. Odotat Codexin korjattuja kevyitä malleja tai uusia tilauksia. Viesti Temple- ja Bastilji-syystä ja laikkaehdon tiukennuksesta on PT:llä.
3. Etäyhteys on nyt vain KK:lla (Raamattu 7.9, PT): älä kytke sitä itsellesi.
4. Hookin työlistarivit (Concorde, lähialue, saumat): en päivittänyt, työkalu on PT:n ja omistaja epäselvä.

## SEURAAVA YHTEINEN AJO (numero 23)
Lisää aina skenaarioon `komento talot 1` jälkeen: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/laikka-vesi-20261106/lisa-23.txt. Vaatii Y >= 265c1ec3a. Ei omaa ajoa. Tilaa, kun Codexin mallit tulevat tai muu tilaus tarvitsee ajon.

Ajon jälkeen, kaikki neljä:
1. **KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe, PT:n käsky):** pari pn-matala-1, -2 (lokit/karttaseppa-yhteinen-22-b8-33e641016) | laikka-1, -2, ja tieto poistuvat.txt:stä: lähtevätkö uimala ja ravintolalaivat. Omistajalle kerrottiin 09.3x, että litteät laivat jäävät, eikä hän ole pyytänyt poistoa, joten **265c1ec3a on koe, ei junaan ennen hänen sanaansa KK:n kautta.**
2. **Kerro KK:lle tarkasti:** aineistossa ei ole nimiä, joten uimala ja ravintolalaivat on tunnistettu vain sijainnista, eikä sitä ole varmistettu. Bercyn kohdalla 48.83611,2.37607 (1 951 m², sijainnista päätellen uimala) jää rajan 1 000 m² takia, mutta aivan vierestä 48.83588,2.37627 (709 m²) ja 48.83548,2.37666 (412 m²) lähtevät. Katso kuvasta, jääkö kohta puolitiehen. Bercyn lähialue ei ole lisa-23:n kameroissa; lisää kamera, jos se tarvitaan vastaukseen.
3. **NUI:lle (local_a3754ed8-f155-43b5-9095-b51e9e29ff53):** lokin polku. Lokista luetaan usva ja törmää (`ui kohdenostot kyltti`), kuvat kyltit-suora ja kyltit-reitti. Korjaus on NUI:n, vasta mittauksen ja PT:n sanan jälkeen. Älä muuta koodia tämän takia.
4. **PT:lle:** yksi rivi tuloksesta, kun ajo on nähty. Pont Neufin raita pysyy jonossa ennallaan.

## TEHTY TÄSSÄ SESSIOSSA
- **Punertava laikka:** laiturilaivat, OSM:n rakennusrenkaita joessa kattosävyllä. Sijainti, muoto ja väri täsmäävät, ajossa näkemättä. Kansiossa laikka-vesi-20261106: syy.md, poistuvat.txt, lisa-23.txt, vesikaupungit.py, mvt_vesi.py.
- **Korjaus:** Y eb64a0675 ja sen tiukennus 265c1ec3a, tyyliversio e25, ElavaTyyli.VeneVedessa. Rengas pois vain, kun Pariisin talojen alueella (TaloAlue.PisteAlueella), render_height 5, keskipiste joessa (class=river, ei katettu) ja ala ≤ 1 000 m². Pariisissa 143 rengasta, noin 32 400 m² (48/63 palaa välimuistissa). Testit ElavaKartta 31/31 ja TaloAlue 7/7.
- **Kaupunkitarkistus peruttu (PT):** ehto koskee vain Pariisia. **Ei hakua: OpenFreeMapin robots.txt palautti 403:n.** Amsterdam-tulos jää perusteluksi: 2 300 rengasta alkuperäisellä ehdolla.
- **Poistuvat.txt on tehty alkuperäisellä ehdolla;** nykyisen ehdon rivit ovat ne, joilla on `h=5 river` ja ala ≤ 1 000 m². Saaret on katsottu vain numeroina.

## AUKI
- **Kyltit (omistaja näki 16.08):** PT:lle kerrottu mittaamaton ehdotus NUI:n pohjalta: reitti eli edellinen kamera, ei kartta. Mittaus ajossa 23.
- **Tuileries'n ruskeat pisteet** (pn-matala-2, noin 590,1437 ja 920,1432): tutkimatta, eivät vedessä.
- **Louvren haamu:** odota PT:n ja VS:n päätöstä; ei omaa korjausta.
- **Eiffel 85b** VS:llä. **Kärkilaskenta** iPadilla mittaamatta.
- **Kevyet mallit:** Codexilla, sinulle ei korjauksia. Kun uusi versio tulee postiin: `node tools/codex-3d-tarkistus.mjs` ensin, sitten pari samoista kulmista (ylhäältä, 45°, 5°) seuraavassa yhteisessä ajossa (lisä: _tyo/karttaseppa/codex-lod-20261106/lisa-18.txt). Postissa #2167 tuli vain lähdetiedot.

## MUUTA
- Kartta-testit: `sh kaanna.sh <nimi>` (suora ./kaanna.sh antaa permission denied). Skriptit tiedostoon, ei heredoc-pythonia.
- Pelin palat: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
