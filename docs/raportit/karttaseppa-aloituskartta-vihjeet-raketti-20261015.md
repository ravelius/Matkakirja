# Aloituskartan vihjeet ja ISS-raketin karttapaletti (Karttaseppä 15.10.2026 ilta; KK:n toimeksianto iss-yotaivas-20261015.md kohdat 3–4)

Kuvat ovat luonnoksia datasta: pallo piirretty pelin omista pohjalaatoista (2026-09-30-pohja-20261015, z4) samalla rajauksella kuin
natiivin valintanäkymä (pallo 1,15 × ruudun puolilävistäjä Euroopan päällä, keskipiste 50° N 15° E, iPad vaaka). Laivat, kompassiruusu
ja merien nimet ovat laatoissa kuten pelissä. Käyttöliittymä (Pulu, aloituspallot, napit) puuttuu kuvasta. Ei muutoksia peliin.

## 3. Vihjeet: `vihjeet-kuvapari.jpg` (nyt | ehdotus)

Valintanäkymä näyttää Euroopan ympäriltä noin ±44° itä–länsi ja ±31° pohjois–etelä. Siksi vihjeet ovat siinä kehässä, jonka pelaaja
näkee heti: Pohjois-Afrikka, Lähi-itä, Keski-Aasia ja Grönlanti. Kaukaisemmat kohteet (Tokio, New York) eivät näkyisi ilman pyöritystä.
Tyyli on kohdekarttojen akvarellipienoismallit (seepiaviiva ja haaleat laveeraukset kermapaperilla, 3/4-ilmakuva), jotka sopivat pallon
paperiin. Koko on noin 1,5 × meren laivat.

| # | Vihje | Paikka | Kuva |
|---|---|---|---|
| 1 | Marcus Aureliuksen riemukaari | Tripoli, Libya | olemassa: tripoli-marcus-aureliuksen-riemukaari |
| 2 | Mustansiriya-koulu | Bagdad, Irak | olemassa: bagdad-mustansiriya-koulu |
| 3 | Golestanin palatsi | Teheran, Iran | olemassa: teheran-golestanin-palatsi |
| 4 | Dhow-satama | Dubai, Arabiemiraatit | olemassa: dubai-dhow-satama |
| 5 | Gizan pyramidit | Egypti | UUSI (Codex) |
| 6 | Koutoubian moskeija | Marrakech, Marokko | UUSI (Codex) |
| 7 | Saharan karavaani (kamelit, dyynit) | Algeria | UUSI (Codex) |
| 8 | Registan | Samarkand, Uzbekistan | UUSI (Codex) |
| 9 | Jäävuoret ja kajakki | Etelä-Grönlanti | UUSI (Codex) |

- **Suositus:** 4 olemassa olevaa kuvaa (ei kuluja) ja 5 uutta Codexilta samalla reseptillä (assets/kartat/miniatyyrit/LUEMINUT.md;
  ei suojattuja teoksia: kaikki kohteet ovat vanhoja tai luontoa). Uusi kuvatuotanto vaatii omistajan luvan määrälle (5 kuvaa).
- Petra jätettiin pois, koska se osuisi Gizan päälle. Kairon olemassa oleva Saladinin linnoitus on varalla, jos pyramidit eivät käy.
- Toiminta (ehdotus NUI:lle): vihjeet näkyvät vain valintanäkymässä. Napautus näyttää nimen ja rivin "Odottaa myöhempiä matkoja",
  eikä se avaa kaupunkia.

## 4. ISS-raketti: `raketti/raketti-kuvapari.jpg` (nyt | ehdotus)

Yksi suositus: sama malli, värit pallon paperista ja akvarellipienoismallien laveerauksista. Runko on paperinkerma 230/216/186
(ei valkoinen), punainen murrettu tiili 158/92/72 (oli 176/58/43), oranssi haalea okra 196/162/108, kärki haalistunut messinki 205/178/128,
suutin ja torni seepiamuste 70/51/31. Kartalla raketti erottuu yhä, mutta ei hyppää esiin muista kartan elementeistä.
Valmis glb odottaa päätöstä: `raketti/iss_raketti_kartta-karttapaletti.glb` (LR:n v2-skripti, vain PALETTI vaihdettu:
`raketti/iss_raketti_kartta_paletti.py`). Kytkentä on yksi tiedostonvaihto (Resources/KaupunkiPallo/raketti_kartta).
