# Teheran — raportti 13.8.2026

*Nipun 2 kolmastoista kaupunki. Doha v587, Nikosia v592, Kuwait v594,
Masqat v597, Bagdad v598, İzmir v599, Ankara v600, Aleppo v603,
Damaskos v604, Luxor v608, Riad v612, Tabriz v615.*

## Mitä valmistui

Teheranin kaupunkilehti kokonaan: kohdekartta, kansisivu, aihesivu
`arki` ("Arki ja ruokapöytä") minitehtävineen, säätiedot ja kuusi
nähtävyysjuttua — Teheranin basaari, Golestanin palatsi, Dar al-Fonun,
Iranin kansallismuseo, Masoudiehin talo ja Sepahsalarin moskeija.

Teheran on Aasian laudalla, ei Lähi-idän, mutta se on ME-jonossa ja
tehtiin siinä järjestyksessä.

## Kartta vaati työkaluun uuden tason

Kohteet tarkistettiin lähteistä ennen piirtoa, ja Riadin ansa toistui:
oikeat artikkelinimet eivät olleet ne, joita ensin kokeilin.
`Masoudieh Palace`, `Glassware and Ceramics Museum of Iran`,
`National Garden (Tehran)` ja `Park-e Shahr` palauttavat 404, mutta
`Masoudieh Mansion`, `Abgineh Museum of Tehran`, `National Garden,
Tehran` ja `Park-e Shahr (Tehran)` ovat olemassa. Hakusanahaku
löytää oikean nimen; arvaus ei.

Kartta piirrettiin **kolmesti**, ja syy mitattiin joka kerta.

1. Ensimmäinen ajo, 2,6 × 2,4 km ilman lippuja: 1 636 elementtiä,
   mutta basaarin kortteli — kartan tärkein kohde — oli tyhjää
   paperia.
2. Toinen ajo, tiukempi ruutu ja `palvelutiet: true`: basaari oli yhä
   tyhjä. Overpassin laskenta ruudulle kertoi miksi: `residential`
   1 307, `service` 262, **`footway` 720**. Basaarin katetut kujat ovat
   jalankulkureittejä, eikä työkalu piirtänyt niitä *millään*
   kaupungilla.
3. Kolmas ajo: lisäsin työkaluun `jalkakaydat`-tason. 2 146 elementtiä,
   ja basaari näkyy nyt kujaverkkona.

Taso on lippujen takana täsmälleen kuten `palvelutiet`, joten yksikään
vanha kartta ei muutu — testit ajettiin muutoksen jälkeen. Tallinnassa
sama puute mitattiin aikanaan ja hyväksyttiin, koska siellä kartan
juoni oli muurirengas ja meri. Täällä juoni on basaari, joten sama
ratkaisu ei kelvannut.

## Faktatarkistus: 42 väitettä, 42 oikein

Tarkistin haki jokaisen lähteen raakawikitekstinä ja lainasi kohdan
sanatarkasti. Kaikki 42 täsmäsivät: Sepahsalarin kahdeksan
37-metristä minareettia ja rukoussalin 44 pylvästä, Shams-ol-Emarehin
vuodet, Shaahin moskeijan 18 miljoonaa tiiltä ja 475 000 laattaa,
kansallismuseon 11 000 neliömetriä.

Kaksi kohtaa ansaitsee erillisen maininnan:

- **Kirjoittaja korjasi tehtävänantoni vuosiluvun.** Sanoin
  Masoudiehin talon valmistuneen 1879; lähteen infoboksi sanoo 1878.
  Korjaus tehtiin ennen kuin tarkistin ehti siihen.
- **Sepahsalarin mitat eivät täsmää keskenään lähteessä.** Infoboksi
  antaa pohjan 62 × 61 metriä mutta sisäpinta-alaksi 16 000
  neliömetriä, eikä 62 × 61 ole 16 000. Juttu kertoo ristiriidan
  ääneen sen sijaan että valitsisi puolen hiljaa.

Kirjoittajat karsivat myös useita tehtävänantoni väitteitä, joita lähde
ei tue: basaarissa **ei** ole paloasemaa (englanninkielinen Wikipedia
listaa vain moskeijat, majatalot ja pankit), eikä artikkeli nimeä
kujia tavaralajeittain — joten kulta-, kupari- ja mausterivit jäivät
kirjoittamatta sen sijaan että ne olisi keksitty.

## Rajaus: yksi korjaus tehtiin, yksi jätettiin tekemättä

Tarkistin nosti kaksi suositusta. Toinen toteutettiin, toinen ei, ja
molemmat päätökset perustuvat samaan sääntöön.

**Tehtiin — Takyeh Dowlat.** Kansinosto kertoi, että talon kupoli
purettiin 1800-luvun lopulla ja miksi, mutta ei sanaakaan siitä, että
rakennusta ei ole enää lainkaan. Lukija olisi jäänyt luulemaan, että
talo yhä seisoo kupolittomana. Nosto päättyy nyt virkkeeseen "Itse
rakennusta ei ole enää: sen paikalle nousi 1940-luvulla pankkitalo."
Vuosiluku on jätetty vuosikymmenen tarkkuudelle tarkoituksella: lähde
antaa infoboksissa 1946 ja tekstissä 1947.

**Ei tehty — Dar al-Fonun.** Tarkistin suositteli lisäämään virkkeen
rakennuksen nykykäytöstä ja kertoi tarkistaneensa asian "ulkoisesti".
Hain `Dar al-Fonun` -artikkelin ja `Tehran`-artikkelin raakawikitekstin
itse: **englanninkielinen Wikipedia ei kerro, mikä rakennus on
nykyään.** Talon sääntö on, ettei kirjoiteta faktaa, jota lähde ei
anna, ja se painaa enemmän kuin tyylillisesti siistimpi lopetus. Juttu
päättyy siksi vuoden 1889 oppilas- ja opettajamääriin.

