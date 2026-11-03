# Pariisin koealue – toimitus tarkistettavaksi 3.11.2026

Paketissa on 20 nimettyä PNG-kuvaa, esineet.json ja SHA256SUMS. Tämä on koe-erän toimitus Karttasepän tarkistukseen, ei koko erän hyväksyntä pelikäyttöön.

## Tarkistetut asiat

- Seitsemän pintakuvaa: 1024 × 1024 RGB/sRGB.
- Mustenäyte: 2048 × 512 RGBA/sRGB; neljä riviä, kullakin suora, kaari ja mutka.
- Viisi nähtävyyttä, kolme aukion keskusta ja neljä puuta: RGBA/sRGB, tilauksen mukainen pidempi sivu. Louvre 2048 × 1024.
- Kaikki 12 esinettä mahtuvat kuvaansa. Läpinäkyvyys tarkistettiin erillisellä vaalealla ja tummanvihreällä taustalla. Generaattorin esikatselussa aukioiden ympärillä näkynyt vaalea hohde ei näy varsinaisten PNG-tiedostojen alfa-koosteessa.
- Esineiden pohjoissuunta ja päämuoto perustuvat lähdepaketin pohjakuviin. Notre-Damen tornit ovat länsipäässä, apsis idässä; Louvren Cour Carrée idässä ja siivet lännessä; Sainte-Chapelle on oikeuspalatsin sisällä ja Conciergerien tornit pohjoisreunalla.
- Ankkurit ovat käsin arvioidut maantason keskuspisteet, eivät kuvan keskipisteitä. Louvren ankkuri on pyramidin itä- ja eteläpuolella lähteen ENU-eron mukaisesti. Karttasepän tulee vielä tarkistaa sijoitus pelin OSM-pohjan päällä. Generoitu siluetti ei ole mittatarkaksi todistettu OSM-jäljennös.

## Avoin laatukohta: neljä kattopintaa

`pinta-katto-haussmann.png`, `pinta-katto-vanha.png`, `pinta-katto-julkinen.png` ja `pinta-katto-matala.png` eivät läpäise tiukkaa saumattomuusvaatimusta. Värit toistuvat melko tasaisesti, mutta 50 prosentin offset-tarkistuksessa kattoviivat katkeavat reunoilta. Lisäksi talojen seinäviitteet antavat osaan kuvista hieman viiston vaikutelman, vaikka lähde pyysi suoraan ylhäältä. Nämä neljä ovat tarkistusehdokkaita, eivät hyväksyttyjä lopullisia toistotekstuureja. Älä merkitse niitä pelivalmiiksi tämän toimituksen perusteella. Muissa kolmessa pintakuvassa ei havaittu selvää värisaumaa; vastaanottajan toistotesti säilyy erillisenä.

## Mustenäytteen tekninen pakkaus

Generaattorin alkuperäinen näyte oli 2172 × 724. Neljä viivariviä pakattiin 2048 × 512 -atlakseen poistamalla rivien välisiä läpinäkyviä marginaaleja; viivoja ei piirretty uudelleen. Pystysuuntainen viivan paksuus säilytettiin, vaakasuunta sovitettiin 2048 pikseliin. Suoran osuuden mitatut mediaanit alfa-peittävyytenä ovat noin 0,90 / 2,08 / 3,46 / 8,10 pikseliä. Nämä ovat käsin piirrettyjä, antialiasoituja näytteitä nimellispaksuuksille 1 / 2 / 4 / 8, eivät tasapaksuja vektoriviivoja.

## Generoinnit ja alkuperäiset

Toteutui 21 kutsua, ei 20. Muista kuvista tehtiin yksi otto; paperipohjasta kaksi. Ensimmäinen paperipohja piirsi virheellisesti rakennuksia ja hylättiin. Toinen on toimitettu tyhjä paperi. Ylimääräinen paperikutsu tehtiin keskustelussa annetun omistajan aiemman suoran yleisohjeen perusteella ("saat aina tehdä kuvia, älä kysy minulta enää niistä"), mutta tämän lähteen nimenomainen yhden oton määrä ylittyi paperin kohdalla. Poikkeama säilytetään eikä toista kutsua piiloteta. Muita uusintoja tässä erässä ei tehty.

Alkuperäiset 21 kuvaa, koko prompttihistoria ja QA-koosteet säilyvät tuotantokansiossa. Toimituskokoihin tehtiin tekniset kokomuunnokset; alkuperäinen generointikoko ja muunnos on kirjattu export-verification.json-tiedostoon. Kuviin ei tehty maalattuja paikkauksia tai saumojen laskennallista häivytystä.

Tuotantokansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-koealue-20261103/`.
QA-kuvat ovat sen `qa/`-kansiossa: repeat-/offset-kuvat, object-anchors-contact.png ja plaza-alpha-backgrounds.png. Ne ovat tarkistuskuvia, eivät pelin koottu omistajaesitys.

## Jatkotoimitus

Karttaseppä tarkistaa toiston, ankkurit, OSM-suunnan ja näkymän mittakaavan. Kattopintojen laatukorjaus jää avoimeksi. Pinnat etenevät Valosepälle ja esineet Natiivi-UI:lle vasta kyseisten tarkistusten mukaisessa tilassa. Omistajan hyväksyntä pelissä kootulle kuvalle, runtime-integraatio ja julkaisu ovat avoimia erillisiä vaiheita.
