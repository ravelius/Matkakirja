# Karttatyökalun paneeli: Karttanostot | Maakunnat — suunnitelma (Pelikoodari 22.9.2026)

Vain suunnitelma; koodi alkaa, kun Fable on kuitannut kartan sulavuuden
(omistaja 21.9.2026 klo 22.15, loki: KARTTATYÖKALU on pelissä alusta asti
mukana kulkeva oikean yläkulman nappi, ei linssi eikä aarre).

## Lähtökohta koodissa

- Oikean yläkulman nappi ja levy ovat jo olemassa: `js/karttaselite.js`
  (`kaynnistaKarttaselite(ui)`: `.karttaselite` → `.karttaselite-nappi` +
  `.karttaselite-levy`, jossa `.karttaselite-ylarivi` (otsikko, OFF/ALL),
  `.karttaselite-lista` (8 aiheriviä) ja `.karttaselite-vihje`). Valojen
  koneisto `js/karttavalot.js` (tila localStorage `matkakirja-karttavalot`).
  Levy on yksi pysyvä elementti; avaus/sulku luokalla `.auki`, liuku ylös
  kartan napautuksesta. CSS `css/styles.css` n. rivit 25678–25900 sekä
  piilotussäännöt (kartalento, aikajana, satelliittilinssi).
- Maakunnat: Karttasepän admin-1-data `nykyalueet-<iso>.json`
  (`alueet[].tunnus`, avain `ISO:tunnus`, ks.
  docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/avaimet.md; maat
  FRA 13, DEU 16, ITA 20, ESP 19, GBR 4, POL 16, AUT 9, CHE 26 = 123).
  Karttasepän päätös (loki 21.9. ilta): värjäys VEKTORITASONA pallolla —
  admin-1-polygonit kolmioituina, väri kärkiattribuuttina, yksi drawcall
  per maa, napautus piste-polygonissa CPU:lla. Rajapinta sovitaan
  Karttasepän kanssa (alla "M1-kytkentä").
- Luonnehdinnat: `js/packs/maakunnat-luonnehdinnat.js`
  `MAAKUNTIEN_LUONNEHDINNAT[iso][tunnus] = { lyhyt, pitka?, kuva?, pulu? }`
  (Sisältökirjuri; erä 1 `lyhyt` ≤ 160 merkkiä valmiina v2037).

## Rakenne

Yksi nappi (nykyinen `.karttaselite-nappi`, title "Karttatyökalu"), yksi
levy. Levyn yläreunaan välilehdet `role="tablist"`:

```
┌ Karttatyökalu ─────────────────── ✕ ┐
│ [Karttanostot] [Maakunnat]          │   ← .karttatyokalu-valilehdet
│ ─────────────────────────────────── │
│ (tilan sisältö)                     │
└─────────────────────────────────────┘
```

- **Karttanostot** = nykyinen selitelista sellaisenaan (OFF/ALL, rivit,
  vihje). Ei muutoksia koneistoon; vain siirto välilehden paneeliin.
- **Maakunnat** (`.karttatyokalu-maakunnat`):
  - Lista maittain ryhmiteltynä (`<details>`-tyyppinen maaotsikko, ei
    natiivi details vaan sama luokanvaihto kuin levyllä), järjestys: ruudussa
    tai valittuna oleva maa ensin (pallolauta `kohdemaa`/`nakyvatMaat()`),
    sitten muut aakkosissa. Maa avataan oletuksena vain jos se on
    ruudussa.
  - Rivi per maakunta: `[vipu] Nimi (suomeksi, avaimet.md)  [täppä ▸] [pulu]`
    - vipu (`role="switch"`, `.karttatyokalu-vipu`): päällä → alue saa
      värin kartalla; vivun kahva ottaa alueen värin.
    - nimen alla `lyhyt`-luonnehdinta pienellä (Livian ääni), vain kun
      vipu on päällä TAI rivi on laajennettu; suljettuna vain nimi
      (lista pysyy lyhyenä: 123 riviä).
    - täppä `▸` laajentaa rivin (`aria-expanded`): `pitka` + kuva
      (`kuva.osoite`, lähde ja lisenssi kuvatekstinä kuvaputken sääntöjen
      mukaan) — sama laajenemistapa kuin nostokortin "Lisää". Jos
      `pitka`/`kuva` puuttuu (erä 2 kesken), täppää ei näytetä.
    - pulun nappi (sama ikoni kuin Ihmisen matkan pulukeskustelussa) avaa
      pulun keskustelun alueesta `pulu: [{ q, a }]` -kysymyksillä (erä 3);
      ilman dataa nappia ei näytetä. Toteutus `js/livia-chat`-polkua pitkin:
      valmiit kysymykset kuplina, vastaus pulun äänellä (sama malli kuin
      Ihmisen matka -linssi).
  - Ylärivissä `OFF` (kaikki värit pois) ja maan otsikkorivillä `kaikki`
    (maan kaikki vivut päälle/pois).
