# Kohtaamiset erä C5: seuraavat 6 eurooppalaista kaupunkia eniten nostoja (2026-09-22)

Sisältökirjuri (Sonnet), jatkoa erille C1–C4. Rajaus edelleen Eurooppaan
(vain Euroopan lauta valmis). Nosto=8 tasolla oli enää kaksi eurooppalaista
kaupunkia jäljellä (Košice, Bergen), joten loput neljä otettiin nosto=7
tasolta. Kirjoitettu Sonnet-parvella (kuusi rinnakkaista agenttia, yksi
per kaupunki):

| Kaupunki | Nostoja | Huomio |
| --- | ---: | --- |
| Košice | 8 | Puhdas kaupunki, ei kaarta eikä kuvaa. Uusi hahmo lennätinvirkailija Zuzana. Isoisä-koukku: Kassa-Oderberg-rata valmistui vasta 12.3.1872 — VAHVISTAA jo olemassa olevaa pelikaanonia (fokusvirta-kosice.js kertoo isoisän saapuneen juuri tätä rataa pitkin). Uusi kuva tarpeen. |
| Bergen | 8 | Puhdas kaupunki, ei kaarta eikä kuvaa (agentti tarkisti myös erillisen fokusvirran EHDOTTAMAN, ei-kanonisen "Solveig"-nimen ja vältti sitä varmuuden vuoksi). Uusi hahmo satamakonttoristi Ingrid. Isoisä-koukku: Det Bergenske Dampskibsselskab oli 1873 vasta parikymmentä vuotta vanha, viisi laivaa vuonna 1875. Uusi kuva tarpeen. |
| Edinburgh | 7 | Kaaren tykkimestari Ewan (linnan tykki) ja hänen kuvansa varattuja kaarelle. Uusi hahmo kylttimaalari Fiona. Isoisä-koukku: 1867 Improvement Act -kadut olivat 1873 vasta muutaman vuoden ikäisiä. Uusi kuva tarpeen. |
| Kraków | 7 | Kaaren tornintorvensoittaja Stanisław (hejnał, Mariankirkon torni) ja hänen kuvansa varattuja kaarelle. Uusi hahmo meripihkakauppias Tadeusz. Isoisä-koukku: Sukiennicen nykyiset kaariholvit valmistuivat vasta 1879. Uusi kuva tarpeen. |
| Warszawa | 7 | Kaaren antikvaari Zofia ja hänen kuvansa varattuja kaarelle. Kaksivaiheinen ristiriitatutkimus: erillinen "Jadwiga"-kuva osoittautui LOPULLISESTI käyttökelvottomaksi (tila `arkisto` + Fablen 5.9.2026 päätös poistaa koko hahmo kaaresta) — sama tilanne kuin Dublinin arkistokuva C3:ssa. Uusi hahmo suklaakaupan oppipoika Wiktor. Isoisä-koukku: Wedelin suklaakauppa oli 1873 jo yli 20-vuotias perinne. Uusi kuva tarpeen. |
| Sarajevo | 7 | Kaaren kupariseppä Adnan ja hänen kuvansa varattuja kaarelle, JA kaupunkilehti kattaa jo kolme muuta maamerkkiä (Sahat-kula, Gazi Husrev-begin moskeija, Latinalainen silta) sekä kahvi/kupari-aihepiirin — agentti kiersi kaikki nämä. Uusi hahmo satulaseppä Amra, eri kujalla (Sarači, ei Kazandžiluk). Isoisä-koukku: rautatie ei yltänyt Sarajevoon ennen 1882. Uusi kuva tarpeen. |

Rakenne sama kuin erät C1–C4. Ei vielä kirjoitettu js/packs/kohtaamiset.js:ään
— tarkastukseesi ensin.

## Läpikäyvät huomiot

1. Neljä kuudesta kaupungista on tarinakaarikaupunkeja (Edinburgh, Kraków,
   Warszawa, Sarajevo); Košice ja Bergen ovat puhtaita, kuten Tampere/
   Ljubljana aiemmissa erissä.
2. Warszawa-agentti teki kaksivaiheisen tutkimuksen kahdesta kilpailevasta
   kuvasta (Zofia/aktiivinen vs. Jadwiga/arkistoitu) ja päätyi samaan
   johtopäätökseen kuin Dublinin arkistokuva-tapaus C3:ssa: arkistoitu
   kuva ei ole "vapaa toinen hahmo" vaan hylätty konsepti, ei käytettävissä
   mihinkään.
3. Sarajevo-agentti teki laajimman ristiriitatarkistuksen tähän mennessä:
   paitsi kaaren Adnanin, myös kaupunkilehden JO KATTAMAT kolme maamerkkiä
   ja kahvi/kupari-aihepiirin, ja valitsi täysin eri kujan ja aiheen.
