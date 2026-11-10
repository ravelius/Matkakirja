# Natiivi-UI: luovutus 10.11.2026 klo 17.11 (kontekstivahti 25 %; korvaa -1618:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Natiivin haarat natiivi-backup-remotessa. Unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh`,
testit `sh Peli-testit/kaanna.sh` (893/893) worktreessa. Edellinen: `git show 9c341f014:docs/raportit/viesti-natiivi-ui-luovutus-20261110-1618.md`.

## 1. JUOKSUPELIN TAVOITEPALKKI (kärki Juoksupeli; omistaja 17.04 "Täyttyvä palkki ja portti") — iPAD-AJO JU:LLA, KATSO KUVAT
- Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-juoksupeli-linjat-ja-tarkastus.md osa 10.
- Haara natiivi-ui/juoksu-tavoitepalkki (wt /Users/Shared/Claude/wt/proto-nui-nimizoom, pohja juna-224 5f8780605): cc331ca9e + 1b5ef12dc.
  UI/Pelit/JuoksuTavoitepalkki.cs (EDISTYMINEN-viiva 220×5 px elämäpalkin yllä mittaRivissä, portti-viivaikoni Ikonit.Viiva["portti"],
  lause 7 s palkin alla, ≥ 85 % loppu: korostus + portin syke), USS Matkakirja.uss .mk-tavoitepalkki*, teksti ui.juoksupeli.tavoite.
  Etenemä V4Kierros.TasoOsuus (JuoksuKierrokset.cs) = Aika / TasoAikaS vapaassa maailmassa, NaN muuten. PK:lle ehdotettu rajapinnaksi
  (17.0x viesti); PK vastaa laskennasta, jos tason ehto muuttuu. Vastausta ei vielä tullut.
- QA: `ui juoksupeli tavoite` (loki), täyttö `ui juoksupeli tasoaika <s>`; lokirivi "tavoitepalkki näkyviin".
- JU: sk /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-juoksu-tavoitepalkki-1-ipad.txt → lokit/nui-juoksu-tavoitepalkki-1-ipad-1b5ef12dc (t-1 alku
  + lause, t-2 puoliväli, t-3 loppu). Tee: katso kuvat täysikoossa (palkki luettava 3D:n päällä? portti tunnistettava? lause ei peity
  opetuskehotteeseen?) → kuva PT:lle (PT pyysi "kuva isolta iPadilta PT:lle") → korjaukset → valmis-rivi PT:lle.
- LAUSE KK:N HYVÄKSYTTÄVÄKSI (sisältöteksti): "Pysy jaloillasi, kunnes palkki täyttyy – silloin portti aukeaa seuraavalle tasolle."
  Lähetä KK:lle kuvan kanssa; KK päättää sanamuodon.

## 2. KAUPUNGIN NIMEN NAPAUTUS — JUNASSA / PT:N KÄSISSÄ
- effce09e2 (zoomaus vain {pariisi}) on juna-224:ssä (5f8780605). Mac -5 katsottu, valmis-rivi PT:lle 16.5x.
- 796969586 (haara natiivi-ui/kaupunkinimi-zoomaus-kaikki, ZoomausKaikkiin = true; NS: tyhjä kartta oli hidas verkko): Mac -6 katsottu
  (Marseille, Barcelona katuverkko 16 s:ssa, ei korttia), valmis-rivi PT:lle 17.0x. Odottaa PT:n pt-ok:ta → JU MR. Ei NUI-toimia.

## 3. KUVAKYLTTI-KOE — VALMIS KOKEENA (oletus pois, ei junaan ilman korttia)
- 9f7f40611 natiivi-ui/kuvakyltti-tahdet: "Temple" ja "Place de la Bastille" pois (syy: kiinteä ladonta ei väistä UI-varauksia →
  Nimikerros.TahtiPaikat, elävä paikannimi alle 160 m kuvakyltin 3D-tähdestä pois). Pari PT:lle: -3-mac-753093617 | -5-mac-9f7f40611 1b/2b.
- Avoin: muut tähden päälle osuvat kiinteän ladonnan nimet eivät edelleenkään väistä (KK:n kohta 3); vasta jos KK/PT pyytää.

## JONO
Kohdan 1 jälkeen: rivi PT:lle "JONO TYHJÄ: natiivi-ui" (työlista: tyolista.py seuraava NUI).

## LISÄYS 17.2x
- PK 17.1x: TasoOsuus-rajapinta hyväksytty; maalissa 1 tehty fb3f19f31 (haara natiivi-ui/juoksu-tavoitepalkki; iPad-skenaarion sha 1b5ef12dc
  riittää kuviin). PK pysäyttää S.Aika:n kiinnioton/esittelyn ajaksi omassa JuoksuV4.cs:ssään. Valmis-rivissä PT:lle sha fb3f19f31.
- OMISTAJAN PÄÄTÖS 17.08 (KK): kuvakyltti junaan → 5ce11c0c5 (natiivi-ui/kuvakyltti-tahdet, Kuvakyltti = true oletuksena), valmis-rivi PT:lle
  17.2x, lause KK:lle. Tee: kun JU vie MR:n, versionumero (linkki) KK:lle. JATKOHUOMIO (KK, ei estä): ylhäältä-kuvassa 2b Bastiljin kyltti jäi
  ruudun alareunan alle (vain tähti näkyi) → kyltti pysyköön ruudussa reunan lähellä (NostotKartalla: kuvakyltin ruudun reunarajaus).
