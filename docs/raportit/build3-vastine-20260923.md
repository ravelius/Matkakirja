# "Build 3 -vastine": aloitus → huipennus 6/6 + lehti + linssit

TestFlight-build 3:n asennus simulaattoriin ei onnistunut (Fablen
mainitsema rajoite) — ajettu sama kokonaisuus uusimmalla
master-käännöksellä sen sijaan. Build d4017f9 (master 9b1fa8c: inventaario
5–10 + radiojärjestys). Kuvat ja data:
`/Users/Shared/Claude/proto-3d/lokit/build3-vastine-20260923/`.

## A. Aloitus → huipennus

- `b3-aloitus-portti.png`, `b3-aloitus-avaus.png`, `b3-aloitus-valinta.png`:
  OK, samat kuin aiemmin tänään (docs/raportit/omistajan-ensikokemus-20260923.md).
- `b3-huipennus.png`: **OK, korjattu** — Natiivi-UI:n merge (natiivi-ui/
  sulje-aloitus @ 9312cae, aiemmin raportoitu bugi "huipennus jää
  valintaruudun alle") on master issa. Huipennuskortti "Aarnin luettelo on
  täynnä" näkyy nyt oikein, tilastot (83 päivää, 41 kaupunkia, 6 aarretta)
  ja "Jatka vaeltamista / Uusi matka" -napit paikallaan.

## B. Pelisilmukka 6/6

**Väliaikainen väärä hälytys korjattu ajon aikana**: ensimmäinen yritys
käytti `Peli-testit/silmukka-30s.txt`:n VANHAA kopiota (worktree
`proto-pelikoodari`, jäljessä masterista), joka ei antanut lähtökaupunkia
`uusi-peli`-komennolle — peli käynnistyi silloin Lontoossa (Pelikoodarin
vahvistama tarkoituksellinen kaanonimuutos, Fablen C8-tarkastus: tarina
alkaa nyt Lontoosta). Uusittu masterin ajantasaisella skriptillä
(`uusi-peli 12345 pariisi`, proto-3d/Matkakirja-proto/Peli-testit/
silmukka-30s.txt): **6/6 OK**, kaikki tarkistuspisteet täsmäävät
(`peli-tila-b3-*.json`, `peli-loki-korjattu.txt`):

| tila | silmukka | sijainti | raha |
|---|---|---|---:|
| b3-1-alku | Kartta | c:pariisi | 300 |
| b3-2-dialogi | Dialogi | c:pariisi | 300 |
| b3-3-lehti-lontoo | Lehti | c:lontoo | 250 |
| b3-4-lontoossa | Kartta | c:lontoo | 250 |
| b3-5-lehti-pariisi | Lehti | c:pariisi | 250 |
| b3-6-loppu | Kartta | c:pariisi | 250 |

## C. Lehti

- `b3-lehti-pariisi.png`, `b3-maalehti-fra.png`: OK, samat kuin
  aiemman lehtisavukkeen etusivut (docs/raportit/lehti-savuke-20260923.md).

## D. Linssit (kontakti-kaava)

- `b3-linssi-topografia.png`, `b3-linssi-vesistot.png`,
  `b3-linssi-satelliitti.png`, `b3-linssi-keksinnot-1873.png`,
  `b3-linssi-keksinnot-loppu.png`: kaikki OK, samat havainnot kuin
  aiemmassa linssien laitetestissä.

## Yhteenveto

Kaikki neljä osa-aluetta (A–D) läpäisivät ilman uusia poikkeamia tällä
master-käännöksellä. Ainoa mainitsemisen arvoinen asia on B-kohdan
väärä hälytys — ei tuotebugi, vaan oma testivirhe (vanha skriptikopio).
Huipennuksen aiempi bugi vahvistettiin korjatuksi.
