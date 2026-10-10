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
> **Mitä lähetetään.** Kun kysyt jotain, palvelimellemme lähtee kysymyksesi (enintään 400 merkkiä), muutama edellinen viesti samasta keskustelusta (enintään kuusi viestiä, enintään 400 merkkiä kukin), pelin tämänhetkinen tilanne (esimerkiksi katsomasi paikka tai kaupunki) ja valitsemasi kieli. Kysymyksesi ja keskustelun viestit välitetään tekoälypalvelun tarjoajalle (Anthropic) vastauksen tuottamista varten. Jos vastaus luetaan ääneen, äänipalvelulle lähetetään vain vastauksen teksti, ei kysymystäsi: äänen tuottavat ElevenLabs ja xAI, ja varapolkuna OpenAI. Palvelimena, välimuistina ja tallennuksena on Cloudflare. Paikkatietojen hakuun käytetään lisäksi avoimia palveluja: Wikimedia (Wikipedia, Wikidata, Commons) ja OpenStreetMap (Nominatim) saavat paikan nimen (esimerkiksi nähtävyyden, jonka pyydät näkemään), ja Norjan ilmatieteen laitos (MET Norway) pelin kartan koordinaatit säätietoa varten. Nimeä, osoitetta, puhelinnumeroa, sähköpostia, syntymäaikaa tai tarkkaa sijaintia ei pyydetä eikä tarvita. **[Todennettu koodista 10.10.2026; palveluntarjoajien sijainnit (EU/USA) ja käsittelysopimukset: juristi.]**
>
> **Mitä tallennetaan.** Keskusteluhistoriaa ei tallenneta palvelimelle: keskustelun aiemmat viestit säilyvät vain laitteellasi. Kysymystekstiä ei kirjata lokiin. Päivittäisten käyttörajojen laskentaa varten palvelin säilyttää enintään noin 30 tuntia pelkän tiivisteen laitteen verkko-osoitteesta (ei itse osoitetta) ja laskurin. Jos vastaus luetaan ääneen, vastauksen teksti (ei kysymystäsi) ja ääni tallennetaan palvelimelle äänen tuottamista varten; tekstiä säilytetään 48 tuntia **[VAHVISTA: R2:n elinkaarisääntö `opas-teksti-48h` on dokumentoitu (tools/pollo/OHJE.md), mutta koodi ei aseta sitä; Julkaisija tarkistaa komennolla `npx wrangler r2 bucket lifecycle list matkakirja-puhe`]**, ja valmiit ääni- ja vastaustiedostot voivat säilyä pidempään. Oppaan kierroksen tila (reitti ja käydyt paikat, satunnainen istuntotunniste) säilyy enintään kuusi tuntia. Yleisiin, usein toistuviin kysymyksiin käytetään valmiiksi tuotettuja vastauksia (30 vuorokautta), jotka eivät sisällä henkilötietoja. Palvelimen tekniset lokit (Cloudflare Workers Logs, muutaman päivän) sisältävät vain tapahtumatyypit ja virhekoodit, eivät kysymystekstiä.
>
> **Ikä.** Peli on tarkoitettu 13 vuotta täyttäneille. Syntymäaikaa tai muuta henkilötietoa ikä-tarkistukseen ei kerätä: peli kysyy vain, oletko aikuinen (kyllä tai ei). Vastaus tallennetaan vain laitteelle ja lähetetään palvelimelle jokaisen tekoälykysymyksen mukana (otsake), jotta palvelin tietää, mitä tilaa käyttää; palvelin ei tallenna sitä. **[Suunnitelma (Pelikoodari: otsake x-matkakirja-aikuinen, puuttuva otsake = kuratoitu tila); ei vielä toteutettu koodissa 10.10.2026: tarkista selosteen sana kun toteutus on valmis.]** Kaikille tekoälyn vastaukset on kuratoitu alle 18-vuotiaille sopiviksi.
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

## Todennetut kohdat (Sisältökirjuri 10.10.2026, tools/pollo/worker.js origin/main)

