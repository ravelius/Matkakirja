# Tekoäly ja alaikäiset: tietosuoja-, ohje- ja lausuntotekstit (luonnos 10.10.2026)

Tilaus: Päätoimittaja 10.10.2026 ~08.0x (omistajan linjaus: live-tekoäly kaikille, alle 18-vuotiaille kuratoitu). Tekijä: Sisältökirjuri. **Luonnos, ei juridinen lausunto**: tekstit tarkistuttaa omistaja tai juristi ennen julkaisua. Tekstit on kirjoitettu koodin ja aiempien tarkistusten mukaan (tools/pollo/worker.js, opas-turva.js, rajat.js, docs/raportit/opas-alaikaiset-tarkistus.md); kohdat, joissa tosiasia pitää vahvistaa, on merkitty **[VAHVISTA]**.

## Mihin Anthropicin ohjeet vaativat vastaamaan

Lähteet (luettu 10.10.2026):
- Responsible Use of Anthropic's Models: Guidelines for Organizations Serving Minors (support.claude.com, artikkeli 9307344): (1) lisäturvatoimet käyttötapaan sopien (ikävarmistus, sisällön moderointi ja suodatus, seuranta- ja ilmoituskanava, opastus nuorille); (2) lasten turvallisuutta ja tietosuojaa koskevien säädösten noudattaminen ja se kerrotaan julkisesti; (3) käyttäjälle kerrotaan, että hän keskustelee tekoälyn eikä ihmisen kanssa. Anthropic voi tarkastaa noudattamisen.
- Child safety guidance for developers (artikkeli 15591275, 26.6.2026): käyttöehdot kieltävät alaikäisiä vaarantavan käytön; kehittäjä vastaa omista suojauksistaan (erityisesti kuvien tai käyttäjien välisen viestinnän yhteydessä, joita pelissä ei ole); ilmoitusvelvollisuudet maakohtaisia. Sivu ei ole oikeudellista neuvontaa.

| Vaatimus | Missä vastataan tässä paketissa |
|---|---|
| (1) Turvatoimet, opastus nuorille | Teksti 2 (pelin ohje); tietosuojaselosteen osio "Turvatoimet" |
| (2) Säädösten noudattaminen kerrotaan julkisesti | Teksti 1 (tietosuojaseloste) ja teksti 3 (julkinen lausunto) |
| (3) Tekoäly kerrotaan | Teksti 2 (ohje) ja teksti 3 (lausunto) |

---

## Teksti 1: Tietosuojaselosteen osio "Tekoälyn käyttö (Pulu ja opas)"

