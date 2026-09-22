# Kohtaaminen — København (kaupunki-id `kobenhavn`), erä C2

Sisältökirjuri-sessio, 22.9.2026. Sisältöä valmisteltu suoraan
`js/packs/kohtaamiset.js`-tiedoston rakenteen mukaisesti (ks. tiedoston
alun dokumentaatio ja `lontoo`-, `dubrovnik`-, `pariisi`-, `helsinki`- ja
`istanbul`-rivit mallina). **Tiedostoa ei ole muokattu** — tämä on
raportti Fablen (päätoimittajan) hyväksyntää varten.

## Esitutkimus: onko Kööpenhaminalle jo hyväksytty kohtaamiskonsepti?

Grepattu `js/kohtaamiskuvat-data.js`, `docs/kuvatuotanto-kohtaamiset.md`
ja `docs/raportit/` hakusanoilla "Kööpenhamina", "Copenhagen", "kobenhavn",
"Tivoli" ja "Freja":

- **Löytyi:** `js/kohtaamiskuvat-data.js` sisältää tarkistetun
  (`tila: 'tarkistettu'`) kuvarivin `kobenhavn-freja-07d795379e80`:
  hahmo **Freja** sulkee Tivolin musiikkikarusellia. Rivin oma kommentti
  sanoo tämän olevan **"Kööpenhaminan kaaren kohtaamiskuvaksi"**
  hyväksytty (root hyväksyi 12.9.2026) — eli tämä kuuluu
  tarinakaari-mekaniikkaan (`js/tyohuone-kehitys-data.js` KAARI_PAKETIT
  / `js/packs/fokusvirta-kobenhavn.js`), **ei** tähän tehtävän kohteena
  olevaan tavalliseen `js/packs/kohtaamiset.js`-pakettiin. Vahvistin
  tämän myös `js/packs/kulttuuri-kategoriat.js`- ja
  `js/packs/maakartat.js`-riveistä, joissa esiintyy erillinen
  `syvennys-kobenhavn-tivoli`-nosto samaan Tivoli-kaariin liittyen.
- `docs/kuvatuotanto-kohtaamiset.md`:n tyylikoegalleriassa ei ole
  Kööpenhaminaa/Freja-riviä lainkaan (taulukko kattaa mm. Lontoon,
  Amsterdamin, Venetsian, Wienin, Pariisin, Rooman — ei Kööpenhaminaa).
- `js/packs/kohtaamiset.js`:ssä ei ole `kobenhavn`-avainta ollenkaan
  (`grep -n "kobenhavn" js/packs/kohtaamiset.js` → ei osumia). Tämä on
  siis aidosti uusi rivi.

