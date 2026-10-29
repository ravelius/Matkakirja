# Sisältökirjuri: luovutus 29.10.2026 klo 09.20 (täydentää -20261028-5)

Tila: PT:n kontekstivahti (30 %) → luovutus omasta aloitteesta. Maakuntatekstit koko alueesta (resepti docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md).

## Valmista
- Mergattu: 5499 Kreikka, 5501 Tšekki, 5503 Slovenia, 5505 (KS), 5509, 5550 Slovakia.
- Avoimet PR:t (merge JU:n jonossa 5551 → 5556 → 5558 → 5559): 5551 Islanti (9), 5556 Montenegro (21 kuntaa), 5558 Pohjois-Makedonia (8), 5559 Albania (12). Albania = "maakunta" (PT 29.10., fi-Wikipedia; korjattu d26c16d68).
- 5508 (Požega): punainen vain koska KS:n 5505 puuttui; 5505 mergattu, JU päivittää 5508:n jonon lopussa ja ilmoittaa, jos rebase tulee SK:lle.
- Juoksupelin rikotut esineet: 14 historiatekstiä + otsikko/kpl + kääretaulun kupla tiedostossa /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/rikotut-historia-20261029.json; omistaja hyväksyi 08.55 KK:n neljällä korjauksella (tehty), kellon "1600-luvun alussa" tehty; PK vei ne haaraan pelikoodari/rikotut-214. Valmis, ei jatkoa SK:lle.

## Seuraavaksi
Malta (6), Kypros (6), Liettua (10), Latvia (5), Valko-Venäjä (7), Luxemburg (3); TUR/RUS vasta PT:n ratkaistua Euroopan/Aasian rajan. Työtapa kuten Slovakia–Albania: worktree /Users/Shared/Claude/wt/sisaltokirjuri-maakunnat-tsekki (nyt haarassa sisaltokirjuri-maakunnat-albania, puhdas): `git fetch origin main; git switch -c sisaltokirjuri-maakunnat-<maa> origin/main`; agenttiohje = reseptin "Agenttiohje" + KK:n lisäsäännöt + maan lisäohje; 2 Sonnet-agenttia; korjaus skriptillä (korvauslista [vanha, uusi], kaatuu jos vanhaa ei löydy); tuore lukija; `node tools/sisalto/maakuntateksti-aseta.mjs <ISO3> tekstit.json`; `node --test tests/maakunnat-luonnehdinnat.test.mjs`; raportti docs/raportit/maakuntatekstit-<maa>-<pvm>.md; PR; ≤3 rivin viesti PT:lle.

## Opitut asiat (lisää resepti-tiedostoon, jos tilaa)
- Agentit tuottavat lähteettömiä tarkkoja lukuja (kuntamäärät, perustamisvuodet, "ainoa/suurin", korkeudet, matkustajamäärät, tunnuslauseet). Poista tai tarkista en-Wikipediasta WebFetchillä; pieni teksti (60–75 sanaa) on parempi kuin keksitty.
- Tuore lukija huomaa hyvin sen/siellä-viittaukset, aikamuodon (perustettiin/on perustettu), kuntakeskuksen puuttumisen ja kirjoitusasun vaihtelun (osmanit/ottomaanit); korjaa kaikkiin teksteihin yhtenäisesti. Älä jätä "siellä asuu" ilman selvää kohdetta: "ja kunnassa/maakunnassa asuu".
- Pääkaupunkiseutu ja pääkaupunki erillisinä avaimina (Islanti Höfuðborgarsvæði/Reykjavík): kirjoita niin, ettei sisältö toistu.
- Riippuvuus kartta-aineistoon (maakunnat-nimet.js): uusi avain tarvitsee KS:n PR:n mergattuna ensin, muuten testi kaatuu.
- Worktreet mergattujen PR:ien osalta: poista `tools/uusi-worktree.sh --poista <nimi>` + `git branch -D` (alankomaat, bulgaria, irl, kreikka, mda, puola, serbia, tsekki-haarat, ukraina, unkari, viro ym.).
