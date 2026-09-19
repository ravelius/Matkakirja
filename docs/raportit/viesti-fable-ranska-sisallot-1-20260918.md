# Viesti Fablelle: Ranskan hahmotelmanostojen sisällöt, erä 1 (kohteet 1–9)

PAATOKSET 44 kohta 1, erä 1/3. Tiedosto `js/packs/hahmotelma-fra.js`,
kohteet tiedoston järjestyksessä 1–9. Jokaiselle kirjoitettiin teksti
(3–5 virkettä), kaksi pulun kysymystä ja vähintään kaksi Commons-kuvaa;
`hahmotelma: true` poistettiin näiltä yhdeksältä. `lahi`, `tyyppi`,
`laudat`, koordinaattikommentit ja `nappi`-alaotsikot jäivät ennalleen.
Kohteita 10–27 ei koskettu (kaksi muuta agenttia tekee ne).

## Kohteet, lähteet ja kuvat

| Kohde | Tekstin lähde | Kuvat (tekijä, lisenssi) | Tiedostonimi ämpäriin |
| --- | --- | --- | --- |
| hahmotelma-pic-du-midi | en- ja fr-Wikipedia "Pic du Midi de Bigorre", johdanto-osat | 1) Benh LIEU SONG, CC BY-SA 2.0 (pääkuva) 2) tekijä tuntematon, public domain (kaiverrus 1878) 3) Le Commissaire, CC BY-SA 4.0 | fra-hahmotelma-pic-du-midi-vuori-85944887.jpg, fra-hahmotelma-pic-du-midi-1878-5dd1557d.jpg, fra-hahmotelma-pic-du-midi-observatorio-f3812f4d.jpg |
| hahmotelma-lourdes | en- ja fi-Wikipedia "Lourdes", johdanto-osat | 1) Emmanuel Brunner (Manu25), CC BY-SA 3.0 2) Charles Mercereau, public domain (kaiverrus) | fra-hahmotelma-lourdes-luola-875fe06a.jpg, fra-hahmotelma-lourdes-kaiverrus-aa3a306c.jpg |
| hahmotelma-canigou | en-Wikipedia "Canigó", johdanto-osa | 1) Fabricio Cardenas, CC BY-SA 4.0 2) Jordi Gili, CC BY-SA 4.0 | fra-hahmotelma-canigou-garces-0788be3c.jpg, fra-hahmotelma-canigou-huippu-03b4c489.jpg |
| hahmotelma-verdon | en-Wikipedia "Verdon Gorge", johdanto-osa | 1) Benh LIEU SONG, CC BY-SA 3.0 2) Benh LIEU SONG, CC BY 2.5 | fra-hahmotelma-verdon-sainte-croix-aa347532.jpg, fra-hahmotelma-verdon-trescaire-57009376.jpg |
| hahmotelma-chenonceau | en-Wikipedia "Château de Chenonceau", johdanto-osa | 1) Gzen92, CC BY-SA 4.0 2) Séraphin-Médéric Mieusement, CC0 (1800-luvun valokuva) | fra-hahmotelma-chenonceau-ita-a3123d4b.jpg, fra-hahmotelma-chenonceau-mieusement-b900bba0.jpg |
| hahmotelma-saint-malo | en- ja fi-Wikipedia "Saint-Malo", johdanto-osat | 1) Pierre André Leclercq, CC BY-SA 4.0 2) Photochrom Print Collection (Library of Congress), public domain | fra-hahmotelma-saint-malo-muurit-dad8f358.jpg, fra-hahmotelma-saint-malo-photochrom-eb927847.jpg |
| hahmotelma-pointe-du-raz | en- ja fr-Wikipedia "Pointe du Raz", johdanto-osat | 1) Foudebassans, CC BY-SA 4.0 2) Photochrom Print Collection, public domain | fra-hahmotelma-pointe-du-raz-vieille-0d90a4d0.jpg, fra-hahmotelma-pointe-du-raz-photochrom-6e2d59b2.jpg |
| hahmotelma-etretat | en- ja fr-Wikipedia "Étretat", johdanto-osat | 1) Yeuzio, CC BY-SA 4.0 2) Claude Monet, public domain (maalaus 1864) | fra-hahmotelma-etretat-aiguille-a0e9982a.jpg, fra-hahmotelma-etretat-monet-91236112.jpg |
| hahmotelma-amiens | en-Wikipedia "Amiens Cathedral", johdanto-osa | 1) Chabe01, CC BY-SA 4.0 2) Photochrom Print Collection, public domain 3) CEphoto, Uwe Aranas, CC BY-SA 3.0 | fra-hahmotelma-amiens-lansijulkisivu-f1ce66d9.jpg, fra-hahmotelma-amiens-photochrom-7a3a4117.jpg, fra-hahmotelma-amiens-julkisivu-6ed2cc6f.jpg |