**Johtopäätös:** koska Freja on jo sidottu Tivoliin *kaarikohtaamisessa*,
tehtävänannon oma ohje ("ei Tivoli itsessään jos hahmo Freja on jo
sidottu sinne") pätee suoraan — alla oleva konsepti on kokonaan uusi
hahmo ja paikka, ei Tivoli, ei Freja.

## 1873-fakta ja lähde

Polkupyörä (velosipedi) oli 1870-luvulla Euroopassa vasta harvinainen,
kallis muotivempain — lähinnä varakkaiden nuorten miesten huvi — eikä
suinkaan arkinen kulkuväline. Käytännöllisemmät mallit ja laajempi,
kaikki yhteiskuntaluokat kattava käyttö tulivat vasta vuosikymmeniä
myöhemmin (1900-luvun alkupuolella), minkä jälkeen Kööpenhaminasta
kehittyi maailman tunnetuin pyöräilykaupunki — sama kontrasti näkyy jo
pelin omassa iskulauseessa (`js/packs/iskulauseet.js`, kobenhavn:
"Pyöräilijöiden ja satujen kaupunki").

Lähteet (tarkistettu 22.9.2026):
- Cycling Embassy of Denmark, "Danish cycling history":
  polkupyörä oli aluksi *"the big fashion craze – especially among
  young men in high society"*, ja vasta myöhemmin *"the general
  public... quickly adopted them"*.
- Yleinen englanninkielinen pyörähistoria (mm. Ingenium Canada,
  Smithsonianin velosipedi-artikkeli): 1870-luvun velosipedit
  ("boneshaker") olivat kallis, rajoitetun piirin muoti-ilmiö ennen
  laajempaa 1900-luvun arkikäyttöä.

En löytänyt luotettavaa lähdettä tarkalle päivämäärälle "polkupyörä
saapui Kööpenhaminaan juuri 1873", joten en väitä sellaista — fakta on
rajattu varovaisesti yleiseen 1870-luvun ilmiöön, kuten tehtävänannossa
pyydettiin ("älä keksi jos et löydä").

## Olemassa oleva kuvamateriaali

Ei mitään käyttökelpoista tälle konseptille. Ainoa olemassa oleva
Kööpenhamina-kuva (Freja/Tivoli) kuuluu eri mekaniikkaan (kaarikohtaaminen),
kuten yllä. Uusi kuva pitää tilata kokonaan.

---

## København — pyörämekaanikko Sofie

**hahmo:** "pyörämekaanikko Sofie"

**nappi:** "Tapaa Sofie"

**frame:** "Sofie kääntää lastipyörän kyljelleen ja kysyy"

**tervehdys:** "Sofie pyyhkii rasvaiset kädet farkkuihin ja vilkaisee
kirjaasi: \"Isoisäsi aikaan tuollainen kahden pyörän härveli oli kallis
muotileikki harvoille herroille. Nyt koko kaupunki kulkee näillä. Näytä
että tunnet maailmaa kuten piirtäjä — niin katson mitä rungosta
löytyy.\"" (269 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Sofie pyyhkii rasvaiset kädet farkkuihin ja vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[amused] "Isoisäsi aikaan tämä oli kallis muotileikki harvoille herroille. [warmly] Nyt koko kaupunki kulkee näillä."' },
]
```

**loyto:** "Sofie kaivaa rasian satulatuesta ja hymyilee: \"Tämä on
odottanut täällä kauemmin kuin yksikään rengas kestää.\"" (110 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Sofie kaivaa rasian satulatuesta ja hymyilee:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä on odottanut täällä kauemmin kuin yksikään rengas kestää."' },
]
```

**tyhja:** "Sofie koputtaa runkoa ja pudistaa päätään: \"Tyhjä. Tätä
pyörää on korjattu ja osista koottu niin monesti.\"" (106 merkkiä)

**vaarin:** "Sofie kiristää pultin uudelleen: \"Ei ihan. Minäkin
arvasin väärin, ennen kuin opin katsomaan runkonumerosta.\"" (109 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.55 }  // Sofie ei ole vain utelias kirjasta vaan lämpimän huvittunut vanhan ja nykyisen kontrastista — poikkeaa rekisterin oletuksesta samalla tavalla kuin Kemal/Otto
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**Kaksi ääntä -tarkistus:** tervehdysLuenta ja loytoLuenta käyttävät
vain rooleja 'kertoja' ja 'hahmo' — ei 'pelaaja'-riviä, nuori Fogg ei
puhu eikä kommentoi missään kohdassa (docs/tarina.md, "Kaksi ääntä").
Kaikki inline-tagit ([amused], [warmly], [surprised]) ovat englanniksi.

**Perustelu hahmolle ja paikalle:** Freja/Tivoli on jo käytössä
kaarikohtaamisessa, joten Sofie on täysin eri hahmo, eri ammatti ja eri
paikka: lastipyörien (ladcykel) korjaamo Christianshavnin kanavan
laiturilla — omaperäinen kulma, ei Nyhavnin postikorttinäkymä eikä
Tivoli. 1873-kontrasti (kallis harvojen muotivempain vs. tämän päivän
jokaisen arkinen kulkuväline) kytkeytyy myös pelin omaan
Kööpenhamina-iskulauseeseen.

## Kuvatilaus Codexille

**Hahmo:** Sofie, n. 30–35-vuotias tanskalainenainen pyörämekaanikko.
Työhaalari tai paksu esiliina käytännöllisten vaatteiden päällä, hihat
käärittynä, tukka sidottu taakse pipon tai huivin alle. Kädet ja
kynsien alukset rasvaiset/mustuneet aidosti työn jäljiltä.

**Tekeminen kesken kuvan:** Sofie on kyykyssä tai polvillaan lastipyörän
(kolmipyöräinen, iso laatikko edessä — "Christiania bike" -tyyppinen
kaupunkilastipyörä) vieressä, jakoavain kädessä kesken pyörän etuakselin
kiristämistä. Pyörä on käännetty osittain kyljelleen korjaustelineessä
tai nojaamassa seinään.

**Kaksi aikakerrosta:** Etualalla/keskiössä nykyinen, käytännöllinen
lastipyörä (maalattu, kolhuinen, aidosti käytetty — ei studiokiiltoa).
Taustalla työpajan seinällä vanha, kellastunut juliste tai kehystetty
mustavalkokuva 1800-luvun korkeapyörästä (penny-farthing / velosipedi)
koristeellisine herrasväkineen — pieni yksityiskohta, ei kuvan pääaihe,
kertoo ajan kontrastin ilman selittävää tekstiä.

**Ilme/reaktio aarrekysymykseen:** Sofie kohottaa katseensa työstä
suoraan kameraan/pelaajaan, puoliksi yllättynyt ja puoliksi huvittunut
puolihymy, toinen kulmakarva koholla — kuin olisi jäänyt kiinni kesken
työn mutta ei häiriinny siitä.

**Valo/sää:** Pohjoismainen pilvinen päivänvalo, viileän harmaansininen
sävy, syksyinen ilma; työpaja avoimen pihan tai kanavan laiturin
kupeessa, kivetys hieman kostea (ei sadetta kuvassa, vain kosteuden
kiilto). Rajaus enintään puolivartalo, tausta pehmeä mutta työpaja ja
kanavan reunan viite vielä luettavissa — ei kaupunkimaisemaa tarvita.

**Ei näytetä:** kysymyksen oikeaa vastausta tai mitään tarkkaa
sijaintivihjettä; ei tekstiä, logoja tai vesileimoja kuvan sisällä; ei
Tivolia eikä mitään Freja-hahmoon viittaavaa.

---

valmis