1. **Palveluntarjoajat (todennettu koodista).** Pelaajan kysymystä käsittelee vain **Anthropic** (`api.anthropic.com`). Ääni: **ElevenLabs** (Pulu, oppaan William) ja **xAI** (`api.x.ai/v1/tts`, oletus kaikessa striimiluennassa; PUHE_MOOTTORI), varapolku **OpenAI** (`api.openai.com/v1/audio/speech`); äänipalveluille lähtee vain vastauksen teksti. Paikkahaut: **Wikimedia** (Wikipedia, Wikidata, Commons), **OpenStreetMap Nominatim** (vain OSM-maininnan näyttäville asiakkaille) ja **MET Norway** (`api.met.no`, sää; koordinaatit 4 desimaalia). Vain kehittäjäkoodilla (ei pelaajille): xAI-reaaliaikaääni (`client_secrets`), OpenAI-kuvageneraatio, kustannusseuranta (Anthropic, OpenAI, ElevenLabs, BigQuery). Selosteessa nimetään pelaajille näkyvät palvelut; kehittäjäpuolen palvelut eivät käsittele pelaajan dataa.
2. **Tallennusajat (todennettu koodista).** IP-laskurit KV:ssä: avain `…:<päivä>:<8-merkkinen tiiviste IP:stä>`, elinaika 30 h (`opasPaivaAvain`, `paivaAvain`, `puhePaivaAvain`; kasvataLaskuri 60·60·30 s); kuukausilaskurit ovat globaaleja (ei IP:tä). Tiheysraja (20/min) on workerin muistissa, ei pysyvä. Kysy-vastauksen äänen teksti: R2 `opas/teksti/<sha>.json`, **koodi ei aseta vanhenemista** (KV-varalla 48 h); OHJE.md väittää R2-säännön `opas-teksti-48h` olevan olemassa: live-tarkistus puuttuu (ei Cloudflare-avaimia tässä sessiossa). Valmiiden kysymysten vastaukset R2 `tila/…`, vanhenemisaika oliossa 30 vrk (luku ohittaa vanhentuneen, olio jää R2:een, ei henkilötietoja); kierroksen tila 6 h. Ääni: R2 `opas/<sha>.mp3`, reunavälimuisti 60 vrk. Lokit: Workers Logs päällä (`observability.enabled`), console.log-rivit eivät sisällä kysymystekstiä; yksi rivi (`opas: sijainti lat,lon ei ole <kaupunki>`) kirjaa kolmen desimaalin koordinaatit, kun pelin sijainti ei täsmää kaupunkiin.
   **Havainto Pelikoodarille:** IP-tiiviste on suolaamaton 32-bittinen FNV-1a (`rajat.js tiiviste`), joka on laskennallisesti palautettavissa (IPv4-avaruus on pieni), joten se on pseudonyymi eikä anonyymi tieto. Ehdotus: suola workerin salaisuudesta (esim. HMAC-SHA256, 12 merkkiä) tai tiiviste vain muistissa. Seloste sanoo "tiiviste, enintään 30 tuntia", mikä pitää paikkansa, mutta juristin kannalta kyse on henkilötiedosta.
3. **Ikätieto (suunnitelma, ei vielä koodissa).** Pelikoodarin suunnitelma (Raamattu-loki 10.10. 09.08): tallennus vain laitteelle (aikuinen kyllä/ei), otsake `x-matkakirja-aikuinen` jokaisessa tekoälypyynnössä, puuttuva otsake = kuratoitu tila; NUI tekee ikäkyselyn. Koodista (origin/main) tunnistetta ei löydy → seloste kuvaa suunnitelman. **Päivitä, kun toteutus on valmis (juna 176–177).**
4. **CSAM-ilmoituskanava Suomessa (lähteet luettu 10.10.2026).** Suomen vihjepalvelu on Pelastakaa Lapset ry:n **Nettivihje** (nettivihje.fi; INHOPE-verkoston jäsen), ja epäilystä riittää ilmoitus Nettivihjeeseen tai poliisin nettivinkkiin; välittömässä vaarassa poliisille heti (soita 112). Pelissä ei ole kuvia eikä käyttäjien viestintää, joten oma ilmoitusmenettely on yksi lause: "jos havaitaan lapsiin kohdistuvaa seksuaaliväkivaltaa esittävää aineistoa, siitä ilmoitetaan Nettivihjeeseen ja poliisille". **Verkkopalveluntarjoajan lakisääteistä ilmoitusvelvollisuutta (DSA, EU:n CSAM-asetus, Suomen laki) ei voitu vahvistaa haulla: juristille.** Lähteet: https://www.pelastakaalapset.fi/nettivihje/ ; Pelastakaa Lapset, kannanotto komission ehdotukseen 2024 (pdf, pelastakaalapset.fi).

## Avoimet kohdat omistajalle / juristille / muille (VAHVISTA jää)

1. **R2-elinkaarisäännön live-tarkistus** (Julkaisija: `npx wrangler r2 bucket lifecycle list matkakirja-puhe`; jos sääntöä ei ole, lisää `opas-teksti-48h` etuliitteelle `opas/teksti/`).
2. **IP-tiivisteen suolaus** (Pelikoodari, ks. todennetut kohdat 2).
3. **"Ilmoita vastauksesta" -toiminto** (alaikäistarkistus kohta 4) ei ole vielä tehty; teksti 2 ja selosteen virke viittaa siihen. Poista maininta, jos toimintoa ei julkaista ennen tekstien käyttöä.
4. **Kuvat ja pelaajien välinen viestintä**: lauseet "ei kuvien lähettämistä, ei pelaajien välistä viestintää" pitävät tällä hetkellä; päivitä, jos ominaisuuksia lisätään (Anthropicin ohje vaatii silloin tunnistusta ja ilmoituskanavaa).
5. **Rekisterinpitäjä ja tukisähköposti** puuttuvat ([täydennä], omistaja). Huom.: koodin User-Agentissa on `peli@matkakirja.app` (tools/pollo/opas.js, saa.js); onko se julkinen tukiosoite, päättää omistaja.
6. **Juristi**: GDPR (artikla 8, Suomessa 13 v), App Storen ikäraja ja lapsille suunnatut ehdot, palveluntarjoajien sijainnit ja käsittelysopimukset (Anthropic, ElevenLabs, xAI, OpenAI, Cloudflare), IP-tiivisteen asema, CSAM-ilmoitusvelvollisuus; sivuston lausunto ja seloste.
7. **Anthropicin lastensuojan järjestelmäkehote**: ohje mainitsee, että Anthropic voi tarjota sellaisen; kysy Consolen kautta (alaikäistarkistus kohta 7). Omistaja.
8. **Pelin sijainti**: `/opas/saa` ja kierroksen pyyntö saavat koordinaatit; vahvista natiivilta, että ne ovat pelin kartan kohta eikä laitteen GPS (jos laitteen sijainti lähtee, seloste muutetaan).
