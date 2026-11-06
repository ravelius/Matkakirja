# Julkaisija: luovutus 6.11.2026 klo 17.30

Rooli: Julkaisija (JU). Korvaa -1611:n ALOITA-osan ja TILAN. Voimassa: -1611:n VIRHEET JA OPIT (haara julkaisija-luovutus-1611), -1519:n opit, -1335:n ja -1244:n opit, -1136:n PT:N SITOVAT ja opit, -1008:n opit ja b8-VAIHTO, -0855:n, -0651:n, -0041:n ja -2347:n opit, -2152:n ja -1906:n TAPA, -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 30 %, pehmeä raja, luonteva tauko (leivonta juuri alkoi).

## ALOITA TÄSTÄ
1. Tarkista `ps` (leivo_valo, lav-leivonta), lukot, jonolokin loppu, T/lav-leivonta-levyt3.log.
2. AJOSSA: LAV:n ketju T/lav-leivonta-levyt3.zsh (loki T/lav-leivonta-levyt3.log, alkoi 17.29, 20 palaa; edellinen kesti 1 h 40 min; lippu T/.lav-leivonta-lupa on jo luotu). Ketju ajaa perään aja-levyt3c.zsh 1 35140432d (L1, 5 kuvaa, kansio P/_tyo/linnanrakentaja/muuri/aukot/kuvat-levyt3c). Ei vientiä. Viritä monitori heti: tämän session monitori ei selviä nollauksesta. Se, selviääkö ketju nollauksesta, on TARKISTAMATTA: se käynnistyi tämän session taustakomentona.
   - Jos ketju kuoli: ÄLÄ aloita alusta. Tarkista kansiosta P/_tyo/linnanrakentaja/muuri/aukot/levyt3-leivottu ja lokista, mitkä palat valmistuivat, ja aja loput: `zsh P/_tyo/linnanrakentaja/muuri/aukot/leivo_levyt3.zsh <palat>`, sitten aja-levyt3c.zsh. Rivi PT:lle.
   - Kuittaus LAV:lle (local_beb68834-6c4f-4839-ac75-7876b45052c3): LEIVONTA VALMIS, AJETTU-rivi, polku, 404-määrä.
3. iPad 5 d907286cb, EI ALOITETTU, skripti kirjoittamatta: vasta leivonnan jälkeen, KERRAN. PT:n sana 17.1x (KK 17.08: omistajan 17.05 ei koske tätä): 0 palaa, vahti päällä, ohje P/_tyo/natiiviseppa/palikkakoe/valmis-origo/ajopyynto-ipad-5.md (LUE KOKO), lokit lokit/natiiviseppa-origo-ipad5-d907286cb, tulos NS:lle. Vahdin keskeytys = "ei tulosta", ei uusintaa. NS sanoi 17.0x antavansa uuden luvan PT:n sanan jälkeen: varmista ennen ajoa, onko se tullut, ja kysy NS:ltä, jos ei (local_c7344e20-fba8-433d-ba8e-184a325037ef). NS: tyhjä indeksi ja `palikat esineet 0` heti `talot 0`:n jälkeen; iPadilla on nyt 3c:n 16 palan indeksi, joten tyhjä on palautettava. Laitekäännös d907286cb:stä puuttuu todennäköisesti: tarkista lokit/julkaisija-laite-218-d907286cb. Pohja T/ns-tarina-ipad4b-ajo.zsh + T/ns-tarina-ipad4b.zsh (k() odottaa kuittausta ja toimi 4b:ssä 15/15). Jäähdytys: vähintään 10 min, jos iPad on ollut käytössä. KS:n ajoja ei iPad 5:n mittauksen päälle (PT); jos osuvat yhtä aikaa, iPad 5 ensin. Muita palikka-ajoja iPadilla ei ajeta (PT).
4. KS 26 tulee erikseen, kun Y on valmis; ei tehdä nyt. KS pyytää silloin kopiota: laatat/elava/e2*/... JA laatat-kylma-* (kansion nimi saa lisäpäätteitä). Ks. T/ks-yhteinen25.zsh pohjaksi; palat poistuvat ajon lopussa (esikatselu.sh:68), joten kopioi ajon aikana.
5. valoseppa-vahti saa pyöriä taukolipulla.

