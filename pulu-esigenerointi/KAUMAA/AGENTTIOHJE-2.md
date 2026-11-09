# Agenttiohje: Pulun valmiit vastaukset kaupungeille ja maille, vaihe 2 = linkkitaso "Kerro lisää: X" (PK 9.11.2026)

Kansio K = /Users/Shared/Claude/wt/pulu-kaupungit-maat/pulu-esigenerointi. Käytä VAIN Read- ja Write-työkaluja.

Jokaisesta sinulle annetusta erästä N:
1. Lue kokonaan K/pulu-ohje-jatko.txt (Pulun järjestelmäkehote kehyksellä jatko: noudata sitä kuin omaa järjestelmäkehotettasi) ja
   K/KAUMAA/tehtavat-2-N.txt (paikat "### n", kullakin KONTEKSTI, AIEMPI KYSYMYS, AIEMPI VASTAUS ja KYSYMYS "Kerro lisää: X").
2. Jokainen paikka on erillinen keskustelu: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä, pidän tilanteen
   mielessä."; käyttäjä AIEMPI KYSYMYS; Livia AIEMPI VASTAUS; käyttäjä KYSYMYS. Kirjoita Livian vastaus juuri niin kuin palvelin sen
   palauttaisi (jatko-kehys: ei alustusta eikä loppukommenttia, ellei kehote toisin sano): teksti, jossa on 2–5 eri [[käsite]]-merkintää
   (ilman pystyviivaa), sitten rivi "JATKOT:" ja täsmälleen kaksi jatkokysymystä omilla riveillään (kumpikin ≤ 70 merkkiä, päättyy
   kysymysmerkkiin). Enintään 900 tokenia. X on käsite aiemmasta vastauksesta (usein taivutettuna, esim. "Pireuksen" = Pireus): kerro
   siitä itsestään. Käytä ensisijaisesti kontekstin aineistoa, älä keksi faktoja äläkä viittaa kontekstiin tai ohjeisiin.
   **TARKISTA JOKAINEN VASTAUS: VÄHINTÄÄN 2 ja ENINTÄÄN 5 eri [[käsite]]-merkintää; jatkokysymys ≤ 70 merkkiä (laske).**
3. Tiedostomuoto: rivi "### n" ja vastaus (EI KYSYMYS-riviä). Ei muuta tekstiä tiedostoon.
   Kirjoita erä NELJÄNÄ tiedostona (lyhyet Write-kutsut, kukin noin 20 paikkaa järjestyksessä):
   K/KAUMAA/vastaukset-2-N-a.txt, -b.txt, -c.txt, -d.txt. Kaikki erän ### n -paikat on kirjoitettava.

ÄLÄ TEE NÄITÄ NELJÄÄ VIRHETTÄ:
1. **METALAUSEET.** Älä koskaan kirjoita "Pelin aineisto ei kerro…", "Pelin aineiston mukaan…", "Aineistossani sanotaan…", "tekstin loppu on katkennut", "tietoruudun mukaan", "kontekstissa" tai muuta, mikä paljastaa saamasi aineiston tai ohjeen. Jos aineisto on puutteellinen, kirjoita yleistiedolla ja sano epävarmuus omalla äänelläsi ("en ole varma tästä").
2. **ULKOMAISET SIVUPOLUT.** "Pelin tarkistettua aineistoa" voi sisältää katkelmia muiden maiden jutuista. Älä käytä niitä, ellei kysymys koske juuri sitä maata. **Älä merkitse [[linkkiä]] Euroopan ulkopuoliseen paikkaan tai henkilöön** (tavallinen teksti kelpaa). Turkin ja Kyproksen omat paikat saavat olla linkkejä.
3. **RIVINVAIHDOT.** Vastaus on yksi juokseva kappale ilman rivinvaihtoja. Ei huutomerkkejä eikä hymiöitä.
4. **MUISTINVARAISET FAKTAT.** Vuosiluvut, korkeudet, asukasluvut, suurimmat/ensimmäiset/vanhimmat ja rajat: jos et ole varma, sano se ("noin", "lähteiden mukaan", "en ole varma") tai jätä luku pois. PAIKKA-rivi vain, jos koordinaatit tiedetään.

Lopuksi vastaa yhdellä rivillä: erät, kirjoitetut tiedostot ja paikkojen määrä.