Vuoden 1979 jälkeisiä tapahtumia, pakotteita, mielenosoituksia tai
nykyhallintoa ei ole yhdessäkään seitsemästä tekstissä. Kirjoittajat
rajasivat itse pois muun muassa basaariartikkelin koko
protestiosuuden, vuoden 1933 kadunlevennyspurun ja Shaahin moskeijan
vuoden 1905 ruoskintatapauksen.

## Kuvat: 24, ja tällä kertaa vesileimat karsittiin etukäteen

Kaikki 24 kuvaa läpäisivät tarkistuksen: lisenssit PD/CC0/CC BY/CC
BY-SA, kaikki yli 1 200 pikseliä, yksikään ei ole pelissä ennestään,
kaikki oikeasta kohteesta.

Tabrizin vesileimalöytö näkyy suoraan tässä erässä. Kirjoittajat
hylkäsivät itse — ennen tarkistusta — Tasnimin ja Farsin
uutistoimistokuvat, "with watermarks" -kategorian kuvan,
Student News Agencyn kuvan, Teheranin kaupunginpuiston "Parirooz"-kuvan
ja jopa Luigi Pescen 1800-luvun vedoksen, jossa on kuvaajan
allekirjoitus. Yhtään kuvaa ei siis tarvinnut vaihtaa jälkikäteen.

Kolmessa kuvassa `lahde` käyttää erillistä `Attribution`-kenttää
(Diego Delso) `Artist`-kentän sijaan, koska `AttributionRequired` on
tosi — juuri niin kuin sääntö vaatii.

Yksi selite korjattiin, ja korjaus tuli katsomalla. Abgusht-tarjottimen
selite kertoi "korkeasta kirkkaasta lasipullosta". Latasin kuvan ja
suurensin: esineellä ei ole pullonkaulaa eikä sisältöä. Se on kirkasta
lasia oleva **survin**, ja se seisoo tarjottimella juuri siksi, että
sama nosto kertoo aterian syötävän kahdessa vaiheessa ja jälkimmäisen
osan survottuna. Selite kertoo nyt sen, ja kuva ja teksti puhuvat
vihdoin samasta asiasta.

## Säätiedot

Sama ERA5:n ja sääaseman ero kuin Tabrizissa, mutta pienempi: ruutuun
osuu Alborzin rinnettä. Heinä-, elo- ja syyskuussa normaali sademäärä
on yksi millimetri. Ero on kirjattu `saatiedot.js`:n kommenttiin.

## Mitat

Kuusi nähtävyysjuttua 1 284–1 400 merkkiä, kaikissa 2–3 kuvaa.
Kansisivu kolmella kansikuvalla ja kolmella nostolla (Takyeh Dowlat,
kaupunginteatteri, Malekin kirjasto), aihesivu "Arki ja ruokapöytä"
kolmella nostolla (chelow kabab, abgusht, tahdig) ja minitehtävällä.
Kuvia 24, joista yksikään ei ole pelissä ennestään.

`npm test` puhdas (660 läpi, 0 hylättyä), `tarkista-kaksoisavaimet`
puhdas, `tarkista-karttapisteet teheran` puhdas (kaikki kuusi pistettä
maalla, ei päällekkäisyyksiä eikä mittakaavajanan peittoa),
`tarkista-aihetoisto` ei nosta yhtään Teheran-paria.
Selaintarkistus 390 pikselin leveydellä: lehden kaikki kolme sivua ja
kaksi nähtävyyspopupia, kaikki lehden kuvat latautuvat.

## Isfahan on jo puoliksi valmis

Isfahanin kohdekartta on piirretty ja committoitu samassa erässä:
2 132 elementtiä, kuusi kohdetta (Jameh-moskeija, basaari, Ali Qapu,
Shaahin moskeija, Hasht Behesht, Chahar Baghin koulu), kaikki pisteet
maalla. Sisältötyö on seuraava.

Isfahanissa on oma vaikeutensa, joka kannattaa tietää etukäteen:
**kaupungin viisi tunnetuinta kohdetta ovat kaikki IRN-maalehdessä** —
Naqsh-e Jahanin aukio, Si-o-se-pol, Sheikh Lotfollah, Chehel Sotoun ja
chahar bagh. Kaupunkilehden on siis rakennuttava sen ympärille, mitä
jää: Jameh-moskeijan tuhatvuotinen rakennushistoria, basaari, Ali
Qapun musiikkihuone, Hasht Behesht ja Chahar Baghin koulu. Kartta on
rajattu juuri niin.

## Jonossa

Sana, Aden, Salalah ja Mosul odottavat omistajan päätöstä. **Yksi
korjaus aiempaan raporttiini:** kun hain Sanan kohteet hakusanahaulla
enkä arvaamalla artikkelinimiä, lähteellisiä kohteita löytyi **viisi**
eikä neljä — Suuri moskeija, Bab al-Jemen, Al-Bakiriyyan moskeija,
Jemenin kansallismuseo ja Talhan moskeija. Se on yhä yksi vähemmän
kuin pelin kaikilla 51 kartalla, ja Jemenin nykytilanne on joka
tapauksessa suurempi syy kysyä kuin kohdemäärä.

Isfahanin jälkeen Aasian kaupunkilehdet. Mekka ja Medina odottavat yhä
omistajan erillistä päätöstä.
