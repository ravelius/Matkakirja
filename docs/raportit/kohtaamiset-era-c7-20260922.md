# Kohtaamiset erä C7 (viimeinen): Tromssa ja Valletta (2026-09-22)

Sisältökirjuri (Sonnet), päättää erien C1–C7 sarjan. Fablen uusi
kriteeri (22.9.2026): tavoite ei ole enää nostomäärä vaan kohtaaminen
JOKAISELLE Euroopan pelikaupungille, jolla on fokusvirta (kevyt tai
täysi — Fable vahvisti, ettei kevyt fokusvirta enää estä kohtaamisen
kirjoittamista, koska kohtaaminen kulkee vihreä piste → laattakysymys
-polkua eikä fokusvirtakortin kautta).

Laskettu tarkasti: `js/packs/fokusvirrat.js` FOKUSVIRRAT-objektissa on
45 kaupunkikohdetta (50 avainta miinus 5 aluepakettia jotka eivät ole
yksittäisiä kaupunkeja: kreeta, sisilia, islanti, alpit, lappi). Kun C1–C6
(36 kaupunkia) lasketaan yhteen jo aiemmin olemassa olleiden kanssa,
JÄLJELLÄ oli enää KAKSI kaupunkia: **Tromssa** ja **Valletta**. Tämä on
siis koko sarjan viimeinen erä.

| Kaupunki | Huomio |
| --- | --- |
| Tromssa | Yllättäen ON tarinakaari (KAARI_PAKETIT id 'tromssa', venemekaanikko Sigrid, satama) eri järjestelmässä kuin kohtaamiset.js — varattu, vältetty. Uusi hahmo kirkon urkuri Kirsten, Tromssan puukirkossa. Isoisä-koukku: kirkon urut asennettiin 1863, soineet ~10 vuotta isoisän 1873-käynnin aikaan. Uusi kuva tarpeen. |
| Valletta | Teksti kirjoitettu jo erässä C6 (teatterin lipunmyyjä Rita, oopperatalon tulipalo 25.5.1873) mutta jätettiin silloin pois datasta "ei täyttä lehteä" -perusteella. Fable vahvisti 22.9.2026: kevyt fokusvirta ei estä — kirjoitetaan nyt dataan tavallisena kohtaamisena, kuten Bryssel/Ljubljana/Košice/Luxemburg jo ovat. Teksti kopioitu tähän muuttumattomana C6-raportista. |

**Tekninen huomio (ei sisältöasia, kirjattu tiedoksi):** Laitetestaaja
vahvisti savukkeella, että Košicessa (kevyt fokusvirta) kohtaaminen ei
tällä hetkellä avaudu pelissä — juurisyy on `js/packs/fokusvirta-kosice.js`:n
puuttuvat `kohtaaminen: true` / `kohtaamispiste`-kentät, ei sisältövirhe.
Sama korjaustarve koskee todennäköisesti Brysseliä, Ljubljanaa,
Luxemburgia ja pian Tromssaa/Vallettaa. Fablelle ilmoitettu erikseen;
korjaus on fokusvirta-wiring-työtä (Karttaseppä/Pelikoodari), ei
sisältötyötä.

Rakenne sama kuin erät C1–C6. Ei vielä kirjoitettu js/packs/kohtaamiset.js:ään
— tarkastukseesi ensin. Kun tämä hyväksytään, kaikki 45 fokusvirta-
kaupunkia (+ vanhan järjestelmän kaupungit kuten Kairo) ovat saaneet
kohtaamisen.

---

# Kohtaaminen erä C7: Tromssa

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Tehtävänannon oletus ("Tromssalla EI OLE tarinakaarta") **ei pitänyt
paikkaansa**:

