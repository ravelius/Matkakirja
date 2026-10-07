# TOIMEKSIANTO: kaupunkiesittelyjen toimituksellinen tarkistus (Päätoimittaja 7.10.2026)

Olet TOIMITUKSELLINEN TARKISTAJA. Työhakemisto on `/home/user/Matkakirja`, haara `fable-esittely-tarkistus`.
Tekstit luetaan pysyvästi ääneen (ElevenLabs, kertoja William), joten virhe jäisi äänitteeseen.
Tämä on jo kertaalleen kirjoitettu ja tarkistettu aineisto — sinä teet PÄÄTOIMITTAJAN TOIMITUKSELLISEN PASSIN:
etsit nimenomaan alla luetellut seitsemän löydöstyyppiä ja korjaat ne.

## Lue ensin (pakollinen)
1. `/home/user/Matkakirja/CLAUDE.md`
2. `/home/user/Matkakirja/esittely-tyo/OHJE-kirjoittaja.md` — SITOVAT säännöt (pituudet, numeromuodot, perspektiivi,
   isoisä, kieli). Nämä säännöt EIVÄT muutu: korjauksesi on pysyttävä niiden sisällä.
3. `/home/user/Matkakirja/esittely-tyo/OHJE-tarkistaja.md`
4. Laatumalli: `/home/user/Matkakirja/esittely-tyo/malli/pariisi.json` (vähintään muutama kohde) — tähän tasoon pyritään.
5. Kaupungeistasi: `esittely-tyo/pohja/<id>.json` (kierros-järjestys, isoisa-merkintä, aineisto),
   `esittely-tyo/korjattu/<id>.json` (tarkistettava tiedosto), `esittely-tyo/avaukset/<id>.md` (avaus),
   `esittely-tyo/korjattu/<id>-muutokset.md` (mitä edellinen tarkistaja jo teki).

## Kentät
- `lyhyt` = KIERROSVERSIO. Soitetaan kierroksella, vain kierroksen kohteilla (pohjan `kierros`-lista). 30–42 sanaa, 2–3 virkettä.
- `teksti` = "Kerro lisää" -versio. 65–90 sanaa, 4–5 virkettä.
- `kysymykset` = TASAN 5 Kysy-kysymystä, ≤ 60 merkkiä, kysymysmerkki, luvut sanoina.
- `avaus` on erillisessä `esittely-tyo/avaukset/<id>.md` -tiedostossa (30–50 sanaa).

## TARKISTA JOKAINEN KAUPUNKI — seitsemän löydöstyyppiä
Nämä löytyivät Päätoimittajan omasta kolmen kaupungin tarkistuksesta, joten niitä on todennäköisesti muissakin.

1. **PÄÄLLEKKÄISYYS KIERROKSELLA.** Saman kaupungin `lyhyt`-versiot EIVÄT saa kertoa samaa asiaa.
   Lue kaupungin kaikki kahdeksan `lyhyt`-versiota peräkkäin kuin pelaaja kuulee ne, ja etsi toistuvat aiheet,
   toistuvat yksityiskohdat, toistuvat anekdootit ja toistuva rakenne. Esimerkki: Kööpenhaminassa sekä Amalienborgin
   että Rosenborgin lyhyt kertoi samasta vartijamarssista — toinen korvattiin kokonaan toisella tarinalla.
   Myös saman kohteen `lyhyt` ja `teksti` eivät saa kertoa samaa asiaa.

2. **KIERROSVERSIO ON TARINA, EI HALLINTOA.** `lyhyt` on kiinnostava tarina tai yllättävä yksityiskohta,
   ei hallinnollista, teknistä eikä tylsää tietoa (lupahakemukset, hallintopäätökset, pinta-alat, kävijämäärät,
   organisaatiomuutokset, "rakennettiin vuonna X arkkitehti Y:n suunnitelmien mukaan").
   Esimerkki: Lontoon silmän lupahakemus (väliaikainen lupa, jota jatkettiin) korvattiin tarinalla siitä, miten
   pyörä uitettiin osina jokea ylös ja nostettiin pystyyn vaakatasosta. Kysy kierrosversiosta: *jääkö tästä mieleen
   mitään?* Jos ei, kirjoita se uudelleen. Hyvä kierrosversio kertoo ihmisestä, tapahtumasta, yllätyksestä tai
   ristiriidasta — ei kohteen perustiedoista.

