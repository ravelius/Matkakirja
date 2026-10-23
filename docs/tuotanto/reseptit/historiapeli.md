# C Resepti: historiapeli

*(Pelikoodari 23.10.2026, studiojako (Raamattu 4.21). Lyhyt tuotetyypin kooste. Suunta: `docs/tuotanto/suunta/` (taide, ääni,
kerronta, kamera); tekotavat: `docs/tuotanto/tekotavat/koodi.md`, `ui.md`, `tekstit.md`, `aani.md`, `kamera-ja-video.md`,
`testaus.md`; vaiheet, portit ja luvat: `docs/tuotanto/tuotannonohjaus.md`. Voimassa oleva täysi pohja siirtymäajan (roolien
osuudet ja opit): `docs/moduulit/tuotantopohjat/historiapeli.md`.)*

## Tuote

Pelattava historiallinen kohde maan tasalta (Raamattu 2.185 VIDEOPELIT, HISTORIALLISET KOHTEET SEIKKAILUINA): nykyajan pelaaja
siirtyy hetkeen ja ratkaisee arvoituksen tai etsii aarteen. Nyt: Kielletyn kaupungin juoksupeli (lapsi-Puyi noin 1914),
Olavinlinna 1499 (tauolla), Giza myöhemmin. Ei sisällä historiaa kertovaa linssiä, kertojan tekstiä yleisesti eikä
esirenderöityä videota (omat reseptinsä).

## Rajaus

- Yksi kohde kerrallaan; uusi kohde vain omistajan päätöksellä. Euroopan ulkopuoliset kohteet ovat omistajan nimeämiä poikkeuksia.
- Pelaaja astuu suoraan toimintaan; pelin aikana ei opeteta eikä kysellä. Tietokerros vasta lopussa tai pyydettäessä.
- Videopeleissä ei Pulua (2.176); kehys, ☰, tauko ja kortit yhteisistä osista (2.201).

## Tavoite (kirjataan ennen työtä)

| Ala | Tavoite |
|---|---|
| Koko peli | tavoitekuva: havainnekuvat tärkeimmistä näkymistä (Codex), kameran etäisyys ja hahmon koko näkyvissä |
| Kamera | kuvakäsikirjoitus tai viitevideo (juoksupeli: hahmo noin 1/6 kuvasta, kujilla kapea, aukioilla laaja kuvakulma) |
| Mekaniikka | nimetty jo ideassa (juoksupelin pyyhkäisyt, hiiviskely) ja harmaana pelattavana ennen grafiikkaa |
| Äänet | mallinäyte ja kuvaus; tekstit ja repliikit esimerkkeinä pelinäkymässä ennen koko erää |

## Tuotokset ja polut

| Tuotos | Tekijä | Polku |
|---|---|---|
| Säännöt, reitti, botti, pisteet | Pelikoodari | proto `Assets/Matkakirja/Peli/<Peli>/`, testit `Peli-testit/Testit/` |
| Maailma, kamera, mallien kytkentä | Pelikoodari | proto `Assets/Matkakirja/Scripts/<Peli>/` |
| Ruudun osat (kuvateksti, Ohita, loppu- ja kokoelmakortti, suunta) | Natiivi-UI | proto `UI/Pelit/<Peli>*.cs`; isännälle 1–3 kutsuriviä |
| Kehys, rakennukset, tausta, katottomat huoneet | Lavastaja | `_valmiit/<nimi>-vienti-<pvm>/` → ämpäri |
| Mallit ja kuvat | Codex (Tripo) | Codexin paketti → tuotantoputken seuranta (`docs/tuotantoputki/hyvaksytyt.json`) peliin asti |
| Faktapohja, tarina, repliikit, tietokerros | Sisältökirjuri | `docs/kohtaukset/<kohde>/`, `docs/raportit/faktapohja-<kohde>.md` |
| Äänet ja huudot | Äänittäjä | ämpäri `aanet/…`, äänipankki `tools/aanipankki/rekisteri.json` |
| Pelin tekstit | Sisältökirjuri → Pelikoodari | `Resources/<Peli>/tekstit.fi.json` |

## Reseptikohtaiset säännöt

- **Harmaa ensin:** peli pelattavissa alusta maaliin paikkamerkeillä, botti läpäisee; mallit korvaavat paikkamerkit latautuessaan
  (B koodi 2.4), jolloin grafiikka ei pysäytä pelattavuutta.
- **Anteeksiantava vaikeus:** kiinnijäänti ja uupuminen jatkavat lähimmästä kynnyksestä (juoksupeli: taso 2:sta), ei alusta.
- **Kehittäjätilan aloituskohdat** QA-komennoilla (`ui juoksupeli …`), jotta jokaisen kohdan voi tarkistaa ilman läpipeluuta.
- **Totta ja FIKTIO erikseen** tietokerroksessa (kortti "Mikä oli keksittyä?"); anakronismilista ennen esineitä ja huutoja.
- **Huudot ja kuplat:** huutorivin mukana näytetään aina kuplan teksti; eri hahmot eri äänillä äänipankista.
- **Tilattu malli on valmis vasta pelissä:** jokainen Codex-/Tripo-toimitus seurataan kytkentään; jos maailma on vaihtunut,
  kytkentä odottaa ja asia kirjataan seurantaan (23.10.: yläreitti v2 tehtiin korvattuun v4-maailmaan).
- **Todistuskuva pelinäkymästä**, ei latausruudusta.

## Valmis kun

- [ ] Tavoitekuva ja kameran kuvakäsikirjoitus olemassa ennen rakentamista.
- [ ] Harmaa versio: pelattavissa alusta maaliin, botti läpi, ruudun osat pohjilla.
- [ ] Faktat: kaksi lähdettä per väite, riippumaton tarkistus, anakronismit pois, pelaaja sukupuoleton.
- [ ] Näköisyys: kamera ja hahmon koko tavoitekuvan mukaan, katot kiinni tai katottomat huoneet, tilatut mallit pelissä.
- [ ] Testit: `kaanna.sh` 0 fail, `tarkista.sh` 0 virhettä, botti ja mittari ilman nykäysrivejä; todistuskuvat pelinäkymästä.
- [ ] Opit kirjattu tähän tai tekotapaan (siirtymäajan pohjan luku 7).

Vaiheet, omistajan näkemiskerrat (tavoite, harmaa versio, valmis näköisyys), hyväksyjät ja luvat: tuotannonohjaus.
