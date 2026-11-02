# Lavastajan luovutus 2.11.2026 klo 21.24 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen viesti-lavastaja-luovutus-20261102-2102.md on vain viite (rooli, tapa, 钟粹宫:n yksityiskohdat). Uudet lisäykset TÄHÄN.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
- Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi
  (local_91a1bc27-6870-46aa-9886-66fd33b68880). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, ≤ 3 riviä. Viestit send_messagella id:llä.
- Esto: worktree /Users/Shared/Claude/wt/proto-lavastaja-esto-2f (zsh esto-vNN.zsh; "1/1 läpi"); paketti LAHTEET.md + SHA256SUMS (v36:n mallina).
- Codex-posti: worktree /Users/Shared/Claude/wt/lavastaja-postilaatikko (detached origin/claude/postilaatikko), push HEAD:claude/postilaatikko.

## Tila 21.24
| asia | tila |
|---|---|
| 钟粹宫 z3 | JU vei 21.15 (v114/v110/v35), PK kytki 7127ca0c3 — VALMIS |
| 永和宫 y3 (sisatilat-3c/, LUE.md) | PT kuittasi rakenteen ja sokkelin; VIETY JU:lle 21.24: tausta-v111 (b72575462815), rakennukset-v115 (062cb1eb8058), esto v36 (9b94569dbfe6, = v35); PK-rivi lähetetty → varmista vienti + kytkentä |
| Pronssit (OMISTAJAN PÄÄTÖS 21.17) | tilattu Codexilta 9b79182b4 posti/lavastaja-codex-palatsin-pronssit-tilaus-20261102.md; toimitus posti/palatsin-pronssit-20261102/ |

## 永和宫 lyhyesti
- 承乾宫:n kaksonen (sokkeli 1,2, lattia 0,15), mutta etelässä etuosa 1,1 m:n päässä → EI etelän ovea: länsiovi (w 4,81–6,31) sisään, pohjoisovi (u 12,98–14,48) ulos.
- Työkalut tyokalut/*_y.py (kehys_y, kuori_y: OVET-lista kahdelle akselille + kaistat() 1 m, itä/koillissokkeli jää taustaan; sisa_y; merkinta_y; reittiesteet_y).
- valokuva_v.py: TAUSTA=<laatta.glb> TAUSTA_SIIRTO=x,z → taustalaatta kuvaan (y-v1/lahikuva-t.zsh) = pelin näkymä; käytä PT-kuviin.
- Opit: tausta-lahde (z-v1) ≠ v110-vienti tavulleen (2 kolmion ero poistossa, merkityksetön). PT:n "tumma sokkeli" oli terassin alla → kuva taustan kanssa ratkaisi.

## SEURAAVAKSI
1. Varmista JU:n vienti ja PK:n kytkentä (v111/v115/v36).
2. 景阳宫 (OSM, keskipiste ~ (133,3; 437,5), lähin H:juhlasali-kuja-338-8): sisatilat-3d/ 3c:n mallilla (kopioi tyokalut/*_y.py; katso.zsh → seinät, sokkeli?, jännemäärä,
   etuosat; ovet; reitti lähimmistä kujaliitoksista, reittiesteet). Pohjana y-v1/tausta-lahde (= v111) ja rk = y-v1/rk + y3 leivottu.
   PT:n jatkokohta: sokkelin juuressa musta viiva/rako maahan (永和宫 pohjois- ja länsiovi) → tarkista ja korjaa 景阳宫:n kanssa (voi vaatia y3:n uusinnan).
3. Pronssit, kun Codex toimittaa: 太和殿 terassi (kilpikonna, kurki, aurinkokello, viljamitta, 18 suitsukeastiaa), leijonaparit portteihin (suurin Taihemen),
   vesiastiat aukioille (paikat PK:lle esteiksi; vedenkantajan fill-reuna 1,1 m).