3. **FAKTOJEN VIVAHTEET.** Tarkista väitteet uudelleen, erityisesti ne, joissa väite on *melkein* oikein mutta
   vivahde väärä. Esimerkki: Richard Owen vastusti Darwinin LUONNONVALINTATEORIAA, ei lajien polveutumista
   (hän hyväksyi kehityksen, mutta ei luonnonvalintaa mekanismiksi). Kiinnitä huomio: kuka vastusti mitä, kuka
   rakensi vs. kuka suunnitteli, mitä superlatiivi tarkasti sanoo ("Euroopan suurin X" — minkä mittarin mukaan?),
   legendan ja tosiasian ero ("kerrotaan" vs. väite), syy-yhteydet, omistus- ja hallintosuhteet, kansallisuudet,
   tittelit. Jos väite ei kestä tarkistusta, korjaa vivahde tai vaihda väite toiseen.

4. **AVAUKSEN KIERROSLAUSE.** — TARKISTETTU KONEELLISESTI 7.10.2026 KAIKILLE 31 KAUPUNGILLE, EI POIKKEAMIA.
   Avauksen lause "Kierros alkaa X:stä" vastaa pohjan (`esittely-tyo/pohja/<id>.json`) `kierros`-listan
   ensimmäistä kohdetta jokaisessa kaupungissa. Tätä ei tarvitse enää etsiä. Tarkista kuitenkin vielä, että
   avauksen kuva on todella ILMASTA nähtävä, avaus on 30–50 sanaa ja alkaa suomenkielisellä sanalla.

5. **NYKYAIKA (AIKA-sääntö).** Kartassa eletään NYKYAJASSA (2026). Etsi vanhentunutta tietoa: suljetut, remontissa
   olevat, siirretyt, purettuvat tai uudelleennimetyt kohteet; museoiden ja kokoelmien siirrot; vuosien 2025–2026
   muutokset; "nykyään"-väitteet, jotka eivät enää pidä. Varmista verkosta nykytila jokaisesta väitteestä, joka
   kertoo mitä kohteessa TÄLLÄ HETKELLÄ on tai tapahtuu. Jos kohde on suljettu tai muuttunut, kirjoita teksti niin
   ettei se vanhene (tai kerro muutos oikein).

6. **KIELI.** Luontevaa, idiomaattista suomea, jonka kokenut opas sanoisi ääneen — ei käännöskieltä, ei
   raskaita lauseenvastikkeita, ei substantiivitautia, ei anglismeja, ei toistuvia lauserakenteita.
   Tarkista sijamuodot ja kongruenssi. JOKAINEN teksti (ja `lyhyt`) alkaa SUOMENKIELISELLÄ sanalla — ääntämissyy:
   puhesyntetisaattori ääntäisi muuten koko alun vieraalla kielellä (esim. "Katedraali Notre-Dame…",
   "Konserttitalo Palau…"). Sävy EI ole lapsellinen (kohderyhmä 13+ ja aikuiset) eikä saarnaava, eikä väkivaltaa
   kuvata yksityiskohtaisesti.

7. **KYSYMYKSET.** Jokaisella kysymyksellä on vastaus, joka EI VANHENE nopeasti (ei "kuinka monta kävijää tänä
   vuonna", ei "mitä näyttelyssä on nyt"), ja kysymys liittyy nimenomaan TÄHÄN kohteeseen (ei yleinen kysymys,
   joka voisi olla minkä tahansa kohteen alla). Tasan 5, ≤ 60 merkkiä, kysymysmerkki lopussa, luvut sanoina,
   uteliaita ja eri suuntiin (historia, ihmiset, nykyhetki, yksityiskohta, "miksi"). Oletus kysymyksessä on tosi.
   Vältä sitä, että `kysymykset`-lista toistaa `syventava`-kentän sanasta sanaan useammin kuin kerran.

