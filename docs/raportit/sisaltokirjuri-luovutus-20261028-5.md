# Sisältökirjuri: luovutus 28.10.2026 (ilta, täydentää -20261028-4)

Tila: KK:n tarkistuksen (aluetekstit-tarkistus-20261028.md) korjaukset on tehty ja pushattu 20 PR:ään (5449, 5452, 5455, 5461–5467, 5469, 5473, 5475, 5476, 5484, 5485, 5487, 5488, 5491); uudet maat: Puola 5491, Kreikka 5499, Tšekki 5501, Slovenia 5503. Merge KK:n kuittauksella. Konteksti kasvanut, luovutus omasta aloitteesta.

## Avoimet
- Kroatia: Požega-Slavonia puuttuu kartta-aineistosta (maakunnat-nimet.js HRV, 20 avainta); Karttaseppä lisää avaimen porrastuksen ja TF 213:n jälkeen, sen jälkeen SK lisää tekstin (ehdotus reseptin "Avoimet"-kohdassa, PR 5499).
- Resepti (PR 5501): yksi worktree, uusi haara per maa. Levy oli täynnä: 13 mergattua worktreetä poistettu. Avointen PR:ien worktreet (alankomaat, bulgaria, irl, mda, puola, serbia, ukraina, unkari, viro, kreikka, tsekki) poistetaan mergen jälkeen `tools/uusi-worktree.sh --poista <nimi>` + `git branch -D`.

## Jatkokomento
`git fetch origin main`; lue resepti docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md (kohdat "Opitut asiat 28.10. ilta" ja "Agenttiohje"); worktree /Users/Shared/Claude/wt/sisaltokirjuri-maakunnat-tsekki (nyt haarassa sisaltokirjuri-maakunnat-slovenia, puhdas): `git switch -c sisaltokirjuri-maakunnat-<maa> origin/main`. Seuraavaksi: Slovakia (8), Islanti (9), Montenegro (21), Pohjois-Makedonia (8), Albania (12), Malta (6), Kypros (6), Liettua (10), Latvia (5), Valko-Venäjä (7), Luxemburg (3); TUR/RUS vasta PT:n ratkaistua Euroopan/Aasian rajan. Työtapa: agenttiohje = reseptin "Agenttiohje" + KK:n lisäsäännöt (sijainti ensilauseessa, enintään puolet kaupungista, luvut vain lähteestä) + maan lisäohje; 2 Sonnet-agenttia (6–8 aluetta) kirjoittavat JSON:in scratchpadiin, sinä korjaat faktat skriptillä (korvauslista, kaatuu jos vanhaa ei löydy), tuore lukija, `maakuntateksti-aseta.mjs <ISO3> tekstit.json` (muoto { avain: teksti }), raportti, PR, ≤3 rivin viesti PT:lle.

## Huomioita
- Tuore lukija keksii toisinaan sisältöä; hylkää huomautus, jota ei löydy tekstistä. Faktat tarkistetaan itse; korkeus- ja vuosiluvut muistista ovat yleisin virhe.
- Korvauksissa tarkista pisteet (Emona/Ig, Świętokrzyskie).
- Agentit vain Sonnet/Opus.
