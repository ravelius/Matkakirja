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

## LISÄYS 21.4x: PK EI KYTKENYT 永和宫 (796/797) — KORJAA ENSIN (ennen 景阳宫)
- Testi OikeanPalatsinVerkkoEiKuleRakennuksenLapi (Peli-testit/Testit/JuoksuVerkkoRakennusTestit.cs, esim. wt/proto-pelikoodari-peitto-218): 2 väliä
  rakennuksen läpi. Kierretyt (KanoninenKierto −2,0335° pisteen portit.A ympäri) → hallin kehys: (11,22; 6,17)→(13,72; 6,20) ja (13,68; 9,70)→(13,70; 6,20)
  = oikotie VALTAISTUINLAVAN läpi (lava u 12,13–15,33, w 6,07–8,87).
- Diagnoosi (todennäköinen): verkko avaa reitin ±1,2 m (VapaaPuoliLeveys) ja tekee luurangon; merkinta_y:n käytävät u 11,3 ja u 13,73 ovat vain 2,43 m
  välein ja w 6,02 -käytävä hipoo lavan etureunaa → käytävät sulautuvat ja luuranko kulkee lavan läpi. 3b:ssä 2,52 / 4,93 m meni läpi.
- Korjaus: väljennä sisäreittiä (esim. lava kapeammaksi tai syvyys 2,8 → 2,4 ja C04 mukana, U_KIERTO ~10,9–11,0, W_VALI-käytävä etelämmäs w ~5,2 lavan edestä),
  tai kysy PK:lta verkon sääntö. Aja testi itse: MK_JUURI = kansio, jossa kk-pohja-v1d-pk8, kielletty-rakennukset-v116, kielletty-tausta-v111, osamallit791-v6,
  palatsi-esto-v36 (+ MK_RAKENNUKSET/MK_TAUSTA/MK_ESTO/MK_OSAMALLIT nimet) → ./kaanna.sh OikeanPalatsinVerkkoEiKuleRakennuksenLapi (PK:n worktreessä tai kopioi testi).
- Sitten uusi rakennukset-v116 (+ tarvittaessa esto v37) → JU + PK (PK nollautui, seuraaja: luovutus 4e3452453).

## LISÄYS 21.36: 永和宫:n testihylkäys — juurisyy verkon säännössä, PK:lle
- Pakotetut() jatkaa kapean reitin linjoja PakotettuJatko 3,5 m rasterista välittämättä: w 6,02 → itään ja u 13,73 → etelään leikkaavat lavalla, u 11,3 → pohjoisseinän läpi
  takapihan linjaan (alle 1 m seinää, testi ei huomaa). Datalla ei kierrettävissä ilman ovimuutoksia.
- Korjaus PK:lle: jatko vain vapaata pitkin (≤ 3,5 m), diff proto-3d/_tyo/linnanrakentaja/sisatilat-3c/pk-kapea-jatko.diff; Juoksu 151/151 läpi (juuri sisatilat-3c/pk-juuri,
  symlinkit v115/v111/v36 + r89:n pk8/osamallit-v6/lahipuut-v12; aja wt/proto-lavastaja-esto-2f/Peli-testit, nyt 7127ca0c3). Viesti PK:lle ja PT:lle 21.36. Data ennallaan.
- Seuraavaksi 景阳宫 (kohta 2); varmista PK:n kytkentä.
- 景阳宫 aloitettu: analyysi ja suunnitelma proto-3d/_tyo/linnanrakentaja/sisatilat-3d/LUE.md (kahden laatan rajalla 2-3/2-4, ei korotettua sokkelia, S-N läpi keskijänteestä).
- 永和宫 VALMIS: JU vei 21.36, PK kytki dec9efec4 (kapean reitin jatko vapaata pitkin pysyvänä, 797/797). Esto-worktree nyt 7127ca0c3:ssa.
