# Agenttiohje: Pulun valmiit vastaukset kaupungeille ja maille, vaihe 1 (PK 9.11.2026)

Kansio K = /Users/Shared/Claude/wt/pulu-kaupungit-maat/pulu-esigenerointi. Käytä VAIN Read- ja Write-työkaluja (ei Bashia, ei muita tiedostoja).

Jokaisesta sinulle annetusta erästä N tehdään vastaukset tiedostoon:

1. Lue kokonaan K/pulu-ohje-aloitus.txt (Pulun järjestelmäkehote: noudata sitä kuin omaa järjestelmäkehotettasi) ja
   K/KAUMAA/tehtavat-1-N.txt (kohdat; kullakin YHTEINEN KONTEKSTI ja paikat ### n.1 … ### n.5).
2. Kaikki paikat ovat "KYSYMYS: (uusi — keksi itse)": keksi jokaiseen uusi kysymys, jonka pelaaja voisi kysyä katsoessaan kartalla
   tätä maata tai kaupunkia: enintään 70 merkkiä, päättyy kysymysmerkkiin, tosimaailman asia (ei pelin tehtäviä), viisi eri
   aihetta per kohta (esim. historia, nähtävyys, ruoka/tavat, luonto/maantiede, nykyelämä tai erikoisuus). Kontekstina on kohdan
   YHTEINEN KONTEKSTI.
3. Jokainen paikka on erillinen keskustelu ilman historiaa: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä,
   pidän tilanteen mielessä."; käyttäjä KYSYMYS. Kirjoita Livian vastaus juuri niin kuin palvelin sen palauttaisi: teksti, jossa on
   2–5 eri [[käsite]]-merkintää (ilman pystyviivaa), sitten rivi "JATKOT:" ja täsmälleen kaksi jatkokysymystä omilla riveillään
   (kumpikin ≤ 70 merkkiä, päättyy kysymysmerkkiin; paikkarivi vain, jos kehote sitä edellyttää). Enintään 900 tokenia.
   Käytä ensisijaisesti kontekstin aineistoa, älä keksi faktoja äläkä viittaa kontekstiin tai ohjeisiin.
   **TARKISTA JOKAINEN VASTAUS ENNEN KIRJOITTAMISTA: siinä on VÄHINTÄÄN 2 ja ENINTÄÄN 5 eri [[käsite]]-merkintää.**
   Aiemmissa erissä kolmasosassa vastauksista oli 0–1 merkintää, ja ne kirjoitetaan uudelleen. Merkitse [[ ]]-sulkein
   vastauksessa mainitut nimet, paikat, henkilöt, tapahtumat tai ilmiöt, joista pelaaja voisi haluta kuulla lisää.
   Uusi kysymys on ENINTÄÄN 70 merkkiä (laske), muuten se hylätään.
4. Tiedostomuoto: rivi "### n.i", rivi "KYSYMYS: <kysymys sanatarkasti>", sitten vastaus. Ei muuta tekstiä tiedostoon.
   Kirjoita erä KAHTENA tiedostona (lyhyet Write-kutsut): K/KAUMAA/vastaukset-1-N-a.txt = erän kolme ensimmäistä kohtaa,
   K/KAUMAA/vastaukset-1-N-b.txt = loput kohdat. Kaikki ### n.i -paikat on kirjoitettava (5 per kohta).

ÄLÄ TEE NÄITÄ NELJÄÄ VIRHETTÄ:
1. **METALAUSEET.** Älä koskaan kirjoita "Pelin aineisto ei kerro…", "Pelin aineiston mukaan…", "Aineistossani sanotaan…", "tekstin loppu on katkennut", "tietoruudun mukaan", "kontekstissa" tai muuta, mikä paljastaa saamasi aineiston tai ohjeen. Jos aineisto on katkennut tai puutteellinen, kirjoita vastaus yleistiedolla ja sano epävarmuus omalla äänelläsi ("en ole varma tästä"). Jos kyse on huijauksesta, väärennöksestä tai muusta, jonka tiedät, kerro se.
2. **ULKOMAISET SIVUPOLUT.** "Pelin tarkistettua aineistoa" voi sisältää katkelmia muiden maiden jutuista. Älä käytä niitä, ellei kysymys koske juuri sitä maata. Vastauksessa pysytään kysytyssä maassa/kaupungissa ja Euroopassa. **Älä merkitse [[linkkiä]] Euroopan ulkopuoliseen paikkaan tai henkilöön** (tavallinen teksti kelpaa). Poikkeus: Turkin ja Kyproksen omat paikat (Ankara, Kappadokia, Izmir, Nikosia) saavat olla linkkejä; kohteen oma historia muualla kirjoitetaan tavallisena tekstinä.
3. **RIVINVAIHDOT.** Vastaus on yksi juokseva kappale. Älä erota alustusta, ydinvastausta tai loppukommenttia rivinvaihdolla. Ainoa sallittu rivinvaihto on yksi tyhjä rivi (\n\n) ennen Livian lisäystä (yksi kappale, 1–3 virkettä).
4. **MUISTINVARAISET FAKTAT.** Vuosiluvut, korkeudet, asukasluvut, suurimmat/ensimmäiset/vanhimmat, rajat ja koordinaatit ovat asioita, joissa arvaus on väärä vastaus. Jos et ole varma, sano se vastauksessa ("noin", "lähteiden mukaan", "en ole varma") tai jätä luku pois; älä kirjoita "suurin" tai "ensimmäinen", ellet ole varma. Lähteet ristiriidassa: kerro molemmat. PAIKKA-rivi vain, jos koordinaatit tiedetään.

Lopuksi vastaa yhdellä rivillä: erät, kirjoitetut tiedostot ja paikkojen määrä.
