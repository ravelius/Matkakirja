# Työlista toteuttajalle (Opus)

> **EI TARINAKAARTA UUSIIN KOHTEISIIN (omistajan sitova päätös
> 17.8.2026):** kun uusia kaupunkeja ja maita kirjoitetaan (mm.
> paketit O6 ja O7), EI tehdä matkakirjatekstejä, kohtaamisia eikä
> kysymyksiä — koko kaari muuttuu myöhemmin. Tehdään VAIN
> kaupunkilehti ja maalehti. Linjaus on Raamatussa (Kaupungit).
>
> **LEHTITAUKO (omistajan päätökset 15.8. ja 17.8.2026):** uusia
> kaupunki- TAI maalehtiä ei aloiteta, ennen kuin nyt työn alla
> olevat lehdet (O6:n kuusi kaupunkia viimeistelyineen: kohdekartat,
> kohteet juttuineen, miniatyyrit, sää) on saatu TÄYSIN valmiiksi ja
> omistaja on tarkistanut ne. Fable ilmoittaa omistajalle jokaisesta
> valmistuvasta lehdestä; vasta kaikkien kuittausten jälkeen
> jatketaan uusiin (mm. O7/Afrikka), ellei omistaja toisin käske.
> Olemassa olevien lehtien parannus ja jälkityöt eivät riko taukoa.
> Tarkistuksen ydin on KUVAT (omistaja 17.8.: "oikein valitut ja
> laadukkaat kuvat ovat yksi iso haaste") — Fable toimittaa
> jokaisesta valmistuvasta lehdestä kontaktiarkin kuvista
> lisensseineen tarkistuksen pohjaksi. Loppuerän työstötapa
> päätetään yhdessä omistajan kanssa tuotantosuunnitelman pohjalta
> vasta kuittausten jälkeen; maalehtiin voi tulla vielä korjauksia,
> joten uudet maalehtiavaukset odottavat samaa.
>
> **Piirrosputken kustannussääntö (omistajan päätös 16.8.2026,
> budjetti nostettu tätä vastaan):** miniatyyripiirrokset
> generoidaan kiristetyllä putkella — YKSI otto per kohde
> (tools/generoi-miniatyyrit.mjs ohittaa valmiit tiedostot
> automaattisesti), hylätyt kirjataan ja generoidaan uudelleen
> täsmäavaimilla vasta katselmoinnin jälkeen. Ei koskaan
> "generoi kunnes kelpaa" -silmukkaa eikä koko listan
> uusinta-ajoja. Jokainen generointi maksaa ~0,04 €.
>
> **Kuvien silmätarkistus monistusvaiheessa (omistajan linjaus
> 15.8.2026):** kun Kööpenhaminan lehtimalli on valmis ja sitä
> aletaan kopioida muihin kaupunkeihin, Opus käy samalla läpi
> jokaisen lehden KAIKKI etusivukuvat silmin (esikatselu ladataan ja
> katsotaan — ruuhkassa .github/workflows/nouda-tarkistuskuvat.yml)
> ja vaihtaa visuaalisesti heikot. Esimerkki hylättävästä: kuva jossa
> pääosassa on varjo tai yksityiskohta eikä itse kaupunki.

> **ETUSIVUKUVAN KAAVA (omistajan linjaus 16.8.2026):** kaupungin
> Matkailijalle-osion kuva on osion myyntikuva, ei kuvitus. Se näkyy
> noin 272 pikselin levyisenä, joten sen on toimittava pienenä.
> Omistajan sanoin: *"kuva pitää olla yksinkertainen, laadukas ja
> houkutteleva eli wow efekti jostain maan erikoisuudesta."*
>
> 1. **Yksi aihe, joka täyttää ruudun.** Ei katunäkymää, ei useaa
>    kohdetta, ei ihmisjoukkoa.
> 2. **Aiheen on oltava paikan oma erikoisuus** — se, jonka takia
>    sinne matkustetaan. Kuva, joka voisi olla mistä tahansa
>    kaupungista, ei kelpaa, vaikka se olisi kuinka siisti.
> 3. **Commonsin Featured picture tai Quality image**, jos sellainen on
>    olemassa: ne on jo arvioitu laadun takia.
> 4. **Selkeä valo ja rauhallinen tausta.** Pääaihe keskelle tai
>    alavasemmalle — oikean yläkulman yli kulkee Matkaopas-nauha.
>
> Pariisissa meni kaksi yritystä: terassinäkymä oli pienessä koossa
> sekava, ja sitä seurannut kahvikuva oli yksinkertainen mutta olisi
> voinut olla mistä tahansa (*"tämä kuva ei houkuttele
> matkustamaan"*). Kolmas osui: Eiffel-torni tyhjää taivasta vasten.

## Näin tätä listaa käytetään (päivitetty remontin D6:ssa 17.8.2026)

Työtä tekevät Fablen sisäiset agentit, jotka saavat tehtävänsä
perustamispromptissa — tämä lista on pakettien speksi ja tilakirja.
Seuraava tekemätön paketti näkyy otsikon tilamerkistä (🟡 KESKEN,
⬜ ODOTTAA); valmis paketti kuitataan otsikkoon (✅ + PR + pvm) ja
siirretään arkistoon. Uudet paketit lisää omistaja tai Fable.
Valmiit paketit ja koko vanha historia:
docs/arkisto/tyolista-opukselle-2026-08.md.

## Paketti O9: kaikki lehdet valmiiksi + uudet mantereet (tilattu 22.8.2026) 🟡 KESKEN

**Omistajan tilaus 22.8.2026 illalla (kumoaa LEHTITAUKO-huomautuksen
kokonaan):** *"pyritään tekemään siis kaikki kaupunki- ja maalehdet
valmiiksi yhteneväisesti toteutettuna"* — julkaisu erissä sitä mukaa
kuin valmistuu, token-kulutus kurissa. Samassa tilauksessa:

1. **Uudet mantereet ensin:** maanosiin, joissa ei ole yhtään valmista
   kaupunkia (P-Amerikka, E-Amerikka, Oseania), kaksi kaupunkia
   kuhunkin KOKONAAN valmiiksi lehtien osalta + herokuvat niihin.
   Fablen kaupunkivalinnat: New York + San Francisco (USA), Rio de
   Janeiro (BRA) + Buenos Aires (ARG), Sydney (AUS) + Auckland (NZL).
   Tekninen esivaihe: cityCountry-taulut kolmelle laudalle
   (mantereen-resepti, Dubai-oppi). Työmalli ja putki kuin O8:ssa;
   työaineisto docs/mantereet-tyoaineisto/.
2. **Yhtenäisyysurakka kaikkiin lehtiin:** ennen–nyt-kuvapari
   etusivun pikkukuviin ja vanhan ajan äänite radionapin rinnalle
   KAIKKIIN lehtiin joista puuttuu (äänitteitä nyt vain Lontoo ja
   Kairo); oppaat, kohdekartat, miniatyyrit ja säärivit puuttuvilta
   (J-velat). Inventaario: docs/mantereet-tyoaineisto/
   yhtenaisyysinventaario-2026-08-22.md.
3. **Akvarellihyväksyntä:** Helsingin tyyli hyväksytty → kaikkien
   nykyisten nähtävyysminiatyyrien uusinta akvarelleina + uudet
   kaupungit suoraan akvarellina. Generointi Actions-ajurilla
   (generoi-miniatyyrit.yml), pilotti yhdellä kaupungilla ennen
   skaalaa (tyyliblokki rekonstruoidaan — v1025:n muokattu prompti
   ei päätynyt repoon).
4. **Herokuvat jatkuvat** kaupunkeihin joista puuttuvat (Pöllö-
   worker; jonossa julisteiden 28 loppukuvan jälkeen).
5. **Vaakasuuntalukituksen purku** (omistaja: "vaatimus siitä että
   peliä ei voi pelata vaakasuunnassa voi kumota").

Afrikka (O7) jatkuu tuotantosuunnitelman erärungolla uusien
mantereiden pilottien jälkeen — sama tilaus kattaa sen ("jatka
myös lehtien tekemistä kaupunkeihin ja maihin joista ne puuttuvat").

## Paketti O8: Aasian lehtiurakka (tilattu 20.8.2026) ✅ VALMIS (v1008, 22.8.2026)

**Kuittaus (Fable 22.8.2026):** Aasian lauta valmis 28/28 (Karachi
v1008 viimeisenä); kuvatekstiremontti KT1 kattoi Aasian v1028+v1030.
Alkuperäinen speksi säilytetty alla työmallin dokumentaationa.

**Tämä paketti kumoaa LEHTITAUKO-huomautuksen Aasian osalta:**
omistaja tilasi Lähi-idän ja Aasian lehtiurakat 20.8.2026 ja ne
ajavat vanhan tauon ohi. Lähi-itä valmistui v937–v949 (Fable).
SESSIOSIIRTO PERUTTU (omistaja 20.8.2026): Fable jatkaa
orkestroijana, mutta JOKAINEN agentti käynnistetään
eksplisiittisellä mallilla (kirjoittajat/kuvatyö: opus,
faktapohjat/tarkistukset: sonnet) — Fable ei kirjoita sisältöä
itse. Ei tarinakaarta uusiin kohteisiin (linjaus 17.8.) —
vain lehdet.

### Lue ennen aloitusta (järjestyksessä)

1. CLAUDE.md ja docs/roolitus.md (roolit, julkaisusäännöt).
2. Raamattu (js/tyohuone-raamattu.js), erityisesti Perustuslaki,
   Kuvat ja lähteet (mm. 20.8. linjaukset: tuhoutuneen kaupungin
   nykykuvat, matkaopas on nykytietoa) ja Viisas Pöllö.
3. **docs/aasia-tyoaineisto/LUEMINUT.md** ja sen kansio: resepti
   (lehtityo-resepti.md, SITOVA kirjoittajille), spec-asia.md
   (putki + herkkien kohteiden SITOVAT linjaukset) sekä
   faktapohja+tarkistus-parit.

### Työmalli (sama joka tuotti Lähi-idän 13 versiota)

- Pääsessio orkestroi eikä kirjoita itse: aliagentit tekevät
  faktapohjat (tarkistaja AINA ERI agentti kuin kokoaja),
  kirjoituksen ja kuvatyön. MALLI ANNETAAN AGENTILLE AINA
  EKSPLISIITTISESTI (kirjoittajat ja kuvatyö: opus; faktapohjat
  ja tarkistukset: sonnet) — ilman määritystä agentti perii
  pääsession mallin, mikä poltti Fable-krediittejä 20.8.2026
  (omistajan havainto). Kirjoittajat työskentelevät
  git-worktreessä (YKSI commit, ei pushia), pääsessio poimii
  commitit cherry-pickillä. EI KOSKAAN git stashia.
- Konfliktitilanteessa lohkot poimitaan aarimerkkilaskennalla
  (top-level-lohko avaimella + edeltävä /*-kommentti), EI
  regex-poiminnalla. maakartat.js: KAUPUNKIKARTAT-lisäys
  ankkuroidaan ' * Lambertin tasapinta' -kommenttia EDELTÄVÄÄN
  };:ään — tiedoston viimeinen }; on VÄÄRÄ. Poiminnan jälkeen
  runtime-tarkistus importilla.
- Pääsessio pistokoetarkistaa 2 kuvaa/erä silmin (esikatselu +
  vertaa agentin kuvaselosteeseen) ennen julkaisua.
- Rinnakkaisia Commons-kuvajonoja korkeintaan muutama kerrallaan
  (429-riski); faktapohja-agentit (vain Wikipedia) eivät kuormita
  samaa rajapintaa.

### Julkaisu (jokainen erä = yksi versio, pääsessio tekee itse)

1. Portit: `node --test tests/*.test.mjs` (LUE # fail itse, 0
   vaaditaan), tarkista-kaksoisavaimet, tarkista-niputus,
   tarkista-savukkeet, kartallisille tarkista-karttapisteet.
2. `git fetch origin main` JUURI ennen versionumeron valintaa,
   sitten `node tools/uusi-versio.mjs "vNNN: viesti"` (max 60 mrk).
3. TESTATTAVAA-rivi (LYHYT: "vNNN — mitä tuli: mitä testata",
   enintään pari riviä — omistajan linjaus 20.8.2026: "ihan liian
   pitkiä sepostuksia" — yksityiskohdat kuuluvat PR-kuvaukseen,
   eivät peliin) ja TUOREET-taulu
   (valmistuneet kärkeen versioineen, työn alla ajan tasalle)
   js/tyohuone-tilanne.js:ään — tätä tiedostoa päivittää VAIN
   pääsessio, eivät aliagentit.
4. `node tools/build-standalone.mjs` + `node tools/savuke-dist.mjs`
   (6/6 vaaditaan; dist/-kansiota EI committoida).
5. Commit + push omalle haaralle, PR mainiin, CI:n check-runs
   -odotus, squash-merge, haaran reset origin/mainiin
   (--force-with-lease), ja Pages-ajon (pages.yml) onnistumisen
   varmistus + live-sivun sw.js-versiotarkistus. Jos
   tools/pollo/** muuttui, varmista myös pollo-julkaisu.yml.

### Jono (erien koko: täydennykset 2–3 kaupunkia, uudet lehdet
    1–2 per versio)

1. **Kirjoitusvalmiit parit** (faktapohja + tarkistus repossa,
   tarkistuksen korjaukset voittavat): Kioto, Xi'an, Singapore,
   Samarkand, Hanoi, Kathmandu.
2. **Loput uudet lehdet** (faktapohja → tarkistus → kirjoitus,
   3 faktapohjaa kerrallaan): varanasi mandalay kanton astana
   ulanbator taipei hongkong manila yangon sumatra borneo jakarta
   lhasa kolkata mumbai chennai colombo karachi kabul kashgar —
   herkät kohteet VAIN spec-asia.md:n sitovilla linjauksilla.
   Sumatra ja Borneo ovat alueita (aluelehtimalli, ei karttaa).
3. Kun Aasia on valmis: kysy omistajalta ennen Afrikkaa (paketti
   O7 odottaa, mutta kuvapooli on ohuempi — kategoriahaut).

### Tila siirtohetkellä (Fable täydentää ennen session luontia)

- Lähi-itä valmis v937–v949; tuoreusnäkymät v942/v948; Pöllön
  uusi kehote julkaistu v948:ssa.
- Venäjä-erät V1 (Jekaterinburg, Novosibirsk, Irkutsk), V2
  (Jakutsk, Magadan), V3 (Vladivostok kartalla, Kamtšatka ja
  Sahalin alueina) sekä kirjoittajat Peking, Delhi ja Bangkok:
  tila kirjataan tähän siirtohetkellä.

## Paketti O6: opas kuuteen uuteen kaupunkiin (tilattu 16.8.2026) ✅ VALMIS (v816, 17.8.2026)

**Kuittaus (Fable 17.8.2026):** kaikki kuusi kaupunkia mainissa —
Bagdad v804, Teheran v805 (sijainen), Tokio/Soul/Shanghai/Tripoli
v816 (sisäinen agentti; Soul, Shanghai ja Tripoli saivat koko
kaupunkiosion). 56 kuvaa kategoriahauilla, erälisenssitodennus +
silmätarkistus + Fablen pistokoe 8/8. Ei tarinakaarta (linjaus
17.8.). JÄLKITYÖT kirjattu: Bagdadin ja Teheranin kainaloista
puuttuu hintatasorivi; Soulilta, Shanghailta ja Tripolilta puuttuu
SAATIEDOT-rivi, kohdekartat ja miniatyyrit kaikilta kuudelta.

Omistaja: *"rakenna samaan malliin seuraavaksi bagdad, teheran, soul,
tokio, shanghai ja tripoli"*. Malli = Pariisin Matkailijalle-osio:
pystykuva etusivulla, `taitto: 'opas'`, viisi jaksoa, ensimmäisessä
kolmen kuvan karuselli ja `matkailu`-lohko.

**Lähtötilanne on kahdenlainen, ja se muuttaa työmäärän:**

| Kaupunki | Kaupunkiosio | Matkailijalle | Mitä puuttuu |
| --- | --- | --- | --- |
| Bagdad | ✅ 188 riviä, 6 nostoa | ❌ | koko opas |
| Teheran | ✅ 196 riviä, 6 nostoa | ❌ | koko opas |
| Tokio | ✅ 191 riviä, 6 nostoa | ❌ | koko opas |
| Soul | ❌ | ❌ | koko osio + opas |
| Shanghai | ❌ | ❌ | koko osio + opas |
| Tripoli | ❌ | ❌ | koko osio + opas |

Kaikki kuusi ovat pelin laudalla (`asia.js`, `africa.js`,
`middleeast.js`), ja `KULTTUURI_KATEGORIAT` on avaimennettu kaupungin
id:llä — eli osion voi lisätä suoraan avaimilla `soul`, `shanghai`,
`tripoli` ilman muutoksia muualle.

**Faktapohja on jo repossa.** Nostot ovat todennettua kaanonia, ja
niistä saa oppaan jaksot ilman uutta lähdetyötä. Bagdadissa esimerkiksi
al-Rashid-katu (1914, pylväskäytävät, purettiin 700 taloa), kahvilat
(ensimmäinen 1590, 285 kpl vuoteen 1903, istikan/quri/takht, al-Zahawi
1917) ja Shorjan tori (nimi persian sanasta *shurchah*). Nämä riittävät
viiteen jaksoon sellaisenaan.

**Kuvapooli on paljon eurooppalaisia ohuempi, ja se on työn pullonkaula.**
Bagdadissa hakusanahaut `Al-Rashid Street`, `Baghdad coffeehouse`,
`Baghdad market` ja `Baghdad monument` palauttivat kaikki **nolla**
osumaa, koska kuvia ei ole kuvailtu englanniksi. Kategoriahaku toimi:

- `Category:Coffeehouses in Baghdad` → 5 kuvaa, mm. Shabandarin kahvila
  al-Mutanabbi-kadulla (CC BY-SA 4.0) ja al-Beiruti (CC0)
- `Category:Streets in Baghdad` → 40 käyttökelpoista
- Mustansiriyan koraanikoulusta (1233) useita, myös pystykuvia

Nämä eivät ole vielä katsottuja eivätkä käyttöön hyväksyttyjä.

**Ohje seuraavalle:** hae kategorioilla, älä hakusanoilla, kun kaupunki
on arabian-, persian-, korean- tai kiinankielinen. Hakusanahaku etsii
englanninkielisestä kuvauskentästä, jota näissä kuvissa usein ei ole.

## Paketti O7: Afrikan kaupungit valmiiksi (tilattu 16.8.2026) ⬜ ODOTTAA

Omistaja: *"kun nykyiset kaupungit valmiit jatka Afrikassa kaupunkien
tekemistä valmiiksi"*. Aloitetaan siis heti kun paketti O6 (kuusi
kaupunkia) ja O4:n lisänähtävyydet ovat maalissa.

**Aluepäätös (omistaja 17.8.2026, Fable kirjasi):** Afrikan noin
kymmenen aluekohdetta (Sahara, Ahaggar, Namib, Tšad-järvi,
Tanganjika, Kilimandžaro, Viktorian putoukset, Orjarannikko,
Bahr el-Ghazal, Darfur) käsitellään samoin kuin Euroopan vastaavat
(Islanti, Lappi, Kreeta, Sisilia, Alpit): **lehti tehdään, mutta ei
kohdekarttaa**. Sääennusteen likikoordinaatit valitaan alueen
tunnetuimmasta pisteestä paketin O5 osan 2 tapaan.

**Mitattu tilanne 16.8.2026:** Afrikan laudalla on **39 kaupunkia,
joista lehti on yhdellä** (Kairo — ja sekin tuli Lähi-idän kautta).
Puuttuvat 38:

```
tanger karthago tripoli murzuk alkufra sahara ahaggar marrakech
timbuktu gao dakar sierraleone kappalmas kumasi orjarannikko kano
lagos tshadjarvi kamerun kongo angola namib sthelena kapkaupunki
viktorianputoukset kimberley mosambik madagaskar sansibar nairobi
kilimandzaro viktoria tanganjika bahrelghazal darfur suakin
addisabeba rashafun
```

Tripoli on jo paketissa O6, joten se putoaa tästä listasta pois.

**Huomioita, jotka kannattaa tietää ennen aloitusta:**

- Osa kohteista ei ole kaupunkeja vaan alueita (sahara, ahaggar,
  namib, tshadjarvi, tanganjika, kilimandzaro, viktorianputoukset,
  orjarannikko, bahrelghazal, darfur). Niille kaupunkilehden malli ei
  sellaisenaan sovi — sama kysymys ratkaistiin jo Euroopassa
  (islanti, lappi, kreeta, sisilia, alpit): ne ovat lehtinä mutta
  ilman kohdekarttaa. Kysy omistajalta, halutaanko sama ratkaisu.
- Kuvahaku on tehtävä **kategorioilla eikä hakusanoilla** (ks. paketti
  O6:n ohje). Tämä pätee Afrikassa vielä vahvemmin kuin Lähi-idässä:
  englanninkielistä kuvauskenttää on harvassa.
- Faktapohja: `africa-artikkelit.js`, `africa-saapumiset.js`,
  `africa-valokuvat.js` ja `africa-maatiedot.js` sisältävät jo
  tarkistettua aineistoa jokaisesta kohteesta.

## Paketti O4: Nähtävyyksiä lisää (Pariisi pilottina, tilattu 16.8.2026) 🟡 KESKEN

**Kuittaus (Opus 16.8.2026):** Pariisi 8 → **11 kohdetta** (v788):
Orsayn taidemuseo, Palais Garnier ja Place des Vosges. Faktat
fi-Wikipediasta rajapinnan kautta, kuvat Commonsin API-todennuksella
ja silmin katsottuina.

**Kesken jäi kaksi kohdetta:** Pompidou-keskus ja Invalidipalatsi.
Pompidoulle ei löytynyt Commonsin laatuluokista kuvaa ennen kuin
rajapinta alkoi kuristaa (repossa on kyllä yksi todennettu
sisäkuva `maa-kategoriat.js`:ssä, mutta saman kuvan toistoa kahdessa
paikassa ei kannata tehdä), ja Invalidipalatsin fi-artikkelia ei
löytynyt sillä nimellä. Molemmat ovat suoraviivaisia, kun rajapinta
vastaa normaalisti.

**Père-Lachaise ja katakombit EIVÄT MAHDU** Pariisin karttarajoihin
(itäraja 2,3788 ja eteläraja 48,8414). Ne vaativat kartan
uudelleenrajauksen — oma päätöksensä.

**Piirrokset puuttuvat:** kolme uutta kohdetta näkyvät kartalla
numeroympyröinä, kunnes `tools/generoi-miniatyyrit.mjs` ajetaan.
Generointi vaatii API-avaimen eikä sitä voi ajaa työsessiosta.

Alkuperäinen tilaus:

Omistajan linjaus 16.8.2026: **"Nähtävyyksiä voi olla 6–15 per
kaupunki riippuen kuinka paljon mielekkäitä kohteita kaupungilla on
tarjota."** Nykytila mitattuna (Opus 16.8.2026): 53 kaupungista
**46:lla on tasan kuusi kohdetta** eli haarukan alaraja. Poikkeukset:
Helsinki ja Kööpenhamina 9, Pariisi 8, Wien, Budapest ja Bukarest 7.
Kuutonen ei siis ole harkittu määrä vaan lähtötaso, joka on jäänyt
päälle.

**Pariisi ensin, omistajan tsekattavaksi.** Kun se on hyväksytty,
sama tehdään muille suurille kaupungeille (Lontoo, Rooma, Berliini,
Wien, Praha, Istanbul, Madrid, Barcelona…) — pienemmät kaupungit
saavat jäädä kuuteen, jos enempää mielekästä ei ole.

### RAJAUS (sitova)

Saat koskea VAIN näihin: `js/packs/maakartat.js` (VAIN pariisi-avaimen
`kohteet`), `js/packs/nahtavyysjutut.js` (VAIN pariisi-avain) ja
tarvittaessa miniatyyripiirrokset uusille kohteille. ET koske muihin
kaupunkeihin, et lehtiin, et oppaaseen.

### Mitä tehdään

1. **Pariisi 8 → 12–14 kohdetta.** Ehdotetut lisäykset (omistaja
   valitsee/karsii): Montmartre ja Sacré-Cœurin portaat, Musée
   d'Orsay, Sainte-Chapelle, Marais, Père-Lachaise, Seinen rannat
   (bouquinistit), Île de la Cité. Versailles on kaupungin
   ulkopuolella — oma päätöksensä.
2. **Jokainen uusi kohde tarvitsee kolme asiaa:** karttapisteen
   (lat/lon `maakartat.js`:ään), miniatyyripiirroksen (yksi otto per
   kohde, ks. piirrosputken kustannussääntö) ja oman
   nähtävyysjutun kuvineen ja lisenssitodennuksineen.
3. **Kaksi kohdetta on ilman juttua jo nyt** — korjaa ne samalla:
   Wienin **Schönbrunn** ja Budapestin **Sankarien aukio** ovat
   kartalla mutta avaavat wiki-ponnahduksen oman juttunsa sijaan.

### Valmis malli

Nykyiset Pariisin jutut `nahtavyysjutut.js`:ssä ovat malli sekä
pituudelle että rakenteelle. Kuvasäännöt ovat samat kuin aina:
lisenssit erätodennuksella API:sta, sijainti kuvauksesta ja
kategorioista, jokainen kuva katsotaan silmin.
