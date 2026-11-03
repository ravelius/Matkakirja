# Lavastajan luovutus 3.11.2026 klo 02.51 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen viesti-lavastaja-luovutus-20261103-0231.md on viite (rooli, tapa, työkalut, pronssien yksityiskohdat). Syy: kontekstin pehmeä raja.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet + omat mallit (Pariisi). Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
- Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi
  (local_91a1bc27-6870-46aa-9886-66fd33b68880). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, ≤ 3 riviä. Viestit send_messagella id:llä.
- HUOM: JU vie heti, kun pyyntö tulee. Korjaus vietyyn kansioon = AINA uusi versio (v113 → v114 tänään). Älä lähetä vientipyyntöä ennen kuin paketti on lopullinen.
- Haara koti/Matkakirja-linnanrakentaja on yhdistetty origin/mainiin (6d1314ff5) ja pushattu.

## Tila 02.51
| asia | tila |
|---|---|
| Kujaportti-3:n takainen massa (PT:n etusija) | VALMIS ja KUITATTU (PT 2 ×). Massa = kk-tausta-1-4:n pieni rakennus (pohja.json rakennukset[395]) muurien 56/64 aukossa. tausta-v113 (JU vei 02.45, 1f41da810791: rakennus pois) → tausta-v114 (JU vei 02.51, c8ff9e097cf4: + jalusta y 0, pohjoisen porttirakennuksen eteläseinän puuttuva kolmio). palatsi-esto-v37 (JU vei 02.45, af351aaffbcc; v36 − 10 ruutua, sama v114:llä). Juoksu 151/151. |
| PK | Pyydetty: kytke kielletty-tausta-v114/ + palatsi-esto-v37/, sitten uusi taso1-tallenne JU:n vuorolla (läpikulun katto 1b80e7201 + e3579873d). Kuittausta ei vielä. |
| PRONSSIT | Odottaa Codexin toimitusta (posti/palatsin-pronssit-20261102/) ja PT:n herätystä. NUMEROINTI SIIRTYI: pronssien esto = v38, leivotaan tausta-v114:llä (pronssit-esi/LUE.md:n loppu; päivitä esto-v37-luonnos.zsh:n TAUSTA ja testaa.zsh:n MK_TAUSTA + pk-juuri-linkki). Rakennukset v118 ennallaan. |

## Kujaportti-3-työ (jos PK:n tallenteesta tulee jotain)
- Kansio proto-3d/_tyo/linnanrakentaja/kujaportti3-massa/LUE.md: työkalut tausta_pois_kp3.py + tausta_kp3_korjaus.py, paketoi.zsh / paketoi-v114.zsh,
  esto-v37-luonnos.zsh, testaa.zsh (pk-juuri), kuvapari.zsh (valokuva_v.py, PIILOTA=ovi_O,ovi_V: portin ovilehdet ovat glb:ssä kiinni, peli avaa).
- Apuskriptit ad hoc (sädeheitto kuvapisteestä, kolmiolistaus laatikosta) olivat scratchpadissa; tee tarvittaessa uudelleen (avoimet_glb.G).

## SEURAAVAKSI
1. PK:n tallenteen tulos kujaportti-3:sta, jos se tuo uuden vian.
2. Pronssit, kun PT herättää (esto v38, tausta-v114). Jos jono on muuten tyhjä: "JONO TYHJÄ: Lavastaja" PT:lle.
