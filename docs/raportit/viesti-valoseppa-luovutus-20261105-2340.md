# Valosepän luovutus 5.11.2026 klo 23.40

Korvaa luovutuksen -2215. Syy nollaukseen: konteksti pehmeällä rajalla 25 %.

## TILA
Koodi 9cb6435e4, haara `linssiseppa2/ohjelmakohteet`, viety natiivi-backupiin (etä `natiivi-backup`, ei origin), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan.
Testit läpi: Mitat, Reunakivi, Ajoradan, Holvit, KeskustanSillat (`sh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/aja-geometria.sh`, muut `<dotnet> rak/G.dll <suodatin>`; aja `sh`:lla). OBJ-vienti: `OHJELMAKOHTEET_VIENTI=<D>/obj`. Offline-kuva: `python3 <D>/esikatsele.py <D>/obj <tulos> <nimi> 45 30 1000` (ilman -I, tarvitsee numpyn).
Kerrottu 23.3x: KK ja PT. JU:lta pyydetty vuoro 23.3x: 9cb6435e4, skenaario `sk-sillat.txt`.

## SEURAAVAKSI (järjestyksessä)
1. Odota JU:n riviä "ESIKATSELU NYT" ja linjaa. Aja taustalla: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh 9cb6435e4 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-sillat.txt`. Heti lopuksi JU:lle LUKKO VAPAA, linja, kesto, kuvamäärä. Jos Unity ei käännä, se on uusi tiedosto OhjelmaKohdeSillat.cs tai `KaikkiKohteet` OhjelmaKohteet.cs:ssä: niitä ei ole vielä käännetty Unityssä, vain csc:llä geometrian osalta (OhjelmaKohteet.cs ei ole testikäännöksessä).
2. Katso kuvat s-lansi, s-arts, s-pohj, s-et, s-lp, s-ita. Tarkista erityisesti: osuvatko kaaret ja pilarit veteen ja päät rantaan (aukot lasketaan profiilin pisimmältä väliltä, ei vesirajasta), kumoavatko karttaan piirretyt sillat tai Notre-Damen pohjakuva jotain, näkyykö sauma, sopiiko väri. Kuvat kelvatessa KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe), rivi PT:lle.
3. Vaalea kiila: rajaa `liike-pa3`-kansiosta sillan pää kuten aiemmin (`arkki-rajaa.py liike`, noin (720, 550) 90×90 ×6, ruudut kierrossa noin 200–220). Ruutunumerot vaihtelevat ajoittain, katso yleisarkista. Kerro KK:lle ja PT:lle, näkyykö kiila vai ei, ja näkyykö musta pikseli. Korjaus cac1b61ae on EI NÄHTY: laatta 1 m alemmas, ajoradan väri.
4. Pitkä ruutu: `grep "pitkä ruutu" unity.log` latauksen kohdalta. Ennen 4 verkkoa: Ohjelmakohteet 22 ms ja 27 Mt. Nyt 22 verkkoa, jokaiselle oma aine ja varjo. Jos lataus on yli noin 60 ms, tee LuoOsat yksi kohde per ruutu. Sama rivi "ohjelmakohteet: luotu" toistuu ajossa 2–3 kertaa, koska kaukana vapautetaan; en selvittänyt enempää.
5. Sillan yksityiskohdat vasta kuvien jälkeen: Tournellen pylväspatsas puuttuu (noin 15 m, fr.wikipedia), Pont Notre-Damen keskikaari on metallia, Sullyn pohjoisvarren sivukaaret ovat oikeasti kiveä mutta nyt metallia. Älä hio ennen rakennuksia, jos sillat kelpaavat.
6. Sitten rakennukset: Madeleine, Palais Bourbon, Pompidou, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. OMISTAJAN KORTTI 22.09, suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md, osa A. Ennen kutakin oikean rakennuksen vapaat kuvat (muisti: oikea rakennus ensin). Kuvat erissä KK:lle. Ei junaan, yksi kysymys per ajo, nähtävyyssarja ei saa hidastua. Osat B–D eivät ole Valosepän (Natiiviseppä teki Marais'n talokokeen 1a03b85fc).

## AINEISTO OSALLE A
Kansio /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/a/:
- `osm-a.json`: OSM, keskusta 2,4 km:n neliö, 28 420 tietä, 4 496 relaatiota (`hae-a.mjs`; lisää yksittäinen tie `lisaTiet`-joukkoon).
- `analysoi-a.py <osm-a.json>`: mitat nimen mukaan. Rakennukset jo löytyneet: Madeleine way/54180046 (128×43, h 36), Pompidou way/55503397 (167×66, h 42), Tour Saint-Jacques way/20326709 (13×12, h 52; fr.wp 54 m balustradiin), Saint-Eustache way/53762963 (109×49; height-tieto 10 on virheellinen, holvi 33,46 m), Saint-Sulpice way/16077204 (122×57; porttikäytävä 32 m leveä), Palais Bourbon relation/1019368 (jäsenet haettava: lisää ne `lisaTiet`-joukkoon ja aja hae-a uudelleen). OSM:n Madeleinen height 36, fr.wp 30 m ja 108×43: tarkista kuvasta.
- `lahteet-a.json`: fr.wikipedian mittarivit ja Commonsin 8 kuvan listat per kohde lisensseineen (`nayta.py`). Kuvia EI ole ladattu: `kuvat.py`:n tapa, 10 s väli, 429:llä odotus, lisenssit vain lupalistalta. `a/viite/` odottaa.
- `sillat-data.py` → `sillat-taulu.txt` → `tee-sillat-cs.py` kirjoittaa OhjelmaKohdeSillat.cs:n KOKONAAN uudelleen. Muokkaa koodia kyseisessä skriptissä, tai jos muokkaat .cs:ää suoraan, älä aja sitä enää.
- `peitto.py`: laskee 45°:n peiton. Tulos kerrottu KK:lle: pahin Pont au Double 29 % suunnista (Notre-Dame), Arcole 24 %, Carrousel 23 %, Arts 20 %; rakennuksista vain Tour Saint-Jacques 8 %. Laskennallinen, ei nähty kuvissa.

## RAKENTAJA
OhjelmaKohdeSillat.cs (partial OhjelmaKohdeGeometria, lisätty aja-geometria.sh:hon ja Kartta-testit/kaanna.sh:hon), `OhjelmaKohteet.KaikkiKohteet` lisää taulukon kohteet. Kansi, sivut ja holvit jakavat asemat, joten aluslaattaa ei tarvita. Kaide on umpinainen, koska ohuet tolpat nakuttivat. Kolmioita 18 sillassa yhteensä noin 21 000. Rakennuksille samaan tapaan: funktio ja `Lat/Lon/Akseli`; `Paakansi`/`Kaide` eivät ole sillan rakentajassa käytössä. Akseli: x = itä·cos a + pohjoinen·sin a, z = −itä·sin a + pohjoinen·cos a, metriä kerrotaan 111319,49:lla.

## MUUTA
- Kartan koko kirkkaus hyppää kahdessa ruudussa kierron alussa (160 → 177 → 202), sama kahdessa ajossa. Syy ei selvitetty. Kerrottu KS:lle mahdollisena vihjeenä "yötumma"-vikaan, ei vastausta odoteta.
- `kierra 20 2` ei liikuta kameraa, `kierra 40 1` liikuttaa. Ei selvitetty.
- Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
- Työlistahookin rivit (Juoksupeli, Louvre) eivät ole Valosepän.
