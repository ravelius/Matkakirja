# Sisältökirjuri: luovutus 28.10.2026 (iltapäivä 4, täydentää -20261028-3)

Tila: PT:n järjestys (matkan kohdemaat ensin, sen jälkeen suurimmasta pienimpään) jatkuu. Tässä erässä Ukraina, Bulgaria, Serbia, Unkari ja Kroatia ovat PR:inä; merge KK:n kuittauksella (JS-PR, CI ~15 min). Kaikissa maakunnat-luonnehdinnat-testi 0 fail. Konteksti 30 %:ssa, luovutus hookin pyynnöstä.

## PR:t tässä erässä
| Maa | PR | Aluetta | Aluetyyppi |
|---|---|---|---|
| Ukraina | 5484 | 27 | alue |
| Bulgaria | 5485 | 28 | alue |
| Serbia | 5487 | 24 | piiri |
| Unkari | 5488 | 20 | komitaatti |
| Kroatia | 5489 | 20 | piirikunta |
Aiemmin odottavat: Sveitsi 5469, Irlanti 5473, Romania 5475, Moldova 5476, Ranska 5458, Britannia 5460, Alankomaat 5461, Italia 5462, Saksa 5463, Espanja 5464, Portugali 5465, Belgia 5466, Itävalta 5467, Ruotsi 5449, Norja 5452, Tanska 5454, Viro 5455. Luettavat: docs/raportit/maakuntatekstit-<maa>-20261028.md.

## Jatkokomento (Mac-uudelleenkäynnistys)
Ei pitkiä taustaajoja kesken: agentit kirjoittavat tulokset JSON-tiedostoihin ja jokainen maa on oma PR. Jatko: `git fetch origin main`, lue resepti docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md (kohdat "Opitut asiat 28.10." ja "Opitut asiat 28.10. iltapäivä" sekä "Agenttiohje"), luo worktree `tools/uusi-worktree.sh sisaltokirjuri maakunnat-<maa>` ja toimi reseptin työtavan mukaan (avaimet 6–8 per Sonnet-agentti JSON-tiedostoon, agenttiohje + maakohtainen lisäohje, tuore lukija, `maakuntateksti-aseta.mjs`, raportti, PR, ≤3 rivin viesti PT:lle). Seuraavaksi: Puola (16), Kreikka (14), Tšekki (14), Slovenia (12), Slovakia (8), Islanti (9), Montenegro (21), Pohjois-Makedonia (8), Albania (12), Malta (6), Kypros (6), Liettua (10), Latvia (5), Valko-Venäjä (7), Luxemburg (3); TUR/RUS vasta kun PT on ratkaissut Euroopan/Aasian rajan. Sen jälkeen muut Euroopan maat.

## Huomioita
- Kroatiassa fi-Wikipedia käyttää "piirikunta"; Unkarissa komitaatti; avain Csongrád = nykyinen Csongrád-Csanád. Unkarin luvut vuodelta 2019 (muuten ei samanvuotista).
- Kaikki kirjoitus- ja korjausskriptit olivat session scratchpadissa; ne eivät säily. Niiden rakenne on reseptin "Opitut asiat" -kohdassa.
- Worktreet wt/sisaltokirjuri-maakunnat-<maa> poistetaan mergen jälkeen `tools/uusi-worktree.sh --poista sisaltokirjuri-maakunnat-<maa>`; poista myös paikalliset haarat.
- Agentit vain Sonnet/Opus.
