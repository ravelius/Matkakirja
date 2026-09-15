# Viesti Fablelle: nimikyltit pysyvät paikoillaan zoomatessa; Ranskan nostot ja lisäkaupungit

**Opus-sessio 15.9.2026. Lähtötilanne: main = v1913 (364277b5). Ei
versionostoa, ei mergeä, ei Raamattu-muokkausta.**

Omistajan kaksi asiaa 15.9.2026 klo 15.45 UTC (työpöytäkuva Ranskasta),
Raamattu haarassa `claude/bold-ride-vow4ki`:

- **KARTTAUUDISTUKSEN PAATOKSET 24**, sanatarkasti: *"pariisi ja muut
  kaupungintekstit liikkuva ja hyppivat zoomatessa. saisiko ne
  rauhoitettua paikoilleen? koko voi muuttua. mutta nyt ne hyppivat eri
  puolille kaupungin merkkia. pitaisi pysya samassa kohdassa."*
- **SELVITYS: RANSKAN NOSTOT JA MUUT KAUPUNGIT PUUTTUVAT**,
  sanatarkasti: *"miksi ranskassa ei ole niita nostoja nakyvissa eika
  toisia kaupunkeja?"*

Mittausväline: `tools/savukkeet/mittaa-nimikyltit.mjs` (uusi, ei savuke
vaan mitta), Chromium 1400 × 900, pelaaja Pariisissa, saapumisnäkymä
ajettu loppuun (44 s) ja viisi zoomtasoa: uloin sallittu (kerroin 1)
sekä 0,7 · 0,5 · 0,35 · 0,25 siitä.

---

## A) NIMIKYLTIT — juurisyy yhdellä lauseella

**Sijoituslukko (js/pallolauta/nimet.js, PAATOKSET 12) oli voimassa
vain täsmälleen samoilla mitoilla, ja koska zoomi muuttaa sekä
kirjasinkerrointa että pisteen sädettä, JOKAINEN zoomiporras purki
lukon ja `ladoRuutunimet` valitsi kyljen uudestaan sen mukaan, mitä
naapurustossa sattui ruudulla olemaan — ja koska laudan käsin hiottu
asettelu (lx/ly) ja ehdokaskehä olivat ruutuvakioita samalla kun
teksti on kartan mitta (PAATOKSET 14), ehdokaskuvio myös muutti
muotoaan zoomatessa.**

### Mittaus ennen (main, v1913)

Kyltin keskipiste MIINUS oman CSS2D-solmun keskipiste (solmu on
kaupungin pisteessä, `translate(-50%, -50%)`), siitä suunta asteina ja
etäisyys tekstikorkeuteen suhteutettuna:

| kaupunki | tasoja | suunta | hajonta | etäisyys / tekstikorkeus | hajonta |
|---|---|---|---|---|---|
| Pariisi | 1 | −90,6° | — | 3,51 | — |
| Alpit | 3 | 3,7° → 2,1° → 1,0° | 2,8° | 2,64 → 2,33 → 2,06 | **24,5 %** |
| Marseille | 2 | 2,5° → 1,4° | 1,2° | 3,87 → 3,64 | 6,2 % |

Siirtymä `translate(...)` oli Alpeilla **16,9 / 4,2 px joka
zoomtasolla**, vaikka kirjasin kasvoi 13,5 → 19,3 → 27,0 px: kyltti
liukui siis kohti merkkiä sitä mukaa kuin sitä zoomattiin, ja kun se
lopulta osui merkkiin tai naapuriin, seuraava ladonta heitti sen eri
kyljelle. Tehtävänannon raja (±10 % tekstikorkeuteen suhteutettuna)
rikkoutui yhdellä kaupungilla kolmesta.

**Kyljen vaihtuminen mitattiin erikseen ilman selainta** (sama ladonta
neljällä kirjasinkertoimella 1 · 1,5 · 2 · 3, Ranskan saapumisnäkymän
ehdokkaat): 60 vertailusta **kylki (`text-anchor`) vaihtui 12 kertaa**,
suunta yli 5° 13 kertaa ja etäisyys yli 10 % 10 kertaa. Juuri se on
omistajan *"hyppivat eri puolille kaupungin merkkia"*.

### Korjaus