> **Tekoälyn käyttö: Pulu ja Elävä opas**
>
> Peli sisältää kaksi tekoälyominaisuutta: Pulun chatin ja oppaan Kysy-toiminnon. Vastaajana on tekoäly, ei ihminen. Tekoäly voi erehtyä, joten tärkeät asiat kannattaa tarkistaa muualta.
>
> **Mitä lähetetään.** Kun kysyt jotain, palvelimellemme lähtee kysymyksesi (enintään 400 merkkiä), muutama edellinen viesti samasta keskustelusta (enintään kuusi viestiä, enintään 400 merkkiä kukin), pelin tämänhetkinen tilanne (esimerkiksi katsomasi paikka tai kaupunki) ja valitsemasi kieli. Nämä välitetään tekoälypalvelun tarjoajalle vastauksen tuottamista varten ja, jos vastaus luetaan ääneen, äänipalvelun tarjoajalle. Nimeä, osoitetta, puhelinnumeroa, sähköpostia, syntymäaikaa tai tarkkaa sijaintia ei pyydetä eikä tarvita. **[VAHVISTA: palveluntarjoajat ja niiden sijainti nimeltä: Anthropic (tekstivastaukset), ElevenLabs (ääni), Cloudflare (palvelin ja välimuisti); onko xAI tai OpenAI enää käytössä Pulun chatissa tai oppaassa.]**
>
> **Mitä tallennetaan.** Keskusteluhistoriaa ei tallenneta palvelimelle: keskustelun aiemmat viestit säilyvät vain laitteellasi. Kysymystekstiä ei kirjata lokiin. Päivittäisten käyttörajojen laskentaa varten palvelin säilyttää lyhyen ajan pelkän tiivisteen laitteen verkko-osoitteesta (ei itse osoitetta) ja laskurin. Jos vastaus luetaan ääneen, vastauksen teksti ja ääni tallennetaan palvelimelle äänen tuottamista varten; tämä teksti säilytetään vain tarvittavan ajan **[VAHVISTA: lopullinen säilytysaika; #4168 lupasi 48 h, nykytila R2 `opas/teksti/` ilman vanhenemista, kunnes elinkaarisääntö on päällä]**. Yleisiin, usein toistuviin kysymyksiin voidaan käyttää valmiiksi tuotettuja vastauksia, jotka eivät sisällä henkilötietoja.
>
> **Ikä.** Peli on tarkoitettu 13 vuotta täyttäneille. Syntymäaikaa tai muuta henkilötietoa ikä-tarkistukseen ei kerätä: peli kysyy vain, oletko aikuinen (kyllä tai ei). Vastaus tallennetaan **[VAHVISTA: vain laitteelle]** ja sitä käytetään vain sen valintaan, mitä tekoälyominaisuuksia näytetään. Kaikille tekoälyn vastaukset on kuratoitu alle 18-vuotiaille sopiviksi.
>
> **Turvatoimet.** Tekoäly pysyy matkailun, historian, kulttuurin ja paikkojen aiheissa. Selvästi sopimattomat pyynnöt ja henkilötietoja sisältävät viestit suodatetaan ennen kuin ne lähtevät tekoälylle, ja ne saavat valmiin, ystävällisen vastauksen. Jos viestistä käy ilmi, että pelaaja voi huonosti tai on vaarassa, pelaajaa kehotetaan puhumaan luotettavan aikuisen kanssa, ja hätätilanteessa soittamaan 112; nuorten keskusteluapua saa esimerkiksi MIELI ry:n Sekasin-chatista. Pelissä ei ole kuvien lähettämistä eikä pelaajien välistä viestintää.
>
> **Oikeutesi ja yhteys.** Tietosuojalainsäädäntö (EU:n yleinen tietosuoja-asetus; digitaalinen suostumusikä Suomessa on 13 vuotta) antaa sinulle oikeuden tietää, mitä sinusta käsitellään, ja pyytää tietojen poistoa. Koska emme tallenna keskusteluja tai henkilötietoja tunnistettavasti, tietoja ei yleensä ole poistettavaksi. Kysymyksiä ja ongelmailmoituksia varten: **[täydennä: tukisähköposti ja rekisterinpitäjän nimi]**. Voit ilmoittaa sopimattomasta vastauksesta pelin "Ilmoita"-toiminnolla **[VAHVISTA: toiminto on kohta 4 alaikäistarkistuksessa; vielä tekemättä]** tai edellä mainitulla sähköpostilla. Alaikäisten huoltajat voivat ottaa yhteyttä samaan osoitteeseen.

---

## Teksti 2: Pelin lyhyt ohje tekoälyn turvallisesta käytöstä (≤ 600 merkkiä, suomi)

> **Tekoäly apuna, ei ihminen**
> Pulu ja opas ovat tekoälyä. Ne voivat erehtyä, joten tarkista tärkeät asiat. Älä kerro niille nimeäsi, osoitettasi, koulutasi, puhelinnumeroasi tai tarkkaa sijaintiasi, äläkä salasanoja. Kysy kaupungeista, historiasta ja nähtävyyksistä. Jos jokin vastaus tuntuu oudolta tai pahalta, kerro siitä aikuiselle tai paina Ilmoita. Jos sinulla on paha olo, puhu luotettavan aikuisen kanssa; hätätilanteessa soita 112, ja nuorten keskusteluapua saat esimerkiksi MIELI ry:n Sekasin-chatista.

Merkkimäärä: 512 merkkiä otsikon kanssa (ks. "Tarkistus").

## Teksti 3: Julkinen lausunto suojauksista (≤ 500 merkkiä kumpikin)

### Suomi
> Pelin tekoäly (Pulu ja Elävä opas) on tarkoitettu 13 vuotta täyttäneille, ja sen vastaukset on kuratoitu alle 18-vuotiaille sopiviksi. Tekoäly kertoo olevansa tekoäly. Sopimattomat pyynnöt ja henkilötiedot suodatetaan, hätätilanteessa ohjataan aikuisen ja avun luo, keskusteluhistoriaa ei tallenneta palvelimelle eikä kysymyksiä kirjata lokiin. Noudatamme lasten turvallisuutta ja tietosuojaa koskevia säädöksiä (GDPR). Palaute: [tukisähköposti].

### English
> The game's AI features (Pulu and the Living Guide) are intended for players aged 13 and over, and their answers are curated to be suitable for under-18s. The AI always identifies itself as an AI. Inappropriate requests and personal data are filtered, players in distress are pointed to a trusted adult and help, no chat history is stored on our servers and questions are not logged. We comply with child safety and data protection law (GDPR). Feedback: [support email].

---

## Tarkistus

Merkkimäärät (laskettu skriptillä, välilyönnit mukana):
- Teksti 2 (pelin ohje): 512 merkkiä otsikon kanssa, 482 ilman (raja 600).
- Teksti 3 suomi: 446 merkkiä; englanti: 469 merkkiä (raja 500 kumpikin).

## Avoimet kohdat omistajalle / Pelikoodarille (VAHVISTA-kohdat)

1. **Palveluntarjoajat nimeltä**: tekstivastaukset Anthropic; ääni ElevenLabs; palvelin Cloudflare (Workers, KV, R2). Onko xAI/OpenAI vielä käytössä Pulun chatissa tai oppaassa? Käytettävät palvelut pitää nimetä selosteessa, koska ne ovat henkilötietojen käsittelijöitä.
2. **Tallennusajat**: kysy-vastausten teksti R2:ssa (`opas/teksti/<sha>.json`): alaikäistarkistus ehdotti 48 h elinkaarta (kohta 3), toteutus tarkistettava; KV-laskurit ja IP-tiiviste: säilytysaika (`opasPaivaAvain` päiväavain) ja tiivisteen suolaus.
3. **Ikätieto "aikuinen kyllä/ei"**: missä se tallennetaan (laite vai palvelin) ja mihin sitä käytetään. Teksti olettaa laitteen: muuta, jos palvelin.
4. **"Ilmoita vastauksesta" -toiminto** (alaikäistarkistus kohta 4) ei ole vielä tehty; teksti 2 ja selosteen virke viittaa siihen. Poista maininta, jos toimintoa ei julkaista ennen tekstien käyttöä.
5. **Kuvat ja pelaajien välinen viestintä**: lauseet "ei kuvien lähettämistä, ei pelaajien välistä viestintää" pitävät tällä hetkellä; päivitä, jos ominaisuuksia lisätään (Anthropicin ohje vaatii silloin tunnistusta ja ilmoituskanavaa).
6. **Rekisterinpitäjä ja tukisähköposti** puuttuvat ([täydennä]).
7. **Juristi**: GDPR (artikla 8, Suomessa 13 v), App Storen ikäraja ja lapsille suunnatut ehdot; sivuston lausunto ja seloste.
8. **Anthropicin lastensuojan järjestelmäkehote**: ohje mainitsee, että Anthropic voi tarjota sellaisen; kysy Consolen kautta (alaikäistarkistus kohta 7).
9. **Ilmoitusvelvollisuudet (CSAM)**: ohjeen mukaan Yhdysvalloissa NCMEC-ilmoitus; muualla paikallinen sääntely (INHOPE-hakemisto). Pelissä ei kuvia eikä käyttäjien viestintää, mutta Suomen ilmoituskanava (esim. Pelastakaa Lapset ry:n Nettivihje) kannattaa nimetä menettelyohjeeseen.
