# Elävä kartta — "Isoisän muste" (suunnitelma 26.9.2026, Fable)

*Omistajan tilaus 25.9.2026 klo 23.5x: kartan elävöitys erikokoisten nostojen ja muiden elementtien avulla, jotain animoitua, houkutus tutkia karttaa kohdemaa kerrallaan, maakunnat mukaan, uusi moottori hyödyksi, saapumisanimaatio ja "jotain paljon hienompaa ja koukuttavampaa". Omistaja valitsi 26.9. klo 00.0x: kohdat 1–5 prototypoidaan VIDEOKSI ennen koodia. Vain natiivi; web ennallaan.*

**Kantava ajatus:** kohdemaa on aluksi isoisän haalistunut, kirjoittamaton kartanlehti, joka herää eloon sitä mukaa kuin pelaaja tutkii sitä. Kartta itse on palkinto. Kaikki liike on tapahtumaohjattua (LÄMPÖ JA VIRRANKULUTUS: lepopiirto säilyy).

## 1. Saapuminen kohdemaahan (n. 5 s, ohitettava, kerran per maa)
1. Kermahuntu "kuivuu" pois saapumiskaupungista ulospäin kuin muste paperilla (radiaalinen paljastus, 2–3 s).
2. Joet piirtyvät viivoina (stroke reveal), maakuntien rajat vedetään kynällä yksi kerrallaan kynän rahinalla, maakuntien nimet nousevat esiin.
3. Maakunnat syttyvät 5 sävyn täytöllä saapumiskaupungista ulospäin etäisyysjärjestyksessä (sama säteittäinen liike kuin hunnun kuivuminen), 1,5 s. Tarkennus 26.9.: kaanonissa ei ole kiinteää 1873-reittiä (pelaaja kulkee kaupungit missä järjestyksessä tahansa), joten reittijärjestystä ei keksitä.
4. Nostot putoavat kartalle musteläikkinä suurimmasta pienimpään, pieni naksahdus.
5. Matala aamuaurinko pyyhkäisee reliefin yli (pitkät varjot kulkevat maan poikki), kamera tekee hitaan kallistetun kierron (KAMERA-AJOT).

## 2. Nostojen kolme kokoa ja "unohdettu" tila
- Kokoluokat datassa: PÄÄKOHDE (iso merkki + kevyt hehku), KOHDE (tavallinen), PIENI MERKINTÄ. Skandaaleissa vain tyyli muuttuu, koko pysyy luokan mukaan (löydös 135).
- Löytämättömät nostot näkyvät himmeinä musteen jälkinä (ei nimeä); löydetty saa täyden merkin ja nimen.
- Luokitus: Sisältökirjuri (data, aloitus GRC), skeema Siirtoseppä, piirto Natiiviseppä.

## 3. Maakunnat heräävät
- Maakunta on tasaista paperia, kunnes sen ensimmäinen nosto löytyy: väri valuu esiin, nimi kirjoittuu käsialalla, maakunnan pikkukuva (115) leimautuu kartussiin.
- Nimen viereen pienet mustemerkit löydöistä (3/7). Kaikki löydetty → piilotettu "maakunnan salaisuus" -nosto (iso, harvinainen) ilmestyy.
- Maa valmis → lippu liehuu (144), maan väri jää pysyvästi kirkkaaksi, kartussiin tutkimuspalkki (maakunnat x/y, nostot x/y).

## 4. Maailma, jonka olet kirjoittanut
- Kuljettu punainen reitti on isoisän kynänjälki; jokaiseen käytyyn kaupunkiin kiinnittyy pieni luonnos (miniatyyri).
- Vieraillut kaupungit syttyvät yövaloina (Black Marble -kerros maskattuna käytyihin kaupunkeihin, säde kasvaa löydösten mukaan). Kaukaa pallolta oma matka näkyy hehkuvana ja kasvaa joka pelikerralla.

## 5. Elävät hetket (lämpöystävällisesti)
- Kartta ei liiku jatkuvasti: muutaman minuutin välein 3 sekunnin hetki, sitten lepo. Purjelaiva/höyrylaiva lipuu 1873-reittiä kohdemaan lähimerellä; lintuparvi (boidit) ylittää maakunnan; junan savu nousee 1873-radalta; sadekuuro kulkee maakunnan yli isoisän säätietojen mukaan.
- Hetket eivät osu kortin, luennan tai linssin päälle; ääni hiljainen (tuuli, laivan kello kaukana).

## 6. Moottori
Vektoriviivojen piirtoanimaatio (Maaraja-tekniikka + stroke reveal), reliefi ja liikkuva valo (Aurinko), valokeila ja kerroksellinen sumu (II:n rajapinnat), boidit, Black Marble -maski (Karttasepän yövalosarja), kamera-ajojen käyräkirjasto, hiukkaset musteelle. Kaikki tapahtumaohjattuna; levossa 0 piirtoa.

## Työnjako ja järjestys
1. VIDEO (15–20 s, Kreikka: saapuminen Ateenaan → maakunnat heräävät → nostot → yksi elävä hetki → kaukaa pallo hehkuvine kaupunkeineen): Linssiseppä vetää (koreografia, esitysmoottori), Natiiviseppä pallon puoli (paljastus, stroke reveal, valo, maski, boidit), Natiivi-UI kartussi ja maakuntamerkit, Pelikoodari nostojen kokoluokat ja himmeät jäljet, Karttaseppä data (1873 laivareitit ja rautatiet, yövalosarja), Sisältökirjuri nostojen luokitus (GRC ensin), Siirtoseppä skeema (kokoluokka, salaisuus, reitit). Omistaja arvioi videon → pelattava versio build 18:aan → kohdat 4–5 sen jälkeen.
2. Mittarit: kehysaika levossa ennallaan (lepopiirto), hetken kesto ≤ 3 s, saapuminen ≤ 5 s ja ohitettava.
