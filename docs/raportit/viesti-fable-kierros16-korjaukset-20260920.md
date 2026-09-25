# Opus → Fable: kierros 16, kaksi korjausta (20.9.2026)

Erä `opus-local-kierros16-korjaukset`, Matkakirja Opus local (Mac Studio), 02.30–03.20
Suomen aikaa. Pohja `origin/v1970-prep` (753b31f4).

## 1. Pelaajan sijainti vuoti Astronautin kameran vastauksiin

Havainto (Sonnet 1, kierros 16): pulun vastaus alkoi *"…ei mitään tekemistä Brysselin
kanssa"*, vaikka kysymys koski avaruuskuvaa.

**Juurisyy (luettu koodista):** `js/pollo.js` `kokoaKonteksti` kirjoittaa joka kysymykseen
rivit "Kaupunki, jossa pelaaja on", "Maa, jossa pelaaja on" ja "Matkapäivä". Ne tulevat
`lueNakyma` → `pelinTila`-ketjusta, eikä ketju tuntenut linssejä lainkaan: astronauttitilassa
näkymäriville jäi arvo `kartta`. Toinen, heikompi reitti on `haeAineisto`, joka painottaa
hakua pelaajan kaupungilla ja maalla (`sijainti`), joten katkelmatkin olivat Brysselistä.

**Korjaus:** uusi `astronautinKameraPaalla(ui, doc)` (linssin tunnus `satelliitti`,
`ui.linssiValittu` tai valokuvanäkymän ruumiinluokka `satelliitti-kuva-auki`).
`lueNakyma` palauttaa silloin kontekstin ilman kaupunkia, maata ja matkapäivää, ja
näkymärivillä lukee "Astronautin kamera: valokuva avaruudesta, ei pelaajan sijaintia".
`haeAineisto` jättää sijaintipainon pois samassa tilassa. Muut pinnat eivät muutu.

**Vartio:** `tests/pollo.test.mjs`, uusi testi kolmella reitillä (pallolinssi, linssiValittu,
ruumiinluokka): kaupunki, maa ja matkapäivä eivät ole kontekstissa, ja kartalla ne ovat.
Sama testi varmistaa, että kartalla sijainti säilyy.

## 2. Kuvan laatikko jäi väärään suhteeseen (FRA Canigou)

Havainto: panoraamakuva täytti vain kuva-alan yläosan ja alle jäi iso tyhjä paperi.

**Juurisyy (luettu koodista):** kuva edellä -kortin kuvalaatikko on inline-pikseleitä, ja se
laskettiin VAIN ensimmäisestä latauksesta (`img.addEventListener('load', …, { once: true })`,
js/nostokuva.js). `asetaKuva` (js/media.js) vaihtaa virheen jälkeen varareitin osoitteeseen,
jolloin toinen lataus voi tuoda eri muotoisen kuvan — laatikko jäi silloin vanhaan suhteeseen
ja `object-fit: contain` jätti paperin näkyviin. Mac-ajossa Canigou latautui ensi yrityksellä
(960 × 540), joten alkuperäistä laitetilannetta EN saanut toistettua sellaisenaan; juurisyy
on siis koodista luettu ja vartio tehty sen mekanismin mukaan.

**Korjaus** (`js/nostokuva.js`): latauskuuntelija on pysyvä. Vaiheessa 1 ladonta ajetaan
uudestaan; vaiheessa 2, jossa leveys on lukossa, korkeus sovitetaan kuvan suhteeseen uudella
puhtaalla funktiolla `nostokuvanLukitunKorkeus` (katto on ruudun korkeus marginaaleineen,
joten pystykuva ei kasva ruudun yli). Sama sovitus ajetaan myös vaiheeseen 2 siirryttäessä.

**Vartiot:**
- `tests/nostokuva.test.mjs`: uusi testi (16:9-tapaus, panoraama, pystykuvan katto,
  kelvottomat mitat).
- Uusi `tools/savukkeet/savuke-nostokuva-suhde.mjs` (lisätty julkaisusarjaan): Canigoun
  kohdekortti 390 px, vaihe 1 ja 2 — laatikon suhde on kuvan suhde ±3 % — ja koe, jossa
  laatikko väännetään 3:2:ksi ja kuvalle lähetetään uusi `load`.

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha nostokuva.js) | **3/4**: väännetty laatikko jäi 1,50:een (kuva 1,78) |
| Korjattu | **4/4** |

`node --test tests/*.test.mjs`: pass 3717, fail 0. `tarkista-savukkeet`: kunnossa.

## Jäi tekemättä

- Alkuperäisen Canigou-tilanteen toisto laitteella (ks. yllä).
- Kierros 16b:n neljä kohtaa (Borgundin visa, pöllön arvonimi, Kristiania/Christiania,
  pulu Ranskan kartuschassa) ovat jonossa seuraavina.
