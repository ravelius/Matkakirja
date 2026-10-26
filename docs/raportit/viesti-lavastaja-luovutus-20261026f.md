# Lavastaja: luovutus 26.10.2026 klo 16.15 (TILINVAIHTO, PT 16.13)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261026e.md` (4d513229d + lisäykset). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara **lavastaja/rakennukset-v48-211** (paikallinen): 79a7f3ad1 (v48) → 437f03035 (avoimet-v49) →
**1aed2b28e** (AvoimetKansio v49 → v50). Polut alla: K = `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset`,
H = `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/havainne-kuja40`.

## Valmiit (viety)

- **avoimet-v50** (leivottu juhlasali, pilotti 4:n asetukset, v48:n pylväät): VS P45 OK (punainen 0,53 = havainne, pylväät tasaiset),
  PT kuittasi, JU vei 15.58. Paketti `_valmiit/juoksupeli-avoimet-v50-vienti-20261026`, SHA256SUMS 5bd98dff2a36…
  (`K/tyokalut/pakkaa_avoimet_v50.zsh`). NS sai osoittimen 1aed2b28e.
- Vanha worktree `wt/lavastaja-tarkista-ennen` poistettu (PR 5142 suljettu, haara jää originiin lähteeksi).
- `docs/raportit/kaappaukset/linnanrakentaja-olavinlinna-20261010/` (seurannaton, Olavinlinna tauolla) siirretty pois repoista:
  `proto-3d/_tyo/linnanrakentaja/olavinlinna-asettelu/kaappaukset-20261010/`.

## KESKEN: tausta-v57 (PT hyväksyi 16.0x: YKSI v57 nykyisellä geometrialla, leivonta 45°/215°, viivan ja kiilarakojen korjaus)

Kolme osaa: (1) T-liitokset, (2) uudelleenleivonta, (3) pohjalaatan UV0.

1. **T-liitokset** (`K/tyokalut/tausta_tliitokset.py`, ajo `K/tyokalut/aja_tliitokset_v3.zsh` → `K/tliitokset-v57b/kielletty-tausta-v57/`):
   - v2 (tliitokset-v57): taitto ±25 cm → **tumma laikku**. Syy: lattian reunat painuivat 0,04–0,07 m:stä −0,05 m:iin, jolloin alta
     paljastui pimeäksi leivottu pohjalattia.
   - v3 (.v2 = edellinen): yli 2 cm:n saman materiaalin raot pystyhelmalla. Laikku poistui, mutta helma näkyy lävistäjällä **vaaleana
     nauhana** (todellinen 15–20 cm:n porras; kuva `H/…/lokit` 160546, pari `K/tausta-v57/pari-06-v56-v57.png`).
   - **v4 (nykyinen tiedosto, kopio .v4)**: NOSTO. Saman materiaalin T-kärki, joka on 2–25 cm reunan alapuolella, nostetaan reunan
     korkeuteen, ja kärki reunan yläpuolella taitetaan ylös. Mitään ei lasketa. Helmoja jää 27 (0-3: 25, 3-2: 2).
     tliitokset-v57b sisältää NYT v4-geometrian (ylikirjoitti v3:n). **v4:n kuvaa ei ole vielä otettu** (ajo keskeytettiin
     tilinvaihdossa). Seuraavaksi: `zsh H/pari-viiva-v57b.zsh` (juuri-v57b → tliitokset-v57b, kohta 06 −129,4 168 178) ja vertaa
     v56:een (lokit/havainne-editori-20261026-152923): lävistäjän nauha ja sahalaita poissa, eikä tummaa laikkua ole.
     Laskennallinen tarkistus `laikku.py` (scratchpad, ei tallessa) antoi päällekkäisten lattiakerrosten takia epäselviä lukuja, joten luota kuvaan.
2. **Leivonta** `K/tyokalut/aja_tausta_v57_leivonta.zsh`: kaikki 20 LOD0-palaa leivotaan tliitokset-v57b:stä. Asetukset: AZ 215 / EL 45
   (glTF-kehys, VS P44), taivas 0,45/0,46/0,50 × 1,8, 4 kimpoamista, 128 näytettä, 2048 → valo_pakkaa 1024. Varjostajat: rakennukset-v48,
   muurikate-v16, avoimet-v49. Tulos `K/tausta-v57/kielletty-tausta-v57/`. **Nykyinen leivottu tulos on v3-geometriasta** (helma).
   Jos v4:n kuva on puhdas: aja leivonta uudelleen (~15 min) ja sitten jälkikäsittely.
3. **Jälkikäsittely** `K/tyokalut/aja_tausta_v57_jalki.zsh` → `tausta_lattia_uv0.py`: V4_lattian pohjalaatan (y −0,02) nolla-UV0
   tasoprojektioksi (paloittaisessa kiveyksessä lähimmän kuvioidun kolmion affiini kuvaus). Tämä on PT:n mainitsema juhlasalin takaoven
   **harmaa sumea laikku** (pala 1-3, 130 m²:n kolmio, uv/m² = 0). Jäljelle jää vain 13 m² palaan 0-3.
4. Testijuuri **`H/juuri-v57c`** (juuri-v50 + kaikki tausta-v56-vienti-linkit → `K/tausta-v57/kielletty-tausta-v57`), ajo
   `H/pari-v57c.zsh` (kohdat 06 ja 04). Kohdan 04 kuva `K/tausta-v57/04-v57c.png` on siisti.
5. **VS:n P47** (aukion kiilat v57c:llä, P44:n paikat vakiot/v0/l0) on VS:n jonossa P46:n jälkeen. Tulos tulee LR:lle ja PT:lle.
   Leivonta on sama myös v4:n jälkeen, joten P47:n tulos pätee valaistukseen. Kerro VS:lle, jos leivot uudelleen.
6. Kun pari on puhdas (06 + VS P47): pakkaa tausta-v57 (pohja `pakkaa_v56_v47_v16.zsh`, vain tausta; LAHTEET: T-liitokset v4,
   leivonta 45/215, pohjalaatan UV0). Sitten pari PT:lle, JU:lle vienti ja proto-osoitin TaustaKansio v56 → v57 1aed2b28e:n päälle.

## Jonossa sen jälkeen

- **rakennukset-v48:n leivonta samalla auringolla** (VS P43: porttihallien seinäkiilat ja kattojen kultainen sotku). VS hyväksyi
  sen omaksi eräkseen v57:n jälkeen.

## Huomiot

- `.claude/settings.local.json.ennen-kevennysta` on seurannaton asetusvarmuuskopio. En koske siihen (asetuksia muuttaa vain omistaja).
- Helman pinta (v3) ja leivotun UV1:n purku: leivo_valo.py purkaa UV1:n aina uudelleen (smart_project), joten geometrian muutos
  vaatii aina uuden leivonnan.
