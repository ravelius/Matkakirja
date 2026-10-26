# Nähtävyyskuvien tyylin yhtenäisyys — analyysi 27.9.2026

Sisältökirjuri, omistajan havainnon pohjalta (välitetty Fablen kautta):
vaikka 12+ värikorjauserää on jo mainissa, kuvakaappauksissa näkyy yhä
epäyhtenäisyyttä nähtävyyksien miniatyyrikuvissa. Tämä raportti
TUNNISTAA poikkeamat koneellisesti — se EI korjaa yhtään kuvaa eikä
muuta `js/packs/miniatyyrit.js`:ää.

## 0. Tärkein löydös ennen mittareita: värikorjatut kuvat eivät ole reposessa

Ennen mittaamista kannattaa tietää tämä, koska se selittää koko
analyysin rakenteen: **yksikään jo väriKORJATTU (`-vari2`) kuva ei ole
paikallisessa `assets/kartat/miniatyyrit/`-kansiossa.** Kaikki 565
`-vari2`-nimeä `js/packs/miniatyyrit.js`:ssä ovat "pelkkä tunnus"
-muodossa (ks. tiedoston oma kommentti ja `js/media.js`:n
`R2_ASSETIT.miniatyyrit = true` / `assetOsoite`) — ne syntyivät suoraan
R2-ämpäriin (`kohtaamiset/miniatyyrit/<tunnus>.png`), eikä niistä ole
koskaan ollut paikallista kopiota. Kun jokin kuva korjataan, VANHA
paikallinen tiedosto myös POISTETAAN reposta (esim. commit `9526a402d`
vaihtoi 36 kuvaa: 72 riviä muuttui `js/packs/miniatyyrit.js`:ssä, 0
tiedostomuutosta — eli vain viite muuttui polusta tunnukseksi, ja vanha
`.webp` on poistettu jo aiemmin/muualla).

Tämä tarkoittaa, että **paikallinen 449 kuvan kansio EI sisällä
yhtäkään referenssikelpoista, jo-korjattua kuvaa** — koko paikallinen
kansio edustaa korjaamatonta materiaalia. Jotta tehtävän pyytämä
"värikorjatun ryhmän mediaani/hajonta referenssiksi" olisi ylipäätään
mahdollista laskea, latasin analyysia varten kaikki 565 uniikkia
`-vari2`-kuvaa R2-ämpäristä (`https://media.matkakirja.app/kohtaamiset/
miniatyyrit/<tunnus>.png`, julkinen, verkko toimi suoraan tässä
konttiympäristössä) tilapäiseen tarkastelukansioon — kuvia EI
committoitu reposiin, vain niistä lasketut mittariluvut päätyivät
mittaritiedostoon (`sukupolvi: "värikorjattu"`, 565 riviä). Toistettava
komento on kirjattu `tools/nahtavyyskuvien-kartta-json.mjs`- ja
`tools/nahtavyyskuvien-tyylimittari.py`-tiedostojen ohjeisiin.

## 1. Menetelmä

1. `node tools/nahtavyyskuvien-kartta-json.mjs` tuo `MINIATYYRIT`-taulun
   Node.js:llä (ei regex-arvailua) ja tuottaa
   tiedostonimi→kaupunki/kohde-kartan.
2. `tools/nahtavyyskuvien-tyylimittari.py` (Python3 + Pillow, koska
   `sharp` ei ollut asennettuna työtilassa — `node_modules` puuttui
   kokonaan vaikka `package.json` listaa sen devDependenciksi — mutta
   Pillow 12.3.0 oli valmiina) laskee jokaiselle kuvalle:
   - **kylläisyys**: HSV S-kanavan keskiarvo niistä pikseleistä, jotka
     eivät ole läpinäkyviä (alfa < 12) eivätkä lähes valkoisia
     (min(R,G,B) ≥ 235).
   - **täyttö**: näiden "sisältö"-pikselien osuus koko 512×512-ruudusta
     (näytteistetty joka 2. pikseli nopeuden vuoksi suurilla kuvilla).
   - **tausta**: näyte kuvan ulomman ~6 % kehän pikseleistä.
     Enemmistö läpinäkyvä → `läpinäkyvä`. Muuten opaakkien
     kehäpikselien RGB-keskihajonta ≤ 10 → `valkoinen tausta`
     (yksivärinen reuna, ei välttämättä täysin puhdas valkoinen —
     tarkka reunaväri tallennettu `reuna_vari`-kenttään). Muuten →
     `maalattu tausta`.
   - **sukupolvi**: tiedostonimi päättyy `-vari2` → `värikorjattu`;
     muuten kuvan todelliset pikselimitat ≠ 512×512 → `vanha/muu
     mitta`; muuten → `Codex-kohtaus (korjaamaton)`.
