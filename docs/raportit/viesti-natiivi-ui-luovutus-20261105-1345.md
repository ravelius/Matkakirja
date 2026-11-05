# Natiivi-UI: luovutus 5.11.2026 klo 13.45 (konteksti 26 %)

Edellinen: viesti-natiivi-ui-luovutus-20261105-1230.md (haara natiivi-ui/luovutus-20261105-1230; siitä kohdat 3 ja 4 ovat yhä voimassa).
Proto: /Users/Shared/Claude/wt/proto-natiivi-ui-nousu-pieni, haara natiivi-ui/pariisi-lento-219, kärki 487538dac. Vain paikallinen: origin-etäpäätä ei ole, push epäonnistui, eikä natiivi-backupiin ole pushattu.

## Sääntö (omistaja 13.24, Raamattu 2.214, PR 6278, PT 13.25)
Näkyvä Pariisin askel valmis → Macin kuva (polku + yksi rivi) suoraan KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPad-ajoja eikä mittauksia (2.209); Mac-ajot JU:n vuorolla. Siirrä seuraavaan luovutukseen. PR 6278 ei ollut mainissa 13.25.

## Tehty tällä vuorolla
- Korjattu 487538dac: `SaapumisKuvat.Aloituslento` kutsui kehänä itseään (SaapumisZoomaus → KohteidenRajaus → RajauksenPaikat → TrailerinKuvat). Peli kaatui Pariisiin saavuttaessa. Korvaava ehto `PeliOhjain.OnSaapumisZoomaus` ei laske rajausta. Ensimmäinen d81627510-ajo ei tuottanut kuvia.
- Mac-ajot JU:n vuorolla, L2 vapautettu ja JU:lle kerrottu. Kuvat:
  - lokit/esikatselu-20261105-133021: Lontoo → Pariisi (sk-matka), 31 kuvaa
  - lokit/esikatselu-20261105-133558: uusi peli suoraan Pariisiin (sk-uusipeli), 15 kuvaa
  - lokit/esikatselu-20261105-133758: kyltit (sk-kyltit), 4 kuvaa
- Skenaariot ja ajoskripti: proto-3d/_tyo/natiivi-ui/aloituslento-219/ (aja.zsh, sk-matka.txt, sk-uusipeli.txt). Muistiarkki: scratchpadin arkki.py ei säily, tee tarvittaessa uudelleen.
- KK:lle lähetetty 13.43 a03, a13 ja olavinlinna, kopio PT:lle. KK:n viesti oli jonossa lähetyshetkellä; vastausta ei vielä tullut.

## Mitä kuvista nähtiin (itse katsottu täysikokoisena: a03, a13, b07, olavinlinna; muut arkkina)
- A: kolme kuvaa nousee ja palaa limittäin, 4,2 s:n välein (loki). Eiffel, Sacré-Cœur, Notre-Dame. Louvre ja Riemukaari jäävät pois, koska niitä ei ole viety.
- D: i1 ja i2 nousevat, lopuksi molemmat matkakirjan alaosassa (a13). Luennan teksti on Tuileries'stä.
- E: Pulun kuva nousee (b07). Kultaista kehystä ei nähty: paluu osuu kartan loitontumiseen Ranskan näkymään (b08), joten pyöreän merkin väri on todistamatta.
- Kyltit: Kuumailmapallo £200 ja Olavinlinna £20 näkyvät. Kaukaa (korkeus 3) ruutu on musta, pallossa ei kylttiä. Raketin kylttiä ei näy kuvassa; paikka oli arvattu.
- Mac-ajon rajoitus: kartan merkit ja nousun lähtöpisteet kasautuvat vasempaan yläkulmaan (noin 1/4,3 ruudusta; pelin ruutu 640×480). Päätelty lokista ja kuvista, laitteella ei tarkistettu. Lähtöpaikkaa kartalta ei voi siis arvioida näistä.
- Ei tarkistettu: 2.210:n "noin 2 s", liikkeen pehmeys (vain pysäytyskuvia), musiikki, D2:n napautus, Ohita-napin paikan vaihtuminen (a09 alhaalla, a13 oikealla: en selvittänyt, onko vika).

## Uusi peli suoraan Pariisiin (kerrottu PT:lle, odottaa sanaa)
Testikomento `uusi-peli 5 pariisi`: traileria ei tule, vain nykyintro ja yksi isoisän kuva. Syytä en selvittänyt (PeliOhjain `PaataTraileri`, `TraileriSyyNyt`; lokissa ei rivejä "traileri"). Rajaus on "ei 2.161:n aloitusintroa". En muuttanut.

## Tekemättä, järjestyksessä
1. Kysy NS:ltä kierto (2.210: kierto hiipuu luennan alkupuolella, kosketus ja Ohita pysäyttävät pehmeästi). NS:n ajot lokit/natiiviseppa-aloituslento-*; näissä kuvissa kamera ei kierrä. Tarkista B:n kanssa kuvien odotus (`NousuPysahdysMs`, `Teravana`): lokissa kartta terävä 1005 ms.
2. Louvre ja Riemukaari: Codex toimitti 12.31 (proto-3d/_tyo/codex/pariisi-esittelykuvat-20261105/), kuvia ei ole kytketty. Omistajalle ennen kytkentää; Codexin huomioiden mukaan KK:n arvio on auki.
3. Luovutuksen 12.30 kohdat: D:n arkki (Paris-merkinnän `valokuva`, KK ratkaisee), D2:n jatko (isoisän kuva Tuileries-kortille).
4. Kyltit: raketin paikka selvitettävä, jos PT haluaa sen todistettavan. Jos kyltit seisautetaan, 13355a9c2 kumotaan ennen Pariisin mergeä.

## Huomiot
- Lippu SEIS (omistaja 12.17). Haara natiivi-ui/kartan-kaanto-219 b558a2d00 tallella.
- sk-kyltit: odota muutettu 75 s:iin (uuden pelin kamera, ks. muisti esikatselu-uusi-peli-palauttaa-kameran).
- `POIKKEUS ArgumentOutOfRangeException` ajon alussa tulee Unityn SearchDatabasesta, sama NS:n vanhassa ajossa. Ei pelin vika.
- Ei auki olevia ajoja.
