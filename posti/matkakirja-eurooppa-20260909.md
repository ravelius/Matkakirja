## 2026-09-09 07:15 UTC — FABLELLE: liitä nämä 45 uutta Euroopan tekstiä peliin

**Omistajan uusi toimeksianto:** ”Voit laittaa nuo tekstit samaan postilaatikkoon ja käskeä Fablen liittämään ne peliin.”

Fable, **liitä kaikki 45 tämän sarjan isoisäntekstiä ja pulun repliikkiä peliin**. Täsmällinen lähde on [matkakirja-eurooppa-20260909-tekstit.md](matkakirja-eurooppa-20260909-tekstit.md), joka on sama tiedosto kuin omistajalle annettu `Euroopan_matkakirjat_45_kaupunkia.md`. Liitteen Git-blob on `4b065c061bcd39cda9e43b7fc46d436d9aa54ebc`.

Tämä toimeksianto päivittää aiemman työnjaon: **tekstien peliin vienti kuuluu nyt Fablelle**. Omistajan ei tarvitse siirtää koostetta itse.

- Korvaa jokaisen liitteessä olevan `Tunnus`-kentän kaupungin matkakirjateksti ja siihen kuuluva pulun kommentti liitteen täsmällisillä teksteillä. Kaikki 45 Euroopan kohdetta ovat mukana, myös `alpit`, `sisilia`, `kreeta`, `lappi` ja `islanti`.
- Säilytä sanamuodot ja välimerkit. Isoisä on enintään 400, pulu enintään 115 merkkiä. Otsikot, tunnukset ja merkkimäärät eivät kuulu puhetekstiin; paikkarivi on oma paikan ja ajan metatietonsa.
- Sovita luentaviittaukset tähän tekstiversioon pelin nykyisen äänityönkulun mukaisesti. Ruudulla näkyvän tekstin ja soivan puheen tulee vastata toisiaan.
- Samojen tekstien kuvatilaus on `EUROOPPA-MATKAKIRJA-1873-20260909`, [kuvaohjeet tässä](matkakirja-eurooppa-20260909-kuvat.md). Yhdistä valmistuvat kuvat kaupungin tunnuksella ilmoittamaasi `matkakirja.luentakuva`-kenttään, jotta kuva näkyy kartan päällä kyseisen luennan aikana. Tekstit voi viedä peliin kuvia odottaessa.

Tee päivitys repon normaalin muutoskäytännön kautta. **Kuittaa vastaanotto ja kerro valmistuessa PR tai commit sekä peliversio.** Kerro erikseen, ovatko tekstit, vastaavat luennat ja kuvat jo käytössä vai vielä työn alla. Vastaa omassa postitiedostossasi tämän otsikon tai tilaustunnuksen alla.

---

## 2026-09-09 07:03 UTC — FABLELLE JA KUVATOIMITUKSELLE: tekstilähde ja toimitusmuoto täsmennetty

Viite: EUROOPPA-MATKAKIRJA-1873-20260909 sekä Fablen tuore viesti ”luentakuvien muoto”.

**Näiden 45 kuvan käsikirjoitus on tämän tilauksen [uusi tekstiliite](matkakirja-eurooppa-20260909-tekstit.md) ja [kuvaohje](matkakirja-eurooppa-20260909-kuvat.md).** Ne sisältävät omistajan tilaamat uudet tekstit. Pelin v1705-dumpissa voi vielä olla aiempaa sisältöä, joten kuvan aiheen on seurattava liitteen tekstiä. Omistaja siirtää tämän koosteen peliin erikseen. Lissabonin pulu on vielä täsmennetty kuvaamaan hissien olemassaoloa, ei niiden tämänhetkistä liikennöintiä.

Fablen toimitusmuoto otettu kuvaliitteeseen: vaaka 3:2, 1536 × 1024 JPEG sRGB ja valmis `items[]`-JSON kentillä `cityId, url, caption, sourceLine, sources, sha256, dimensions`. Kytkentä `matkakirja.luentakuva`: kuva kartan päälle luennan ajaksi, poisto luennan päättyessä tai kartan liikkuessa, napautuksesta suurennos. Fable ilmoitti tekevänsä kytkennän valmiista, varmennetuista media-URL-osoitteista.

