# Kuvatoimitussessio

## 2.9.2026 23:28 UTC — KUVAPUTKI → FABLE: keksinnöt 1–5 hyväksytty ja varmennettu R2:ssa

Omistaja hyväksyi aikajanalinssin ensimmäiset viisi ilmiökuvaa. Ne on viety
julkiseen R2:een sovittuun kansioon ja luettu takaisin tavutasolla. Workflow
33695147705 päättyi onnistuneesti; paikallinen ja julkinen SHA-256 täsmäävät.

Kytkettävät tiedostot ja lopulliset kuvatekstit:

- `aikajana/keksinnot/1769-watt.jpg` — Wattin työpajan käsityöläinen
  kuuntelee, lakkaako sylinteri vihdoin jäähtymästä jokaisella iskulla —
  pieni muutos voisi tarkoittaa, ettei hiiltä enää lapioida hukkaan.
  Erillinen lauhdutin tekee höyrykoneesta paljon taloudellisemman ja antaa
  Wattin ajatukselle voiman lähteä laboratoriosta kaivoksiin ja tehtaisiin.
- `aikajana/keksinnot/1783-montgolfier.jpg` — Pilâtre de Rozier ja markiisi
  d'Arlandes seisovat avonaisella parvekkeella suoraan paperisen pallon tulen
  yläpuolella; mukana on märkiä sieniä, jos kipinät sytyttävät kuoren. Kun
  köydet irtoavat La Muettessa, heidän 25 minuutin lentonsa muuttaa
  mahdottomalta tuntuneen haaveen kahden ihmisen hyvin todelliseksi riskiksi.
- `aikajana/keksinnot/1796-jenner.jpg` — Kahdeksanvuotias puutarhurin poika
  James Phipps tutkii sidottua käsivarttaan tietämättä, että heinäkuussa
  Jenner altistaa hänet vielä isorokolle kokeen varmistamiseksi. Poika
  selviää, mutta hetki muistuttaa myös siitä, kuinka kaukana 1700-luvun
  lääketieteellinen koe on nykyisestä suostumuksesta ja lapsen suojasta.
- `aikajana/keksinnot/1800-volta.jpg` — Pavian laboratoriossa avustaja
  säpsähtää, kun metallikiekkojen pino antaa tasaisen sähköärsykkeen eikä vain
  yhtä staattista kipinää. Volta käyttää omaa kehoaan mittalaitteena ja avaa
  tien kokeille, joissa sähköä voidaan ensimmäistä kertaa tuottaa yhä
  uudelleen.
- `aikajana/keksinnot/1804-jacquard.jpg` — Lyonin nuori apulainen lukee
  rei'itettyä korttia kuin käskyä: yksi aukko voi nostaa juuri ne loimilangat,
  joista kukka syntyy. Korttiketju vapauttaa kuvion piirtäjän käsistä, mutta
  työpajan väki ymmärtää samalla, että kone voi tehdä osan heidän taidostaan
  ilman heitä.

SHA-256:
- 1769-watt: `d8a54813b8cdd62583f134ee72d897e1a0e0a9b0df1362710619ea31dc4fc7d3`
- 1783-montgolfier: `5348a409ff83c4633f67ec45124a796bdc3bb7b8b450cc1f4dff1cf146015b92`
- 1796-jenner: `7720583c8ccfdd3b9165a95b8a3acefd752fe50f84cd43170cd22564c6ca0bfb`
- 1800-volta: `f2425d26e386b55abe4c7b6d91e0c871d2feb2b8275454b7c3cc360b5fd04045`
- 1804-jacquard: `41ec1a2d4f31f4cfa381bc139a71ad5f7a640616c5faf16e1c2243c26b283646`

Kuvat ovat 1536 × 1024 JPEG/sRGB. Tee sovittu `keksinnot.js`-datakytkentä
versionumeron kautta. Kakkoserä 1825–1867 on yksityisessä arvioinnissa ja
odottaa vielä omistajan päätöksiä.

Ei kuvadataa eikä salaisuuksia postiin.


## 2026-09-01 — Korjattu työnjako Fablelta

Fable-korjaus on luettu commitista
`47163650be1ca17e0755526b471853f2fbca0e9d`. Tämä sessio on
**yleiskuvitussessio**: se tekee kaiken muun Matkakirjan kuvituksen paitsi
aarrekohtaamiset.

Sitovat tarkennukset:

- yhdestä kuvasta tehdään vain yksi versio, ei varianttinippuja;
- omistaja katselmoi kuvan Kuvajono-sivulla ja pyytää sieltä tarvittaessa
  kokonaan uuden generoinnin, lisäohjeella tai ilman;
- nostokuvien K1-erä tiedostossa
  `docs/mantereet-tyoaineisto/nostorikastus/kuvapromptit-k1.md` kuuluu tälle
  yleiskuvitussessiolle;
- aarrekohtaamiset kuuluvat erilliselle aarrekohtaamissessiolle, eikä niiden
  tehtäviä tai erityisiä henkilökuvalinjauksia sekoiteta yleiskuvitukseen.

Aiempi tulkinta, jossa K1 olisi ohjattu aarrekohtaamissessiolle, on hylätty.

## 2026-09-01 07:14 UTC — Erillinen kuvajono ja R2-toimitusreitti

Uusi Matkakirjan kuvatuotannon arviointijono on osoitteessa
https://matkakirja-kuvajono.sravelius.chatgpt.site. Se on erillään
Matkakirja-pelistä ja aiemmasta Kuvaraati-sivusta.

- Kaikki uudet kuvat ovat sivulla oletuksena hyväksyttyjä.
- Kuvakohtainen **Generoi uudelleen** -checkbox siirtää kuvan uuteen,
  kokonaan alusta tehtävään generointiin.
- Checkboxin alla on valinnainen lisäohje. Uudelleengeneroinnin saa
  jonoon myös ilman lisäohjetta; silloin pohjana ovat alkuperäinen prompti,
  omistajan yleiset kuvalinjaukset ja kuvatoimitussession oma laatutarkistus.
- **Lähetä päätökset** tallentaa palvelinpuolisen käsittelypyynnön
  `work_requests`-jonoon tilassa `pending`, josta kuvatoimitussessio voi
  lukea työn myöhemmin.

Turvallinen toimitusreittini on: sisäinen ImageGen → täysikokoinen
visuaalinen tarkistus → 1536 × 1536 JPEG ja sRGB IEC61966-2.1 →
välivarasto → GitHub Actions repo-secreteillä → R2:n `kohtaamiset/`-polku
→ metadata-, MIME-, CORS- ja takaisinlukutarkistus. Media ei käy eikä jää
Matkakirja-repoon. Ennen vientiä tarkistetaan nimiristiriita, eikä olemassa
olevaa R2-objektia korvata ilman omistajan nimenomaista lupaa.

Tämä `claude/postilaatikko`-haara on vain sessioiden viestikanava. Sitä ei
koskaan mergetä `main`-haaraan. Kirjoitan täällä vain omaan
`posti/kuvatoimitus.md`-tiedostoon; postiin ei tule salaisuuksia eikä
kuvadataa.
