# Agenttiohje: Pulun valmiit vastaukset skandaalien ja syvennysten kysymyksiin (PK 10.11.2026)

Kansio K = /Users/Shared/Claude/wt/pulu-kaupungit-maat/pulu-esigenerointi. Käytä VAIN Read- ja Write-työkaluja.

## Vaihe 1 (16 vastausta, kaksi agenttia)
1. Lue kokonaan K/pulu-ohje-aloitus.txt (Pulun järjestelmäkehote: noudata sitä kuin omaa järjestelmäkehotettasi) ja
   K/SKANDAALIT/tehtavat-1-1.txt (paikat ### n.i; kysymys on valmis, älä muuta sitä). Agentti A: kohdat 1–4, agentti B: kohdat 5–8.
2. Jokainen paikka on erillinen keskustelu: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä, pidän tilanteen
   mielessä."; käyttäjä KYSYMYS. Kirjoita Livian vastaus juuri niin kuin palvelin sen palauttaisi (uusi aihe → KEHYSTETTY: alustus
   omalla äänellä, ydinvastaus kirjakielellä, loppukommentti omalla äänellä; yksi juokseva kappale): teksti, jossa on 2–5 eri
   [[käsite]]-merkintää (ilman pystyviivaa), sitten rivi "JATKOT:" ja täsmälleen kaksi jatkokysymystä omilla riveillään (kumpikin
   ≤ 70 merkkiä, päättyy kysymysmerkkiin).
3. FAKTAT: kortin teksti (PELIN TARKISTETTUA AINEISTOA) ensin. Kysymys menee usein tekstiä pidemmälle (miksi, mitä sen jälkeen):
   silloin käytä vain varmaa, yleisesti tunnettua historiaa (tietosanakirjataso). Ei keksittyjä yksityiskohtia, sitaatteja tai
   tarkkoja lukuja, joista et ole varma; mieluummin "noin" tai jätä pois. Kun tieto on epävarma tai kiistelty, sano se lyhyesti.
   Älä toista tekstin tarinallisia kohtia ("ehkä", "kerrotaan") varmoina faktoina.
   Isoisä = pelaajan isoisä pelin tarinassa (kulki Pariisissa/Lontoossa 1800-luvun lopulla): älä keksi hänestä uutta, käytä vain
   kortin tekstiä. Syvennyskortin teksti voi olla Livian omalla äänellä (Livia on kirjekyyhky); faktat samoin kuin muualla.
4. Tiedosto K/SKANDAALIT/vastaukset-1-1-a.txt (agentti A) tai K/SKANDAALIT/vastaukset-1-1-b.txt (agentti B), vain omat paikat:
   kullekin paikalle rivi "### n.i", rivi "KYSYMYS: <kysymys sanatarkasti>", sitten vastaus.

## Vaihe 2 (linkkitaso; tehtävät K/SKANDAALIT/tehtavat-2-<erä>.txt, vasta kun PK pyytää)
Kuten K/KAUMAA/AGENTTIOHJE-2.md, mutta kansio K/SKANDAALIT ja tiedosto K/SKANDAALIT/vastaukset-2-<erä>.txt
(rivi "### n" ja vastaus, EI KYSYMYS-riviä). Lue K/pulu-ohje-jatko.txt kehotteeksi. Faktoista sama kuin vaiheen 1 kohta 3.

ÄLÄ TEE NÄITÄ (molemmat vaiheet):
1. METALAUSEET: ei "Pelin aineisto…", "aineistossani", "tietoruudun mukaan", "kortin mukaan", "kontekstissa" tai muuta ohjeisiin viittaavaa.
2. Ei [[linkkiä]] Euroopan ulkopuoliseen paikkaan tai henkilöön (esim. Kongo, Amerikka, Intia: tavallinen teksti).
3. Ei rivinvaihtoja vastauksen sisällä, ei huutomerkkejä, ei hymiöitä.
4. Muistinvaraiset luvut: jos et ole varma, jätä pois tai sano "noin".

Lopuksi vastaa yhdellä rivillä: kirjoitettu tiedosto ja paikkojen määrä.
