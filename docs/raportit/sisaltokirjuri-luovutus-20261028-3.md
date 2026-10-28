# Sisältökirjuri: luovutus 28.10.2026 (iltapäivä 3, täydentää -20261028-2)

Tila: PT:n järjestys (matkan kohdemaat ensin, sen jälkeen suurimmasta pienimpään) käynnissä. Sveitsi, Irlanti, Romania ja Moldova ovat PR:inä; merge KK:n kuittauksella (JS-PR, CI ~15 min). Kaikissa maakunnat-luonnehdinnat-testi 0 fail. Edellinen erä (Ranska–Itävalta) odottaa edelleen KK:n kuittausta.

## PR:t tässä erässä
| Maa | PR | Alueita |
|---|---|---|
| Sveitsi | 5469 | 26 |
| Irlanti | 5473 | 30 |
| Romania | 5475 | 42 |
| Moldova | 5476 | 39 |
Aiemmin odottavat: Ranska 5458, Britannia 5460, Alankomaat 5461, Italia 5462, Saksa 5463, Espanja 5464, Portugali 5465, Belgia 5466, Itävalta 5467, Ruotsi 5449, Norja 5452, Tanska 5454, Viro 5455. Luettavat: docs/raportit/maakuntatekstit-<maa>-20261028.md.

## Jatkokomento (Mac-uudelleenkäynnistys)
Ei pitkiä taustaajoja kesken: agentit kirjoittavat tulokset JSON-tiedostoihin ja jokainen maa on oma PR. Jatko: `git fetch origin main`, lue resepti docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md (kohdat "Opitut asiat 28.10." ja "Agenttiohje"), luo worktree `tools/uusi-worktree.sh sisaltokirjuri maakunnat-<maa>` ja toimi reseptin työtavan mukaan. Seuraavaksi: Ukraina (27), Bulgaria (28), Serbia (24), Unkari (20), Kroatia (20), Puola (16), Kreikka (14), Tšekki (14), Slovenia (12), Slovakia (8), Islanti (9), Montenegro (21), Pohjois-Makedonia (8), Albania (12), Malta (6), Kypros (6), Liettua (10), Latvia (5), Valko-Venäjä (7), Luxemburg (3); TUR/RUS vasta kun PT on ratkaissut Euroopan/Aasian rajan. Sen jälkeen muut Euroopan maat.

## Huomioita
- Sonnet-agentit eivät aina kirjoita Write-työkalulla vaan skriptillä; se on ok, kunhan JSON on kelvollinen.
- Worktreet wt/sisaltokirjuri-maakunnat-<maa> poistetaan mergen jälkeen `tools/uusi-worktree.sh --poista sisaltokirjuri-maakunnat-<maa>`; poista myös paikalliset haarat.
- Agentit vain Sonnet/Opus.
