# Natiivi-UI: luovutus 16.10.2026 klo 16.45 (Postivahti: kova raja 38 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -iltapaiva ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh (`nohup zsh <ketju> <sha>`; L2-käännös → iPhone
123B4B25 + iPad F7513985, custom set /Volumes/T7 4TB/Simulaattorit/Sarja – simulaattori-MCP ei näe niitä). Parit: pari.py.
LEVY: _tyo/natiivi-ui/ enintään 2 uusinta .app-käännöstä; edellinen pois heti kun uusi on varmistettu (PT 13.4x).

## VALMIS (tämä sessio, kaikki PT:n kuittaamia)
- Vihjeiden kontaktivarjo a27706475 (ylävalo, tumma lätäkkö jalkojen alla; omistaja 13.49) → juna 196.
- Kevyt metro 5b70953a8 + naapuririvit e6e7dae9e (museon seliterivi ja ‹ › -rivit, linnan Seuraavaksi pois; omistaja 15.38) → juna 196/197.
- METRO-LAIKKU: omistaja 15.34 "Ei, pelkkä varjo" → ei tehdä (havainnekuva vain _tyo/natiivi-ui/metro-laikku-1515/).
- ISS-kohokohdat: PT 15.2x – nykyinen junassa 196 on oikea (omistaja 22.06 voittaa), ei muutoksia.

## KESKEN (ketjut ajossa taustalla 16.45)
1) TAIDEMUSEON TEKSTIT → JUNAAN 196 (ENSIN; omistajan päätös 16.39 KK:n kortilla: "Pois, vaaleissa saleissa tumma teksti
   (Suositus)"; 16.3x: "nykyinen kuitenkin tuhnuisen näköinen tummalla ääriviivalla … taidemuseossa on hyvä että tekstistä saa aina
   selvää"; päätös kattaa UI-POHJAT). Haara natiivi-ui/museo-teksti-196 14b96078a (pohja juna-196 fb6513093), worktree
   /Users/Shared/Claude/wt/proto-natiivi-ui-museo-teksti-196. MuseoTaulu: nimi/selite/alarivi/naapurit ilman textShadow ja ääriviivaa;
   AsetaTekstiSavy(VaaleaSali(r)) → Paperi.Muste vaaleissa (VaaleatSeinat: orsay_kalkkikivi, louvre_hiekka, kalkki_valkoinen,
   paneeli_kerma, kipsi_vaalea, fasadi_kalkki, kivi_hiekka + Osa.Tyyppi "ulko" = Rodinin puutarha); taustaliuku (nimiTausta) vain vaalealle
   tekstille. OpasMetrolinja.Terava (museon nimilista: ei varjoa/ääriviivaa) + Tumma (nimet, kyltti, viiva, pisteet musteella).
   Testi `ui museoteksti auto|tumma|vaalea`. KESKEN: museoteksti-ketju.zsh 14b96078a (käännösjonossa 16.4x; odottaa salilista5-ketjun)
   → _tyo/natiivi-ui/museoteksti-ketju.out, lokit todistus-museoteksti-{ipad,iphone}-196-*, skenaario sk-museoteksti-196.txt (Ranska:
   T1 Orsay keskilaiva, T1b sama vaalealla, T2 nimilista, T3 impressionistit, T4 Salon Carré, T5 Grande Galerie, T6 Daru, T7 Marmottan).
   Tarkista: teksti terävä ilman haloa; T5 (louvre_taupe) ja T7 (marmottan_harmaa) ovat välisävyjä – jos vaalea teksti ei erotu, lisää
   VaaleatSeinat-listaan. Kuvapari PT:lle: Orsayn keskilaiva (T1b | T1) ja yksi tumma sali (T3 tai T6) → PT kuittaa NS:lle junaan 196
   (ehtii, jos ennen savua k4).
2) SALILISTAN KOSKETUSKOE (TF 188) → juna 197. Syy: 122169f34 (16.10. 00.44, lehden vieritys) teki napautuksesta liu'un aikana pelkän
   pysäytyksen; heiton hidas loppuliuku (alle ~150 pt/s, noin sekunti) nieli salilistan napautuksen. Korjaus b1ce221ba
   (Kosketusvieritys.PysaytysRaja 150 pt/s: hitaampi liuku pysähtyy ja napautus menee napille). Haara natiivi-ui/salilista-197 4283fb5a4
   (pohja juna-197), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-salilista-197. Testikomennot: `ui kosketusheitto x y dy tauko-ms`
   (Touch-tapahtumat) ja `ui lehti vieritys raja N`; lokirivi "ui vieritys: kosketus liu'un aikana N pt/s → vain pysäytys | pysäytys ja
   napautus läpi". HUOM: synteettinen kosketusnapautus EI avaa nappia edes ilman pyyhkäisyä (Clickable ei reagoi suoraan lähetettyyn
   touch-tapahtumaan), joten todistus = päätösrivi lokissa. KESKEN: salilista5-ketju.zsh 4283fb5a4 → _tyo/natiivi-ui/salilista5-ketju.out,
   loki todistus-salilista5-iphone-197-*: odotus K1 "vain pysäytys" (100 ms), K2 raja 10 "vain pysäytys" (ennen), K3 raja 150 "napautus
   läpi" (korjattu). Jos K3 ok → PT:lle rivi (b1ce221ba junaan 197; sormella laitteella varmistus suositeltava). Testikomentocommitit
   (2655f6921, e17b5f62d, 4283fb5a4) voivat kulkea mukana (vain testikomento + lokirivi).

## Opit
- iOS-simut ovat custom setissä: simulaattori-MCP ei näe niitä; kosketuksen voi todistaa vain pelin sisäisillä testikomennoilla.
- UITK PointerDownEvent.GetPooled(Event) IMGUI-hiirestä = pointerType mouse (Kosketusvieritys ohittaa); Touch-rakenteesta = touch.
- UITK:n tekstivarjo ei leviä fontin SDF-reunusta pidemmälle (laaja sumennus vain haalistaa).
- Ajossa olevan zsh-skriptin sed -i luo uuden tiedoston: käynnissä oleva prosessi jatkaa vanhalla sisällöllä → tapa ja käynnistä uudelleen.