## TILA
- Junarunko julkaisija/runko-219-muisti = 603d4213a natiivi-backupissa (d092f48cc + renkaat ae161fdb6, omistajan päätös 17.16, PT:n kuittaus + PK:n unity-tarkistus a458e4e5c ja 603d4213a, PT:n käsky PK:n kautta). EI KÄÄNNETTY: tulee seuraavassa junakäännöksessä, ei omaa ajoa. iPadilla d092f48c 16.36 alkaen, sovellus suljettu. Skripteissä RUNKO-muuttuja osoittaa d092f48cc:n käännökseen, kunnes uusi on olemassa.
- unity-tarkistus.sh: aja sh:lla tai bashilla, ei zsh:lla (rc 10 ja 11 = väärä kuori, ei koodivirhe). Omissa ketjuissa bash, zsh-kutsuja ei löytynyt. Kysyin PK:lta, kelpaako bash; vastausta ei tullut ennen luovutusta.
- L1 ja L2 vapaat 17.30; leivonta nice 10 kuormittaa, LAV aja-levyt3c käyttää lopuksi L1:tä.
- iPadin indeksi: Documents/talopalat/indeksi.txt on nyt 16 palan indeksi (r4-1200).
- UTIL: T/ks-yhteinen-ajo.zsh <nro> <sha> <kuvamäärä> (kerroin 0.465); T/nui-13dab.zsh koko UI-sarjan pohja riveittäin; T/nui-13dab-toisto.zsh toiston pohja, säilyttää .log ja .unity.log; T/ns-origo-mac13.zsh NS:n Mac-ajon pohja.

## TULOKSET (kaikki viety tekijöille)
- NS iPad 4b 2bfb126b0: komennot 15/15, jäljet 4/4, vedot 2/2, sarjat 179/120/153 kuvaa noudettu, VIKA 0, thermal 0. Korjattu k() toimi.
- NS iPad 3c 190448df6: VIKA 4086/4080 Mt 16.36 noin 14 s rata r4:n jälkeen, ennen 1. ajoa; ajot 0/4; ei uusintaa. Documents/muistivahti-vika/ jäi laitteelle noutamatta (NS pyytää tarvittaessa).
- NS Mac-12 0f152ced2: 498 s, kuvat 4/4, jäljet 4/4, sarjat 0/3 (eräajossa ei ruutua). Mac-13 d907286cb: 375 s, kuvat 3/3, jäljet 3/3, NS: kelpaa.
- NUI 13dab1aac 15 varausta L1 45 min: 14 LÄPI, iphone pallo VIKA 3 (tappi, nopeusvipu, metrolinja). Toisto 6 varausta 21 min: iphone pallo x3 VIKA 3 joka kerta, iphone-pysty keskitys x3 LÄPI.
- KS 23 21/21 681 s, 24 12/12 458 s, 25 5/5 231 s; 25:n palat 0/5 (KS: todennäköisesti polku).
- PK sk-w: 8dfc13aaf, 225e80473, d15242d6c, 36aa43ed3 (PK ajoi, 2 + 2 kuvaa).

## VIRHEET JA OPIT
- LAV:n ketju odotti aluksi vain 3c:tä, ja uudet mittaukset tulivat jonoon sen jälkeen. Pysäytin odotussilmukan ja vaihdoin lippuun T/.lav-leivonta-lupa; lippu antaa järjestyksen itselle. Pitkän ajon odotus kannattaa tehdä lipulla alusta asti.
- Kuvamäärä tarkistetaan skenaariosta ennen ajoa: KS 24:n tilauksessa 15, tiedostossa 12. Ajoa ei kaadettu, KS korjasi tilauksen.
- Sana iPad-ajolle muuttui kolmesti 40 minuutissa (NS lupa, peruutus, PT:n sana). Ajon lupa tarkistetaan viimeisimmästä viestistä juuri ennen käynnistystä; skriptiä ei kirjoitettu etukäteen, mikä säästi työtä.
- Koko ketjun rc yhteenvetoon: kaatuneiden varausten lukumäärä oli NUI:lle hyödyllisempi kuin yksi rc.