3. Tulokset: `docs/raportit/nahtavyyskuvien-mittarit-20260927.json`,
   1014 riviä (449 paikallista + 565 R2-referenssiä, yksi rivi per
   kuva).
4. Poikkeamat: laskin väriKORJATUN referenssiryhmän (565 kuvaa)
   kylläisyyden mediaanin/hajonnan, mutta koska paikallinen aineisto
   jakautuu kahteen selvästi eri-ikäiseen sukupolveen (ks. kohta 2),
   yksilöllisten poikkeamien tunnistus tehtiin **kunkin sukupolven
   OMAN mediaanin/hajonnan sisällä** (kynnys 1,75 keskihajontaa) —
   muuten globaali kynnys olisi leimannut lähes koko vanhan sukupolven
   poikkeavaksi (ks. kohta 2, ei olisi tuottanut käyttökelpoista
   priorisointia). `maalattu tausta` liputetaan aina riippumatta
   kynnyksestä, koska referenssiryhmä on 100 % läpinäkyvä/valkoinen
   — LUEMINUT.md sallii kummankin, mutta ei koskaan maalattua taustaa.

## 2. Rakenteelliset löydökset (koskevat koko aineistoa, eivät vain listattuja poikkeamia)

### 2.1 Kaksi paikallista sukupolvea, kaksi vastakkaista systemaattista virhettä

| Sukupolvi | n | Kylläisyys (mediaani) | Ero väriKORJATTUUN (mediaani 0,332) |
| --- | --- | --- | --- |
| vanha/muu mitta (ennen numeroitua tilauskäytäntöä) | 363 | 0,243 | **selvästi haaleampi** (−0,089) |
| Codex-kohtaus (korjaamaton, jäljitettävä tilaus 4) | 86 | 0,417 | **selvästi värikkäämpi** (+0,085) |
| värikorjattu (-vari2, vain R2:ssa) | 565 | 0,332 | (referenssi) |

Tämä on todennäköisesti suurin yksittäinen syy omistajan havaitsemaan
epäyhtenäisyyteen: kaksi paikallista sukupolvea poikkeavat tavoitteesta
**vastakkaisiin suuntiin**, joten mikä tahansa kartta jolla on molempia
näyttää sekavalta riippumatta yksittäisten kuvien laadusta.

Tausta sukupolvittain: `vanha/muu mitta` = 333 läpinäkyvää + 30
valkoista taustaa, **0 maalattua**. `Codex-kohtaus (korjaamaton)` = 79
läpinäkyvää + **7 maalattua** (0 valkoista). Kaikki maalattu tausta
-poikkeamat tulevat siis uudemmasta, jäljitettävästä sukupolvesta.

### 2.2 27 kaupunkia joissa SAMALLA kartalla on sekä korjattuja että korjaamattomia kuvia

`js/packs/miniatyyrit.js` sekoittaa saman kaupungin sisällä paikallisia
polkuja ja R2-tunnuksia (esim. Berliinissä 12 paikallista + 2
`-vari2`-tunnusta samassa `berliini`-lohkossa) — pelissä nämä piirtyvät
VIEREKKÄIN samalle kohdekartalle. Pahimmissa tapauksissa lähes koko
kartta on vielä korjaamaton ja vain 1 kuva edustaa uutta tyyliä, mikä
tekee juuri sen yhden "oikean" kuvan visuaalisesti irralliseksi:

