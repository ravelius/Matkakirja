# Lavastajan luovutus 2.11.2026 klo 22.15 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen viesti-lavastaja-luovutus-20261102-2124.md on viite (rooli, tapa, työkalujen kulku, 永和宫). Uudet lisäykset TÄHÄN.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
- Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi
  (local_91a1bc27-6870-46aa-9886-66fd33b68880). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, ≤ 3 riviä. Viestit send_messagella id:llä.
- Esto: worktree /Users/Shared/Claude/wt/proto-lavastaja-esto-2f (nyt detached 7127ca0c3; Peli-testit ajetaan täältä). Codex-posti: wt/lavastaja-postilaatikko.

## Tila 22.15
| asia | tila |
|---|---|
| 永和宫 y3 | VALMIS: JU vei 21.36 (v115/v111/v36), PK kytki dec9efec4. PK:n verkkosääntö muuttui: kapean reitin linjan jatko (3,5 m) vain vapaata pitkin. |
| 景阳宫 j3 (sisatilat-3d/, LUE.md) | j-v1 koottu ja leivottu 22.09, tarkistuskuva j-v1/tark.jpg OK (eteläovi, valtaistuin, pohjoisovi). EI vielä PT-paria. |
| Pronssit (OMISTAJAN PÄÄTÖS 21.17) | tilattu Codexilta (posti/lavastaja-codex-palatsin-pronssit-tilaus-20261102.md), toimitus posti/palatsin-pronssit-20261102/ — odottaa |

## 景阳宫 lyhyesti (yksityiskohdat sisatilat-3d/LUE.md)
- OSM way/40631121, halli kahden taustalaatan rajalla (2-3 + 2-4) → tausta-v112 muuttaa kumpaakin. Ei korotettua sokkelia (kivinauha seinässä, lattia 0,15).
- Huoneet 1 + 3 + 1, valtaistuin akselilla u 10,18; reitti S-N: puutarha-kuja-338-7-pohjoinen kulma → u −1,5 → etupiha → eteläovi → lavan länsipuolelta (u 7,3)
  → sermin takaa (w 10,85) → pohjoisovi → takapiha w 13,4 → u −1,5 → juhlasali-kuja-338-8-etela kulma.
- Huomiot tark.jpg:ssä: ikkunoiden takana valkoisia/mustia laikkuja (ikkuna_tausta vs. sisäseinä, ikkunat 0,40–1,80 nyt sisäseinän korkeudella) → tarkista
  taustan kanssa ennen PT-paria; kivinauha jatkuu maan alle (y −1,1), maasto peittää.

## SEURAAVAKSI
1. PT-pari: valokuva_v.py tukee yhtä TAUSTA-laattaa → lisää toinen (TAUSTA=a.glb,b.glb), lähikuva taustan kanssa (sisatilat-3c/y-v1/lahikuva-t.zsh mallina);
   ikkunalaikut ja ovien juuren musta rako (PT:n 永和宫-jatkokohta) tarkistettava.
2. Kuittauksen jälkeen: rakennukset-v116 (merkinta_j), tausta-v112 (2-3 + 2-4), esto v37 tarvittaessa → testi itse (sisatilat-3c/pk-juuri + uudet nimet,
   ./kaanna.sh OikeanPalatsin) → JU + PK.
3. Pronssit, kun Codex toimittaa (ks. edellinen luovutus kohta 3).
