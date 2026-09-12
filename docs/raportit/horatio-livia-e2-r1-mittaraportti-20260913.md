# Horatio–Livia E2 — parimitta, TTS, cuet ja kuvat

Sisältörevisio: `eu-hl-e2-20260913-r1-approved1`

Julkaistu lähtörevisio: `origin/main`
`079284e1cf09f650ed7e5f3d54f54c4e3da933b1`

Tila: hyväksytty ja sisältöjäädytetty; audioajo vain RC/animaatiovetäjälle.

## Yhteinen kuuntelubudjetti

Merkit ja sanat lasketaan näkyvistä teksteistä ilman Horation ja Livian
välistä erotinmerkkiä. Lopulliset sekunnit mitataan vasta hyväksytystä äänestä.

| Kaupunki | Lähtö Horatio | Lähtö Livia | Lähtöpari | E2 Horatio | E2 Livia | E2-pari | Muutos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Madrid | 353 m / 43 sanaa | 106 m / 15 sanaa | 459 m / 58 sanaa | 238 m / 29 sanaa | 156 m / 22 sanaa | 394 m / 51 sanaa | −65 m / −7 sanaa |
| Barcelona | 317 m / 41 sanaa | 106 m / 15 sanaa | 423 m / 56 sanaa | 235 m / 30 sanaa | 188 m / 22 sanaa | 423 m / 52 sanaa | 0 m / −4 sanaa |
| Sevilla | 342 m / 39 sanaa | 94 m / 12 sanaa | 436 m / 51 sanaa | 271 m / 31 sanaa | 152 m / 20 sanaa | 423 m / 51 sanaa | −13 m / 0 sanaa |
| Granada | 315 m / 44 sanaa | 89 m / 12 sanaa | 404 m / 56 sanaa | 209 m / 30 sanaa | 183 m / 23 sanaa | 392 m / 53 sanaa | −12 m / −3 sanaa |
| Lissabon | 330 m / 42 sanaa | 105 m / 14 sanaa | 435 m / 56 sanaa | 240 m / 32 sanaa | 150 m / 23 sanaa | 390 m / 55 sanaa | −45 m / −1 sana |

Jokainen pari ei ylitä lähtöparin merkkimäärää eikä sen sanamäärää.

## Täsmälliset v3-TTS-ehdokkaat

Tagien poisto palauttaa näkyvän tekstin sanasta sanaan. Tagit ovat
sisältöehdotuksia; tuotannossa käytetään vain yhteisessä sanastossa testattuja
v3-tageja.

### Madrid

Horatio:

> [curious] Pradossa pieni prinsessa sai huomion, suuri koira ei välittänyt. Maalari katsoi minuun; peilissä seisoi kuningaspari. Minä olin saanut paikan heidän edestään. Kahviloissa väiteltiin tasavallasta. [softly] Taulussa valta vaihtui ilman sanomalehteä.

Livia:

> [curious] Las Meninas on yhä Pradon salissa 12. [warmly] Minä tarkkailin jonon vieressä nukkuvaa koiraa. [mischievously] Se ei vilkaissut museoon päinkään. [softly] Velázquez olisi hyväksynyt asennon.

### Barcelona

Horatio:

> [curious] Barcelonan uusista kortteleista oli leikattu kulmat pois. Epäilin muuraria, kunnes kaksi kärryä mahtui kääntymään. Cerdà oli piirtänyt tilaa hengittää. [softly] Tulevan kadun paikalla kasvoi vielä kaalia; se ei tiennyt muuttuvansa liikenteeksi.

Livia:

> [curious] Cerdàn viistetyt kulmat näkyvät ilmasta yhä. [brightly] Laskeuduin räystäälle tarkkailemaan risteystä: jalankulkijat, pyörät ja autot kulkivat kukin suuntaansa. [mischievously] Minulle jäi taivas. [softly] Hyvin suunniteltu.

### Sevilla

Horatio:

> [curious] Sevillan tupakkatehdas näytti palatsilta, mutta portista kulki työväkeä. Nainen sitoi huivinsa, haukkasi leipää ja katosi sisään. Pihalta tuli appelsiininkukkien tuoksu. [softly] Aioin kirjoittaa suuresta rakennuksesta; kirjoitinkin pienestä aamiaisesta, joka piti sitä käynnissä.

Livia:

> [curious] Entinen tupakkatehdas on nyt yliopisto. [brightly] Näin opiskelijalla niin suuren paperipinon, että lähdin vaistosta perään. [softly] Ne eivät olleet kirjeitä. Hyvä yritys.

### Granada

Horatio:

> [curious] Alhambran hienoin rakennusaine oli vesi. Se kulki kapeissa uomissa ja puhui niin hiljaa, että minäkin vaikenin. Altaassa palatsi oli tehty valosta. [softly] Särjin sen sormellani ja odotin, kunnes se rakentui takaisin.

Livia:

> [curious] Alhambran Myrttipihan allas peilaa tornia yhä. [softly] Laskeuduin reunalle saadakseni kuvan, mutta tuuli rikkoi palatsin ensin. Odotin aivan liikkumatta. [mischievously] Kerrankin nokkani ei ollut syyllinen.