1. **Tromssalla ON olemassa oleva tarinakaari**, eri, vanhemmassa
   järjestelmässä kuin `js/packs/kohtaamiset.js`: `js/tyohuone-kehitys-data.js`
   `KAARI_PAKETIT.kohteet`-taulukossa on rivi `id: 'tromssa'` ("Tromssa —
   työvuoro ilman yötä"). Hahmo on **venemekaanikko Sigrid**, joka
   korjaa sataman veneitä ja kerää talteen purettujen laitureiden
   heloja; kysymyksen fakta on Tromssan lempinimi "Pohjolan Pariisi".
   Sigrid, satama, venekorjaus ja purettu laituri ovat siis kiistatta
   varattuja kaaren omaan kohtaamiseen — sama periaate kuin C6:n
   kaarikaupungeissa (Marseille/Baptiste, Kiova/Danylo, Riika/Ilze).
2. **Tromssa on kevyt fokusvirta** (`KEVYET_FOKUSVIRRAT`) — Fable on
   vahvistanut ettei tämä estä kohtaamisen kirjoittamista.

`js/kohtaamiskuvat-data.js`:ssä ja `docs/kuvatuotanto-kohtaamiset.md`:ssä
ei ole yhtään Tromssa-osumaa — uusi hahmo tarvitsee uuden kuvan.

**Fokusvirran jo kattamat aiheet** (vältetty): uusi museo (simpukka,
tuntematon luu, laivanvarustaja), Polaarimuseo (avattu 1978,
tullirakennukset), sataman hylkeenpyytäjät, keskiyön aurinko.

Valittu uusi aihe: **Tromssan puukirkko (tuomiokirkko) ja sen urut** —
kokonaan käyttämätön aihepiiri.

## Tromssa — kirkon urkuri Kirsten

**hahmo:** `'kirkon urkuri Kirsten'`

**nappi:** `'Tapaa Kirsten'`

**frame:** `'Kirsten nostaa kätensä koskettimilta ja kysyy'`

**tervehdys** (264 merkkiä, raja ~280):
`'Kirsten kääntyy urkujen luota ja katsoo kirjaasi: "Nämä pillit soivat tässä puukirkossa vasta kymmenen vuotta — minä olen soittanut niitä koko sen ajan. Näytä että tunnet maailmaa kuten piirtäjä — niin soitan sinulle sävelen, jota kukaan muu ei kuule tänä vuonna."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Kirsten kääntyy urkujen luota ja katsoo '
    + 'kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Nämä pillit soivat tässä '
    + 'puukirkossa vasta kymmenen vuotta — minä olen soittanut niitä '
    + 'koko sen ajan. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin soitan sinulle sävelen, jota kukaan muu ei '
    + 'kuule tänä vuonna."' },
]
```

**loyto** (119 merkkiä, raja 130):
`'Kirsten nostaa rasian urkupenkin alta: "Tämä ei ole ilmapiirin osa eikä pilli — joku on jättänyt tänne oman sävelensä."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Kirsten nostaa rasian urkupenkin '
    + 'alta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole ilmapiirin osa '
    + 'eikä pilli — joku on jättänyt tänne oman sävelensä."' },
]
```

**tyhja** (125 merkkiä, raja 130):
`'Kirsten koputtaa tyhjää urkulaatikkoa: "Tyhjä. Puukirkko notkuu ja elää — mikä tahansa irtonainen liikkuu täällä ajan myötä."'`

**vaarin** (113 merkkiä, raja 130):
`'Kirsten painaa koskettimen hiljaa alas: "Ei vielä. Sävel ei synny ensimmäisellä yrityksellä — kokeile uudestaan."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Tromssan tuomiokirkko on Norjan ainoa kokonaan puinen luterilainen
tuomiokirkko. Se vihittiin käyttöön 1. joulukuuta 1861. Kirkon **urut
asennettiin vuonna 1863** — isoisän heinäkuun 1873 käynnin aikaan urut
olivat siis soineet vasta noin kymmenen vuotta.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Tromsø Cathedral – Wikipedia](https://en.wikipedia.org/wiki/Troms%C3%B8_Cathedral)
- [Tromsø Domkirke – Frommer's](https://www.frommers.com/destinations/tromso/attractions/troms-domkirke/)

## Olemassa olevat Tromssa-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä millään tiedostolla.
- Ei olemassa olevaa kuvaa kirkon urkuri Kirstenille — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Tromssa — kirkon urkuri Kirsten.** Norjalainen nainen, noin
> 35–55-vuotias. Paikka: Tromssan puukirkon urkuparvi — vanhat puiset
> urkupillit riveissä, keltaiseksi maalattu puinen sisätila — **ei
> satamaa, ei veneitä, ei Polaarimuseota, ei simpukoita tai luita, ei
> mitään viittausta "Pohjolan Pariisi" -nimeen**. Kesken aidon
> tekemisen: sormet koskettimilla. Valo/sää: kesäinen keskiyön aurinko
> siivilöityy ikkunoista pehmeänä, viileän keltaisena valona. Rajaus
> enintään puolivartalo. **Ei näytetä:** rasian sisältöä, nuottikirjan
> tekstiä luettavana, kirkon ulkoarkkitehtuuria kokonaisuudessaan.

---

# Kohtaaminen erä C7: Valletta (teksti C6:sta, kirjoitetaan nyt dataan)

Alkuperäinen tutkimus ja kirjoitus C6:ssa (22.9.2026). Fable vahvisti
22.9.2026, ettei kevyt fokusvirta estä kirjoittamista — sama peruste
joka piti Rita-tekstin pois C6:n datasta, ei enää päde.

## Valletta — teatterin lipunmyyjä Rita

**hahmo:** `'teatterin lipunmyyjä Rita'`

**nappi:** `'Tapaa Rita'`

**frame:** `'Rita avaa lippukopin luukun ja kysyy'`

**tervehdys** (243 merkkiä, raja ~280):
`'Rita nojaa lippukoppiin vanhan oopperatalon paikalla: "Isoisäsi käyntivuonna talo oli juuri palanut sisältä tyhjäksi — se pysyi kiinni lähes viisi vuotta. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mistä liekit silloin lähtivät."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Rita nojaa lippukoppiin vanhan '
    + 'oopperatalon paikalla:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi käyntivuonna talo oli '
    + 'juuri palanut sisältä tyhjäksi — se pysyi kiinni lähes viisi '
    + 'vuotta. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — '
    + 'niin kerron, mistä liekit silloin lähtivät."' },
]
```

**loyto** (117 merkkiä, raja 130):
`'Rita nostaa rasian lippukopin lattian raosta: "Tämä ei ole palon jälkeä. Joku on piilottanut tämän paljon myöhemmin."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Rita nostaa rasian lippukopin lattian '
    + 'raosta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole palon jälkeä. '
    + 'Joku on piilottanut tämän paljon myöhemmin."' },
]
```

**tyhja** (110 merkkiä, raja 130):
`'Rita koputtaa tyhjää rakoa vanhassa muurissa: "Tyhjä. Tätä paikkaa on rakennettu uudelleen niin monta kertaa."'`

**vaarin** (94 merkkiä, raja 130):
`'Rita sulkee luukun hetkeksi: "Ei vielä. Esitys alkaa vasta illalla — ehdit yrittää uudelleen."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Vallettan kuninkaallinen oopperatalo avattiin 9.10.1866. 25.5.1873 —
isoisän matkavuonna, vain kuukausia ennen hänen syyskuun käyntiään
Vallettassa — rakennuksessa syttyi tulipalo. Teatteri pysyi suljettuna
lähes neljä ja puoli vuotta, avautuen uudelleen vasta 11.10.1877.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Royal Opera House, Valletta – Wikipedia](https://en.wikipedia.org/wiki/Royal_Opera_House,_Valletta)
- [The Royal Opera House in Valletta – whitemad.pl](https://www.whitemad.pl/en/the-royal-opera-house-in-valletta-a-gem-that-was-never-rebuilt/)

## Kuvatarve: uusi tilaus Codexille

> **Valletta — teatterin lipunmyyjä Rita.** Maltalainen nainen, noin
> 40–55-vuotias. Paikka: Pjazza Teatru Rjalin pieni lippukoppi — **ei
> St. Johanneksen konkatedraalia, ei Grand Harbouria, ei
> Triton-suihkulähdettä eikä muita Vallettan maamerkkejä
> tunnistettavina**. Kesken aidon tekemisen: nojaa avoimeen
> lippuluukkuun. Valo/sää: iltapäivän lämmin, kultainen Välimeren
> valo. Rajaus enintään puolivartalo. **Ei näytetä:** itse tulipaloa
> tai liekkejä missään muodossa, ei sotapommitusten jälkiä tai
> raunioita pääaiheena, ei lipun tekstiä luettavana.

---

valmis