4. Bergen-agentti tarkisti myös erillisen fokusvirta-tiedoston EI-KANONISEN
   hahmoehdotuksen ("Kalanvrakari Solveig") ja vältti sitä varmuuden
   vuoksi, vaikka se ei kuulunut viralliseen ristiriitatarkistukseen.
5. Kaikki inline-luentatagit tarkistettu englanniksi (ElevenLabs-sanasto).
   Luennoissa vain roolit 'kertoja' ja 'hahmo' — ei kertaakaan
   'pelaaja'-riviä (nuori Fogg ei puhu, docs/tarina.md 21.9.2026).
6. tunneLoyto/tunneTyhja/tunneVaarin täsmälleen rekisterin pakolliset
   arvot kaikissa kuudessa. tunneTervehdys on kaikissa kuudessa 'utelias'
   0,5 (rekisterin oletus).
7. Kaikki merkkimäärät alle rajojen (tervehdys ≤280, loyto/tyhja/vaarin
   ≤130). Kaikilla kuudella on tarkistettu, lähteillä varustettu
   1873-fakta, eikä yksikään toista toisen kaupungin faktaa. Kaikki
   kuusi tarvitsevat UUDEN kuvan Codexilta.
8. Yksikään uusi hahmo, paikka tai teema ei toista mitään aiempien
   erien tai tämän erän muiden kaupunkien hahmoa/teemaa.

---

# Kohtaaminen erä C5: Košice

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa kolmesta tiedostosta. Košicella ei siis ole tarinakaarta
(`KAARI_PAKETIT`), ei olemassa olevaa kohtaamiskuvaa eikä dokumentaatio-
riviä — puhdas kaupunki, kuten Ljubljana oli erässä C4.

Košice esiintyy kylläkin muissa pelitiedostoissa tavallisena karttakaupunkina
ja sillä on kevyt fokusvirta `js/packs/fokusvirta-kosice.js`:ssä (eri
järjestelmä, ei kosketa kohtaamisia). Fokusvirran isoisän matkakirja-
teksti on kuitenkin hyödyllinen tausta: isoisä saapui Kassaan (Košiceen)
lokakuussa 1873 **junalla Krakovasta "Kassa-Oderberg-radan kautta"** ja
kirjoittaa tuomiokirkosta, Immaculata-ruttopylväästä ja pääkadusta — nämä
kolme ovat siis jo katettuja lehden/matkakirjan puolella, joten tämä
kohtaaminen ei kertaa niitä. Sen sijaan kohtaaminen tarttuu juuri siihen
junaan, jolla isoisä saapui.

## Košice — lennätinvirkailija Zuzana

**hahmo:** `'lennätinvirkailija Zuzana'`

**nappi:** `'Tapaa Zuzana'`

**frame:** `'Zuzana nostaa katseensa lennätinlaitteesta ja kysyy'`

**tervehdys** (278 merkkiä, raja ~280):
`'Zuzana pysäyttää sormensa lennätinavaimella ja katsoo junaa asemalle saapumassa: "Tämä rata pohjoiseen valmistui vasta viime vuonna — ennen sitä tänne ei tullut yhtään junaa. Näytä että tunnet maailmaa kuten piirtäjä — niin näpäytän sinulle viestin, joka kulkee nyt minuutissa."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Zuzana pysäyttää sormensa '
    + 'lennätinavaimella ja katsoo junaa asemalle saapumassa:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä rata pohjoiseen valmistui '
    + 'vasta viime vuonna — ennen sitä tänne ei tullut yhtään junaa. '
    + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
    + 'näpäytän sinulle viestin, joka kulkee nyt minuutissa."' },
]
```

**loyto** (122 merkkiä, raja 130):
`'Zuzana nostaa rasian lennätinpöydän alta ja pysäyttää avaimen: "Tämä viesti ei tullut yhdeltäkään asemalta, jonka tunnen."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Zuzana nostaa rasian lennätinpöydän '
    + 'alta ja pysäyttää avaimen:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä viesti ei tullut '
    + 'yhdeltäkään asemalta, jonka tunnen."' },
]
```

**tyhja** (123 merkkiä, raja 130):
`'Zuzana koputtaa tyhjää laatikkoa asemalattian alla: "Tyhjä. Tätä asemaa on siivottu niin monta kertaa uuden radan jälkeen."'`