| Kaupunki | Paikallisia (korjaamattomia) | R2-korjattuja (-vari2) | Korjattujen osuus |
| --- | --- | --- | --- |
| pariisi | 30 | 1 | 3 % |
| lontoo | 20 | 1 | 5 % |
| wien | 14 | 2 | 12 % |
| helsinki | 10 | 5 | 33 % |
| madrid | 12 | 3 | 20 % |
| berliini | 12 | 2 | 14 % |
| rooma | 12 | 2 | 14 % |
| amsterdam | 11 | 2 | 15 % |
| firenze | 9 | 2 | 18 % |
| budapest | 7 | 3 | 30 % |
| kobenhavn | 8 | 2 | 20 % |
| newyork | 9 | 1 | 10 % |
| tampere | 8 | 2 | 20 % |
| bukarest | 7 | 2 | 22 % |
| oslo | 6 | 3 | 33 % |
| sofia | 6 | 3 | 33 % |
| tallinna | 6 | 3 | 33 % |
| tukholma | 6 | 3 | 33 % |
| vilna | 6 | 3 | 33 % |
| dublin | 6 | 2 | 25 % |
| lissabon | 5 | 3 | 38 % |
| pietari | 7 | 1 | 12 % |
| barcelona | 5 | 2 | 29 % |
| moskova | 6 | 1 | 14 % |
| sarajevo | 6 | 1 | 14 % |
| varsova | 6 | 1 | 14 % |
| praha | 5 | 1 | 17 % |

(Kaikki 27 sekakaupunkia listattu yllä.) Tämä on todennäköisesti se toinen suuri syy omistajan havaintoon: se ei
välttämättä ole yksittäinen "väärä" kuva, vaan se että kartalla on
YHTÄ AIKAA kahta eri korjausastetta. Ks. kontaktiarkit
kohdassa 4 — esim. `kontaktiarkki-helsinki.png` näyttää tämän suoraan:
4 vihreäreunaista `-vari2`-referenssiä yläriveillä ovat selvästi
haaleampia/pastellisempia kuin 6 punaisella "POIKKEAVA"-kehyksellä
merkittyä paikallista kuvaa allaan.

### 2.3 36 orpoa/duplikaattitiedostoa (ei liity väriin, mutta kannattaa tietää)

449 paikallisesta tiedostosta 36 ei löydy `js/packs/miniatyyrit.js`:n
mistään arvosta lainkaan — ne eivät siis näy pelissä ollenkaan tällä
hetkellä:
- 30 kpl on `.jpg`-duplikaatteja kaupungeista Bagdad/Firenze/Kairo/
  Shanghai/Souli/Tampere/Teheran/Tokio/Tripoli, joissa SAMA kohde on
  myös `.webp`-muodossa JA se `.webp` ON kartoitettu — `.jpg` on siis
  vanha jäänne, jota peli ei enää lue (esim.
  `kairo-abdeenin-palatsi.jpg` ja `kairo-abdeenin-palatsi.webp` ovat
  molemmat kansiossa, vain `.webp` on kartoitettu).
- 6 kpl on Nikosian `.webp`-tiedostoja, jotka olivat käytössä ENNEN
  värikorjausta — Nikosia siirtyi kokonaan `-vari2`-versioihin
  (kaikki 6 nikosia-kohdetta ovat R2:ssa), ja vanhat paikalliset
  `.webp`-tiedostot jäivät kansioon siivoamatta.
Nämä eivät vaikuta pelin ulkoasuun (eivät ole käytössä), mutta
täyttävät kansiota ja saattavat sekoittaa manuaalista tarkastelua —
mainitsen tässä, en ehdota poistoa (tehtävä oli vain analysoida).

## 3. Poikkeavat kuvat kaupungeittain (42 kuvaa / 413 aktiivisesta paikallisesta = 10 %)

Kynnys: yli 1,75 keskihajontaa oman sukupolvensa mediaanista
kylläisyydessä, TAI maalattu tausta. 34 "liian värikäs", 2 "liian
haalea", 7 "maalattu tausta" (1 kuva, `wien-taikahuilu.webp`, molemmat).

