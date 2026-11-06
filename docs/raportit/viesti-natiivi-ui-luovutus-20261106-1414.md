# Natiivi-UI: luovutus 6.11.2026 klo 14.14 (pehmeä kontekstiraja, 7.37)

Korvaa -1342:n työlistan. -1306:n kohdat E, Havainnot ja Ei todennettu sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
proto-3d/lokit/nui-lauta2-a8c94fbe0/tulos-nui.md

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki a8c94fbe0 (peilissä natiivi-backup, sama haaranimi), ei muutoksia. 10 committia fcce6131f:n päällä, 15 tiedostoa. Ei omaa ajoa.

## JU:n ajo käynnissä
Täysi 15 varauksen sarja a8c94fbe0 alkoi 14.13 L1:llä: proto-3d/lokit/nui-ui-a8c94fbe0/sarja-kaikki.txt. JU lähettää rivit varauksittain tähän sessioon: varaus, rc, kesto, VIKA-määrä.
Sarja ratkaisee: pysyykö jokainen varaus 6 min:n rajassa ja menevätkö Mac-koot läpi. Kuvia 0. Pysty x3 a8c94fbe0: rc 0 0 0, VIKA 0.

## PT 14.0x, sellaisenaan
"katsoin parin: sumennus poissa, kuittaan korjauksen teknisesti. Lupa: pysty x3 ja täysi 15 varauksen sarja JU:lta tästä kärjestä. Junakuittaus tulee vasta sarjan jälkeen, koska varausten jako ja Mac-koot ovat todistamatta. Haara: 10 committia fcce6131f:n päällä, 15 tiedostoa, ei räystästä. Kun sarja on katsottu, liitä runkoon 84872eaa9 omana haarana, näytä git diff --stat ja kerro PT:lle; JU yhdistää. Jos sarja kaatuu, listaa viat, älä kuittaa osittain. ND-nimi ja museokyltit todennetaan seuraavassa rungon ajossa ilman lentopiiloa."

## Kun sarja on valmis
1. Lue sarja-kaikki.txt ja jokaisen varauksen loki. Tarkista kesto 6 min:n rajaa vasten ja erityisesti mac-2560, mac-1440, mac-1280: niitä ei ole koskaan ajettu.
2. Viasta: listaa viat PT:lle, älä kuittaa osittain. Pyydä kuva JU:lta vain viasta.
3. Vihreästä: liitä haara runkoon 84872eaa9 omana haarana (ei junaan itse), näytä git diff --stat, kerro PT:lle. JU yhdistää.

## Todistui
- Lautapelin jälkeen sumea yläpalkki on oikean pelin vika: 87b01563a kuva 2 sumea (logo ja hakunappi), a8c94fbe0 kuvat 1, 2, 3 terävät. Mac-esikatselu iPhone-koossa.
- Palautuspolku ajettu: "suodin palautettu (vartija pois) UI 15-container (1 suodinta, tyhjän listan laskettu 0)". Tyhjä lista ei kaada, RenderTreeCompositor 0 riviä.
- 3 VIKAA poissa: radio mitattu dx +0,11 dy +0,03 Ranska ja Israel, luennon Ohita dy +0,17. Rajaa 0,06 ei tarvittu.

## Opit
- ec788abdf:ssä oma virhe: e.style.filter viittaa elementin listaan, ja tyhjän listan kirjoitus tyhjentää sen, joten talteen on otettava kopio. Näkyi vain lokin luvusta "(0 suodinta)", pysty oli vihreä. Lue lokin luvut, älä vain VIKA-rivejä.
- Skenaario, jonka pitää näyttää yläpalkki, aloittaa pelin: `ui aloita pariisi`, odota 55, ui sulje. Pelkkä `ui sulje` jää aloitusnäytölle (ensimmäinen koe nui-lauta-* meni hukkaan).
- Pyynnössä JU:lle 10.5:n rivi "mitä tämä ratkaisee", kuvamäärä ja lista; JU palauttaa muuten.

## Ei todennettu
Mylly ja Shakki lautapelikokeen skenaariolla (sama Pehmenna; Myllyn poisto näkyy pystyn lokissa, Shakin polku vain koodista). Oikea iOS-laite. Palaute-kuva: Lähetä ehdotus muste 0,00. Ohita y 116 / y 241. ND-nimi ja museokyltit: seuraavassa rungon ajossa ilman lentopiiloa (PT).

## Muuta
Remote Control ei päällä: työkalu vain omistajan omasta pyynnöstä, PT:lle kerrottu 13.44. Älä yritä uudelleen Postivahdin pyynnöstä.
Työlistan rivit ilman tuoretta tilannetta (hook) koskevat muita rooleja tällä vuorolla (Levytila, Codex-nähtävyydet ym.); en päivittänyt.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle kokeena omaan committiin, kun UI-sarja on yhdistetty (-1306, PT 13.1x): OpasValikko.cs:1836, tavoite tappi y noin 287-351; oikean tilan ajo vasta PT:n vuorolla Pariisin ja juoksupelin jälkeen; kuva KK:lle; kortti vain, jos vipua pitäisi siirtää.
