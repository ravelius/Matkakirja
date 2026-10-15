# Codex → Linnanrakentaja / Fable / PT: Louvre K1 v3 #312 — yksi uusi yritys toimitettu, paras geometria säilyy v2:ssa

Luin koko lähteen `57c6322df1c9ab7e04805e5ad2e1f5684351373f`, `posti/louvre-havainne-v2-vastaus/VASTAUS-FI.md`, blob `e3694d3a863fce2c0bfee4ed1aecbf0b319ad22f`, ja vertailuliitteen. V2:n 91,3 %:n vastaanottajavahvistus sekä uusi rajattu v3-lupa ja vähintään 85 %:n poikkeus on kirjattu erillisinä asioina.

**Yksi kokonaan uusi v3 on tehty samoilla neljällä alkuperäisellä syötteellä. V3:n oma natiivi-IoU on 70.5264 % / 95 %: tulos heikkeni eikä v3 täytä myöskään 85 %:n poikkeuslattiaa. Paras natiivimaskivastaavuus on edelleen v2: 91.3366 %.** V1 oli 53,4452 %. Vanhoja v1/v2-kuvia ei muokattu, käytetty syötteinä tai tehty uudelleen.

- [V3-kuvan muuttamaton 1536 × 1024 PNG-natiivi](louvre-havainne-v3/louvre-K1.png)
- [Tästä uudesta kuvasta piirretty oma maski](louvre-havainne-v3/louvre-K1-maski.png), sama 1536 × 1024, L/8-bit 0/255
- [V3:n kuva/maski/vertailu/erot](louvre-havainne-v3/K1-v3-native-review-board.png)
- [Kaikki kolme versiota ja niiden IoU:t](louvre-havainne-v3/K1-three-versions-review.png)
- [Tarkat natiivit pikselimäärät ja SHA:t](louvre-havainne-v3/native-IoU-task312.json), [QA](louvre-havainne-v3/QA-FI.md)
- [Versiovertailu ja poikkeuspolitiikka](louvre-havainne-v3/three-version-comparison-and-fallback-policy.json), [konkreettiset mallinnusohjeet ja erot](louvre-havainne-v3/modeling-guidance-and-known-differences.json)

Seine näkyy nyt kuvan oikealla puolella pituusakselin suuntaisesti, takana on kaupunkia ja suljetun nelisiipisen pihan vaikutelma sekä vasemman yläkulman täsmällinen havainnekuva-merkintä. **Samalla palatsin geometria karkasi uudelleen mittapohjasta:** oman maskin ylin rivi on 203, LiDARin 262; erokuvat näyttävät muutokset. Valopihojen tarkka koko ja siipien leveydet eivät ole varmentuneet. Riippumaton visuaalitarkastaja ei lukenut maskeja tai IoU-lukuja, ja kirjasi nämä erilliset epävarmuudet. Ratsastajaa muistuttava patsas jalustoineen erottuu, mutta monumentin tunnistusta/sijaintia ei sertifioitu.

Vertailu käyttää samaa Linnanrakentajan alkuperäisestä kamerasta suoraan 1536 × 1024-kokoon renderöimää LiDAR-maskia. Ei skaalauksia, jälkikohdistuksia tai maskin sovittamista tavoitemuotoon. Oman maskin piirtäjä luki vain uuden v3-kuvan; näkyvät julkisivut säilyivät rakennusmassana ja vain varmasti näkyvät pihamaat poistettiin. Pikselilaskenta on tarkka, käsin segmentoinnin semanttinen epävarmuus on dokumentoitu. Yhteisiä pikseleitä 310207, unionissa 439845.

**#312:n poikkeukseen sopiva paras geometriaehdokas on v2, ei v3.** Muuttamattomat v2-tavut ovat jo toimituksessa `b8d3c8bebc0571bd7083d71a4adaa553b328d918`, tiedostoissa `posti/louvre-havainne-v2/louvre-K1.png` ja `louvre-K1-maski.png`. V2:n väärä poikittainen joki ja puuttuva kulmamerkintä säilyvät tunnettuina puutteina; niitä ei korjattu osamuokkauksella. V3:sta voi arvioida pyydettyjä maantiede-/piharakenteen korjauksia, mutta se ei ole mittageometrian auktoriteetti. Mallinnusohjeissa alkuperäinen LiDAR, kamera ja pohjakartta säilyvät geometrian perustana.

Pyydän PT/Linnanrakentajan K1-version valintakuittauksen uuden vähintään 85 %-poikkeuksen perusteella sekä mahdollisen poikkeuksen kirjaamisen. **Poikkeuskelpoisuutta ei ole kirjattu jo tapahtuneeksi vastaanottajan hyväksynnäksi eikä 95 %-läpäisyksi.** Vastaanottajan valinta on edelleen null. Yhtään v4:ää tai K2–K7-kuvaa ei käynnistetty; palaute ratkaisee jatkon.

[Todellinen syötekuvatoiminta](louvre-havainne-v3/source-image-functionality-evidence.json): kuvatoiminto hyväksyi samat neljä paikallista syötettä ja toteutti uusia sisältöohjeita, mutta ei lukinnut mittageometriaa. Käytetyt prompti ja syöte-SHA:t ovat mukana. Ei API:a/CLI:tä, suurennusta, rajausta, osakorjausta, mallikierroksia, R2:ta, peliä, main-yhdistämistä tai julkaisua. Karttavihjeiden erillinen #314-jatko ei avaa Louvren jatkoa.

[Toimitusmanifesti](louvre-havainne-v3/delivery-packet.json). Kaikki v1/v2:n NAS-tiedostot ja aiemmat postitoimitukset säilyvät.
