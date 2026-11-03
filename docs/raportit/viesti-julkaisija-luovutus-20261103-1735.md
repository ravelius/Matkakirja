# Julkaisija: luovutus 3.11.2026 klo 17.35 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-1615.md.
Jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila). Vahdit: valoseppa-vahti (pid-tiedosto
/tmp/matkakirja-valovahti.pid, käynnistetty 16.40), lukkovahti.zsh / linja-vapaa-60.zsh (150 s) / levyvahti.zsh Monitorilla (5 min, aja uudelleen).

## Käynnissä (nohup, jatkuvat nollauksen yli) – tarkista lokeista
- L2: laite b2a1d27b7 (= 44ecc31d1 + NS 2856c5cc3, wt /Users/Shared/Claude/wt/julkaisija-ns-gc) – laite-b2a1d27b7.log (kiire-b2a1d27b7.zsh).
  Perään al-kiireen-jalkeen.zsh: laite **178f9da72** (= b2a1d27b7 + NUI 1e5e36755, sama wt) → laite-178f9da72.log → PK al ys tj
  (proto-3d/lokit/julkaisija-al-20261103.log) → am-alin-jalkeen.zsh: PK am taso1b mp 67fdba66c (julkaisija-am-20261103.log).
- ISO: kaatumis-iso.zsh odottaa 178f9da72:n KÄÄNNETTY → ipad-lukko → asenna → NUI:n nui-lahizoom-20261103/mittaa.zsh iso 178f9da72-{1,2}
  → 693cf437f takaisin (kaatumis-178f9da72.log). TULOS → NS + NUI + PT (PT 17.2x: kaatumismittaus yhdellä ajolla, ennen iso-pakettia).
- L1: LAV 06 Qianqingmen kultaleijonat (3 porttia, ~17.40 asti, LAV ilmoittaa VAPAA) → pk-linjalle.zsh 1: VS pariisi-k1 91ae73cac
  (julkaisija-vs-k1-20261103.log) → hakemisto VS:lle (local_5ebb0658).

## ISO PAKETTI (PT 16.5x) – wt /Users/Shared/Claude/wt/julkaisija-koe-218, HEAD b8018882b
= 9b9695a7d + eb1abdef4 (VS 769cb9ea6) + NUI 1e5e36755 (korvasi af57/fd7a) + NS e1d619acf + KS 6cd9cf100 (sis. b50afd4c2). NS 76d1adbdf POIS (NS).
Odottaa: (1) kaatumismittauksen tulos ja NS:n muistikorjaus (PT: pakettiin, ajo vasta sen jälkeen), (2) NS:n e1d619acf-tarkistus 0 -sha,
(3) KS pala16/17 takaraja 17.55 (nollattu KS lähettää; luovutus PR 6187). Sitten: LINJA=2 ASENNA=0 zsh laite-iso.zsh <sha> →
`zsh julkaisija-tyokalut/paketti-iso.zsh <sha>` (luenta bussilla + jatkettu peli, saapuminen 0–60 s, 4 zoomia, kuvamerkit + napautus 0,2/1 s,
ruutuajat, Nimikerros-alamerkinnät, vapaa muisti) → parit (parit.py, ennen = julkaisija-koe-iso-9b9695a7d-1640) → PT. Sen jälkeen NUI:lle
LAITE NYT ISO + .app-polku (nui-lahizoom-20261103/mittaa.zsh iso <sha>). Ei KK:lle ennen PT:n tarkistusta.

## Yhdistelmä (wt julkaisija-yhdistelma-218): c1a30e11f = 693cf437f + VS 769cb9ea6 (PT 218) + LAV saumat-v1 97ef79bd6 (PT juna 219). Ei käännetty.
LAV pronssit odottavat LAV:n kultakorjausta v121.

## Tehty 16.40–17.35
- 9b9695a7d mitattu isolla (julkaisija-koe-iso-9b9695a7d-1640, parit julkaisija-koe-pari-9b9695a7d): PT kuittasi ok (pisin 92 ms, m4 0).
- VS sal11 valmis 16.44 → PT kuittasi; PK ai ys tj, aj taso1b mp (mp vain 2 s → PK); ak pysäytetty (al korvaa).
- Pieni iPad pois käytöstä tänään (PT): todistukset vain isolla. Osa C (PT 17.2x): pieni = iPad17,1 M5 12 Gt, iso = iPad13,8 M1 8 Gt
  (RAM 7519 Mt) → iso tiukempi; ei increased-memory-limit; pieneltä ei JetsamEventiä → NS:lle.
- Levy (Codex siivoaa): levyvahti.zsh valvoo työkalut, wt:t, käännöskopiot L1/L2/T7, laiteappit, Unity b7. Poistettu oma wt julkaisija-luovutus-20261103 (PT).

## Avoin PT:n erä (suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-testien-suorat-aloitukset.md)
OSA B (JU + NS): skriptit avaavat Testinäkymän rivit (matkakirja://testi/<nimi> tai "ui testi"), kiinteät odotukset pois, OK/VIKA-rivi.
Odottaa NUI:n osaa A. Nykyiset ajot ensin.

## OPIT
- Ketjun emoskriptin tappaminen (kill) tappoi myös käynnissä olevan aja-sk:n → käytä kill -STOP/-CONT emoon, jos linja tarvitaan väliin.
- LAV:n ajossa lukko vapautuu välivaiheiden välillä ~1 min → odota 150 s vapaata ennen seuraavaa (pk-linjalle.zsh, linja-vapaa-60.zsh).
- Muokattua odotusskriptiä ei lueta uudelleen (sed -i = uusi inode) → tapa ja käynnistä uudelleen.