**vaarin** (103 merkkiä, raja 130):
`'Zuzana pysäyttää avaimen kesken viestin: "Ei vielä. Lennätin odottaa oikeaa merkkiä — yritä uudestaan."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Kassa-Oderbergin rautatie (Košice–Bohumín-rata) valmistui kokonaisuudessaan
vasta **12.3.1872**, kun viimeinen puuttuva osuus Spišská Nová Ves–Kysak
avattiin liikenteelle. Rata yhdisti Kassan ensimmäistä kertaa rautateitse
Sleesian teollisuusalueelle. Isoisän matkavuonna 1873 — hän saapui Kassaan
lokakuussa, siis reilu puolitoista vuotta radan valmistumisen jälkeen —
juna Krakovasta oli vielä tuore ja harvinainen tapa saapua kaupunkiin.

Tämä fakta myös **vahvistaa jo olemassa olevaa kaanonia**: pelin oma
matkakirjateksti Košicen fokusvirrassa sanoo isoisän saapuneen "Krakovasta
vuorten läpi [...] Kassa-Oderberg-radan kautta" lokakuussa 1873 — sama
rata, sama vuosi.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Košice–Bohumín Railway – Wikipedia](https://en.wikipedia.org/wiki/Ko%C5%A1ice%E2%80%93Bohum%C3%ADn_Railway)
- [History of rail transport in Slovakia – Wikipedia](https://en.wikipedia.org/wiki/History_of_rail_transport_in_Slovakia)

## Olemassa olevat Košice-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä `js/kohtaamiskuvat-data.js`:ssä eikä
  `docs/kuvatuotanto-kohtaamiset.md`:ssä.
- Ei olemassa olevaa kuvaa lennätinvirkailija Zuzanalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Košice — lennätinvirkailija Zuzana.** Slovakialainen nainen, noin
> 30–40-vuotias, solakka ja tarkkaavainen olemus. Paikka: Košicen
> rautatieaseman pieni lennätinhuone — puinen pöytä, lennätinavain ja
> -laite, korkea asemaikkuna, jonka läpi näkyy hämärästi saapuva
> höyryjuna — **ei tuomiokirkon torneja, ei Immaculata-pylvästä eikä
> Hlavná-katua näkyvissä**. Kesken aidon tekemisen: sormet
> lennätinavaimella, katse käännettynä ikkunasta sisään saapuvaan junaan.
> Valo/sää: syksyinen iltapäivä, pehmeä viisto valo. Rajaus enintään
> puolivartalo. **Ei näytetä:** viestin sisältöä luettavana, eikä mitään
> tuomiokirkkoa, ruttopylvästä tai pääkatua tunnistettavana.

---

# Kohtaaminen erä C5: Bergen

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa neljästä tiedostosta (tarkistettu myös, ettei mikään
osuma ole vahingossa esim. "Kopenhagen" tms.). Bergenillä ei siis ole
tarinakaarta, ei olemassa olevaa kohtaamiskuvaa eikä dokumentaatioriviä.

**Lisähuomio:** `js/packs/fokusvirta-bergen.js` sisältää Bergenin
fokusvirran oman, ERI JÄRJESTELMÄN nimetyn kohtaamisehdotuksen:
**"Kalanvrakari Solveig"**, joka laiturilla tarkastaa kuivattua kalaa.
Tiedoston oma kommentti merkitsee tämän EHDOTUKSEKSI, ei kaanoniksi, eikä
se kuulu viralliseen ristiriitatarkistukseen. Varmuuden vuoksi kirjoitin
silti kokonaan eri hahmon — ei laituria, ei kuivattua kalaa, ei nimeä
Solveig.

## Bergen — satamakonttoristi Ingrid

**hahmo:** `'satamakonttoristi Ingrid'`

**nappi:** `'Tapaa Ingrid'`

**frame:** `'Ingrid nostaa kynän matkustajalistalta ja kysyy'`

**tervehdys** (268 merkkiä, raja ~280):
`'Ingrid pitää matkustajalistaa kirjaasi vasten laiturilla: "Isoisäsi aikaan yhtiömme oli parikymmentä vuotta vanha, laivoja vain kourallinen — vuonna 1875 niitä oli täsmälleen viisi. Näytä että tunnet maailmaa kuten piirtäjä — niin merkitsen nimesi tähän listaan itse."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Ingrid pitää matkustajalistaa kirjaasi '
    + 'vasten laiturilla:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan yhtiömme oli '
    + 'parikymmentä vuotta vanha, laivoja vain kourallinen — vuonna '
    + '1875 niitä oli täsmälleen viisi. [warmly] Näytä että tunnet '
    + 'maailmaa kuten piirtäjä — niin merkitsen nimesi tähän listaan '
    + 'itse."' },
]
```

**loyto** (115 merkkiä, raja 130):
`'Ingrid nostaa rasian laiturin kivien raosta: "Tämä ei ole minkään matkustajan tavaraa — mutta kirjaan senkin ylös."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Ingrid nostaa rasian laiturin kivien '
    + 'raosta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole minkään '
    + 'matkustajan tavaraa — mutta kirjaan senkin ylös."' },
]
```

**tyhja** (124 merkkiä, raja 130):
`'Ingrid tarkistaa raon tyhjänä ja pudistaa päätään: "Tyhjä. Täältä kävelee sata ihmistä päivässä — joku ehti jo ennen sinua."'`

**vaarin** (101 merkkiä, raja 130):
`'Ingrid laskee kynän listan viereen: "Ei vielä. Laiva lähtee vasta illalla — ehdit yrittää uudelleen."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähde

