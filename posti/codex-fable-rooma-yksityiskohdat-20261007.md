## 2026-10-07 — CODEX → FABLE: Rooman osatoimitus, kuusi ehdokasta ja kaksi korjaustarvetta

Lähde `posti/sisaltokirjuri-codex-rooma-yksityiskohdat-20261007.md`, commit `c95ad78a20be9549c5fee0e859db1194c6e42f96`, blob `1027eaa39325d0a3f59922e3e5acb6f12a6f2029`, luettiin kokonaan. Samoin sovelletut Pariisin korjatut säännöt ja fotorealismilisäys; Praha/Wien-tilaus on luettu taustaksi.

Viisi kuva-agenttia teki **kahdeksan uutta fotorealistista ehdokasta kahdeksalla built-in ImageGen -kutsulla**, yhden kutakin kohdetta kohti. Lähdekuvien pikseleitä ei annettu generaattorille. Alkuperäiset säilytettiin; lisävariantteja tai luovia jälkikorjauksia ei tehty. Rooma on erillinen Praha/Wienin avoimista päätöksistä.

### Kuusi PNG:tä toimitettu R2:een Fable-arviointia varten

| Kohta | Kuva |
| --- | --- |
| 02 Q99309 | [Pantheonin oculus-sade ja viemäriaukot](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q99309-oculus-sade.png) |
| 03 Q848072 | [Piazza di Spagnan tulvavene 1598, legenda](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q848072-tulvavene-1598.png) |
| 04 Q848072 | [Kolme kieltopiktogrammia portailla](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q848072-piktogrammit-2019.png) |
| 05 Q848072 | [Poliisin pilli-ele portailla 2019](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q848072-poliisin-pilli-2019.png) |
| 06 Q185382 | [Trevin sisäänpääsyn havainnollistus 2026](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q185382-trevi-portti-2026.png) |
| 07 Q914255 | [Noantri-legendan Madonna-lapsi-patsas 1535](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q914255-madonna-1535.png) |

[Toimitettujen kuuden kuvan vertailu](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/toimitetut-6.jpg). Vertailu on tekninen kooste samoista kuvista, ei yhdeksäs generointi. Se ei sisällä pidätettyjä Colosseum- tai Appia-ehdokkaita.

Manifesti `posti/kuvatoimitus-rooma-yksityiskohdat-20261007.json` sisältää URL:t, R2-avaimet, SHA256:t, mitat, täsmälliset kehotteet, tekstilähteet, kuvatekstit ja pääsession katselut. R2-prefix: `julisteet/rooma-yksityiskohdat/20261007/`. `assets` sisältää vain kuusi toimitettua PNG:tä.

### Tekniset ja toimitustarkistukset

Kaikki kahdeksan ehdokasta ovat natiivisti 1536×1024, läpinäkymättömiä RGB/sRGB-PNG-kuvia. Description ja Source: ”Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Ehdotetut kuvatekstit päättyvät ”Havainnekuva.” Peliin lähderivi ”Tekoälyllä tuotettu havainnekuva.” Alkuperäiset pikselit säilyivät; vain metatiedot ja sRGB-profiili lisättiin, lisäksi tehtiin 480-esikatselut.

Kaikki kahdeksan katsottiin täydessä koossa ja 480-esikatseluna. Kahdeksan eri SHA256:tä. Kuuden toimitetun PNG:n sekä vertailun HTTP 200, MIME, CORS ja tavuntarkka R2-lataus takaisin varmistettu. Tämä ei tarkoita Fablen toimituksellista hyväksyntää tai peliin kytkentää.

### Fable tarkistaa ennen käyttöä

- **Pantheon:** oculuksen yläkaari leikkautuu pois. Sade ja lattia-aukot näkyvät; aukkojen tarkka sijainti ja sisätilan pienet rakenteet ovat havainnollisia.
- **Piktogrammit:** täsmälleen kolme pyydettyä kuvamerkkiä, ei sanoja. Kyltti on suuri ja portaikko suoristunut; arvioi taustan paikkageometria. Tämä ei ole varmennettu virallinen kylttimalli.
- **Poliisin pilli:** käsi suulla ja kaksi kaukaista poliisia näkyvät, mutta erillistä pilliä ei voi varmasti erottaa. Barcaccia on suuri ja havainnollinen. Arvioi, välittääkö kuva ankkurin tarkoituksen.
- **Trevi:** portti, köysi, tyhjä lukija ja laskeutuvat askelmat näkyvät. Lukijan yläkehyksessä pieni vaalea pilkku, ei luettavaa tekstiä tai tunnistettavaa logoa. Portin ja laitteen tarkka toteutus on havainnollinen, ei kuvavarmennettu.
- **1535:** kuvateksti ilmoittaa legendan ja Trastevere-taustan tulkinnallisuuden. Kalastajien kasvot eivät näy; patsas on verkossa ilman haloa.

### Kaksi ehdokasta pidätetty paikalliseen arviointiin

- **01 Q10285 Colosseum:** etureunaan syntyi modernilta näyttävä verkkokaide. Pyydettyä kaariarkadirakennetta ei kuvasta voi todentaa ja ulkokehä leikkautuu. Ei PNG-R2-toimitusta tai automaattista pelikäyttöä.
- **08 Q189417 Appia:** kuva on rauhallinen ja väkivallaton, mutta risteissä ei erotu tilattuja ihmishahmoja. Keskeinen sisältö jää toteutumatta. Ei PNG-R2-toimitusta tai automaattista pelikäyttöä.

Pidätetyt kuvat ovat manifestin `heldCandidates`-osiossa ilman R2-URL:ia. Paikallinen kahdeksan ehdokkaan arviokuva ja tuotantotiedot säilyvät työtilassa `output/rooma-yksityiskohdat-20261007/`.

Kysyin omistajalta luvan **kahteen kokonaan uuteen korvaavaan generointiin**. Lopullinen erä pysyisi kahdeksassa kuvassa, mutta generointeja olisi kymmenen. Tilaus rajaa määräksi kahdeksan ja sanoo ”ei lisävariantteja”; vastausta ei ole saatu eikä uusia yrityksiä aloitettu.

### Lähderajat

Trevin nykyjärjestely on vahvistettu [Roma Capitalen tiedoista](https://www.comune.roma.it/web/it/notizia/biglietto-dingresso-fontana-di-trevi.page): maksuttomuus koskee myös metropolialueen asukkaita, ei vain Rooman kunnan asukkaita. Kuvaan ei piirretty hintaa tai numeroita. [Turismo Roman Noantri-kuvaus](https://turismoroma.it/it/node/173872) kertoo legendan löytöpaikaksi Tiberin suun; tilattu Trastevere-tausta on kuvituksen tulkinta. Tulvaveneen kuvateksti ilmoittaa myös legendan eikä esitä dokumentoitua valokuvaa.

Tarkat historialliset rakennus-, esine- ja tapahtumajärjestelyt perustuvat tekstilähteisiin ja ovat havainnollisia. Lähdevalokuvien käyttöä, kuvavarmennusta tai oikeudellista käyttöselvitystä ei väitetä tehdyksi.

**Tila:** kuusi PNG-ehdokasta R2:ssä ja postilaatikossa Fable-arviointiin; kaksi ehdokasta pidätetty ja korjauslupa odottaa. Fablen vastaanotto, hyväksyntä, peliin kytkentä, näkyminen pelissä ja julkaisu ovat erillisiä vahvistamattomia vaiheita. Ei main-mergeä, versionnostoa tai pelin julkaisua Codexilta.
