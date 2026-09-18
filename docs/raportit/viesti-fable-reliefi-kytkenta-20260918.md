# Viesti Fablelle: puuttuvat reliefisarakkeet 75 ja 166

Opus-agentti 18.9.2026 klo 08.48–09.33 (Suomen aikaa), haara
`claude/bold-ride-vow4ki-reliefi-kytkenta` (origin/mainin päältä).

**Tämä raportti kattaa VAIN tehtävän kohdan 1.** Kohdat 2 (linssien
kytkentä pyramidiin), 3 (savukemittaukset) ja 4:n vientiluvut jäivät
tekemättä — 45 minuutin aikakatto meni kokonaan kohdan 1 kahden vian
juurisyyn selvittämiseen. Kohta 2 on koskematon: `js/linssit/`-koodiin
ei ole koskettu rivilläkään, eikä kytkintä `?reliefipyramidi=1` ole
olemassa. Sanon tämän suoraan, jotta seuraava ajo ei luule aloittavansa
puolivalmiista.

## Haaraa ei mergetty — työkalu otettiin tiedostona

`claude/bold-ride-vow4ki-reliefi-15s` on vanhemman mainin päältä.
`git diff --stat origin/main` sitä vastaan on **1 780 lisättyä ja
9 634 poistettua riviä**: merge olisi perunut kaupunkiliuskan, nostot,
aihemerkit, fokusvirran ja kymmenen raporttia. Otin siis vain sen
ainoan tiedoston, joka on työkalu:

```
git checkout origin/claude/bold-ride-vow4ki-reliefi-15s -- tools/tee-reliefipyramidi.mjs
```

Oletus, jonka tein itse: "työkalumuutokset mergellä" tarkoitti
työkalua, ei vanhan mainin paluuta.

## Kaksi vikaa, kaksi eri juurisyytä

Kumpikaan ei ollut se, mitä tehtävänannossa arveltiin (ikkunan
pyöristys tai lähteen reuna sinänsä). Molemmat varmistettiin
suoralla NCSS-koepyynnöllä, ei päättelemällä.

### Sarake 75 → HTTP 500: THREDDS kaatuu omaan liukulukutarkistukseensa

Pyyntö oli `west=-15.016666666666667&east=-15`. Vastauksen rungossa luki

```
AssertionError: -15.016666666666666 should be <= -15.01666
```

Luku on `−15 − 4/240` täydellä liukulukutarkkuudella. THREDDS vertaa
sitä omaan kuusidesimaaliseen katkaisuunsa ja kaatuu, kun pyydetty
reuna osuu noin 1e−11:n päähän hilan koordinaatista. **Vika on
palvelimen pyöristyksessä, ei meidän ikkunassamme** — ei
päivämäärärajassa eikä lat/lon-rajauksessa.

Korjaus: `pyoristaPyynto` katkaisee jokaisen pyydetyn koordinaatin
kuuteen desimaaliin (0,11 m päiväntasaajalla eli tuhannesosa
15″-solusta). Pyyntö pysyy samassa solussa muttei enää osu assertion
reunalle.

**Tulos: sarake 75 on kokonaan poltettu, 77 laattaa.** Ruudukko on
odotetut 521 saraketta (ennen: pyyntö ei mennyt läpi lainkaan), ja
laattojen koot ovat tavallista maastoa, 3–29 kt.

### Sarake 166 → HTTP 404: laattaa `E180` ei ole olemassa

Arkki on **361° leveä** (`LAUTA.lon0 = -175`), joten itäisin
laattasarake ulottuu yli 180 °:n: sarake 166 pyysi ikkunaa
**179,13…181,275**. Siitä `lahdeLaatta` muodosti nimen `E180`.
Tarkistin THREDDS:n katalogista: NOAA:n 15°-laatat ovat
**W180…E165** — 180 °E *on* W180:n länsireuna, eikä `E180`-nimistä
tiedostoa ole. Siksi 404.

Korjaus: `kaarra` katkaisee pituusastevälin ±180:ssä ja hakee rajan
yli menneen osan kierrettynä (−360); `siirto` kulkee palan mukana,
jotta liimaus panee sen takaisin oikeaan kohtaan globaalissa hilassa.
Koepyyntö `N90W180 west=-180 east=-178.725` vastaa **200 / 317 912
tavua CDF**, eli kierretty haku toimii.

**404 on poissa: kaikki 154 laattaa haettiin, ajo päättyi "Ei
virheitä".** Mutta sarake 166 EI ole kunnossa — ks. seuraava kohta.

## Mikä jäi kesken: sarakkeen 166 liimaus on yhä väärin

Haku onnistuu, mutta liimattu ruudukko on **86 917 saraketta
odotetun ~519:n sijaan** — eli kaksi palaa istuu hilan vastakkaisissa
päissä. Laatat kirjoittuivat 1–8 kt:n lähes tyhjiksi kuviksi.
Toistin vian eristettynä:

```
haeIkkuna({ lon0: 179.13, lon1: 181.275, lat0: 60, lat1: 61 })
  → leveys 86917, korkeus 240
```

