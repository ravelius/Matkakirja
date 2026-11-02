# Lavastajan luovutus 2.11.2026 klo 17.07 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen tiivis luovutus viesti-lavastaja-luovutus-20261102-1614.md (lisäykset 258–260) on vain viite. Uudet lisäykset TÄHÄN tiedostoon.

## Rooli ja tapa
- Lavastaja: palatsin rakennukset, tausta, esto ja lähikoristeet. Työkansiot /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/,
  paketit /Users/Shared/Claude/proto-3d/_valmiit/. Viestit send_messagella id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä.
- Kulku: PT nimeää salin → tee → kuvapari PT:lle (polku viestissä) → PT kuittaa → paketit → JU:lle vientipyyntö (local_06f8c680…) + PK:lle kytkentärivi (local_91a1bc27…).
- Esto leivotaan worktreessä /Users/Shared/Claude/wt/proto-lavastaja-esto-2f (proto-repo). Wrapper voi palauttaa exit 144, vaikka leivonta meni läpi ("1/1 läpi").

## Tila
| asia | tila |
|---|---|
| Sisätilat 2c–2g (体和殿, 太极殿, 体元殿+戏台, 长春宫, 咸福宫) + 1b/2a/2b | kytketty, rakennukset-v109 (PK 4520c653b) |
| Kolmiokorjaus (cc + xf: taustan V4_ikkunakehyksen vaakasuorat hajakolmiot pois, kuori_c.py 2f/2g sivu > 2 m) | rakennukset-v110 e7ec09b453a3, JU 16.53, PK 38347d50f |
| Salien pinnat 8 salissa (VS salit3/erot.md) | leivottu 17.05, pari PT:lle 17.06, ODOTTAA KUITTAUSTA |

- PINNAT: proto-3d/_tyo/linnanrakentaja/salipinnat/. pinnat.py jälkikäsittelee lod0:n ennen leivontaa vain olemassa olevilla materiaaleilla
  (avoimet-v52/juhlasali.glb): lattia V4_jinzhuan → "Floor tile 0–9" laatoittain + V4_sokkeli-sauma 1,2 cm; Dark warm timber + V4_wood → "Sisapaneeli puu" (UV × 0,5);
  korokkeen kansi (Folded ochre cloth ≥ 0,5 m²) → "Juoksumatto huone"; sermi (Muted gold pysty ≥ 1 m²) → V4_palatsi_friisi. aja.zsh [salit] ajaa pinnat + leivonnan
  (lod0 ennen pintoja talteen *-lod0-ennen-pinnat.glb, myös leivottu/). kuvaa.zsh <kansio/nimi>, kokoa_pari.py → salit-pinnat-pari.jpg.
- Kolmiokorjatut leivotut (ilman pintoja) talteen cc/xf leivottu/*-lod0-v110.glb; v109:n lähteet *-v109.glb.

## JONO
1. PT:n kuittaus pinnoille → `zsh salipinnat/rakennukset-v111.zsh` (valmis, pohjana v110, kopioi 8 salin leivottu/*-lod0.glb) → JU-vientipyyntö + PK-rivi
   (RakennusKansio "kielletty-rakennukset-v111/"; törmäys, tausta-v108, esto v32 ennallaan). Jos PT pyytää muutoksia: pinnat.py → aja.zsh <salit> → kuvaa → pari.
2. Itäinen rivi (PT kuittasi 16.3x): 承乾宫 (OSM 承干宫, pohja.json keski ~[79,3; 385,1], 378 m², 5,3 m kuja-338:n varasto-kuja-338-2-huoneesta),
   sitten 钟粹宫, 永和宫, 景阳宫; 重华宫 odottaa (38 m reitistä). Uusilla pinnoilla suoraan: kokoa_c → pinnat.py → leivonta.
   Itäinen sokkelo = avoimet-sijoitus.json kuja-338-huoneet (x ≈ 96–116). Reittikartta: proto-3d/_tyo/linnanrakentaja/seuraava-sali/ (hallit.py, kartta.py, reittikartta.png).
   Huom: 承乾宫 on uusi taustan halli itäpuolella → selvitä ensin kuoren lähde (taustan oma halli vai kopio 长春宫:sta kuten 2g) kuten 2g:ssä (analysoi_c.py, katso.zsh).

## Lisäys 261 (17.1x)
- PT KUITTASI pinnat → rakennukset-v111 b369604cbb1c tehty, JU-vientipyyntö + PK-rivi lähetetty (JONO 1 tehty; varmista JU:n vienti ja PK:n kytkentä).
- PT:n jatkohuomio (ei estä): saumat paikoin paksuja ja tummia (th, c), laatat isoja ja lähes valkoisia. Seuraavaan erään: saumat ohuemmiksi
  (pinnat.py SAUMA_LEV 0,012 → ~0,005 ja vaaleampi sauma, esim. V4_kivireunus 0,62 V4_sokkelin 0,5:n sijaan) ja lämpimämpi kivi
  (juhlasalin "Stone tile 0–4" (0,56–0,72, lämmin) "Floor tile":n sijaan), pienempi laatta (jaa 1,2 m quad 2 × 2:ksi). Vain olemassa olevat materiaalit.
  Tee tämä ennen 承乾宫:ta tai samassa erässä (aja.zsh kaikille 8 + 承乾宫), pari PT:lle.
