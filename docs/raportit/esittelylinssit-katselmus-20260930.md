# Esittelylinssien katselmus (Linssiseppä 2, 30.9.2026 klo 15.19–15.24)

Arvioijan polku: 1.0.73 (juna 23fd0995), iPhone 17 Pro -simulaattori, uusi peli Ateenasta. Kaikki linssit avattiin, mikä
vastaa AvaaEsittelylinssit-kutsua (`linssi kehittaja 1`). Jokainen linssi avattiin vuorollaan, ja siitä otettiin kuva 3 s ja
9 s kohdalla sekä puhdas kuva ilman käyttöliittymää. Linssejä oli 14, eikä yksikään tuottanut poikkeusta.
Aineisto: proto-3d/lokit/linssiseppa2-linssikatselmus-20260930/ (kuvat/, valinnat/, ajo.log, stdout.log).

| # | Linssi | Tila | Havainto | Kuva |
|---|---|---|---|---|
| 1 | topografia | toimii | kohokuvio ja meret, kaunis | valinnat/linssi-topografia.png |
| 2 | isoisa-1873 | toimii | vuoden 1873 rajat ja nimet | valinnat/linssi-isoisa-1873.png |
| 3 | vesistot | toimii | kohokuvio ja joet (lähes sama kuva kuin topografiassa) | kuvat/03-vesistot-9s.png |
| 4 | keksinnot | toimii | avauskortti "Käynnistä" (esitys alkaa napautuksesta) | valinnat/linssi-keksinnot.png |
| 5 | ihmisen-matka | toimii | avauskortti "Käynnistä" | kuvat/05-ihmisen-matka-9s.png |
| 6 | ihmisen-matka-2 | toimii | avauskortti "Käynnistä" | kuvat/06-ihmisen-matka-2-9s.png |
| 7 | satelliitti | toimii | pilvipallo ja valikko "Minne katsotaan?" (ISS:n rinnalla, sisällä, avaruuskävely) | valinnat/linssi-astronautin-kamera.png |
| 8 | maapallon-vuosi | toimii | Blue Marble -pallo, kuukausisäädin | valinnat/linssi-maapallon-vuosi.png |
| 9 | radio | toimii | paneeli ja VU-mittari; asema valitaan kaupungista ("Ei asemaa – valitse kaupunki") | valinnat/linssi-radio.png |
| 10 | vertailu | toimii | kartta ja napit Suomi/Vertaa (sisältö tulee valinnasta) | kuvat/10-vertailu-9s.png |
| 11 | maatiedot | pieni vika? | näyttää peruskartalta, kunnes maata napautetaan; arvioija ei välttämättä huomaa linssin olevan päällä | kuvat/11-maatiedot-9s.png |
| 12 | yokartta | toimii | päivä/yö-pallo ja kaupunkien valot | valinnat/linssi-yokartta.png |
| 13 | tahdet | tyhjä päivällä | "Nyt"-taivas seuraa todellista aikaa: Ateenassa klo 15 taivas on sininen eikä tähtiä näy; 1873- ja Livia-vivut näkyvät | kuvat/13-tahdet-9s.png |
| 14 | poikkileikkaus | toimii | Olavinlinna aukileikattuna; kulman "Kuori: auto (huippu)" on kehittäjänappi (vain `Asetukset.Kehittaja`, ei arvioijalla) | valinnat/linssi-poikkileikkaus-olavinlinna.png |

Karttanäkymä korttiin: valinnat/kartta-kreikka-ateena.png (1.0.73, uudet kaupunkinimet ja nostot; kuvassa näkyvät luentakuva
ja Ohita).

## Ehdotukset

- **Tähdet (tyhjä päivällä):** korjataan niin, että linssi avautuu yötaivaaseen, kun paikallinen aika on päivä. Toinen
  vaihtoehto on avata linssi 1873-tilassa, jossa tähdet näkyvät. Arvioija avaa linssin todennäköisesti päivällä ja näkee
  tyhjän sinisen ruudun. Kyse ei ole simulaattorin rajoitteesta vaan ajan mukaisesta taivaasta. Jos korjausta ei ehditä,
  linssi piilotetaan esittelystä.
- **Maatiedot:** avauksessa voisi näkyä lyhyt vihje "Napauta maata". Pieni muutos, jonka voin tehdä.
- Muut linssit toimivat sellaisinaan.