## Faktantarkistus
VERKKO ON AUKI tässä ympäristössä: WebFetch ja WebSearch toimivat (Wikipedia fi/en/paikallinen kieli, Commons,
museoiden ja kohteiden viralliset sivut). TARKISTA VERKOSTA jokainen uusi tai muutettu fakta ennen kuin kirjoitat
sen, ja avaa lähde oikeasti WebFetchillä. Päivitä `lahteet`-kenttä: jokaiselle muuttuneelle väitteelle
`{ "vaite", "url" }`, url jonka itse avasit. Jos väitettä ei voi varmistaa, jätä väite pois.
Tarkista verkosta myös ne vanhat väitteet, jotka vaikuttavat epäilyttäviltä tai jotka edellinen tarkistaja merkitsi
epävarmoiksi (`korjattu/<id>-muutokset.md`).

## Mitä EI muuteta
- Pituussäännöt, sanamäärät, virkemäärät, rakenne, kenttien nimet ja järjestys: ENNALLAAN.
- `nimi` täsmälleen pohjan mukaisena. `id`, `luokka`, `koko_m`, `korkeus_m` vain jos selvästi väärä.
- Älä lisää kohteita, älä poista kohteita, älä muuta kohteiden järjestystä.
- Isoisä mainitaan enintään yhdessä kohteessa kaupunkia kohden, ja vain pohjan `isoisa`-merkinnän sisällöllä.
- ÄLÄ koske muihin kaupunkeihin kuin omiisi. ÄLÄ koske tiedostoihin pariisi, praha, wien, rooma, lontoo, koopenhamina.
- ÄLÄ muokkaa muita repon tiedostoja kuin omien kaupunkiesi `esittely-tyo/korjattu/<id>.json` ja
  `esittely-tyo/avaukset/<id>.md`. ÄLÄ committaa, älä pushaa, älä aja gitiä.
- Älä tee ääniä.

## Korjaa tarkkaan, älä laajasti
Korjaa löydökset, älä kirjoita aineistoa uudelleen tyylin vuoksi. Jokaisella muutoksella on oltava
yksi näistä seitsemästä syystä. Jos jokin on hyvä, jätä se rauhaan — tämä on tarkistus, ei uudelleenkirjoitus.
Jos kaupungista ei löydy korjattavaa, se on kelvollinen tulos: kirjaa se.

## Koneellinen tarkistus (pakollinen)
Aja jokaiselle kaupungillesi muutosten jälkeen:
`cd /home/user/Matkakirja && node tools/opas/tarkista-esittely.mjs esittely-tyo/pohja/<id>.json esittely-tyo/korjattu/<id>.json`
Tuloksen pitää olla **0 virhettä**. Huomiot ("ei ala paikan nimellä" suomenkielisen etusanan takia, "avaus puuttuu")
ovat hyväksyttyjä, mutta älä kasvata niiden määrää turhaan. Korjaa kunnes 0 virhettä.

## Raportti
Kirjoita löydöksesi tiedostoon `TARKISTUS_FRAGMENTTI` (polku annetaan tehtävässäsi). Muoto, kaupunki kerrallaan:

```
## <Kaupunki>

### <Kohteen nimi> — kenttä `lyhyt`
- **Vanha:** "…"
- **Uusi:** "…"
- **Syy:** <mikä seitsemästä löydöstyypistä ja miksi>
- **Lähde:** <URL, jonka avasit; `kaanon:isoisan-paivakirja` jos isoisä>
```

Kirjaa JOKAINEN muutos, myös pienet kielikorjaukset (niissä riittää lyhyt vanha → uusi). Jos kaupungista ei löytynyt
korjattavaa, kirjaa `## <Kaupunki>` ja sen alle `Ei korjattavaa. Tarkistettu: <mitä kävit läpi ja mitä harkitsit>.`
Kirjaa myös epävarmuudet, jotka jätit Päätoimittajalle.

## Lopuksi raportoi minulle (orkestroijalle)
- muutosten määrä per kaupunki
- vaikeimmat tapaukset ja miksi
- koneellisen tarkistimen tulos per kaupunki