Bergenistä käsin toiminut höyrylaivayhtiö Det Bergenske Dampskibsselskab
perustettiin Bergenissä **1851** Michael Krohnin aloitteesta. Isoisän
matkavuonna 1873 yhtiö oli siis vasta parikymmentä vuotta vanha, ja
**vuonna 1875 sen laivaston koko oli tarkalleen viisi alusta** — kasvu
kahteenkymmeneen laivaan tapahtui vasta vuoteen 1894 mennessä.

Lähde (tarkistettu 22.9.2026, WebFetch):
- [Bergen Steamship Company – Wikipedia](https://en.wikipedia.org/wiki/Bergen_Steamship_Company)

## Olemassa olevat Bergen-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä `js/kohtaamiskuvat-data.js`:ssä eikä
  `docs/kuvatuotanto-kohtaamiset.md`:ssä.
- Ei olemassa olevaa kuvaa satamakonttoristi Ingridille — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Bergen — satamakonttoristi Ingrid.** Norjalainen nainen, noin 35–50-
> vuotias, käytännöllinen olemus. Paikka: Bergenin satamalaituri (Vågen)
> höyrylaivan kylkeä vasten — taustalla hämärästi erottuva
> siipiratashöyrylaiva, EI Bryggenin puutalorivistöä tunnistettavana
> maamerkkinä. Kesken aidon tekemisen: seisoo laiturilla, toisessa
> kädessä sidottu paperilista. Valo/sää: harmaa, sateinen Bergenin päivä.
> Rajaus enintään puolivartalo. **Ei näytetä:** listan tekstiä
> luettavana, ei kuivattua kalaa tai kalankäsittelyä, ei tuomiokirkkoa
> eikä tykinkuulaa.

---

# Kohtaaminen erä C5: Edinburgh

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Edinburghilla on jo tarinakaari (`js/tyohuone-kehitys-data.js`,
`KAARI_PAKETIT.kohteet`, id `'edinburgh'`). Kaaren oma `henkilo`-kenttä:

> "Tykkimestari Ewan lataa linnan yhden lyönnin tykin joka päivä, kuten
> isoisänsä ennen häntä."

`js/kohtaamiskuvat-data.js` sisältää rivin `edinburgh-ewan-tykki`, hahmo
**Ewan**, tila `arkisto` — sama merkintä kuin Rooman kaaren omalla
Enzo-kuvalla, eli arkistoitu/varattu kaari-hahmon kuva.

**Johtopäätös: Ewan (tykkimestari, linnan yhden lyönnin tykki) ja hänen
kuvansa ovat kokonaan varattuja kaaren omaan kohtaamiseen.** Kirjoitin
siis kokonaan uuden hahmon: kylttimaalari Fionan, joka työskentelee
Vanhankaupungin kaduilla Edinburghin vuoden 1867 Improvement Actin purku-
ja uudisrakennustyömailla.

## Edinburgh — kylttimaalari Fiona

**hahmo:** `'kylttimaalari Fiona'`

**nappi:** `'Tapaa Fiona'`

**frame:** `'Fiona pyyhkii maalisiveltimen ja kysyy'`

**tervehdys** (250 merkkiä, raja ~280):
`'Fiona maalaa viimeistä kirjainta uuteen katukylttiin: "Tämä katu ei ollut olemassa, kun isoisäsi kulki täällä — se rakennettiin vasta äsken vanhojen kujien paikalle. Näytä että tunnet maailmaa kuten piirtäjä — niin näytän, mikä kuja tässä ennen oli."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Fiona maalaa viimeistä kirjainta uuteen '
    + 'katukylttiin:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä katu ei ollut olemassa, '
    + 'kun isoisäsi kulki täällä — se rakennettiin vasta äsken vanhojen '
    + 'kujien paikalle. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin näytän, mikä kuja tässä ennen oli."' },
]
```

**loyto** (124 merkkiä, raja 130):
`'Fiona nostaa rasian puretun kujan kivistä: "Tämä ei ole maalia eikä kylttiä — tämä on jonkun, joka asui täällä ennen minua."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Fiona nostaa rasian puretun kujan '
    + 'kivistä:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole maalia eikä '
    + 'kylttiä — tämä on jonkun, joka asui täällä ennen minua."' },
]
```

**tyhja** (105 merkkiä, raja 130):
`'Fiona koputtaa siveltimellä tyhjää kiveä: "Tyhjä. Tätä kujaa on purettu ja siivottu niin moneen kertaan."'`

**vaarin** (122 merkkiä, raja 130):
`'Fiona pyyhkii maalin pois kirjaimelta: "Ei vielä. Uusikin kyltti vaatii useamman siveltimenvedon ennen kuin se on oikein."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Edinburghin vuoden 1867 Improvement Act käynnisti Vanhankaupungin laajan
saneerauksen: ahtaita kujia (wyndejä) purettiin ja tilalle rakennettiin
leveämpiä katuja. **Chambers Street syntyi vasta vuonna 1870.** Isoisän
matkavuonna 1873 nämä kadut olivat siis vasta muutaman vuoden ikäisiä.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Old Town, Edinburgh – Wikipedia](https://en.wikipedia.org/wiki/Old_Town,_Edinburgh)
- [Chambers Street, Edinburgh – Wikipedia](https://en.wikipedia.org/wiki/Chambers_Street,_Edinburgh)

## Olemassa olevat Edinburgh-kuvakonseptit (ristiriitatarkistus)

- `edinburgh-ewan-tykki` — hahmo Ewan, linnan tykki, tila `arkisto`.
  **Varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa kylttimaalari Fionalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Edinburgh — kylttimaalari Fiona.** Skotlantilainen nainen, noin
> 35–45-vuotias. Paikka: kapea Vanhankaupungin kuja, jossa purkutyö on
> kesken — telineitä, irtokiveä (ei linnaa, ei linnanvallia näkyvissä).
> Kesken aidon tekemisen: seisoo tikkailla, maalaa siveltimellä viimeistä
> kirjainta katukylttiin. Valo/sää: harmaa, pilvinen iltapäivä, ei
> sadetta (eroaa kaaren Ewan-kuvan sateisesta tunnelmasta). Rajaus
> enintään puolivartalo. **Ei näytetä:** linnaa, tykkiä tai kelloa, eikä
> kyltin tekstiä täysin luettavana.

---

# Kohtaaminen erä C5: Kraków

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Krakovalla on jo tarinakaari (`js/tyohuone-kehitys-data.js`,
`KAARI_PAKETIT.kohteet`, id `'krakova'`). Kaaren oma `henkilo`-kenttä:

> "Tornintorvensoittaja Stanisław soittaa hejnałin joka tunti neljään
> ilmansuuntaan, kuten soittajat ennen häntä vuosisatojen ajan."

`js/kohtaamiskuvat-data.js` sisältää rivin `krakova-stanislaw-trumpetti`,
hahmo **Stanisław**, tila `tarkistettu` — sama hahmo kuin kaaren
`henkilo`-kentässä.

**Johtopäätös: Stanisław, torvensoitto, hejnał-legenda ja Mariankirkon
torni ovat kaikki varattuja kaaren omaan kohtaamiseen.** Kirjoitin siis
kokonaan uuden hahmon: meripihkakauppias Tadeusz Sukiennicen
(Kauppahallin) kaariholvien alla.

## Kraków — meripihkakauppias Tadeusz

**hahmo:** `'meripihkakauppias Tadeusz'`

**nappi:** `'Tapaa Tadeusz'`

**frame:** `'Tadeusz nostaa meripihkarasian valoon ja kysyy'`

**tervehdys** (268 merkkiä, raja ~280):
`'Tadeusz kääntää meripihkahelmiä valoon kaariholvien alla: "Isoisäsi aikaan näitä kaaria ei vielä ollut — koko halli sai tämän asunsa vasta muutama vuosi hänen käyntinsä jälkeen. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä täällä myytiin ennen minua."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Tadeusz kääntää meripihkahelmiä valoon '
    + 'kaariholvien alla:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan näitä kaaria '
    + 'ei vielä ollut — koko halli sai tämän asunsa vasta muutama '
    + 'vuosi hänen käyntinsä jälkeen. [warmly] Näytä että tunnet '
    + 'maailmaa kuten piirtäjä — niin kerron, mitä täällä myytiin '
    + 'ennen minua."' },
]
```

**loyto** (118 merkkiä, raja 130):
`'Tadeusz vetää rasian esiin vanhan tiskin alta: "Tämä on maannut täällä kauemmin kuin yksikään meripihkani hallussani."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Tadeusz vetää rasian esiin vanhan '
    + 'tiskin alta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä on maannut täällä '
    + 'kauemmin kuin yksikään meripihkani hallussani."' },
]
```

**tyhja** (124 merkkiä, raja 130):
`'Tadeusz koputtaa tyhjää laatikkoa: "Tyhjä. Tätä hallia on uudistettu niin monta kertaa, ettei mikään vanha pysy paikallaan."'`

**vaarin** (116 merkkiä, raja 130):
`'Tadeusz laskee helmet takaisin laatikkoon: "Ei vielä. Meripihkakin vaatii vuosia ennen kuin sen arvon näkee oikein."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Sukiennice (Kauppahalli) Krakovan Päätorilla ei näyttänyt 1873 siltä
miltä se näyttää tänään: rakennuksen suuri uudistus suunniteltiin
vuodesta 1870 alkaen, arkkitehti Tomasz Pryliński johti työt, ja
rakennustyöt itse käynnistyivät vasta noin 1875. Tuolloin lisättiin
uudet uusgoottilaiset kaariholvit, avokorsit ja maskaronein koristeltu
attika. Hanke valmistui ja vihittiin **3.10.1879** — kuusi vuotta
isoisän käynnin jälkeen.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Kraków Cloth Hall – Wikipedia](https://en.wikipedia.org/wiki/Krak%C3%B3w_Cloth_Hall)
- [Krakow's Cloth Hall: 19th-century reconstruction – whitemad.pl](https://www.whitemad.pl/en/krakows-cloth-hall-19th-century-reconstruction-of-the-building-gave-it-its-present-form/)

## Olemassa olevat Krakova-kuvakonseptit (ristiriitatarkistus)

- `krakova-stanislaw-trumpetti` — hahmo Stanisław, torvensoitto, tila
  `tarkistettu`. **Varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa meripihkakauppias Tadeuszille — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Kraków — meripihkakauppias Tadeusz.** Puolalainen mies, noin
> 50–60-vuotias, tukeva vartalo, harmaantuva viikset. Paikka: Sukiennicen
> sisäkäytävä sen uusgoottilaisten kaariholvien alla — EI Mariankirkon
> tornia eikä torvea missään muodossa. Kesken aidon tekemisen: kääntää
> meripihkahelmiä valoa vasten. Valo/sää: iltapäivän valo lankeaa sisään
> kaariaukoista, lämmin keltainen sävy meripihkassa. Rajaus enintään
> puolivartalo. **Ei näytetä:** Stanisławia, torvea, tornia tai
> hejnał-aihetta missään muodossa.

---

# Kohtaaminen erä C5: Warszawa

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Varsovalla on jo tarinakaari. Kaaren oma `henkilo`-kenttä:

> "Antikvaari Zofia pitää puotia vanhan kirjastotalon kulmalla ja löytää
> mitä tahansa, kunhan saa eränumeron."

Tiedoston oma laaja kommentti kertoo koko päätöshistorian: **5.9.2026
klo 20:05 UTC Fable päätti** *"Varsova: yhdistetään antikvaari Zofiaan
(kalastaja Jadwiga pois kaaresta)"* — kaupungilla oli aiemmin KAKSI
kilpailevaa kohtaamishenkilöä (kaaressa kalastaja Jadwiga, fokusvirrassa
antikvaari Zofia), ja päätös poisti Jadwigan kokonaan kaaresta.

**Kuvatarkistus — KAKSI Varsova-riviä, ERI hahmot:**

- `varsova-zofia-round2-r20260905-v1` — hahmo **Zofia**, tila
  `tarkistettu`, aktiivinen. **Tämä on kaaren nykyinen hyväksytty kuva,
  kokonaan varattu.**
- `varsova-jadwiga-joki` — hahmo **Jadwiga**, tila `'arkisto'`.

**Johtopäätös Jadwigasta:** Jadwiga EI ole käyttökelpoinen mihinkään —
ei tälle riville, ei muuallekaan, kahdesta riippumattomasta syystä: (a)
mekaaninen este — `kohtaamiskuvat.test.mjs`:n testi hyväksyy vain
`tila === 'tarkistettu'` -kuvat; (b) sisällöllinen este — koko Jadwigan
tarinamaailma (verkonpainot, rantakiven kätkö, suvun mereneitolupaus)
päätettiin nimenomaisesti POISTAA kaaresta 5.9.2026. Rinnastuu Dublinin
`dublin-molly-kassa`-tapaukseen C3:sta — hylätty konsepti, ei vapaa
toinen hahmo.

Muut aiheet jotka on jo käytetty Varsovan lehdessä/kysymyksissä
(vältettävä toistoa): Kierbedźin silta ja hevosraitiovaunu, Załuskien
kirjasto, Canaletto/Bellotto, sodanjälkeinen jälleenrakennus, Chopin,
Skłodowska-Curie, Veiksel-joki ja mereneitolegenda.

## Warszawa — suklaakaupan oppipoika Wiktor

**hahmo:** `'suklaakaupan oppipoika Wiktor'`

**nappi:** `'Tapaa Wiktor'`

**frame:** `'Wiktor pujahtaa suklaakaupan ovelta ja kysyy'`

**tervehdys** (202 merkkiä, raja ~280):
`'Wiktor pyyhkii kaakaonpölyn käsistään ja vilkaisee kirjaasi: "Isoisäsi vuosi? Silloin puoti oli jo vanha. Näytä että tunnet maailmaa kuten piirtäjä — niin annan maistiaisen, josta et kerro kenellekään."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Wiktor pyyhkii kaakaonpölyn käsistään ja '
    + 'vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi vuosi? Silloin puoti '
    + 'oli jo vanha. [warmly] Näytä että tunnet maailmaa kuten piirtäjä '
    + '— niin annan maistiaisen, josta et kerro kenellekään."' },
]
```

**loyto** (114 merkkiä, raja 130):
`'Wiktor löytää rasian kaakaosäkkien takaa: "En tiennyt, että täällä on tilaa muullekin." — "Isäni ei uskoisi tätä."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Wiktor löytää rasian kaakaosäkkien '
    + 'takaa:' },
  { rooli: 'hahmo', teksti: '[surprised] "En tiennyt, että täällä on '
    + 'tilaa muullekin." [laughing] "Isäni ei uskoisi tätä."' },
]
```

**tyhja** (105 merkkiä, raja 130):
`'Wiktor koputtaa tyhjää hyllyä: "Tässä ei ole mitään. Täältä siivotaan joka aamu, ennen kuin ovi avataan."'`

**vaarin** (103 merkkiä, raja 130):
`'Wiktor pudistaa päätään hymyillen: "Ei vielä. Puoti on auki huomennakin — tule takaisin kaakaonhajuun."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Varsovan ehkä tunnetuin makeiskauppa-suku, Wedel, avasi ensimmäisen
puotinsa Miodowa-kadulle vuonna **1851**. Isoisän matkavuonna 1873
Miodowa-kadun puoti oli siis jo yli kaksikymmentä vuotta vanha,
vakiintunut osa katukuvaa — ei tuore uutuus vaan jo perinne.

Lähteet (tarkistettu 22.9.2026, WebSearch):
- [E. Wedel – Wikipedia](https://en.wikipedia.org/wiki/E._Wedel)
- [The history of E.Wedel – Wedel.com](https://wedel.com/o-firmie/aktualnosci/the-history-of-e-wedel-poland-s-iconic-chocolate-factory)

## Olemassa olevat Varsova-kuvakonseptit (ristiriitatarkistus)

- `varsova-zofia-round2-r20260905-v1` — hahmo Zofia, antikvariaatti,
  tila `tarkistettu`, aktiivinen. **Varattu kaaren omaan kohtaamiseen.**
- `varsova-jadwiga-joki` — hahmo Jadwiga, joki/siivousverkko, tila
  `'arkisto'`. **Ei käytettävissä mihinkään** — mekaanisesti estetty
  JA sisällöllisesti hylätty konsepti.
- Ei olemassa olevaa kuvaa suklaakaupan oppipoika Wiktorille — uusi
  tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Warszawa — suklaakaupan oppipoika Wiktor.** Puolalainen nuori mies,
> noin 16–20-vuotias, hoikka, tumma tukka jonka otsalle on tarttunut
> kaakaojauhetta. Paikka: pieni, 1800-luvun konditoria-suklaakaupan
> myymälätila — puiset tiskit, lasipurkkeja täynnä suklaakonvehteja.
> Kesken aidon tekemisen: seisoo tiskin takana, toinen käsi vielä
> kaakaosäkissä. Valo: lämmin sisävalo. Rajaus enintään puolivartalo.
> **Ei näytetä:** kirjahyllyjä, tilikirjoja tai muuta antikvariaattiin
> viittaavaa, ei jokea, verkkoa eikä venettä, ei tunnistettavaa
> Wedel-kylttiä tai muuta tuotemerkkiä.

---

# Kohtaaminen erä C5: Sarajevo

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Sarajevolla on jo tarinakaari. Kaaren oma `henkilo`-kenttä:

> "Kupariseppä Adnan takoo kannuja ja kuppeja kujalla, jolla hänen sukunsa
> paja on soinut kolmesataa vuotta."

`js/kohtaamiskuvat-data.js` sisältää rivin `sarajevo-adnan-8d19fb11c377`,
hahmo **Adnan**, tila `tarkistettu` — kiistatta varattu kaaren omaan
kohtaamiseen.

**Lehtitarkistus (mitä kaupunkilehti jo kattaa, ettei tervehdys
kertaisi samaa):** "Kazandžiluk"-oppitunti kattaa jo kupariseppien
kujan JA bosnialaisen kahvin (kaksinkertaisesti varattu). Etusivun
herokaruselli kattaa jo Gazi Husrev-begin moskeijan, Sahat-kulan
(kuukalenterikello) ja Latinalaisen sillan. "Uhman talo" ja "Sarajevon
haggada" -täyt kattavat omat aiheensa.

**Johtopäätös:** Adnan, kupariseppäammatti ja koko kahvi/kupari-aihepiiri
ovat varattuja, ja Sahat-kula, moskeija, silta, Ferhadija-katu, Uhman
talo ja haggada ovat kaikki jo lehden kertomia. Kirjoitin siis kokonaan
uuden hahmon uudella ammatilla, uudella kujalla ja uudella isoisä-
koukulla: **satulaseppä Amra**, satulaseppien omalla kujalla (Sarači —
eri kuja kuin kupariseppien Kazandžiluk).

## Sarajevo — satulaseppä Amra

**hahmo:** `'satulaseppä Amra'`

**nappi:** `'Tapaa Amra'`

**frame:** `'Amra pingottaa nahkahihnaa ja kysyy'`

**tervehdys** (269 merkkiä, raja ~280):
`'Amra pingottaa uutta satulaa penkin yli ja vilkaisee kirjaasi: "Rautatie ei yltänyt tänne vielä yhdeksään vuoteen — isoisäsi laukku kulki vuorten yli juuri tällaisen satulan selässä. Näytä että tunnet maailmaa kuten piirtäjä — niin ompelen sinulle oman hihnan matkaan."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Amra pingottaa uutta satulaa penkin yli '
    + 'ja vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Rautatie ei yltänyt tänne '
    + 'vielä yhdeksään vuoteen — isoisäsi laukku kulki vuorten yli '
    + 'juuri tällaisen satulan selässä. [warmly] Näytä että tunnet '
    + 'maailmaa kuten piirtäjä — niin ompelen sinulle oman hihnan '
    + 'matkaan."' },
]
```

**loyto** (123 merkkiä, raja 130):
`'Amra löytää rasian satulapinon alta: "Tämä ei ole minun ompelujälkeäni — mutta joku on halunnut piilottaa sen juuri tänne."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Amra löytää rasian satulapinon alta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole minun '
    + 'ompelujälkeäni — mutta joku on halunnut piilottaa sen juuri '
    + 'tänne."' },
]
```

**tyhja** (91 merkkiä, raja 130):
`'Amra pyyhkii pölyn hyllyltä: "Tyhjä. Kuja vaihtaa käsiä joka päivä — joku ehti jo aiemmin."'`

**vaarin** (92 merkkiä, raja 130):
`'Amra jatkaa ompelua katsomatta ylös: "Ei vielä. Hihnakin pettää, jos sitä kiirehtii liikaa."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Isoisän matkavuonna 1873 Sarajevoon ei yltänyt yksikään rautatie:
kaupungin ensimmäinen rautatieasema rakennettiin vasta **1882**,
Itävalta-Unkarin vallan aikana. Ennen sitä matkalaukut ja tavarat
kulkivat vuoristossa kuormasatuloiden selässä. Satulaseppien
ammattikunta (samardžija/sarači) oli yksi Baščaršijan vanhoista
ammattikunnista, ja sen kadulla — nimeltään **Sarači** — valmistettiin
juuri näitä kuormasatuloita.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Sarajevo main railway station – Wikipedia](https://en.wikipedia.org/wiki/Sarajevo_main_railway_station)
- [History of crafts in Sarajevo – Destination Sarajevo](https://sarajevo.travel/en/text/history-of-crafts-in-sarajevo/267)

## Olemassa olevat Sarajevo-kuvakonseptit (ristiriitatarkistus)

- `sarajevo-adnan-8d19fb11c377` — hahmo Adnan, kupariseppäpaja, tila
  `tarkistettu`. **Varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa satulaseppä Amralle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Sarajevo — satulaseppä Amra.** Bosniakkinainen, noin 35–45-vuotias.
> Paikka: kapea, kivetty satulaseppien kuja (Sarači) Baščaršijassa —
> puotien seinillä kuormasatuloita ja nahkahihnoja, EI kupariastioita
> eikä kupariseppien pöytiä. Kesken aidon tekemisen: istuu matalalla
> jakkaralla, pingottaa nahkahihnaa puolivalmiin kuormasatulan yli.
> Valo/sää: iltapäivän valo lankeaa viistosti kujalle. Rajaus enintään
> puolivartalo. **Ei näytetä:** kuparipannuja tai muuta Kazandžilukin/
> Adnanin kuparityötä, ei Sahat-kulan kellotornia, Gazi Husrev-begin
> moskeijaa eikä Latinalaista siltaa, ei mitään rautatiehen viittaavaa
> esinettä.

---

valmis