### Lissabon

Horatio:

> [curious] Baixan kadut vedettiin järistyksen jälkeen suoriksi kuin hallitsijan jakaus. Alfamassa eksyin silti. Yksi nainen neuvoi ylös, toinen alas. Kumpikin oli oikeassa: meri löytyi eri kattojen välistä. [softly] Kartta oli täällä taskussa kulkeva lohdutus.

Livia:

> [brightly] Raitiovaunu 12 kulkee Alfaman mäkien kautta. [curious] Seurasin sen kelloa kattojen yllä ja päädyin aivan eri aukiolle. [mischievously] Reitti jatkui — tehtävä vain jäi kesken.

## Cue-ankkuriehdotus

Nykyinen Horatio-cue-ID säilytetään vain, kun sen merkitys säilyy. Uudet
Livia-ID:t ovat ehdotuksia; poistettuja tunnuksia ei numeroida uudelleen.
Jokainen ankkuri on tarkoitettu yhteen osumaan.

| Kaupunki | Puhuja | cueId | ankkuri | tarkoitus | voima |
| --- | --- | --- | --- | --- | ---: |
| Madrid | Horatio | `madrid.r1` | `suuri koira ei välittänyt` | `huvittuu` | 0,45 |
| Madrid | Horatio | `madrid.r2` | `Maalari katsoi minuun` | `hammastyy` | 0,40 |
| Madrid | Horatio | `madrid.r3` | `paikan heidän edestään` | `myotailee` | 0,35 |
| Madrid | Horatio | `madrid.r4` | `ilman sanomalehteä` | `huvittuu` | 0,55 |
| Madrid | Livia | `madrid.livia.c1` | `yhä Pradon salissa 12` | `selittaa` | 0,40 |
| Madrid | Livia | `madrid.livia.c2` | `nukkuvaa koiraa` | `lammin` | 0,45 |
| Madrid | Livia | `madrid.livia.c3` | `ei vilkaissut museoon` | `ilo` | 0,50 |
| Barcelona | Horatio | `barcelona.r1` | `leikattu kulmat pois` | `hammastyy` | 0,40 |
| Barcelona | Horatio | `barcelona.r2` | `Epäilin muuraria` | `huvittuu` | 0,50 |
| Barcelona | Horatio | `barcelona.r3` | `tilaa hengittää` | `myotailee` | 0,40 |
| Barcelona | Horatio | `barcelona.r4` | `muuttuvansa liikenteeksi` | `huvittuu` | 0,50 |
| Barcelona | Livia | `barcelona.livia.c1` | `näkyvät ilmasta yhä` | `selittaa` | 0,40 |
| Barcelona | Livia | `barcelona.livia.c2` | `Laskeuduin räystäälle` | `ilo` | 0,45 |
| Barcelona | Livia | `barcelona.livia.c3` | `Minulle jäi taivas` | `ilo` | 0,55 |
| Sevilla | Horatio | `sevilla.r1` | `portista kulki työväkeä` | `huvittuu` | 0,45 |
| Sevilla | Horatio | `sevilla.r2` | `haukkasi leipää` | `myotailee` | 0,35 |
| Sevilla | Horatio | `sevilla.r3` | `appelsiininkukkien tuoksu` | `myotailee` | 0,30 |
| Sevilla | Horatio | `sevilla.r4` | `pienestä aamiaisesta` | `vakavoituu` | 0,50 |
| Sevilla | Livia | `sevilla.livia.c1` | `nyt yliopisto` | `selittaa` | 0,40 |
| Sevilla | Livia | `sevilla.livia.c2` | `niin suuren paperipinon` | `ilo` | 0,55 |
| Sevilla | Livia | `sevilla.livia.c3` | `eivät olleet kirjeitä` | `hammentynyt` | 0,45 |
| Granada | Horatio | `granada.r1` | `hienoin rakennusaine oli vesi` | `hammastyy` | 0,45 |
| Granada | Horatio | `granada.r2` | `että minäkin vaikenin` | `myotailee` | 0,40 |
| Granada | Horatio | `granada.r3` | `Särjin sen sormellani` | `vakavoituu` | 0,50 |
| Granada | Horatio | `granada.r4` | `rakentui takaisin` | `myotailee` | 0,45 |
| Granada | Livia | `granada.livia.c1` | `allas peilaa tornia yhä` | `selittaa` | 0,40 |
| Granada | Livia | `granada.livia.c2` | `tuuli rikkoi palatsin ensin` | `hammastys` | 0,45 |
| Granada | Livia | `granada.livia.c3` | `nokkani ei ollut syyllinen` | `ilo` | 0,55 |
| Lissabon | Horatio | `lissabon.r1` | `kuin hallitsijan jakaus` | `huvittuu` | 0,45 |
| Lissabon | Horatio | `lissabon.r2` | `Alfamassa eksyin silti` | `huvittuu` | 0,40 |
| Lissabon | Horatio | `lissabon.r3` | `toinen alas` | `huvittuu` | 0,50 |
| Lissabon | Horatio | `lissabon.r4` | `eri kattojen välistä` | `hammastyy` | 0,45 |
| Lissabon | Horatio | `lissabon.r5` | `taskussa kulkeva lohdutus` | `myotailee` | 0,40 |
| Lissabon | Livia | `lissabon.livia.c1` | `Raitiovaunu 12 kulkee` | `selittaa` | 0,40 |
| Lissabon | Livia | `lissabon.livia.c2` | `sen kelloa kattojen yllä` | `ilo` | 0,45 |
| Lissabon | Livia | `lissabon.livia.c3` | `tehtävä vain jäi kesken` | `huvittuu` | 0,50 |

