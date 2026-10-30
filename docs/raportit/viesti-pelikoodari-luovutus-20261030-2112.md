# Pelikoodari: luovutus 30.10.2026 klo 21.12 (konteksti 26 %, PT:n pyyntö)

Edellinen luovutus: -20261030-2015. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030.
- Proto-worktree: /Users/Shared/Claude/wt/proto-pelikoodari-v98c (haara pelikoodari/testi-v4-uusi). Proto-haaroja ei pushata.
- Esikatselutyökalu ajetaan puusta /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214 (haara pelikoodari/lahikuva-215; NS:n tilanollaus 70f507343 poimittu = 75e922d20).

## VALMIS: osasarja-v4 junaan 216 (PT kuittasi v4-parit-5 klo 21.1x, merge-pyyntö NS:lle)
| proto-haara | sisältö |
|---|---|
| pelikoodari/osasarja-v3-216 **9ae1b6277** | **Junaan** (NS mergeää). 88eed2939 (v4-osasarja, kaukoniput LOD2 117 k, värit nippuihin) + tekstuurikorjaus. |
| pelikoodari/testi-v4-uusi 147730811 | sama + ortokamera, vain esikatseluun |

- **Tekstuurikorjaus 9ae1b6277 (reunakiven "valkoinen" vika):** JuoksuV4Maailma.Rakenna tyhjentää mallin Kuvat-listan.
  - Osasarjan koostetut mallit (osamallit, kaukoniput, pursotukset; Kokoaja.Malliksi ja Kokoa) jakoivat saman osat.Kuvat-listan.
  - Vain ensimmäisenä rakennettu malli sai kuvat. Muut piirtyivät tekstuurittomina: reunakivet ja kivijalat valkoisina, kermoina tai liiloina, ja muurikate C3 valkoisena (yläkuvat).
  - Korjaus: jokaiselle mallille oma lista. Peli-testit JuoksuOsasarja 10/10; LavastajanPaketti-testiin lisätty regressiotesti (MK_OSASARJA=<v4-kansio>).
- **Pari:** P/v4-parit-5 (vanha esikatselu-20261030-182010, uusi esikatselu-20261030-205913): pelikuvat 0,8–12,4 %, yläkuvat 0–0,7 %.
  - Välivaiheet: P/v4-parit-3 (ennen korjausta, kamera oikein) ja P/v4-parit-4 (korjattu, pelikamera väärin). Tiedot: P/v4-tila-2100.md.
- **Kameravuoto linjalla 2:** ajot 19.54 ja 20.40 tulivat heti Valosepän ajon perään, ja niissä kamera oli noin 12 m ylhäällä, pitch noin 0°.
  - Lokissa oli vain omat komennot, ja PlayerPrefsissa ei ollut kamera-avainta. Syy jäi auki.
  - Oman ajon perään tullut ajo (205913) oli oikein. NS:n nollaus (PlayerPrefs ja datakansio → <ajo>/tila-ennen/) on nyt käytössä.
  - Jos vika toistuu nollauksen kanssa, vertaa tila-ennen/-kansioita oikean ja väärän ajon välillä.

## LAV:lle (PT 21.1x: kirjaa luovutukseen)
- 02 ja 05 (P/v4-parit-5): vasemman muurin kivijalassa porras ja vaalea nauha. Kohdissa on v3:n 0,80 m:n muurit (-t80-osat ja aidat), joten muurin yläreuna jää matalammalle kuin vanhassa (vanha: punainen muuri ja kivijalka yhtenäisesti).
- 05 oikea: vanhassa punaisessa muurissa oli pilasterit, uudessa muuri on yhtenäinen. Tarkista, kuuluuko niiden olla osasarjassa.
- Nämä ovat geometriaa (ladonta ja osat), eivät pelin piirtovika: pinnat, tekstuurit ja sävyt ovat parissa kunnossa.

## Jono seuraavaksi
- **Reittivalinta (PT 19.2x):** yksi arviorivi PT:lle. Sisältö on edellisessä luovutuksessa (-2015, "Jono sen jälkeen"):
  - kiinteä siemen per taso: JuoksupeliNakyma.cs:705 `Environment.TickCount`, pieni muutos;
  - aukeavat portit: uusi logiikka, arvio 1–2 päivää.
- **Osasarjan leivonta** (LAV:n SOPIMUS.md leivonta-216, VS:n shader d420087dc): alkaa nyt, kun v4-pari on hyväksytty. PK:n osuus on lueteltu -2015-luovutuksessa.
- **Codexin mittapiirrokset** posti/codex-pelikoodari-mittapiirrokset-* (taihemen ja taihedian v3, sivuhallit v2) odottavat.
- **A6:** kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## Huomiot
- Esikatselu: `zsh /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214/tyokalut/esikatselu.sh <sha> P/skenaariot/v2-pari.txt ipad --batch`; pari `cd P; python3 v2_parit.py <vanha loki> <uusi loki> <kansio>`.
- Levy- ja swap-raja (PT 20.5x): uutta Unity-ajoa ei aloiteta, jos Postivahti ilmoittaa vapaan tilan alle 95 Gi:n (Postivahti seuraa ja ilmoittaa alle 90 Gi:n).
