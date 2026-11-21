# Julkaisija: luovutus 3.11.2026 klo 18.15 (Macin kello) – konteksti 33 % (päivitetty 17.35:stä)

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-1615.md.
Jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila). Vahdit: valoseppa-vahti (/tmp/matkakirja-valovahti.pid);
levyvahti.zsh + lokien tail Monitorilla (5 min, aja uudelleen). Posti: posti.zsh <nimi.md> <tiedosto> (wt julkaisija-postilaatikko).

## Käynnissä (nohup, jatkuvat nollauksen yli)
- TRIPO-TAUKO 18.10–19.10 (tripo-jakso.zsh; ALKAA-posti b88034e31). Lippu /tmp/matkakirja-tripo-tauko; `touch /tmp/matkakirja-tripo-ohi`
  lopettaa aiemmin (jos Tripon VALMIS-posti tulee origin/claude/postilaatikko-haaraan). Tauon ajan EI Unity/simu/käännöstä.
- Tripon jälkeen automaattisesti:
  - L2: al-kiireen-jalkeen.zsh → PK al ys tj e9d4526b8 (julkaisija-al-20261103.log) → am-alin-jalkeen.zsh → PK am taso1b mp 67fdba66c
    (julkaisija-am-20261103.log) → rivi PK:lle (local_d3bb1f78).
  - L1: vs-k2-tripon-jalkeen.zsh → VS pariisi-k2 8e8b0f25b (julkaisija-vs-k2-20261103.log) → hakemisto VS:lle (local_5ebb0658)
    → paketti-ketju.zsh: laite **c5a120c78** L1 → paketti-iso.zsh c5a120c78 (paketti-c5a120c78.log) → muistivahtiuusinta
    (mittaa.zsh iso c5a120c78-1 + muistivahti.zsh) → 693cf437f takaisin (paketti-ketju-c5a120c78.log).
- LAV kytkentä (06 ×3 + 04, ~20 min): VUORO NYT käsin ensimmäiselle vapaalle linjalle Tripon jälkeen (L2 PK:n jälkeen tai L1).
- Vienti: LAV rakennukset-v121 viety 18.1x (vie-v121.log), v54 viety 18.01, KS isoisa2 viety 18.07.

## ISO PAKETTI c5a120c78 (wt /Users/Shared/Claude/wt/julkaisija-koe-218)
= 9b9695a7d + eb1abdef4 (VS 769cb9ea6) + NUI 1e5e36755 + NS e1d619acf + KS 6cd9cf100 + NUI c2b687661 (suorat aloitukset) + KS 9756c287f
+ NS aaaed4758 (loppurajaus) + NS 80ea01172 (lahto-raja) + NS muistivahti 3e0447b47. NS 76d1adbdf pois.
paketti-iso.zsh: 6 suoraa aloitusta (OK/VIKA < 15 s), luenta bussilla + jatkettu peli, saapuminen 0–60 s, 4 zoomia, kuvamerkit + napautus,
ruutuajat, Nimikerros, vapaa muisti. Tulokset → PT (kuvaparit parit.py, ennen = julkaisija-koe-iso-9b9695a7d-1640), NS (muisti, saapuminen,
zoomit), NUI (aloitukset, kuvamerkit, muistiluokat), KS (kyltit). Ei KK:lle ennen PT:tä.

## Tehty 17.35–18.15
- Kaatumismittaus 54b6e3b2c (= 44ecc31d1 + 2856c5cc3 + 1e5e36755 + muistivahti cherry-pick, wt julkaisija-ns-gc) ×2: ei kaatumista,
  muistivahti VIKA ~9 s jatka:sta (4191/4403 Mt ≥ 4080) → NS: syy 9613f5ad7 EnnakoiLahto, korjaus 80ea01172 (nyt paketissa).
- b2a1d27b7 käännetty (NS ajoi omat toistonsa). VS k1 valmis 18.09 (esikatselu-20261103-180359). Orpo L1-lukko (LAV 17:34) poistettu.
- PT osa C: pieni iPad17,1 M5 12 Gt, iso iPad13,8 M1 8 Gt → NS. Muistivahdin raja 4080 Mt (80 % × 5100).

## OPIT
- Ketjun emoskriptin kill tappoi myös aja-sk:n → kill -STOP/-CONT, jos linja tarvitaan väliin.
- LAV:n välivaiheissa lukko vapaa ~1 min → odota 150 s (pk-linjalle.zsh). Orpo lukko: pid kuollut → rm -rf lukko.
- Muokattua odotusskriptiä ei lueta uudelleen → tapa ja käynnistä uudelleen.
- Muistivahdin VIKA pysäyttää komennot → myöhemmät vaiheet eivät toteudu; katso VIKA-kellonaika vaiheet.txt:tä vasten.
- 9b96-pohjaisen haaran suora merge 44ecc-pohjaan toi koko kokeen + ristiriidan → cherry-pick pelkkä commit.
