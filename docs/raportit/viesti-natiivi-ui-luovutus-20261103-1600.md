# Natiivi-UI: luovutus 3.11.2026 klo 16.00 (Pariisin saapuminen KIIRE, kuvaloki, kaatumistoisto; kontekstivahti 26 %)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1535.md (sen jono 1–3 on yhä voimassa, ks. alla kohta 3).

## Tehty (proto, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-keisari, peili natiivi-backup peili/proto/natiivi-ui/<haara>)
- PT 16.0x KIIRE (omistaja 15.40, pieni iPad cb1b5d9fc): Pariisin saapuminen. Haarat JU:n yhdistelmän 1087abf41 päällä:
  - **82e74784a** natiivi-ui/kuvaloki: KuvaLoki.cs (Documents/kuva-loki.txt rivi kerrallaan + konsoli "MATKAKIRJA kuvaloki:",
    vapaa muisti / Unityn varaus / tekstuurit, 30 s muistirivit 1 s välein) kuvan avauksen poluissa: matkakirjan pikkukuva ja
    valokuva, kartan pieni kuva, Kuvasuurennos avaa/lataus/sulku. Ei App Store -käännöksessä.
  - **693cf437f** natiivi-ui/pariisi-intro-korjaus (= kuvaloki + korjaus; PT:n ja JU:n "cb22f67c5" on sama korjaus ilman kuvalokia,
    JU kääntää cb22f67c5:tä laitteelle L2:lla, lokit/julkaisija-laite-218-cb22f67c5/): nousukokeessa (2) matkakirjaan vain C5,
    C1–C4 kartalle; (4) trailerin kuvan vuoro 2,5 → 1,25 s (PysahdysNousuMs 750), C1–C5 6 iskun välein, lopussa
    KaupunkiIntroOhita (nopea katkeaa); (3) isoisän luenta esittelyn lopussa (SoitaLuento 0,6 s) ennen Pulua. Syy (3):
    omistajan 10.10. "uusi korvaa vanhan" (SaapumisluentoPois), ei ääniongelma. unity-tarkistus 0, kielivahti ok.
    Tiedot: proto-3d/lokit/nui-pariisi-intro-cb22f67c5-20261103/tulos.md.
- Kaatumistoisto ISOLLA iPadilla cb1b5d9fc:llä (IPAD NYT JU:lta, 15.51–15.59, lukko vapautettu): EI kaatumista pikkukuvien ja
  kartan kuvien avauksessa (myös nopeasti). Muistivaroitus heti kohdenoston (Palais de l'Industrie) + "kuvat esiladataan FRA
  (107 + 74)" jälkeen → pienen iPadin kaatuminen todennäköisesti muisti (ei vahvistettu: ei .ips:ää, ei JetsamEventiä).
  Tulos: proto-3d/lokit/nui-kaatumistoisto-iso-cb1b5d9fc-20261103/tulos.md, konsoli.txt.

## SEURAAJAN JONO
1. Laitetodistus cb22f67c5 (tai 693cf437f) isolla iPadilla JU:n vuorolla, kun JU:n app on valmis: Pariisi `ui jatka` (kehittäjätilassa
   jatko Pariisissa käynnistää uuden esittelyn) → tarkista kuvat nopeammin, vain C5 matkakirjaan (ui puu mk-matkakirja__pikkukuva),
   muut kartalle (ui puu mk-kutsu__kortti), lokirivit "nykyintro loppui … (vauhdikas)" ja "isoisän luenta esittelyn jälkeen alkaa",
   isoisän luenta ennen Pulua. Kuva + 3 riviä PT:lle. Apuskriptit (lähetä/hae Documents): mallina julkaisija-tyokalut/pariisi-kuvat-laite.zsh.
   HUOM: `matka lontoo mannerlento/lento` ei käy Pariisista; ui napauta -koordinaatit ovat paneelipisteitä (pikkukuvat y ≈ 205).
2. Kaatuminen: kuvaloki 82e74784a pienelle iPadille (JU), toisto kohdenoston + kuvien avauksen kanssa; jos muisti, korjaus
   (esim. Kuvasuurennos ei pidä täyttä kuvaa + FRA-esilatauksen rajaus) ja kysy PT:ltä, kenen alue esilataus on (ui nostot = NUI).
3. Edellisen luovutuksen jono: keisarin nosto + versiorivi simulla 1087abf41:llä (ajo.zsh kansiossa nui-keisari-pariisi-c9ab58e88-20261103,
   odota JU:n SIMU NYT); keisari Pekingin kartalle (KS/PK); 1501-avoimet.
