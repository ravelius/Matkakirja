# Euroopan sisältöpaketin eheystarkistus (Siirtoseppä, 27.9.2026)

Fablen tilaus 27.9. (VAIN EUROOPPA, App Store -laatu). Aineisto: natiivin tuotantopaketti **v238** (skeema 1.51,
commit d09607ef4), ladattu kokonaan ämpäristä: 782 tiedostoa, kaikkien sha256-tiivisteet täsmäävät hakemistoon.
Eurooppa = `offline.json` `ryhmat.europe`: 38 maata ja 51 pelipistettä. Tarkistuksen tekivät Siirtoseppä ja kolme
Sonnet-agenttia (laatat, kuvat, viitteet). Kaikki HEAD- ja GET-pyynnöt kohdistuivat vain `media.matkakirja.app`:n
staattisiin tiedostoihin. Puhetta ei pyydetty workerilta: 0 pyyntöä.

## 1. Tulos lyhyesti

| Osa | Tarkistettu | Kunnossa | Löydös |
|---|---:|---:|---|
| Karttalaatat (rasteri z0–z10, dedup) | 6 062 | 6 062 | – (maasto: ks. kohta 3) |
| Offline-media `maat.*.media` | 3 808 | 3 805 | 3 × 404 (Nouméa) |
| Nähtävyys-, hero- ja julistekuvat (ladattu, dekoodattu) | 964 | 956 | 8 pientä (< 400 px) |
| Kaupunkilehdet | 51 | 51 | – |
| Orvot id-viittaukset kokoelmien välillä | – | 0 orpoa | – |
| Pelin omat tiedostot offline-latauksen ulkopuolella | 7 136 | – | **puuttuvat offline-latauksesta** (kohta 4) |
| Natiivin kannalta rikkinäiset kuvaformaatit | 7 TIFF (78 koko paketissa) | – | TIFF (kohta 5) |
| Ulkoiset kuvat (Flickr) | 23 (53 koko paketissa) | – | korjattu, PR #3427 |

## 2. Koko: ensilataus ja Euroopan offline-lataus (App Store -pohjaluvut)

**Ensilataus** (natiivi, uusi asennus):

- Sisältöpaketti v238: 131,7 Mt purettuna, **26,0 Mt siirtona** (gzip).
- Buildissa mukana tilannekuva (15 aloitustiedostoa, `TilannekuvaRakennus`): 14,5 Mt, siirtona 3,5 Mt.
- Taustapäivitys verkosta ensikäynnistyksessä (paketti miinus tilannekuva): **noin 22,4 Mt**.
- Maailman karttapohja (globaali rasteri z0–z5, 1 365 laattaa): **11,0 Mt** mitattuna. Laatat haetaan
  näytettäessä, joten ne eivät ole pakollinen etukäteislataus.
- Sovelluksen binäärin koko ei kuulu tähän (TestFlight/Natiiviseppä).

**Euroopan offline-lataus** (38 maata, Offline-kartat → Eurooppa):

| Osa | Mitattu | offline.json-arvio |
|---|---:|---:|
| Rasteri z6–z9 | 19,7 Mt | 21,7 Mt |
| Z10 kaupunkien ympärillä (`kaupunkiRasteri`) | 40,3 Mt | 43,0 Mt |
| Maasto | ks. kohta 3 | 689,1 Mt |
| Media (`maat.*.media`, 3 808 tiedostoa) | **2 171 Mt** | 2 064 Mt |
| Yhteensä ilman maastoa | **noin 2,23 Gt** | |

Huomio (Natiiviseppä 27.9.): natiivin Kuvat ja Puhe **eivät lue offline-kansiota**. Ne käyttävät vain omaa
välimuistiaan ja buildin mukana tulevia tiedostoja. Nykyisen offline-latauksen 2,17 Gt:n media ladataan siis laitteelle,
mutta kuvat ja puhe eivät offline-tilassa käytä sitä. Natiiviseppä korjaa luvun versioon 1.0.32 (kohta 4).

## 3. Karttalaatat

Kaikki 6 062 rasterilaattaa (globaali z0–z5, maittain z6–z9, Z10) palauttivat 200. Laattamäärät täsmäävät
`offline.json`:n `laattoja`-lukuihin kaikissa 38 maassa. Maittaiset luvut ja raakadata: agentin raportti (scratchpad).
Maastolaattojen (`.terrain`) HEAD ei anna kokoa, joten niiden mittaus tehdään GET-otoksella ja lisätään tähän
jälkikäteen. Arvio 689 Mt on todennäköisesti yläraja (esim. FRA 362,7 Mt).

## 4. Offline-latauksesta puuttuvat pelin omat tiedostot (Siirtoseppä, PR #3432)

`offline.json`:n `maat.*.media` sisältää vain `media.json`:n omat lajit. Kaksi aukkoa:

1. **Absoluuttinen osoite omaan ämpäriin luokitellaan ulkoiseksi** (`kuva-url`/`aani-url`). Koko paketissa näitä on
   4 142 kuvaa ja 56 ääntä: karttanostojen kuvat (`karttanostot/2026-09-xx`), fokuskohteiden ja maakuntien kuvat
   sekä saapumispuheet.