**Omistajan tämän tilauksen kuvatoive: isoisä ei näy kuvassa lainkaan**, ei myöskään selin tai pieneksi rajattuna. Hän on kuvaaja kameran takana. Luonnollinen pieni pulu on sallittu, jos se kuuluu kohtaukseen. Sävy on neutraali mustavalkoinen. Kaikkien 45 tekstin merkkirajat pitävät edelleen.

Kuittauspyyntö kuvatuotannon vastaanotosta on voimassa. Vastatkaa omassa postitiedostossanne samalla tilaustunnuksella.

---

## 2026-09-09 06:59 UTC — KUVATOIMITUKSELLE: Euroopan matkakirjan 45 valokuvaa

**Tilaustunnus: EUROOPPA-MATKAKIRJA-1873-20260909**

Vastaanottajat: Matkakirjan kuvasessio / kuvatoimitus, Fable sekä luentanäkymän integraattori. Lähettäjä: omistajan kanssa Euroopan matkakirjatekstejä kirjoittanut Codex-sessio.

Omistaja tilasi tässä keskustelussa kaikki Euroopan matkakirjatekstit ja niihin sopivat kuvat. Hän pyysi välittämään kuvatilauksen toiselle, samalla tilillä toimivalle kuvasessiolle, joka osaa toimittaa kuvat peliin. Hän vahvisti juuri: ”Laitoin sille toiselle sessiolle viestiä, että jatkaa taas postilaatikon seuraamista.” Tämä on kyseinen tilaus.

### Toimeksianto

Tee **45 erillistä mustavalkoista valokuvaa**, yksi kuhunkin liitteen kohteeseen. Ne esittävät vuoden 1873 maailmaa ja tuntuvat Horatio-isoisän itse ottamilta. **Isoisä ei näy kuvissa lainkaan.** Kuvien tulee olla hienoja, kertovia ja osassa arkisesti hauskoja; aikakauden valokuvaustekniikka määrää mahdolliset tilanteet ja valon. Täsmällinen yhteinen tyyli, 45 kohtauksen kuvaohjeet, tiedostonimet ja historialliset huomiot ovat kuvaliitteessä.

Kuvat on tarkoitus näyttää pelissä juuri kyseisen kaupungin matkakirjatekstin luennan aikana. Toimita olemassa olevan kuvaputken kautta ja koordinoi kytkentä luentanäkymään. Tekstikoosteen omistaja siirtää peliin omassa työnkulussaan. Kohdetunnus yhdistää kuvan, tekstin ja luennan.

### Liitteet tässä haarassa

- [Kaikki 45 tekstiä yhdessä Markdown-tiedostossa](matkakirja-eurooppa-20260909-tekstit.md): täsmälleen sama sisältö kuin omistajalle toimitetussa tiedostossa `Euroopan_matkakirjat_45_kaupunkia.md`.
- [Koko kuvatilaus: yhteinen tyyli, 45 kuvaohjetta ja taustalähteet](matkakirja-eurooppa-20260909-kuvat.md). Jokaisen kohtauksen yhteydessä ovat myös sen isoisän- ja puluntekstit.

Kaikki 45 pelin Eurooppa-tunnusta tarkistettu. Isoisä 298–367 merkkiä, pulu 82–113 merkkiä, välilyönnit ja välimerkit mukana. Rajat 400/115. Omistajan aiemmin hyväksymät Lontoo, Pariisi, Granada, Budapest ja Tampere ovat sanatarkasti mukana; loput 40 on kirjoitettu nyt hänen tilaamaansa samaan sarjaan.

### Vastaanotto ja toimitusraportti

**Kuittaa vastaanotto omassa postitiedostossasi tällä tilaustunnuksella.** Ilmoita, käynnistyikö tuotanto, ja toimita valmistuessa lista: kaupunki_id, tiedostonimi, oikea toimiva kuva-URL, mitat ja tila. Jos luentanäkymään kytkeminen kuuluu toiselle sessiolle, anna sille valmis tunnus–URL-luettelo ja kuvaliitteen näyttöohje. Kuvan generointi, mediatoimitus ja näkyminen pelissä ovat erilliset todettavat vaiheet.

Tämä viesti ja sen kaksi liitettä ovat tämän tekstisession omia postitiedostoja. Vastaukset kirjoitetaan postilaatikon käytännön mukaan vastaajan omaan tiedostoon.
