# Codex → PT/KK: kuittaus2450–2452, Turku pysäköity ja GC-jono tarkistettu

Päätös `2de6ec41bbf89c767f8e76132122b908ef56df09` / blob `457078be464d873d3f4b2c008c7bf40ba62c549c` luettu kokonaan ja blob varmistettu.

## 2450–2451 Turku

Kirjattu: leikkausidea hyväksytty, mallikuva2449 hylätty Tripo-lähteenä. Ei uusintaottoa, ei Tripoa. Turku pysyy pysäköitynä. Jatkossa lähde on valittu Turku A2336, kerros4 säilytetään ja M303 tehdään pieneksi itäulokkeeksi RHS203/205 mukaan.

**Resepti2434 on jo toimitettu ja yhä postilaatikossa:** [Temple-resepti](https://github.com/ravelius/Matkakirja/blob/631548f210bb8d45397c9f09e47f27b7423c40ec/posti/codex-pt-temple-2434-2435-resepti-ja-ehdokas-20261116.md). Tarkistin sisällön uudelleen ja etäblobi vastasi SHA256-tiivistettä. Se kertoo toteutuneen2251-kokeen: Blender-ohjain → ImageGen → yksi Tripo-kuvasyöte. Se ei ole valmis Turku A:n nykyistä ulkokuorta säilyttävä käsityöresepti. Myöhempi Temple2403:n kaikkien sisäkerrosten puhdistus/UV/pinnat on erillinen keskeneräinen työ.

**Täsmennys PT:n kautta KK:lle:** tarkoittaako ”kun resepti on valmis” Temple2403:n valmista puhdistus-/pintareseptiä vai Turku A:n avauksille erikseen sovellettavaa geometriareseptiä? En tulkitse jo toimitettua2434-dokumenttia pysäköinnin poistumiseksi tai uudeksi kuva-/Tripo-luvaksi.

## 2452 Grand Châtelet A/B/C ennen18.11.

**Tarkastuksessa ei löytynyt avointa GC-tuotantoa, puuttuvaa vientiä eikä puuttuvaa A/B/C-arkistoa.** Kaikki kolme Max/8K-alkuperäistä ovat T7:llä; laskin niiden SHA256-tiivisteet uudelleen ja kaikki täsmäsivät arkistokuitteihin. Kolmen sallitun Tripo-oton raja on jo käytetty.

| Osa | Tripo-job | Tavua | SHA256 |
|---|---|---:|---|
| A | `2967ace5-d69a-4245-ada2-91a5e29c5578` | 86784224 | `760685293ac2be15e347a08ddcdbb80b09a53c7696b9a020c2bb5f4064a5f7fe` |
| B | `2e4bcc62-e21b-44c5-a17b-fd07b4f3e590` | 81277584 | `903fb5e2acd66baff9bbd28218898ddefc8f80d77dc8249db2ddd4d499a550ba` |
| C | `cd74025c-1ebf-4338-b3cd-727eaede60fb` | 84110468 | `abb34f040a6fcf68f30075d2f0be4b7a0d249d332f819203ddab12c61f5a83f7` |

Alkuperäisten sijainti: `output/grand-chatelet-2237-20261115/tripo-2253/{A,B,C}-max-original-8k.glb` projektijuuren alla. Niitä ei siirretty, muutettu tai tuotettu uudelleen.

**Lopullinen2269-toimitus on edelleen kokonaan postilaatikossa:** [toimitus](https://github.com/ravelius/Matkakirja/blob/6158644c14824f0d0a35ae22754af111650e3512/posti/tripo3d-kk-grand-chatelet-2269-tulos-20261115.md). Paketin11 tiedoston nykyiset blobit täsmäävät toimituskuittiin, mukaan lukien GLB sekä kuvat01pohjoinen,02etelä ja06yläviisto. Paikallisen GLB:n SHA256 tarkistettiin uudelleen: `71a90db9811cd23ebe46df759264ac69272c468963252be57549393c71f7d033`, 9 864 536 tavua ja aiemmin mitatut77 762 kolmiota.

[KK:n15.11.klo21.14 päätös](https://github.com/ravelius/Matkakirja/blob/731d51566ef88c9c2673f59ba44eea829349ee3a/posti/paatoimittaja-codex-kk-hyvaksyi-2269-2271-20261115.md) hyväksyi2269:n lataustien kokeeseen: alkuperäinen2253-aumakatto jää, kaksi tummaa noin2,5m porttisyvennystä, ei uusia kattokokeita. Eteläpinnan korjausta ei saa tehdä ennen erillistä pelin kameralla tehtyä arviota. En tee uusia ottoja tai kattokokeita nyt.

**Jäljellä on vastaanottajan lataustie/pelikatselmus, jonka valmistumista en tässä varmistanut.** Jos ”GC A/B/C ennen18.11.” tarkoittaa muuta uutta nimettyä toimitusta, tarvitsen PT:ltä sen tarkan kohteen; nykyinen yleisohje ei yksilöi puuttuvaa tuotetta. Tämä ei ole pyyntö uudesta Tripo-luvasta.

## Seuraava oma tuotantotyö ja resurssit

Temple2403 on edelleen oma avoin toteutustyö. Raskas työ odottaa erillistä PT/JU-ikkunaa ja samanaikaisten Unity/simu/käännöstöiden päättymistä. Viime tarkistuksessa Unity oli edelleen käynnissä, vaikka load5 oli noin7,84. Pyydän PT:tä koordinoimaan pidemmän työikkunan; en käynnistä raskasta paikallista työtä Unityn rinnalle.

Tarkastus alkoi `2026-11-16T14:48:23.692381+00:00`, aineistot ja resurssit varmistettu `2026-11-16T14:49:09.333740+00:00`. Arvio oli5–10min. Tämän tarkastuksen uudet kuvat0, Tripo0, renderit0, lähdelataukset0, kustannukset0. Lähteet säilyvät, peliä tai pelihaaroja ei muutettu.

[Koneellinen toimitus- ja arkistotarkastus](codex-turku-gc-2450-2452-20261116/DELIVERY-AND-ARCHIVE-AUDIT.json).
