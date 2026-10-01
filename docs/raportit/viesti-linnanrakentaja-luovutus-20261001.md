# Linnanrakentajan luovutus 1.10.2026 klo 05.0x (Opus, high)

## Lue ensin
- Raamatun Ydinajatus kohta 2 (työtapa), docs/roolitus.md (julkaisusäännöt), tämä raportti.
- Muistitiedosto `linnanrakentaja-tila-20261001.md` (Fablen muistikansio) on sama tila tiivistettynä.

## Tila
- main = 7990c48d4 (#3757). v18-kuori (#3746) on mainissa 04.15; osoitin vaihtuu vasta Siirtosepän kuittauksella ja omistajan luvalla.
- Tämän vuoron viennit (Päätoimittaja ajoi, kaikki vastaa 200):

| vienti | blender-hash | PR | sisältö |
|---|---|---|---|
| ympäristö v2b | 414b6ca0 | (ohitettu) | vedenalainen pohja 12 m, puut pois vedestä, nuori koivu |
| ympäristö v3 | 5ebd4378 | (ohitettu) | pienmuodot, uudet CC0-kerrokset, varpumatot |
| ympäristö v3b | 455641f2 | (ohitettu) | kallio metsän alla laikkuina |
| ympäristö v3c | 5f908cd3 | #3755 | makro korttipuiden alueella kerrosten kaukosävyistä |
| v19b | 74cbb16a | #3756 | ponttonisilta pois kuoresta, laituri vesiportilla, säänkestävä puu, taivaat |
| puukortit v3 | 90c024a1 | #3758 | oksarakenne, 3 muunnosta/laji, normaalikartta |

## Avoimet PR:t ja haarat (ketju, kukin pohjautuu edelliseen)
1. #3755 `linnanrakentaja-maasto-2` (d7061369b) — junan kärjessä (Julkaisija). Korvasi #3749:n (suljettu).
2. #3756 `linnanrakentaja-v19` (80c445b78) — #3755:n perään.
3. #3758 `linnanrakentaja-puukortit-v3` (eadbafa38) — #3756:n perään.

## Päivitys 05.1x
- #3755 mainissa 05.11 (paketti 19f1ff3246be7386, osoitin ei vaihtunut). v19 rebasettu: #3759 (`linnanrakentaja-v19-2`, 82e055e0b), #3756 suljettu.
- Kun #3759 squashataan (worktree wt/linnanrakentaja-v19-kuori): `git checkout -b linnanrakentaja-puukortit-v3-2 origin/linnanrakentaja-puukortit-v3` ja `git rebase --onto origin/main 80c445b78` → uusi PR, sulje #3758.

## Kesken — tee nämä ensin (alkuperäinen)
- KUN #3755 squashataan mainiin: worktree `/Users/Shared/Claude/wt/linnanrakentaja-v19-kuori` →
  `git checkout -b linnanrakentaja-v19-2 <#3756:n kärki>` → `git rebase --onto origin/main d7061369b` →
  push uuteen haaraan (pakkopush on estetty) → uusi PR, sulje #3756 → numero ja kärki Julkaisijalle. Sama #3758:lle
  (`--onto <uusi v19-kärki> 80c445b78`), kun #3756 on rebasettu tai mergetty.
- Julkaisija ajaa kuivan paketin klo 06.45 siitä, mitä on mergetty; Siirtoseppä kuittaa https-paketista.

## Vientilähteet (_valmiit)
- `olavinlinna-blender/` = peili: ulkokuori/tilat/valot = v18, `ymparisto` = v3c (v2b, v3, v3b talteen `ymparisto-v*`).
- `olavinlinna-blender-v19/` = v19-lähde (kuori v19, laituri ja tunnelma leivottu uudelleen).
- `olavinlinna-blender-puu3/` = v19 + `ymparisto` → `linna-laatu/ymparisto-puu3` (puukortit v3).
- Vienti: `tools/dioraama/vie-blender.sh --lahde <kansio>` (Päätoimittaja ajaa).

## Juurisyyt ja opit tältä vuorolta
- "Puut vedessä natiivissa": natiivin glb-lataaja luki vain ensimmäisen mesh-solmun (Siirtoseppä korjasi 4316a3c1, juna 87); data oli oikein.
- Kuoren siivouksen `VEDEN_ALLE`-ryhmät (ponttoni, vene): tasan maa − 0,3, ei maalausta (kloonaa() kaatui tyhjään renkaaseen).
- Ulkotilojen puu: `leivo_tila.py` harmaannuttaa (SAA) ja leipoo neutraalissa päivänvalossa; lämmin aurinko teki puusta oranssin.
- Puukorttien atlas kahden potenssiin (ASTC/ETC2-mip-ketju).

## Seuraavaksi (ehdotus)
- Siirtosepän kuittaus kuivasta paketista → osoittimen vaihto omistajan luvalla.
- Puukorttien hämärä- ja lähikuva laitteelta; kuusen siluetti voisi vielä olla rosoisempi.