- Kartan napautus maakuntaan (Karttasepän osuma) kytkee saman vivun ja
  vierittää rivin näkyviin listassa, jos levy on auki; levy kiinni →
  vain väri vaihtuu (ei avaa levyä; omistajan liuku-sääntö pysyy).

## Väri

- Per maakunta atlaksen musteista (`--sym-*`-perhe ja kartuschan sävyt):
  8–10 sävyn kierto, pehmeä peitto (n. 0,22) reliefin päällä — Karttaseppä
  antaa lopullisen peiton mittaamalla (ei peitä reliefiä eikä nimiöitä).
  Naapurimaakunnat saavat eri sävyn: kierto avainlistan järjestyksessä,
  törmäys vältetään Karttasepän naapuruustaululla jos sellainen on;
  muuten pelkkä kierto.
- Väri kulkee vivusta vektoritasolle: `ui.pallolauta.maakunnat.aseta(avain,
  vari | null)`; vektoritaso päivittää kärkiattribuutin (ei geometrian
  rakennusta).

## Tila ja muisti

- Kuten karttavalot: LAITTEEN muistia, `localStorage`
  `matkakirja-karttatyokalu` = `{ tila: 'nostot'|'maakunnat', paalla:
  ['FRA:Bretagne', …] }`. Ei pelitilaa, ei tallenteeseen.
- Levy muistaa viimeisen välilehden.

## M1-kytkentä Karttasepän vektoritasoon (sovitaan)

Karttasepän moduuli (ehdotus nimeksi `js/pallolauta/maakunnat-taso.js`)
tarjoaa:

```
luoMaakuntataso({ pallo, kotelo, reitit }) → {
  lataa(iso)                       // nykyalueet-<iso>.json ämpäristä, kolmiointi
  aseta(avain, vari|null)          // väri kärkiattribuuttiin, palauttaa true jos alue tunnetaan
  paalla()                         // Set<avain>
  osuma(x, y) → avain|null         // piste-polygonissa (CPU), kotelon pikselit
  alueet(iso) → [{ tunnus, nimi, keskipiste }]
  pura()
}
```

Pelikoodarin paneeli kutsuu `lataa(iso)` vasta kun maan ryhmä avataan
listassa tai vipu kytketään (ei kaikkia 8 maata heti). Napautus kartalla
kulkee lauta.js:n olemassa olevan osumareitityksen kautta: nostot ja
kaupungit ensin, maakunta viimeisenä (vain jos Maakunnat-tila on ollut
käytössä ja jokin alue on ladattu).

## Sulavuus (ehdot, ennen kuin koodi alkaa)

- Vektoritason lisäys ei saa nostaa Ranska z6 zoomin p95:tä (kehysprofiili
  `?koe=` + Laitetestaajan iPhone-ajo ennen/jälkeen). Karttasepän arvio
  ≈ 0,1–0,3 ms/kehys.
- Paneelin lista rakennetaan kerran (kuten selitelevy), rivit 123 kpl
  DOMissa suljettuina; luonnehdinnat ja kuvat vasta laajennettaessa.
- Ei asettelumittoja kehyksissä: levy on `position: absolute`, sisältö
  vierii omassa laatikossaan (`max-height: 60vh; overflow: auto`).

## Erät

1. **Välilehdet** (Pelikoodari): karttaselite → karttatyökalu, kaksi
   välilehteä, Maakunnat-lista vivuilla ja `lyhyt`-luonnehdinnoilla ilman
   karttaväriä (vipu tallentuu, kartta ei vielä reagoi). Savuke:
   `savuke-karttatyokalu` (390/1400: nappi, välilehdet, lista, vipu,
   localStorage, näppäimistö, ei sivuvirheitä).
2. **M1-kytkentä** (Karttaseppä + Pelikoodari): vektoritaso + `aseta`,
   kartan napautus → vipu. Savuke: väri kartalla (kuvavertailu alueen
   keskipisteessä), osuma.
3. **Täppä ja pulu** (Pelikoodari, kun Sisältökirjurin erät 2–3 ovat
   datassa): laajeneva rivi kuvineen, pulun keskustelu.

## Avoimet kysymykset Fablelle

- Vaihdetaanko napin ikoni (nyt "selitelista") karttatyökalun ikoniin
  (esim. kerroksinen kartta) vai pysyykö?
- CHE (26 kanttonia) mukaan listaan heti vai vasta kun luonnehdinnat on
  kirjoitettu (avaimet.md: datassa, ei kuvissa)?
- Maakunnan värin sammutus kartan napautuksella samaan alueeen: kyllä
  (vipu-kytkin), oletan.
