# Lavastajan luovutus 6.11.2026 09.39 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0920:n (git show eb383337d:docs/raportit/viesti-lavastaja-luovutus-20261106-0920.md) ja -0905:n (git show b274c9ee7:docs/raportit/viesti-lavastaja-luovutus-20261106-0905.md) Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun kirjaukset). Luovutus kontekstirajan takia. EI VIENTIÄ.

## Linja
PT 09.3x: räystäsliuku pois vientilistalta, VS korjaa. Mac-ajot JU:lta, L1 (L2 varattu b8-vertailulle). Omistajan raja: enintään noin 5 kuvaa per ajo, enempi perustellaan (JU palauttaa muuten).

## Opetukset
- `valo raystas 0` EI kytke räystäsliukua: se on V4_tealin kiinteä varjo. Liuku = `valo raystasliuku 0`. Aiempi "räystäsvarjo kumottu" oli väärä testi. Kumoaminen vaatii todisteen, että kytkin vaikuttaa.
- `avaus nyt 1` aloittaa juoksun alusta peiton alla. Ilman odotusta kuvissa voi olla avauskuva (kuvat-m ensimmäinen ajo). Ensimmäisen kameran jälkeen `oleta 120 juoksupeli tarkastelu: alku`. Tarkista: lokissa rivi "tarkastelu: alku".
- Kellonaika aina date-komennosta. Kirjoitin lokiin arvattuja aikoja ja korjasin ne.

## Tila
`koejuuri-aukot9` = aukot8 + peittävä pääty (tee_aukot9.py, suunnitelma9.json, rakenna9.log). KK:lle ei ole lähetetty paria.
Valmis:
- Tumma suorakaide friisin yllä: räystäsliuku, TODISTETTU kuvat-r:llä (kolme on/pois-paria, rajat8/r-*.png). Ei Lavastajan korjattava.
- Punainen levy (-153; 290): peitetty, kuvat-m (uusinta) m-pohjoinen ja m-suoraan katsottu 1376 px:n koossa, m-viisto katsomatta. Syy: hajonnut pääty kk-tausta-1-3 z 290,2. Pääty rakenna7:n siirrolla z 290,6. Friisi vaaleampi kuin naapurilla, u ja v arvattu, saumoja ei täysikoossa. PT:lle kerrottu. Kartta ei tunne päätyä: PK:lle vientilistassa.
- PK:n vastaus: 18/19 PÄÄSEE, vain (-144,4; 287,9) ilman kaistaa. Vuotoa ei voi todistaa kartasta. Lista ei putoa kartan perusteella. Kokonaan KORJAUS.md:ssä lyhyesti; epäiltävät (kapein 1 ruutu): (-275,8), (163,8), (155,1), (-185,9), (-247,0), (-133,4). Irrottaa 0: (-107,6), (-133,4). Rivit "tulee"-pisteineen: Pelikoodarin viesti 09.3x; pyydä tarvittaessa uudelleen.
Auki:
- (-151,5) täysikoossa (rajat8/r151-porras.png, r151-sauma.png): friisin porras noin 5 ja 10 px, kuvio ei täsmää, korkeus sama kuin naapurilla (3,439-3,705). Etäisyys 1,5 cm selittää laskien noin 2,4 px, loppu auki. Pystysauma: heikko sävyero, epäily valo-UV, mittaamatta. PT tietää. Ei korjattu.
- Muita 4 friisiä ei katsottu saumaan asti voimalla 0. (-188,5):ssä pystyviiva jalustan kohdalla. Ensin rajaukset kuvista ilman liukua: r-k--188p5-pois täysikoossa.
- k--188p8: musta ja tummanpunainen pinta: säde vain taustaan, ei selitä. Muita paketteja ei testattu (mittaa9b.py). m-pohjoinen: reikä erillisen rakennuksen päädyssä vasemmalla keskellä, ei tutkittu.
14 lisäyksen seinää: YHTÄÄN EI RAKENNETTU.

## Seuraajan järjestys
1. JU:lla L1:llä `aja-aukot9n.zsh` (5 kuvaa, viisi pisintä, kuvat-n; rivi tulee sinulle Postivahdin tai JU:n kautta). Katso täysikoossa tai rajauksina ennen väitettä: näkyykö oikea aukko. Tarkista "tarkastelu: alku" ja 404-rivi (5 tuttua).
2. `sk-aukot9n2.txt` (8 kuvaa, yksi per kohta, perustele JU:lle tai jaa osiin; aja-tiedosto puuttuu, tee aja-aukot9n.zsh:n mallilla).
3. 5 kohdalta ei löytynyt kameraa: (204,7), (155,1), (-133,4), (-247,0), (-81,1). Haku tee_sk9b.py on hidas (yli 280 s): aja taustalla ja ohjaa tuloste lokiin. Tämän session ajo kuolee nollauksessa, tulosta ei ole.
4. Rakenna vain aukot, jotka näkyvät avoimina, tee_aukot9.py:n mallilla (kaistan poisto mukana) uuteen juureen. Automaattilinja ei kelpaa ilman näyttöä.
5. Friisien saumat (yllä). 6. -0905:n kohdat 4-6: paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti, PK vahvistaa viittaukset.

## Työkalut (A/), uudet
mittaa9.py (säde: y ja normaali, kuvat-k), mittaa9b.py (k--188p8), mittaa9c.py ja 9d (levy, kaikki lod0-glb:t), mittaa9e.py (liitoskärjet -151,5), tee_aukot9.py, tee_sk9.py (kamerat T:stä, kirjoittaa sk-aukot9n:n ja aja-aukot9n:n; ÄLÄ aja uudelleen, jaoin tulosteen käsin kahteen), tee_sk9b.py, sk-aukot8r.txt, aja-aukot8r.zsh, sk-aukot9.txt, aja-aukot9.zsh, rajat8/.