1. **`js/pallolauta/nimet.js` — zoomi SKAALAA lukon, ei pura sitä.**
   Sijoitus on kokonaan kirjasinkoon mitta, joten sama ehdokas uudella
   kertoimella on vanha sijoitus kerrottuna kertoimien suhteella:
   lukosta lasketaan `skaalattuLukko`, joka kertoo `dx`, `dy`, `koko`,
   `vali` ja pisteen suhteen talletetun laatikon suhteella
   `kokoKerroin / lukko.kerroin`. Kylki (`ank`) ja suunta pysyvät,
   vain koko muuttuu — juuri kuten omistaja sanoi (*"koko voi
   muuttua"*). Lukko purkautuu yhä samoista syistä kuin ennen: nimi
   katoaa näkyvistä, tai ruudun reuna ei anna sille tilaa.
2. **`js/karttanimet.js` — ehdokaskehä on kartan mitta.** Laudan oma
   asettelu (`lx/ly`), sivuehdokkaiden vähimmäisetäisyys (5 / 7 px),
   kartografin kehä (7 / 13 px) ja liu'un matka kerrotaan samalla
   `kokoKerroin`-luvulla kuin teksti. Näin myös ENSIMMÄINEN laskenta
   antaa saman puolen zoomista riippumatta — puoli on kaupungin oma
   eikä kameran. Tasokartalla `kokoKerroin` on 1, joten siellä luvut
   ovat tavu tavulta entiset.

### Mittaus jälkeen

| kaupunki | tasoja | suunta | hajonta | etäisyys / tekstikorkeus | hajonta |
|---|---|---|---|---|---|
| Pariisi | 2 | −91,0° → −90,7° | **0,3°** | 2,08 → 2,08 | **0,4 %** |
| Alpit | 3 | 3,7° → 3,8° → 4,1° | **0,3°** | 2,64 → 2,71 → 2,70 | **2,7 %** |
| Marseille | 2 | 2,5° → 2,6° | **0,0°** | 3,87 → 4,02 | **3,7 %** |

Kaikki tehtävänannon rajoissa (suunta ±5°, etäisyys ±10 %). Siirtymä
skaalautuu tarkasti: Alpit 16,9 / 4,2 → 24,2 / 6,1 → 33,9 / 8,5 px,
sama kerroin kuin kirjasimella. Saapumisnäkymä näyttää pikselilleen
samalta kuin ennen (kuvat alla).

### Vartiot

- `tests/pallonimikyltti.test.mjs` vartio 3 kirjoitettiin uusiksi:
  ennen se vaati, että `kokoKerroin` VAPAUTTAA lukon — ja juuri se oli
  vika. Nyt: kylki ja suunta pysyvät, koko kaksinkertaistuu kertoimen
  mukana. **Vastakoe 3b**: sama zoomisarja ilman lukkoa vaihtaa
  kylkeä tai suuntaa (12 / 60), eli vartio 3 mittaa oikeaa asiaa.
- `tools/savukkeet/savuke-nimikyltti.mjs` **vartio 7** (uusi): sarja
  laajeni kolmesta viiteen zoomtasoon (1 · 0,85 · 0,7 · 0,6 · 0,35), ja
  jokaiselta kaupungilta, jonka kyltti on olemassa vähintään kahdella
  tasolla, vaaditaan sama kylki, suunta ±5° ja tekstikorkeuteen
  suhteutettu etäisyys ±10 %.
- Mitta-ankkuri on elementin oma keskipiste EIKÄ
  `getScreenCoords(lat, lon, 0)`: merkkikerros on eri korkeudella kuin
  pallon pinta, ja ero kasvaa zoomatessa (mitattu 70 px Alpeilla).
  Ensimmäinen mittaus tehtiin väärällä ankkurilla ja näytti 10,6°
  heittoa myös korjatussa koodissa; luku oli mittavirhe.

---

## B) RANSKAN NOSTOT JA LISÄKAUPUNGIT — juurisyy yhdellä lauseella

**Ei regressio vaan TARKOITUKSELLINEN KYNNYS: saapumisnäkymässä
lähizoomiportti (`LAHIZOOMIN_OSUUS_ULOIMMASTA = 0,7`, v1867) on kiinni
ja pääkartan merkkikatto (`PAAKARTAN_MERKKIKATTO = 21`) voimassa, joten
Ranskan 62 merkistä piirtyy 21 + 1 poltettu ja 40 jää odottamaan yhtä
zoomiporrasta — ja koska v1894 kolminkertaisti Ranskan merkkimäärän
(maalehden nostot + 7 lisäkaupunkia), sama katto, joka ennen ei purrut
lainkaan, piilottaa nyt kaksi kolmasosaa pilotin sisällöstä.**

### Mittaus (1400 × 900, Ranska)

| näkymä | osuus uloimmasta | portti päästi | piiloon | eläviä nostoja DOMissa |
|---|---|---|---|---|
| saapuminen | 1,00 | 22 (21 + 1 polttovelka) | **40** | 13 |
| 1 porras (×0,7) | 0,70 | 62 | 0 | 40 |
| 2 porrasta (×0,5) | 0,50 | 62 | 0 | 33 |
| ×0,35 | 0,35 | 62 | 0 | 17 |
| ×0,25 | 0,25 | 62 | 0 | 5 |

**Lisäkaupungit ovat kartalla jo saapumisnäkymässä.** Merkkiportin
tärkeysjärjestys (`merkinTarkeys`: kaupungit ensin) päästää kaikki
seitsemän läpi: Lyon, Bordeaux, Lille, Strasbourg, Nizza, Toulouse ja
Nantes ovat mukana tuossa 22:ssa jokaisella ajolla. Ne eivät siis
puutu — ne ovat pieniä: merkki on kartan mitassa ja nimiö on
saapumisnäkymässä PAATOKSET 14:n mukainen ~8,5 px, eli Ranskan
kokoisella rajauksella hädin tuskin erottuva (ks. kuva `ennen`, jossa
Lyon näkyy mutta muut hukkuvat maastovarjostukseen).

**Regressio suljettiin pois:** v1911 (`df83a974`) → v1913
(`364277b5`) ei koske lainkaan tiedostoihin `js/pallolauta/*`,
`js/kaupunkinosto.js`, `js/fokuskohteet.js` eikä
`js/packs/nakyvat-kaupungit-fra.js` — koko välin diffi on
`css/aikajana.css`, `css/satelliitti.css` ja `css/styles.css`
(Liiku-nappi, linssi-ikoni). Kynnys on v1867:stä ja merkkimäärän kasvu
v1894:stä, eli molemmat OMISTAJAN KUVAA VANHEMPIA — ja omistaja näki
nostot *"v1880–v1900"*, mikä sopii siihen, että ennen v1894:ää Ranskan
merkkejä oli noin 22 eli katto ei purrut.

**Pelitila ja maailmanäkymä suljettiin myös pois:** mittaus ajettiin
tavallisena pelitilanteena (faasi `action`, pelaaja Pariisissa), ja
kohdemaan korostus oli päällä kuten omistajan kuvassa.

### Ehdotus Fablelle (EI toteutettu tässä erässä)

Katto 21 on Fablen oma sääntö koko pääkartalle
(*"raja ei nouse hiljaa"*, erä 10), ja sen muuttaminen koskee kaikkia
136 maata sekä kolmea savuketta
(`savuke-merkkirajat`, `savuke-kaupunkien-nostot`,
`savuke-pariisin-nostot`). Siksi vain ehdotus, kolme vaihtoehtoa
halvimmasta kalleimpaan:

1. **Kohdemaa saa oman kattonsa.** Katto 21 on olemassa siksi, ettei
   pääkartta ruuhkaudu; kohdemaassa pelaaja on nimenomaan katsomassa
   sitä maata. Nostetaan kohdemaan katto esimerkiksi 40:een ja
   jätetään naapureille 21. Yksi vakio, savukkeiden rajat päivitetään.
2. **Kynnys saapumisnäkymään.** `LAHIZOOMIN_OSUUS_ULOIMMASTA` 0,7 →
   1,0, jolloin portti on auki heti saavuttaessa. Halvin muutos, mutta
   poistaa portin kokonaan — merkkiraja jää vain `lahi: true`
   -lipulle.
3. **Nimiö isommaksi saapumisnäkymässä.** Jos ongelma on näkyvyys eikä
   määrä, kasvatetaan nimiön mitoitusta uloimmalla zoomilla. Tämä
   koskee PAATOKSET 14:n mitoitusta, joten se on omistajan asia.

Fablen päätöstä odottava kysymys omistajalle: haluaako hän
saapumisnäkymään KAIKKI 62 merkkiä (vaihtoehdot 1–2), vai onko kyse
siitä, että nykyiset 22 ovat liian pieniä nähtäväksi (vaihtoehto 3)?

---

## 3. Kuvat

- `docs/raportit/kuvat/nimikyltit-ennen-1400-20260915.jpg` — main
  v1913, Ranskan saapumisnäkymä 1400 × 900.
- `docs/raportit/kuvat/nimikyltit-jalkeen-1400-20260915.jpg` — sama
  näkymä korjauksen jälkeen. Saapumisnäkymä on tarkoituksella
  identtinen: korjaus näkyy vasta zoomatessa, ja se on mitattu
  numeroina yllä.

## 4. Ajetut testit

- `node --test tests/rules.test.mjs tests/dokumentit.test.mjs` — 337/337.
- `node --test tests/pallonimikyltti.test.mjs tests/pallonimet.test.mjs
  tests/nimiolimitys.test.mjs tests/karttanimet.test.mjs
  tests/karttamerkit.test.mjs tests/kohdekaupunki.test.mjs
  tests/nostoladonta.test.mjs tests/aikajana.test.mjs` — kaikki läpi.
- `tools/tarkista-savukkeet.mjs`, `savuke-era12`, `savuke-kaupunkikortit`,
  `savuke-nimikyltti` — tulokset commit-viestissä.

## 5. Mitä EI tehty

- Ei versionostoa, ei mergeä, ei Raamatun muokkausta.
- Ei kosketa `js/pallolauta/maapaneeli.js`, `js/fokusvirta.js`,
  `js/pollo.js` eikä pallolaattoihin/kermaan — ne ovat muilla
  agenteilla.
- B:n kynnystä ei muutettu: se on Fablen oma sääntö, ja muutos koskisi
  kaikkia maita.
