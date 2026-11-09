# Natiivisepän luovutus 9.11.2026 klo 10.35

Edellinen: git show 1de79026d:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1020.md (tausta: matkalento, FPV-latauskuvan selvitys).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 25 % = pehmeä raja (7.37).
Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## TEHTY 10.22–10.35
1. MATKALENTO-ENNAKKO VALMIS ja PT:lle ilmoitettu (10.28): 6ad986961, JU:n Mac-ajo lokit/natiiviseppa-matkalento-ennakko, "ajoennakko: päällä";
   laskeutumisen beige poissa (Carcassonne terävä k230–265, paluu Pariisiin terävä). Arkit
   /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/nostolento/kuittaus-ennakko/lasku-{vanha,uusi}-k250-265.jpg (ja -k230-265).
   arkki.py:n TASAINEN-rivit k104–114 ja k564–568 ovat vääriä hälytyksiä (kartta näkyy, matala kontrasti); katsottu.
2. FPV-LATAUSKUVA KOODATTU: a88e3648b (natiivi-backup natiiviseppa/fpv-latauskuva, wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv-lataus,
   = fpv-viat c7df37d49 + NUI natiivi-ui/fpv-nakyma 7ddc42970 yhdistetty + latauskuva). unity-tarkistus sh: 0 virhettä (131 varoitusta).
   - UI/Linssit/FpvLatauskuva.cs: mk-astroavaus-musta + Latauskuva (TaustaLahentyy, ei nimivarjoa) + Latauspalkki (tumma, näkyy 1 s jälkeen,
     JuoksuLatausEdistyminen.PalkinPaikka alas keskelle). Kuva leveä ruutu → vaaka, muuten pysty; kierrossa vaihtuu. LatausLiike.Peita keskitetty
     (PT:n tarkennus: täyttö kuten muissa). Ei tekstiä (omistaja ei pyytänyt nimeä – mainitse PT:lle kuvien kanssa).
   - Kartta/FpvLento.cs: Valmis (alun maasto haettu + Cesium ComputeLoadProgress ≥ 99, lyhin 0,5 s, aikaraja 10 s) ja Edistyminen (0–0,3 haku, 0,3–1 laatat).
   - FpvNakyma: Start käynnistää FpvLento.Aloita() (jos ei jo käynnissä) ja latauskuvan; OnDestroy FpvLento.Lopeta() (☰ FPV-lento pois = lento loppuu).
     Testi `ui fpvnakyma lataus pito|vapaa|tila`. LinssiUi: FpvLatauskuva.Esilataa() topografian kytkimen kohdalla.
   - Kuvat ämpärissä (JU vei, HEAD 200).

## ODOTTAA: JU AJAA sk-fpv-latauskuva.txt (a88e3648b), koko ipad + puhelin pysty → lokit/natiiviseppa-fpv-latauskuva-{ipad,pysty}
Skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/fpv-latauskuva/sk-fpv-latauskuva.txt (fl-1-latauskuva pito päällä, fl-2-lento häivytyksen jälkeen).
SITTEN: katso kuvat täysikokoisina (9.5): kuva peittää koko ruudun ilman mustia reunoja, drone näkyvissä, palkki alhaalla keskellä turva-alueella,
fl-2:ssa latauskuva poissa ja tietorivi/pallo/tikut näkyvät; lokista "fpv-lataus: kuva vaaka|pysty …" ja "fpv-lataus: valmis X s".
Vika → korjaa, uusinta. OK → PT:lle valmis-rivi (sha, kuvapolut vaaka + pysty; ei tekstiä latauskuvassa, onko nimi tarpeen = PT/omistaja).
Ei junaan ennen kuin lento on omistajan kokeiltavana (PT).

## JONO
1. FPV-latauskuvan Mac-tulos (yllä). 2. Muuten tyhjä.