Kokeilin yhtä korjausta — itäreunan vetämistä puoli solua sisään, kun
se osuu 15°:n rajaan (sama luokka kuin sarakkeen 75 vika) — **eikä se
auttanut: luku pysyi 86 917:ssä.** Jätin sen koodiin, koska se on
oikein muutenkin ja dokumentoi kokeillun polun, mutta se ei ole
ratkaisu. Aika loppui tähän.

Kaksi seikkaa seuraavalle ajolle:

1. **Leveysvahti ei lauennut, vaikka sen olisi pitänyt.** Koodissa on
   tarkistus `if (pala.leveys > odotettu) throw` (`odotettu` ≈ 310),
   ja silti 86 919 sarakkeen pala meni läpi ja laatta kirjoitettiin.
   Vahti on siis rikki tai sen ohittaa jokin polku. **Tämä kannattaa
   selvittää ENSIN** — se on syy siihen, että roskalaatta syntyi
   hiljaa virheen sijaan, ja se piilottaa seuraavankin vian.
2. Vasta sitten itse liimaus: kumpi pala saa väärän `siirto`-arvon vai
   palauttaako NCSS toisen palan koko tiedoston leveydeltä.

**Poistin sarakkeen 166 laatat** (`maailma/z7/166/`, 77 kpl) kansiosta,
jottei roskaa vietäisi R2:een eikä alinäytteistettäisi alemmille
tasoille. `--jatka` hakee ne uudestaan, kun liimaus on korjattu.

## Ajon tulos

Ajettu komento (kuten tehtävänannossa):

```
NODE_USE_ENV_PROXY=1 node tools/tee-reliefipyramidi.mjs \
  --jatka --tasot 7 --rinnakkain 3 --alue -180,-58,180,76 \
  --ulos <scratch>/reliefi15/maailma
```

| taso | laattoja levyllä | koko | avomerta kirjattu |
| --- | --- | --- | --- |
| z7 | 6 675 → **6 598** (166 poistettu) | 287,5 Mt | 6 184 |
| z6 | 1 932 | 91,4 Mt | 1 305 |
| z5 | 620 | 25,2 Mt | 220 |
| z4 | 201 | 6,5 Mt | 30 |
| z0–z3 | 92 | 2,3 Mt | 0 |
| **yhteensä** | **~9 400** | **431 Mt** | |

**Alinäytteistysajoa `--jatka --tasot 0-6` EI ajettu.** Se olisi
polttanut sarakkeen 166 roskan alemmille tasoille. Se kannattaa ajaa
vasta kun 166 on kunnossa — silloin se on neljän minuutin työ ilman
yhtään hakua.

Puuttuvien laattojen lista on nyt tasan **sarake 166, rivit 14–90
(77 laattaa)**. Sarake 75 ei enää puutu. NOAA ei kieltäytynyt
yhdestäkään laatasta — molemmat viat olivat pyynnön muodossa.

## Vienti R2:een (ÄLÄ VIE ennen kuin 166 on kunnossa)

Versioksi `20260918`. Komento, kun pyramidi on ehjä:

```
aws s3 cp <scratch>/reliefi15/maailma/ \
  s3://matkakirja/matkakirja/reliefipyramidi/20260918/ \
  --recursive --exclude "*" --include "*.webp" \
  --content-type image/webp \
  --cache-control "public, max-age=31536000, immutable" \
  --endpoint-url https://<tili>.r2.cloudflarestorage.com
```

Manifesti erikseen, **eri välimuistiotsikolla** (se päivittyy, laatat
eivät):

```
aws s3 cp <scratch>/reliefi15/maailma/reliefipyramidi.json \
  s3://matkakirja/matkakirja/reliefipyramidi/20260918/reliefipyramidi.json \
  --content-type application/json \
  --cache-control "public, max-age=300" \
  --endpoint-url https://<tili>.r2.cloudflarestorage.com
```

Koko **431 Mt / ~9 400 tiedostoa**. R2:een 100 Mbit/s:n yhteydellä
noin **10 minuuttia**, gigabitillä 2–3 min; pullonkaula on
tiedostomäärä, ei tavut, joten `--cli-write-timeout 0` ja oletusrinnak-
kaisuus riittävät. Avain on omistajalla — **en vienyt mitään.**

## Mitä EI tehty

- **Kohta 2, linssit pyramidiin: ei aloitettu.** `js/linssit/topografia.js`,
  `js/linssit/satelliitti-avaruus.js` ja `js/pallolaatat.js` ovat
  koskemattomat. Kytkintä `?reliefipyramidi=1` ei ole. Peittävyys 0,72,
  iOS-säännöt ja muistikatto ovat siis yhä avoinna.
- **Kohta 3, mittaukset: ei ajettu.** Ei savukkeita, ei kaappauksia;
  kansiota `docs/raportit/kuvat/reliefipyramidi-20260918/` ei luotu,
  koska siihen ei ole mitään pantavaa.
- Versionostoa ei tehty eikä `uusi-versio.mjs` ajettu: pelikoodi ei
  muuttunut, joten nostettavaa ei ole.
- Testiä työkalulle ei ole edelleenkään.
