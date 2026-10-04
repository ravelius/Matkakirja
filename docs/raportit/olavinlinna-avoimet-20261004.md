# Olavinlinna: avoimet asiat yhtenä listana (Linnanrakentaja + Siirtoseppä, 4.10.2026 klo 12.3x)

Omistajan linja 4.10. klo 12.24: "nykyinen linna pitää saada ensin kuntoon". Lähteet: päätösloki
(docs/raamattu-loki/paatokset-2026-09.md, kaikki omistajan Olavinlinna- ja linnarivit 30.9.–3.10.), PR-tilat
(gh) ja Siirtosepän tilannetieto. Arviot ovat työtunteja ilman käännös- ja TF-jonoa.

## A. Tekemättä tai kesken

| # | Asia | Lähde | Tekijä | Arvio |
|---|---|---|---|---|
| 1 | **TF 136 -linnakierros:** 7 huonetta ja mylly iPhonella ja iPadilla. Natiivin tunnetuista vioista ei ole tietoa, koska kierrosta ei ole ajettu. | Päätoimittaja 4.10. | Siirtoseppä | 1 h |
| 2 | **Liekkien koot:** kun JSON-liekit korvattiin glb:n liekki:-solmuilla, keittiön tulisijan ja laiturin soihtujen liekit pienenivät, koska koko tulee solmun koko-extrasta. Tavoitekoot palautetaan dataan. | Siirtoseppä 4.10. (havainto) | Linnanrakentaja (data) + Siirtoseppä (tarkistus) | 0,5 h + 0,5 h |
| 3 | **Linnan viivapiirros, osat nimettyinä:** tilaus on lähetetty Codexille (posti 3cf0ddd08, 1.10.), mutta toimitusta ei ole tullut. Kytkentä peliin (infotaulu tai kokoelma) tehdään toimituksen jälkeen. | omistaja 1.10. klo 20.2x | Codex → Linnanrakentaja | Codex 1 kierros + 1 h |
| 4 | **Kuunnelmat kokonaisina:** omistaja salli 30.9. vain ääninäytteet. Koko kuunnelmaerä (7 huonetta) odottaa omistajan erillistä lupaa ja äänivalintaa. | omistaja 30.9. klo 15.5x | päätös omistajalle → Pelikoodari (generointi) + Siirtoseppä (kytkentä) | luvan jälkeen noin 3 h |
| 5 | **PR ravelius/Matkakirja#3740** (keittiön apulaisen ääni C, repliikit v2) on ollut auki 1.10. lähtien. Se on todennäköisesti korvautunut #3742:lla, jossa ovat kaikki puheet. Suljetaan tai mergetään. | gh | Julkaisija / Pelikoodari | 0,2 h |
| 6 | **Modulaarinen linnakirjasto:** materiaalit, hahmo_skin.py, ympäristö- ja vientityökalut ovat olemassa, mutta niitä yhdistävä kirjastorakenne ja dokumentaatio puuttuvat. Ei näy pelaajalle. Hyödyllinen ennen seuraavaa linnaa. | omistaja 30.9. klo 16.4x | Linnanrakentaja | 4–6 h |

## B. Valmiit, vahvistetaan TF 136 -kierroksella (kohta A1)

- **Myllyn laudat v2 (#3906) ja nappulaäänet v2:** kytketty natiiviin (989f121a, ASTC 6×6; b8002db5) ja mukana BUILD 136:ssa. Tarkistettu iPhonella ja iPadilla omissa käännöksissä.
- **Skinnatut hahmot (erä 1b):** kampaukset noin vuodelta 1500, jalkavarjo ja moonwalk-korjaus. Omistaja hyväksyi 2.10. klo 23.3x. Siirtosepän muistiinpanossa kampaukset näkyivät vielä avoimina, mutta ne ovat valmiit.
- **Puheet:** yksi puhe kerrallaan, eikä tekstiä näytetä puhekuplana, jos se kuuluu äänenä (omistaja 2.10. klo 14.1x). Alareuna on yksi kortti, Pulu istuu kortin kulmalla ja pienoiskartta on kehyksessä (2.10. klo 17.4x). Linnan ☰-valikko ja lähteet ovat omalla sivullaan. Siirtosepällä ei ole näistä avoimia.
- **Kertojan latausodotus** (siirtoseppa/kertoja-odottaa fff9971a) on mukana BUILD 136:ssa.
- **Aiemmin valmiit:** kertojan esittely, kamerakierros ja infotaulut (#3701), mikseri, ympäristö n1500 + splat-maasto (v3c #3755), kuori v24 (#3812), puukortit v3, puheet äänineen (#3742) ja rantaviiva (#3766).

## C. Ei aloiteta (omistajan linja)

- Allymes (toinen linna) ja arkki odottavat. Ajattelijatyö on pysäytetty omistajan korjauslistaan asti.
