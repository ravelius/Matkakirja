# Valosepän luovutus 4.11.2026 klo 06.30

Syy: konteksti 25 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0613.md (lue Työkalut ja LISÄYS; kohdat 2–4 tehty tässä tai korvattu). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset _tyo/linssiseppa2/pariisi-tyyli/: k40/TULOS.md, k41/TULOS.md, k42/TULOS.md. KK:n linja: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osio "VS: k39 ja k40".

## Tila (haarat natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30; ei junaan)
- **Wt nyt haarassa pariisi-k43-koe = k41, ei omia committeja.** Tähän portaat.
- **k41 61dab02f8** (pariisi-k41, k38 ee3743d64:n päällä, p41, 614/614): koealueen reuna aaltoilee ulospäin 0–800 m, nollaan 1 800 m. Pari k41/pari3-z13.jpg. Arvio KK:lla, muisti mittaamatta laitteella, varalla 1 200 / 450 m.
- **NS 8d66b5865** (natiiviseppa/haivytys-aalto, p34e) on sama asia eri arvoilla (0–900 + 1 200, ulkoraja 2 100 m): yhdistelmään vain toinen; kerrottu PT:lle. NS: rivi 168 ja saumat 2,2412 / 2,4609 ovat Cesiumin maastopalan tasovaihto, eivät häivytys: _tyo/natiiviseppa/aluekuva-koko/rivi168-havainto.md.
- **k42 2f09fc2d3** (pariisi-k42-koe, k40:n päällä, EI pelattava, EI yhdistelmään; arkki vain k39/pinnat): z16–17 pitkät kadut vetoina (ELAVA_KATURAJA, oletus 300), z15 arkista. Lähetetty PT:lle, suositus 400 m; KK vie kortin omistajalle. Haara k40 1df229704 vertailuna; saumaton arkki k40/tee-arkki.py (yksi suora viiva jäljellä, syy selvittämättä).
- **yhd5:** kuvia ei vielä 06.30 (JU: lokit/julkaisija-yhd5-iso-8dee95d57). Oma taustavahti kuolee nollauksessa: tarkista kansio tai odota JU:n riviä.

## Seuraavaksi
1. **Portaat koehaarassa k43 (PT 06.2x: tee ehdottamasi korjaus k42:n jälkeen, pari PT:lle, ei yhdistelmään).** Syy k41/TULOS.md + k41/vesi.py. Vesimaski ElavaTyyli.cs "--- maskit ---", vesi.Tayta() jälkeen, vain pa ja z ≤ 15. VARO: pelkkä avaus ja sulkeminen 15 m:llä poistaisi kapeat vedet (Canal Saint-Martin noin 20–30 m; lukittu 1): poista vain pienet erot, eli avauksen ja sulkemisen ero komponenteittain, ala enintään noin 1 500 m², muut palautetaan. Vara 64 px riittää (SS 4; z15 noin 19 px, z14 noin 10, z13 noin 5), mutta tarkista palaraja. Rantaviivat (rivi noin 579) tarkistettava, seuraavatko ne maskia; kuvassa ne porrastuvat myös. Pari k33/portaat-z15-6x.jpg:n rajauksesta, palat data k22/data-lisa (k38/aja.zsh).
2. **yhd5-kuvat täysikokoisina:** Cité, École, Montmartren pohja (Sacré-Cœur KS:n; VS:lle vain pohja kuvan ympärillä), k35 Z16, Jussieu, Pitié, Luxembourg, Petit Palais, JdP, r-0-21 + paluu. Rivi PT:lle. Louvren etelälaitaa ei hiota nyt (PT 06.09).
3. **k42:n jälkeen KK:n kortin mukaan:** talo katkeaa kadun reunaan ei vielä toteudu; KK 06.24/7 pienet kohdat seuraavalle kierrokselle (kaksoisviivat, ohut suorakulmio, sahalaita, kermalaikut, v-r65 vasen); saumaton arkki loppuun; muisti ja vieritys laitteelta. Poistuvien katujen nimet ja liikkuvat: KS (06.24/3).
4. Vanhat: joki Pariisin jälkeen; k32 sora; raiteet z ≤ 14; kadut hieman keltaiset (yhd2/15). Ei uutta yhdistelmää ilman käskyä.

## Työkalut
k39/aja.zsh <wt> <arkki> <ulos> <z> <alue> (kirjoittaa pinnat-kopion). k41/aja.zsh <wt> <ulos> [z] koko z13. k38/aja.zsh paikallinen z15. k42/parit.py, k42/kadut.py (katupituudet), k41/vesi.py (water-renkaat). Alueet: z17 66384,45091,66391,45098; z16 33192,22545,33195,22549; z15 16596,11272,16597,11274; z14 8298,5636,8298,5637. Mittakaavat 256 px/pala: z17 0,79, z16 1,57, z15 3,14, z14 6,3 m/px.

## LISÄYS 06.32 (SITOO, ennen kohtaa 1; PT:n viesti tuli luovutuksen jälkeen, ei tehty)
**PT: KK:n "VS: reuna k41" (KORJAUSLISTA, KK 06.26 ja 06.28):** k41 seuraavaan iPad-yhdistelmään, NS 8d66b5865 jää pois. **Tee ensin läikkä yhdellä säädöllä haaraan pariisi-k41 (wt on nyt haarassa k43-koe, vaihda), sha PT:lle.** Läikkä: länsireunan vihreä alue (k41/pari3-z13.jpg alakuva, x noin 530–610, y noin 1700–1760) häipyy oliivina joen taakse; esim. puistot häipyvät vyössä taloja nopeammin, tai raja kulkee alueen ohi. Ei omaa kierrosta. Lisäpalat käyvät, jos muistihuippu ≥ 300 Mt rajan alla eikä vierityksen ruutuaika huonone reunalla; muuten 1 200 / 450 m. Kuvat 0,13, 0,08 ja 0,05 (länsiraja) täysikoossa. Pohjoisreunan nauha on NS:n rivi 168. Portaat vasta tämän jälkeen, k43 uudesta k41:stä.