## Kuvainventaario ja rajaus

Inventaario on luettu nykyisistä kaupunkipakeista. I1/I2 tarkoittavat
`matkakirja.luentakuva`- ja `luentakuva2`-kenttiä; P tarkoittaa
`pollo.kuvat`-listaa.

| Kaupunki | I1 | I2 | P-kuvia | Huomio |
| --- | ---: | ---: | ---: | --- |
| Madrid | 1 | 1 | 1 | Nykyinen P-kuva näyttää Pradon ulkopuolen ja koiran; sopii repliikkiin. |
| Barcelona | 1 | 1 | 1 | Nykyinen P-kuva näyttää Eixamplen viistetyn kulman ilmasta; sopii repliikkiin. |
| Sevilla | 1 | 1 | 1 | Nykyinen P-kuva näyttää entisen tehtaan nykyisen yliopistokäytön; sopii repliikkiin. |
| Granada | 1 | 1 | 1 | Nykyinen P-kuva näyttää Myrttipihan altaan heijastuksen; sopii repliikkiin. |
| Lissabon | 1 | 1 | 1 | Nykyinen P-kuva on Santa Justan hissiltä, ei raitiovaunu 12:sta; repliikki ei väitä kuvan esittävän raitiovaunua. |

Kuvia ei vaihdeta tässä erässä. Lissabonin mahdollinen myöhempi P2 olisi
raitiovaunu 12 Alfaman mäessä Livian seuratessa sitä kattojen yllä.

## Faktatarkistus ja epävarmuudet

- Madrid: Museo del Pradon oma teostietue sijoittaa *Las Meninasin* saliin
  012 ja merkitsee sen esillä olevaksi (päivitys 11.3.2026). Salinumero on
  ajantasainen mutta näyttelyripustus voi muuttua ennen julkaisua:
  https://www.museodelprado.es/en/the-collection/art-work/las-meninas/9fdc7800-9ade-48b0-ab8b-edee94ea877f
- Barcelona: kaupungin virallinen julkaisu kuvaa Eixamplen 20 metrin
  viisteet ja niiden muodostamat kahdeksankulmaiset risteykset. Verkkosivun
  robots-raja esti suoran sivuluvun, mutta virallinen kaupungin PDF oli
  haettavissa:
  https://bcnroc.ajuntament.barcelona.cat/jspui/bitstream/11703/101603/1/bcn01engp.pdf
- Sevilla: Sevillan yliopisto vahvistaa entisen kuninkaallisen
  tupakkatehtaan olevan yliopiston päätoimipaikka sekä rehtoraatin ja
  tiedekuntien käytössä:
  https://www.us.es/laUS/historia
- Granada: Alhambran virallinen sivu vahvistaa Myrttipihan altaan tyynen
  pinnan peilaavan ympäröivää arkkitehtuuria:
  https://www.alhambra-patronato.es/patio-de-los-arrayanes
- Lissabon: CARRISin oma 12E-sivu vahvistaa reitin kulkevan Alfaman
  kohteiden kautta. Syyskuun 2026 tilapäismuutos on kirjattu erikseen;
  siksi tekstissä ei väitetä ympyräreittiä tai paluuta lähtöpisteeseen:
  https://www.carris.pt/viaje/carreiras/12e/ ja
  https://www.carris.pt/viaje/alteracoes-de-servico/osdo2162026-2-edicao/

Ajantasainen rajaus: CARRIS ilmoittaa Santa Justan hissin ja osan
funikulaareista olevan tilapäisesti suljettuina tarkastusten vuoksi. Siksi
niiden tämänhetkistä liikennöintiä ei väitetä tässä tekstissä:
https://www.carris.pt/en/discover/fleet/lift/

## QA ennen teknistä RC:tä

1. Lukukopio hyväksytään tai palautetaan sanamuutoksiin kokonaisena viiden
   kaupungin settinä.
2. Hyväksynnän jälkeen runtime-cuet, tagirekisteri, tekstitiivisteet ja
   ääniajopaketti päivitetään erikseen.
3. Tagiton TTS tarkistetaan samasanaisuuteen ja jokainen ankkuri tasan yhteen
   osumaan.
4. Lopulliset kestot, SHA:t ja cue-ajat kirjataan vasta hyväksytystä audiosta.