| Kaupunki | Kohde | Tiedostonimi | Sukupolvi | Poikkeaman tyyppi | Mitatut arvot |
| --- | --- | --- | --- | --- | --- |
| amsterdam | Yövartio | `amsterdam-yovartio.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.482 > 0.363 (sukupolvimediaani 0.248) |
| amsterdam | Maitotyttö | `amsterdam-maitotytto.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.440 > 0.363 (sukupolvimediaani 0.248) |
| amsterdam | Kapein talo | `amsterdam-kapein-talo.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.410 > 0.363 (sukupolvimediaani 0.248) |
| amsterdam | Herengracht 537 | `amsterdam-herengracht-537.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.404 > 0.363 (sukupolvimediaani 0.248) |
| ateena | Diogeneen astia | `ateena-diogeneen-astia.webp` | Codex-kohtaus (korjaamaton) | maalattu tausta | reunaväri #d0b68d |
| ateena | Elginin marmorit | `ateena-elginin-marmorit.webp` | Codex-kohtaus (korjaamaton) | maalattu tausta | reunaväri #a58664 |
| barcelona | Arc de Triomf | `barcelona-arc-de-triomf.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.369 > 0.363 (sukupolvimediaani 0.248) |
| berliini | Gaertnerin Berliini | `berliini-gaertnerin-berliini.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.422 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Kaisaniemen puisto | `helsinki-kaisaniemen-puisto.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.491 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Johanneksenkirkko | `helsinki-johanneksenkirkko.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.477 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Suomenlinna | `helsinki-suomenlinna.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.432 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Suomi herää 1899 | `helsinki-suomi-heraa-1899.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.429 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Linnanmäki | `helsinki-linnanmaki.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.422 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Uspenskin katedraali | `helsinki-uspenskin-katedraali.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.415 > 0.363 (sukupolvimediaani 0.248) |
| helsinki | Temppeliaukion kirkko | `helsinki-temppeliaukion-kirkko.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.377 > 0.363 (sukupolvimediaani 0.248) |
| ljubljana | Prešernin aukio | `ljubljana-pre-ernin-aukio.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.395 > 0.363 (sukupolvimediaani 0.248) |
| ljubljana | Keskustori | `ljubljana-keskustori.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.366 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Globe 1599 | `lontoo-globe-1599.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.433 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Palo 1666 | `lontoo-palo-1666.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.432 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Metron höyryveturi | `lontoo-metron-hoyryveturi.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.419 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Fleming 1928 | `lontoo-fleming-1928.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.415 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Exchange Alley | `lontoo-exchange-alley.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.393 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Canaletto Lontoossa | `lontoo-canaletto-lontoossa.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.391 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Turbiinihalli | `lontoo-turbiinihalli.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.377 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Dickensin pubi | `lontoo-dickensin-pubi.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.369 > 0.363 (sukupolvimediaani 0.248) |
| lontoo | Neljäs jalusta | `lontoo-neljas-jalusta.webp` | Codex-kohtaus (korjaamaton) | liian haalea (oman sukupolven sisällä) | kyll=0.254 < 0.259 (sukupolvimediaani 0.415) |
| luxemburg | Bockin kasematit | `luxemburg-bockin-kasematit.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.376 > 0.363 (sukupolvimediaani 0.248) |
| luxemburg | Chemin de la Corniche | `luxemburg-chemin-de-la-corniche.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.368 > 0.363 (sukupolvimediaani 0.248) |
| madrid | Tapaskierros | `madrid-tapaskierros.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.710 > 0.363 (sukupolvimediaani 0.248) |
| madrid | Chotis | `madrid-chotis.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.491 > 0.363 (sukupolvimediaani 0.248) |
| madrid | Goyan kansankuvat | `madrid-goyan-kansankuvat.webp` | vanha/muu mitta | liian värikäs (oman sukupolven sisällä) | kyll=0.439 > 0.363 (sukupolvimediaani 0.248) |
| oslo | Oopperatalo | `oslo-oopperatalo.webp` | vanha/muu mitta | liian haalea (oman sukupolven sisällä) | kyll=0.114 < 0.133 (sukupolvimediaani 0.248) |
| pariisi | Paras patonki | `pariisi-paras-patonki.webp` | Codex-kohtaus (korjaamaton) | liian värikäs (oman sukupolven sisällä) | kyll=0.650 > 0.571 (sukupolvimediaani 0.415) |
| pariisi | Lumière 1895 | `pariisi-lumiere-1895.webp` | Codex-kohtaus (korjaamaton) | liian värikäs (oman sukupolven sisällä) | kyll=0.605 > 0.571 (sukupolvimediaani 0.415) |
| pariisi | Carmenin ensi-ilta | `pariisi-carmenin-ensi-ilta.webp` | Codex-kohtaus (korjaamaton) | liian värikäs (oman sukupolven sisällä) | kyll=0.595 > 0.571 (sukupolvimediaani 0.415) |
| pariisi | Torni romuraudaksi | `pariisi-torni-romuraudaksi.webp` | Codex-kohtaus (korjaamaton) | liian värikäs (oman sukupolven sisällä) | kyll=0.592 > 0.571 (sukupolvimediaani 0.415) |
| pariisi | Impressionistit | `pariisi-impressionistit.webp` | Codex-kohtaus (korjaamaton) | maalattu tausta | reunaväri #ad875d |
| pariisi | Vrain-Lucas | `pariisi-vrain-lucas.webp` | Codex-kohtaus (korjaamaton) | maalattu tausta | reunaväri #81674b |
| rooma | Kolikko olan yli | `rooma-kolikko-olan-yli.webp` | Codex-kohtaus (korjaamaton) | maalattu tausta | reunaväri #c29e74 |
| wien | Taikahuilu | `wien-taikahuilu.webp` | Codex-kohtaus (korjaamaton) | liian värikäs (oman sukupolven sisällä); maalattu tausta | kyll=0.623 > 0.571 (sukupolvimediaani 0.415); reunaväri #8f7454 |
| wien | Figaro 1786 | `wien-figaro-1786.webp` | Codex-kohtaus (korjaamaton) | liian värikäs (oman sukupolven sisällä) | kyll=0.608 > 0.571 (sukupolvimediaani 0.415) |
| wien | Vuoristovesijohto | `wien-vuoristovesijohto.webp` | Codex-kohtaus (korjaamaton) | maalattu tausta | reunaväri #bcab80 |


**Huomio LUEMINUT.md:n omista esimerkeistä**: LUEMINUT.md ohjeistaa
katsomaan tyyliesimerkkinä mm. `helsinki-johanneksenkirkko.webp` — se
on TÄSSÄ ANALYYSISSÄ itse listattu poikkeavaksi (kyll=0,477 vs. oman
sukupolvensa mediaani 0,248, reilusti yli kynnyksen). Kannattaa harkita
LUEMINUT.md:n esimerkkiviittausten päivittämistä osoittamaan johonkin
jo `-vari2`-korjattuun kuvaan sen sijaan, koska nykyinen esimerkki ei
enää edusta tavoitetyyliä yhtä hyvin kuin korjattu joukko.

## 4. Kontaktiarkit

`docs/raportit/kuvat/nahtavyyskuvien-tyyli-20260927/kontaktiarkki-<kaupunki>.png`
— 49 arkkia (48 kaupunkia + `kontaktiarkki-tuntematon.png` kohdan 2.3
orvoille/duplikaateille), yhteensä n. 5,7 Mt. Jokaisessa arkissa:
- vihreäreunaiset solut ylhäällä = `-vari2`-referenssi (R2, EI
  paikallinen — ladattu vain arkin tuottamista varten, enintään 4/
  kaupunki),
- harmaareunaiset solut = paikallinen kuva, ei poikkeava,
- **punareunaiset solut + "POIKKEAVA"-leima = kohdan 3 taulukon rivi**.
- Jokaisessa solussa suoraan kuvan päällä: kohteen nimi, tiedostonimi,
  "vari2: KYLLÄ/EI" + sukupolvi, kylläisyysluku ja taustatyyppi.

Katso erityisesti `kontaktiarkki-pariisi.png` (koko kartasta vain 1/31
kuvaa on korjattu) ja `kontaktiarkki-helsinki.png` (4 korjattua vs. 6
poikkeavaa allekkain — epäyhtenäisyys näkyy silmämääräisesti heti).

## 5. Luonnos Codex-tilaukseksi (EI lähetetty, ei tallennettu posti/-kansioon)

> **Otsikko**: Miniatyyrien värikorjaus, erä 14 — 42 poikkeavaa kuvaa
> (koneellinen tyylianalyysi 27.9.2026)
>
> Koneellinen tyylimittari (`tools/nahtavyyskuvien-tyylimittari.py`,
> raportti `docs/raportit/nahtavyyskuvien-tyyli-20260927.md`) löysi 42
> nähtävyyskuvaa, jotka poikkeavat selvästi jo väriKORJATUSTA
> (-vari2) referenssijoukosta (565 kuvaa, HSV-kylläisyyden mediaani
> 0,332, keskihajonta 0,071 — LUEMINUT.md:n tavoitetyyli). Pyydän
> nämä 42 uusittavaksi SAMALLA paletilla/tyylillä kuin jo korjatut
> -vari2-kuvat.
>
> Referenssiksi 3 hyvää jo-korjattua esimerkkiä (katso tiedostot
> R2-ämpäristä `https://media.matkakirja.app/kohtaamiset/miniatyyrit/
> <nimi>.png`, tai kontaktiarkeista vihreäreunaisina soluina):
> - `berliini-hobrechtin-putket-vari2` (kylläisyys 0,357, lähellä koko
>   referenssijoukon mediaania)
> - `helsinki-pirtukuningas-vari2` (0,361)
> - `helsinki-kantele-vari2` (0,416, hieman värikkäämpi pää mutta yhä
>   siedettävissä rajoissa — hyvä esimerkki "ei liikaa" -rajasta)
>
> 34 kuvaa on LIIAN VÄRIKÄS omaan sukupolveensa nähden (enimmäkseen
> vanhempaa sukupolvea, joka on muutenkin koko joukkona haaleampi kuin
> tavoite — nämä yksittäiset kuvat erottuvat silti selvästi OMASTA
> ryhmästäänkin, ks. taulukko raportissa) — pyydän VÄHENTÄMÄÄN
> kylläisyyttä kohti 503/504-palettia.
> 2 kuvaa on LIIAN HAALEA omaan sukupolveensa nähden
> (`lontoo-neljas-jalusta.webp`, `oslo-oopperatalo.webp`) — pyydän
> HIEMAN nostamaan kylläisyyttä.
> 7 kuvalla on MAALATTU TAUSTA (`ateena-diogeneen-astia.webp`,
> `ateena-elginin-marmorit.webp`, `pariisi-impressionistit.webp`,
> `pariisi-vrain-lucas.webp`, `rooma-kolikko-olan-yli.webp`,
> `wien-taikahuilu.webp`, `wien-vuoristovesijohto.webp`) — kaikki
> tästä samasta "Codex-kohtaus"-sukupolvesta. Pyydän VAIHTAMAAN taustan
> läpinäkyväksi tai valkoiseksi (LUEMINUT.md: "valkoinen tai
> läpinäkyvä tausta", ei koskaan maalattua/kuvioitua reunaa asti
> ulottuvaa taustaa).
>
> Täysi lista tiedostonimineen ja kohteineen: ks.
> `docs/raportit/nahtavyyskuvien-tyyli-20260927.md` kohta 3.
>
> Rinnakkainen rakenteellinen huomio (ei vaadi uutta kuvatilausta,
> mutta kannattaa tietää): 27 kaupunkia näyttää tällä hetkellä
> yhtäaikaa sekä korjattuja että korjaamattomia kuvia samalla
> kohdekartalla (esim. Pariisi 30 korjaamatonta / 1 korjattu, Lontoo 20
> / 1) — tämä erä ei yksin ratkaise sitä, koska suurin osa noiden
> kaupunkien kuvista ei ole vielä edes tilausjonossa.

---

*Skriptit: `tools/nahtavyyskuvien-kartta-json.mjs`,
`tools/nahtavyyskuvien-tyylimittari.py`. Data:
`docs/raportit/nahtavyyskuvien-mittarit-20260927.json`. Kuvia ei
muutettu, `js/packs/miniatyyrit.js`:ää ei muutettu.*
