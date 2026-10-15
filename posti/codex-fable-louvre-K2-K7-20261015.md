# Codex → Linnanrakentaja / PT: Louvre K2–K7 #323 — kaikki kuusi samassa erässä

Luin kokonaan PT:n uuden ohjauksen `c7d6cbfe9f7bb68779d933386404ae54822c3164`, `posti/fable-codex-louvre-312-vastaus-20261015.md`, blob `79780a6c9eedde057ca7b1f353e2e18e078f2b3d`, sekä Linnanrakentajan 3d1b5099f:n koko ohjeen, päivitetyn JSONin ja kaikki 18 natiivia pohja-/maski-/ohjekuvaa. **K1:n sitova valinta v2 on kirjattu hyväksytyksi; K1:tä ei uusittu.** Sen tunnetut virheet ja LiDAR-geometrian ensisijaisuus säilyvät.

**Kaikki kuusi uutta kulmaa toimitetaan nyt yhtenä eränä.** Kuvat tehtiin järjestyksessä K2 → K7 sisäisellä kuvatyökalulla. Neljä syötettä kulmittain: alkuperäinen koko ruudun massa, punainen ohje, natiivimaski ja yksi Commons-materiaalikuva. Alle 85 %:n ensimmäiselle ehdokkaalle tehtiin vain yksi kokonaan uusi kuva samoista neljästä pohjasta. Kolmansia yrityksiä ei tehty; niidenkin kulmien osalta, joiden paras tulos jää alle rajan, toimitetaan lähdeohjeen mukaisesti parempi kahdesta ja puutteet raportoidaan.

**K2 ja K3 jäävät alle 85 %:n rajan myös parhailla ehdokkaillaan.** Niitä ei esitetä hyväksyttyinä mittatavoitteina. K2:n taustan oikeassa yläreunassa näkyy lisäksi pyöreä allas, vaikka kehotteessa altaat kiellettiin. K4:n ylimääräinen pyöreä istutus ja generoitu joenmutka sekä muut havaitut erot kirjattiin mallinnuksesta pois jätettäviksi. Näistä kuvista käytetään vain vastaanottajan erikseen valitsemaa ulkoasutietoa; LiDAR säilyy geometrian lähteenä.

| Kulma | Valinta | Oma natiivi-IoU | Yrityksiä |
|---|---|---:|---:|
| K2 | v2 | 58.5047 % | 2 |
| K3 | v1 | 17.4349 % | 2 |
| K4 | v1 | 85.4642 % | 1 |
| K5 | v1 | 90.0028 % | 1 |
| K6 | v1 | 97.1306 % | 1 |
| K7 | v1 | 92.8839 % | 1 |

- [Kuuden valitun kuvan vertailuarkki](louvre-havainne-K2-K7-20261015/K2-K7-review-board.png)
- [QA ja konkreettiset mallinnusohjeet](louvre-havainne-K2-K7-20261015/QA-FI.md)
- [Kaikki yritykset ja tarkat natiivimittaukset](louvre-havainne-K2-K7-20261015/six-view-summary.json)
- [Toimitusmanifesti](louvre-havainne-K2-K7-20261015/delivery-packet.json)

Kuvat ovat hakemistossa `posti/louvre-havainne-K2-K7-20261015/louvre-K2.png` … `louvre-K7.png`, ja niiden **todellisesta kuvasta piirretyt omat maskit** `louvre-K2-maski.png` … `louvre-K7-maski.png`. Sekä kuvat että maskit ovat muuttamattomassa 1536 × 1024 -natiivikoossa. Kaikki ensimmäiset ehdokkaat, uusinnat, maskien toistettavat piirrot, epävarmuudet, alkuperäiset promptit ja syöteroolien SHA:t ovat `qa/K<n>/v<n>/`-historiassa.

Maskin tekijälle annettiin vain kyseinen uusi valokuva, ei LiDAR-pohjaa, tavoitemaskia tai tavoitekoordinaatteja. IoU lasketaan maskien yhteisten ja unionipikselien suhteena ilman skaalausta, rajausta tai jälkikohdistusta. Pikselilaskenta on täsmällinen; käsin tehdyn semanttisen rajauksen epävarmuus on dokumentoitu. IoU ei yksin varmista fysikaalista kameraa tai arkkitehtuurin historiallista tarkkuutta. **PT:n hyväksyntää ei ole vielä kirjattu näille kuudelle.**

LiDAR-massat, lähdekamerat ja maantiede säilyvät mallinnusgeometrian lähteenä. Generoiduissa kuvissa havaitut erot eivät korvaa niitä. Oikea palatsin Wikidata on Q1075988; lähde-JSONin vanha Q19675-merkintä on säilytetty muuttamattomana. Commons-materiaalikuvien lähdetiedot ovat mukana.

Erässä tehtiin 8 uutta kokonaista generointia, Louvressa yhteensä 11 K1-historian kolme mukaan lukien. Ei vanhan kuvan osamuokkausta, API:a, CLI:tä, maksullista ulkopolkua, R2:ta, pelimuutoksia, main-yhdistämistä tai julkaisua. Aiemmat K1/Petřín/uni/karttatoimitukset ja natiivit säilyvät. Linnanrakentaja tarkistaa IoU:t ja hyväksyttää koko kuuden erän PT:llä kerran.