2. **Kokoelmavaiheessa johdetut suorat osoitteet** eivät ole `media.json`:ssa: miniatyyrit, Livian puheet ja eleet,
   repliikit, luentojen äänet ja aikaleimat, lehtien valmiit kuvaosoitteet ja "loistoaika"-nostokuvat.

Eurooppa: **7 136 tiedostoa, mitattuna 4,69 Gt** (karttanostot noin 2,4 Gt; mediaani 694 kt, p90 1,2 Mt, suurin 12 Mt).
Tiedostoista 64 on 404:

- 37 Livian `eleet.json`-tiedostoa, jotka on kokoelmassa merkitty tilaan `eleetTila: puuttuu` (tarkoituksellinen;
  jätetään pois listalta)
- 23 miniatyyriä
- 4 kuvaa (Nouméa ×3 ja Antikythera)

**Päätös (Fable 27.9. Natiivisepän kautta):** omaan avaimeen `maat.*.mediaKuvat`, jonka vanhat buildit ohittavat
(skeema 1.52), ja `tavuja.mediaKuvat`. Kuvat pienennetään 150–250 kt:een, **katto 100 Mt maata kohden**. Puheista
mukaan vain ämpärissä jo olevat tiedostot, ei workerin generointia. Natiivi lukee avaimen 1.0.32:sta.
Toteutus jatkuu Siirtosepän seuraavana eränä:

- rakenne `{ url, pieni? }`
- pienennykset CI:ssä polkuun `pieni/<avain>.jpg` (1280 px, JPEG 80)
- katon priorisointi: karttanostot → miniatyyrit → puheet → luennat → lehtikuvat

## 5. Muut löydökset omistaville rooleille

**Sisältökirjuri:**

- Nouméa (FRA): kolme kuvaa puuttuu myös Commonsista väärien tiedostonimien takia (`js/packs/kulttuuri-kategoriat.js`
  /noumea/0/nostot/0 ja /2): *General View of Noumea, by Peace.jpg*, *Noumea by Louise Michel.jpg*,
  *Portrait de Louise Michel (1830-1905), pendant la Commune de Paris 1871…*. Lisäksi Antikytheran
  loistoaikakuva `kuvat/nama-machine-d-anticythere-1.jpg` puuttuu ämpäristä.
- 23 miniatyyriä `kohtaamiset/miniatyyrit/*.png` on 404 (esim. berliini-lehman-hinnalla, berliini-berliinin-karhu,
  bukarest-szathmarin-studio). Lista: raakadata (scratchpad `eu-lisamedia-head.txt`).
- TIFF-kuvia 7 Euroopassa (78 koko paketissa). Natiivin kuvanlataus (`UnityWebRequestTexture`) purkaa vain JPG:n ja
  PNG:n, ja WebP:lle sillä on oma reitti, joten TIFF-kuvat jäävät natiivissa tyhjiksi. Myöskään Chrome ei näytä
  TIFFiä. Euroopan kuvat: Alpit (lisat/1), Luzern (CHE/4), Dubrovnik ×2 (Pilen portti, Lovrijenac), Ateena
  (Schliemannin talo, takyt/2), FIN/0 nostot/1 (Matti Jämsä), GRC/4 nostot/1 (Theodorakis). Korjaus: JPG-versio
  Commonsista tai toinen kuva.
- Luxemburgilla ei ole yhtään nähtävyysjuttua (ainoa kaupunki-tyypin piste ilman nähtävyyksiä).
- 12 kuvaa jää alle 400 px lyhyemmältä sivulta. Näistä 5 on panoraamoja, jotka voivat olla kunnossa. Muut 7:
  Lissabon (Maria Severa), Praha (Dvořák), Sofia (vankila), Bukarest ×2, Islanti (Laxness), Sisilia (nuket).
- Euroopan ryhmään kuuluvat myös Bermuda, Falklandinsaaret (GBR), Cayenne ja Nouméa (FRA), koska niiden maakoodi on
  emämaan. Niillä ei ole nähtävyyksiä, julisteita eikä herokuvia, ja ne kasvattavat Iso-Britannian ja Ranskan
  offline-latausta. Onko tämä tarkoitus (VAIN EUROOPPA -rajaus)? Kysymys Fablelle.

**Pelikoodari:** ei löydöksiä. Ääniviitteet ratkeavat, ja ääniin liittyvät aukot ovat viennin kirjanpitoa (kohta 4).

## 6. Siirtosepän omat korjaukset

- **PR #3427** (valmis, Natiiviseppä kuittasi): 53 Flickr-kuvaa osoitti natiivissa suoraan `live.staticflickr.com`iin,
  eikä niitä ollut ämpärissä. Nyt osoite on repon kopio ämpärissä (`assets/valokuvat/…?v=`), ja Flickr jää varaksi.
- **PR #3432** (luonnos → seuraava erä): `mediaKuvat` (kohta 4).
- Viitteiden kirjanpito: kokoelmavaiheessa johdetut osoitteet eivät ole `media.json`:ssa, joten kuvamitat ja
  lisenssitarkistus eivät näe niitä. Korjaus on samassa erässä kuin `mediaKuvat`.
