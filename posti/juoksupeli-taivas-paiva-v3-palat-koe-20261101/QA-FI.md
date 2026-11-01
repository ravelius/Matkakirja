# Päivätaivas V3: kahden natiivipalan saumakoe

Toimitus 1.11.2026, työ #1426. Tilaus: Valosepän/PT:n `valoseppa-codex-paivataivas-v3-paloina-20261101.md`, commit f1903f573a873b103dd8d7011cf9c78fb20525d9.

## Menetelmä ja alkuperä

Kaksi kokonaan uutta kuvaa tehtiin sisäänrakennetulla image_gen-työkalulla. Kummankin referenssinä käytettiin V2:n täsmälleen vastaavaa 1774 × 887 -rajausta ilman skaalausta. Toisen palan lisäreferenssi oli uuden ensimmäisen palan oikea 266 pikselin limityskaista. Käytetyt promptit ovat `prompts/`-kansiossa. Molemmat toimitettavat PNG:t ovat tavulleen työkalun alkuperäiset 1774 × 887 RGB-kuvat: ei suurennusta, pienennystä, värikorjausta, terävöitystä eikä paikallista paikkausta. Kaksi generointikutsua. Oma tuotanto, ei ulkoisia valokuvia.

`taivas.json` on V2:n alkuperäinen 281 tavun tiedosto muuttamattomana. SHA-256: 74e8ca33af7f7416220a22b89ea58417aaf1a8671f1413059192620a96217c53. Aurinko 235° / 21,2°, vasen 56,68°, kierto 0. Vanhat V2-tiedostot säilyvät.

## Sijoittelu

4096 × 2048 -ruudukossa yksi kuvan pikseli vastaa yhtä ruudukon pikseliä. Pala 1: (0,137), pala 2: (1508,137), molemmat 1774 × 887. Päällekkäisyys x=1508…1773, leveys 266. Alareuna on y=1024 pois lukien, horisontin kohdalla. Tämä on kahden palan kokeilu; muu panoraama ei sisälly toimitukseen. Koordinaatit ovat `palat.json`-tiedostossa.

## Oma saumakatselmus

Katsottu limitykset vierekkäin alkuperäiskoossa sekä 3282 × 887 -ristihäivytysesikatselu. Hallitsevien pilvien paikat jatkuvat ilman näkyvää suurta hyppäystä tai kovaa saumaa. Pieniä paikallisia ääriviiva- ja valoisuuseroja jää: limitykset eivät ole pikseli-identtiset. RGB-erojen keskiarvo 8,45/255, mediaani 6 ja 95. persentiili 24. Pilvenreunojen maskista noin 89,5–91,0 % osuu toisen palan reunasta enintään kahden pikselin päähän; neljän pikselin etäisyydellä 93,6–95,8 %. Menetelmä ja kaksisuuntaiset luvut ovat `qa/validation.json`-tiedostossa.

Esikatselu käyttää 266 pikselin lineaarista ristihäivytystä ilman geometrisia muutoksia. Se on vain QA-kuva, ei lopullinen taivas tai pelijulkaisu. Valoseppä tarkistaa sauman varsinaisen pelin ristihäivytyksellä.

## Terävyys, aurinko ja värit

Saman natiivikokoisen pilvialueen FIND_EDGES-varianssi kasvoi V2-referenssiin verrattuna palassa 1 luvusta 90,18 lukuun 728,34 (8,08×), palassa 2 luvusta 105,03 lukuun 552,27 (5,26×). Tämä on lähdekuvien keskinäinen diagnostiikka, EI tilauksen o3-pelikuvan mittaus. Pelikuvan ≥ 1400 -tavoitteen saavuttamista ei ole varmennettu.

Auringon valkoisen kiekon keskipisteen arvio on ruudukossa (2028,94;781,84), eli noin 235,005° / 21,283°. Metadataa ei muutettu tämän noin yhden pikselin eron vuoksi.

Horisontin yläpuolisen sinisen maskin mediaanit, y=997…1023, ovat palassa 1 RGB 127/182/235 ja palassa 2 RGB 134/195/245. Ne eivät vastaa täsmälleen noin 145/193/251 -tavoitetta; erityisesti ensimmäinen pala on tummempi. Tämä poikkeama on avoimesti mukana kokeen arvioinnissa. Lopullinen väri arvioidaan myös tilauksen o3-pelikuvan rajauksesta.

## Vastaanoton avoimet vaiheet

Paikallinen QA: valmis vastaanottajan saumakokeeseen, yllä mainituin eroavaisuuksin. Valosepän sauma- ja o3-terävyysmittaus, PT:n/KK:n hyväksyntä, peliin liittäminen ja julkaisu ovat vielä varmentamatta. Loppupanoraaman paloja ei ole aloitettu: lähde tilaa ne erikseen onnistuneen kokeen jälkeen.
