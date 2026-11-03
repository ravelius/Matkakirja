# Natiivi-UI: luovutus 2.11.2026 klo 20.07 (Nimikerroksen saapumiskorjaus mittausta vailla)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1544.md. Syy: konteksti pehmeällä rajalla (30 %).

## Tehty 15.44 jälkeen (kaikki junan 218 rungossa, NS mergesi)
- B kohdenostot c94645ac3 → runko c4953bfae (PT kuittasi; parit proto-3d/lokit/parit-piirros-nostot-b-20261102/).
- PELIT-välilehden 4 pientä kuvaa ddce40e7c → runko eb035c8c4 (Codex #1761–1764 FotoMinit-tauluun; kuittaus Codexille
  postilaatikossa b218922f0; pari proto-3d/lokit/parit-pelikuvat-20261102/pari-pelit-rajattu.jpg).
- Worktree proto-natiivi-ui-pelikuvat poistettu.

## TYÖN ALLA: Nimikerroksen osuus saapumisen nykäyksistä (PT 18.4x)
PT: "Selvitä, mikä Nimikerroksessa on raskasta saapumisen zoomissa, ja korjaa. Mittaa NS:n samalla saapumisskriptillä runkoa
vastaan. Runkoon vain, jos pitkät ruudut vähenevät. NS korjaa GC:n lähdettä (taustasäikeen jäsennys) – älä koske. Sovi iPad-vuorot
NS:n kanssa. Pari tai mittaustulos PT:lle."

Lähtötieto: NS:n paikannus proto-3d/lokit/natiiviseppa-saapuminen-paikannus-20261102/ (käännös 4fff097b6 = runko 0ffb7e562 +
merkinnät, ajo 18.10). Nimikerros pitkissä ruuduissa: Lado 138 ms/21, Elavat 109 ms/71, Piirra 39 ms/76. Oma havainto
konsolilokista: Nimikerroksen oma CPU-aika ruudussa on yleensä vain 2–8 ms, mutta **Lado varaa 4–6,5 Mt per ladonta** ja
Elavat 1–3 Mt per ruutu → ne syöttävät roskankeruuta (GC = 52 % pitkien ruutujen ajasta). Suuremmat lukemat (21–36 ms) ovat
ruutuja, joissa keruu osui Nimikerrokseen.

Korjaus **natiivi-ui/nimikerros-218 d0e48231c** (runko 0ffb7e562; Nimikerros.cs + NimiLadonta.cs, peilissä natiivi-backup), worktree
/Users/Shared/Claude/wt/proto-natiivi-ui-nimikerros:
1. ValitsePerintoSivut: kokoelmat ja listat käytetään uudelleen (ennen uusi List jokaiselle merkittävälle kohteelle, HashSet,
   Dictionary ja lajittelusulkeuma joka ladonnassa); ehdokkaiden poisto yhdellä kierroksella (ennen RemoveAt jokaiselle = O(n·k)).
2. Merkittävän qid kerran (ennen Substring jokaiselle merkittävälle joka ladonnassa, kun NostoQidt ei tyhjä – Pariisissa aina).
3. Kulmatesti ilman taulukkoa; Paikka.aallot vain merinimille (ennen Dictionary jokaiselle Paikalle, Paikka luodaan riveittäin joka tasolla).
4. NimiLadonta.Lado: lajittelun delegaatti kerran.
5. LisaaElavat: 2 ms/ruutu -budjetti (ElavatBudjettiMs), enintään 200 kuten ennen.
Käännöstä ei ole vielä tehty (C# tarkistamatta kääntäjällä – huomioi käännösvirheet ensin).

Mittausversio **natiivi-ui/nimikerros-mittaus-218 2a1a6e0e7** = NS:n natiiviseppa/paikannus-218 + d0e48231c (vertailukelpoinen
4fff097b6:n kanssa, samat Ruutusyy-merkinnät). NS:ltä pyydetty 20.0x iPad-vuoro + laitekäännös + ajo
proto-3d/tyokalut/natiiviseppa-skriptit/juna218/saapuminen-matka218.sh (Iso iPad 00008103-001819421413401E; ipad-lukko) – odota NS:n vastausta.

## SEURAAJAN JONO
1. NS:n vastaus: joko NS ajaa, tai saat vuoron ja laitekäännöksen. Vertaa yhteenveto.txt (pitkät ruudut, ms yhteensä, SYYT-rivin
   Nimikerros.* ja GC-lukumäärä) 4fff097b6:een (104 pitkää / 4306 ms; zoom 76 pitkää). Koska saapuminen vaihtelee, ota mieluiten 2 ajoa.
2. Jos pitkät ruudut/varaukset vähenevät: mittaustulos PT:lle (≤ 3 riviä, polku) → PT:n kuittauksen jälkeen mergepyyntö NS:lle
   natiivi-ui/nimikerros-218 (EI mittaus-haaraa). Jos ei vähene: ei runkoon, rivi PT:lle.
3. Jos Lado varaa yhä paljon: seuraava epäilty on HaePaikka (uusi Paikka + sanakirjarivi joka riville joka tason vaihdossa) ja
   LisaaElavat (Aluenimi + 2 sanakirjaa per nimi; pysyvää dataa) – Karsi voi pyörittää samoja nimiä (ElavaEnintaan 4000 → 3000).

**NS 20.1x: ajaa itse.** Laitekäännös 2a1a6e0e7, sitten saapuminen-matka218 vuorotellen 4fff097b6/2a1a6e0e7 ×2 (Iso iPad).
Tulokset proto-3d/lokit/natiiviseppa-saapuminen-matka-nimik-{ennen,jalkeen}{1,2}-20261102; NS lähettää rivin NUI:lle ja PT:lle.
Seuraaja: odota NS:n riviä, jatka jonon kohdasta 2.