Yhteensä 20 kuvaa. Kaikki tarkistettiin `node tools/hae-commons.mjs
tiedot "File:…"` -komennolla ja ladattiin 900 px leveinä. Kuvat ovat
kansiossa
`<scratchpad>/karttanostot-20260918/` ja osoitteet on kirjattu pakkaan
muodossa `https://media.matkakirja.app/karttanostot/20260918/<tiedosto>`.
Kuvia EI viety ämpäriin eikä committoitu repoon (Fable vie).

## Lisenssit

Kaikki 20 kuvaa ovat public domain, CC0, CC BY tai CC BY-SA. Yhtään NC-,
ND-, GFDL-only-, FAL- tai epäselvää lisenssiä ei otettu mukaan.
Epäilyttäviä ei jäänyt listalle: kaksi hakuosumaa hylättiin juuri
lisenssin takia (File:Lourdes Grotte.jpg — FAL; File:Chateau de
Chenonceau 2008E.jpg — GFDL).

## Silmätarkistus

Kaikki 20 ladattua kuvaa katsottiin. Kolme kuvatekstiä korjattiin sen
jälkeen vastaamaan kuvaa (Pic du Midin kaksi kuvaa, Saint-Malon muuri).
Kaksi ensin valittua kuvaa vaihdettiin katsomisen perusteella: Canigón
Céret-kuva oli rakeinen ja lähes tyhjää taivasta (tilalle Pic de Garces
-talvikuva) ja Amiensin valittu "julkisivu" oli enkeliyksityiskohta
(pääkuvaksi Chabe01:n koko länsijulkisivu, yksityiskohta jäi
kolmanneksi kuvaksi).

## Mitä jäi

- Kohteet 10–27 (muut kaksi erää).
- Verdonille, Canigóulle ja Pointe du Raz'lle ei löytynyt 1800-luvun
  kuvaa Verdonin ja Canigóun osalta lainkaan (Verdon: kaksi nykykuvaa,
  Canigó: kaksi nykykuvaa). Pointe du Raz'lle, Saint-Malolle ja
  Amiensille löytyi Library of Congressin photochrom, Chenonceaulle
  Mieusement'n 1800-luvun valokuva, Étretat'lle Monet'n maalaus 1864 ja
  Lourdesille Mercereaun kaiverrus sekä Pic du Midille kaiverrus
  peruskiven laskemisesta 1878.
- Havainnekuvat (PAATOKSET 44 kohta 4) odottavat kuvaputken tokeneita.
- Tiedoston alkukommentti sanoo yhä "EI KUVIA, EI VISOJA, EI
  PULU-KYSYMYKSIÄ" ja "hahmotelmapisteet — pelkät pisteet". Sitä EI
  muutettu, koska kaksi muuta agenttia kirjoittaa samaan tiedostoon
  samaan aikaan; kommentti kannattaa päivittää yhdellä kertaa, kun
  kaikki kolme erää on mergattu.

## Portit

- `node --test tests/*.test.mjs`: # tests 3645, # pass 3632, # fail 0,
  # skipped 13.
- `node tools/tarkista-kaksoisavaimet.mjs`: ei kaksoisavaimia.
- `node tools/build-standalone.mjs`: dist/matkakirja.html (32799 kt).
- Pakan lataus: `HAHMOTELMA_FRA`, 27 kohdetta, hahmotelma-lippuja
  jäljellä 18 (kohteet 10–27).

Versiota ei nostettu eikä PR:ää avattu (tehtävänannon mukaisesti).
