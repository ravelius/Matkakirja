# Shakki: valmiit koodit ja aineistot (lisenssikartoitus)

Pelikoodari 12.10.2026 (omistaja 12.5x: "Käytä shakkiin kaikki mahdolliset jo valmiit koodit yms avuksi"; PT: kartoitus SK:n Wien 1873 -sisältösuunnitelman PR:ään). Kohde: Unity 6 / C# 9, iOS ja Mac, UI Toolkit.

**Sallitut lisenssit:** MIT, BSD, Apache 2.0, zlib, CC0, PD.
**Ei käytetä:** GPL, LGPL, AGPL, eikä NC- tai ND-lisenssejä.

Lisenssi on tarkistettu LICENSE-tiedostosta tai viralliselta lisenssisivulta 12.10. (Sonnet-agentti, vain verkkohaku, mitään ei ladattu eikä ajettu). **TARKISTAMATTA** = lähdettä ei saatu vahvistettua; varmistetaan ennen käyttöä.

## 1. Säännöt, siirtogeneraattori, FEN/PGN

| Nimi | Mitä | Lisenssi | URL | Sopivuus |
|---|---|---|---|---|
| Gera.Chess | validointi, FEN/PGN/SAN, matti/patti, loppusäännöt | MIT | github.com/Geras1mleo/Chess | hyvä/varaus (.NET 8 → C# 9 -tarkistus; toiston tarkkuus TARKISTAMATTA) |
| Rudzoft.ChessLib | bittilaudat, generaattori, Zobrist, perft | MIT | github.com/rudzen/ChessLib | varaus (.NET 8, raskas, ei hakua) |
| Chess.NET (thomas-daniels) | validointi, linnoitus, ohestalyönti, FEN | MIT | github.com/thomas-daniels/Chess.NET | varaus (ylläpito loppunut, ei toistoa eikä riittämätöntä materiaalia) |
| SebLague Chess-Coding-Adventure | generaattori, haku, arviointi | MIT | github.com/SebLague/Chess-Coding-Adventure | hyvä mallina |
| MinimalChess (lithander) | pieni kirjasto ja moottori | MIT | github.com/lithander/MinimalChessEngine | hyvä |

Säännöt ovat yleistä tietoa, eikä niitä voi omistaa. Ohut oma sääntökerros on realistinen, ja sen oikeellisuuden voi testata perft-luvuilla.

## 2. Tekoäly

| Nimi | Mitä | Lisenssi | Sopivuus |
|---|---|---|---|
| MinimalChessEngine v0.6 | 708 riviä C#:aa: PVS, iteratiivinen syveneminen, null move, LMR, siirtotaulu, PST | MIT (Thomas Jahn 2021) | **paras lähtökohta** (~2443 CCRL; vaikeus syvyysrajalla ja kohinalla) |
| Leorik 3.2 | NNUE-moottori | MIT | vain ideoiksi (liian vahva, .NET 10) |
| Lozza (JS) | UCI-moottori | MIT | ideoiksi |
| Sunfish, Stockfish | – | GPL | **EI** |
| Wukong JS | – | lisenssi puuttuu | EI ennen selvitystä |

Vaikeustasot (oma työ):
- Helppo: syvyys 1–2 ja 10–20 % satunnaisia siirtoja.
- Normaali: syvyys 3–4 ja kohina.
- Vaikea: syvyys 5–6 tai 300–800 ms aikaraja, Task pois pääsäikeestä.

## 3. Tehtävät ja avaukset

| Nimi | Mitä | Lisenssi | Sopivuus |
|---|---|---|---|
| Lichess puzzle database | 6,16 milj. tehtävää (FEN, Moves UCI, Rating, Themes, Popularity …) | CC0 (database.lichess.org) | hyvä: esisuodatus 300–1000 tehtävään |
| lichess-org/chess-openings | ECO A–E, nimet, PGN/UCI/EPD | CC0 | hyvä (suomennos omaa työtä) |

Aloittelijasuodatus:
- Rating alle 1000–1200, RatingDeviation alle 80, Popularity yli 90, NbPlays yli 1000.
- Teemat mateIn1/2, fork, pin, hangingPiece tai backRankMate, pituus oneMove tai short.
- Muodon huomio: FEN on asema ennen vastustajan ensimmäistä siirtoa, ja pelaajan ratkaisu alkaa toisesta siirrosta.

## 4. Grafiikka

| Nimi | Mitä | Lisenssi | Sopivuus |
|---|---|---|---|
| Poly Haven chess_set | 3D, vintage-marmori; ~77 000 kolmiota; glTF/FBX; tekstuurit 1k–8k | CC0 | hyvä/varaus (1k–2k-tekstuurit mobiilille; erilliset nappulat TARKISTAMATTA) |
| Nailfighter LowPoly Chess Set | 3D, 163–338 kolmiota per nappula, FBX | CC0 | hyvä (kevyt varavaihtoehto) |
| Screaming Brain Studios 2D Chess Pack | 2D 128 px, PNG | CC0 | hyvä |
| Cburnett (Commons) | klassinen 2D-SVG | monilisenssi → valitaan BSD 3 | hyvä (copyright-ilmoitus mukaan; Lichessin cburnett-kopio on GPL, EI siitä) |
| lila rhosgfx | 2D-SVG | CC0 (lila COPYING.md) | hyvä |
| lila chessnut | 2D | Apache 2.0 | hyvä (NOTICE) |
| lila merida, mono, mpchess, pixel ym. ja NC-setit | – | GPL/AGPL/NC | **EI** |

Staunton-muoto on vuodelta 1849, eli 1873 aikainen. Sepia- ja paperitasoitus tehdään omana työnä olemassa olevilla tyylimäärittelyillä (UI-POHJAT).

## 5. Äänet

| Nimi | Lisenssi | Sopivuus |
|---|---|---|
| Freesound "chess piece" + CC0-suodatin (28 osumaa) | CC0, tarkistetaan tiedosto kerrallaan | hyvä: 3–5 ääntä (siirto, lyönti, shakki, matti), robots.txt/API-linjalla |
| Kenney/OGA 54 casino sound effects | CC0 | varavaihtoehto |
| Lichessin äänet | AGPL / CC BY-NC-SA | **EI** |
| Sonniss Ultimate Chess SFX | maksullinen | EI (ei ostoja 12.10.) |

## 6. Historia: Wien 1873 (SK:n sisältöön)

- **Wienin shakkikongressi 1873**
  - 21.6.–29.8.1873 maailmannäyttelyn rinnalla, Wiener Schachgesellschaft.
  - 12 pelaajaa, voittaja Steinitz; ratkaisu Blackburnea vastaan 2–0.
  - Faktat ovat vapaita, mutta Wikipedian tekstiä ei kopioida.
- **Turnauskirja** Lehner & Schwede 1874: todennäköisesti PD, kuolinvuodet TARKISTAMATTA. Digitoitua kopiota ei löytynyt.
- **Pelien PGN:t** tietokannoista: kokoelmien ehdot TARKISTAMATTA. Muutaman pelin siirrot syötetään itse PD-lähteestä.
- **Café Central** avattiin 1876, eli 1873 jälkeen. AIKA-sääntö sallii sen, koska kartta elää nykyajassa.

## Suositus: nopein laillinen tie

1. **Säännöt:** ohut oma sääntökerros MinimalChessin tai Chess-Coding-Adventuren rakenteella (MIT), tai Gera.Chess lähdekoodina, jos C# 9 riittää.
2. **Tekoäly:** MinimalChessEngine (MIT) Unityyn, ja vaikeustasot syvyydellä ja kohinalla.
3. **Tehtävät:** Lichess puzzle (CC0), esisuodatettu 300–1000. Avausnimet chess-openingsista (CC0), suomennettuina.
4. **Grafiikka:** Poly Haven chess_set (CC0) 1k–2k-tekstuureilla tai Nailfighter (CC0). 2D:ssä Cburnett (BSD) tai rhosgfx (CC0).
5. **Äänet:** 3–5 CC0-ääntä Freesoundista.
6. **Lisenssinäkymä:** MinimalChess (MIT, Thomas Jahn), Chess-Coding-Adventure (MIT, Sebastian Lague) jos käytetään, Cburnett (BSD 3), chessnut (Apache 2.0) jos käytetään.

**Itse tehtävä:**
- Unity-sovitus ja lauta olemassa olevilla UI-pohjilla (Mylly/Tavli-pohja).
- Vaikeustasot ja Task-aikaraja.
- Tehtävien suodatus ja etenemisjärjestys.
- Suomenkieliset tekstit ja Wien 1873 -tarina (SK).
- Äänten leikkaus ja tasoitus (ääniportti).
- Sepiatasoitus.

**Ennen koodausta varmistetaan:**
- Gera.Chessin toisto ja materiaalisääntö.
- Poly Havenin mesh-rakenne.
- Freesound-äänten yksittäiset lisenssit.
- Lehnerin ja Schweden kuolinvuodet.
