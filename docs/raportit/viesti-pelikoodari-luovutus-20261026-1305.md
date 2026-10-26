# Pelikoodarin luovutus 26.10.2026 klo 13.05 (Postivahdin kova raja 37 %)

Edellinen: viesti-pelikoodari-luovutus-20261026-1132.md (työkalut, skenaariot ja koordinaatit; lue sen TYÖKALUT JA PAIKAT -osa).
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat paikallisia.

## TEHTY 26.10. (11.37–13.05)

- **Räystäskamera** LT:llä vihreä e77543fc7:llä, ja PT kuittasi sen junaan 211.
- **Kolmikot** (editorista, sisäinen tarkistus PT:n kuittaamana; ei omistajalle): proto-3d/_tyo/pelikoodari/kolmikot-211/
  aukio03-, kujaportti-, porttihalli-e77543fc7.jpg ja raportti-20261026.md.
- **Siivous**: 17 omaa vanhaa esikatselukansiota poistettu (890 Mt). Niistä 13:een (25.10. 12.16–13.52) viitattiin raporteissa lyhyellä
  nimellä, jota haku ei tunnistanut. Kootut jpg:t säilyivät, raakakuvat ja lokit menetettiin. Raportoitu kolmikot-211/raportti-20261026.md:ssä.
- **Elävyyspaketti** haarassa `pelikoodari/fpv-kallistus-211` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, pohja
  e77543fc7). Kärki **81479b011**, tarkista.sh 0 ja JuoksuNojaus-testit 3/3. Commitit:
  - 4630f82fc FPV-kallistus kääntönopeudesta. SYY, miksi kallistus ei näkynyt: kallistus laskettiin suuntaerosta, ja 21.10.
    nopeutettu kääntöjousi (e2ab5afd9) kutisti sen ~5°:een, kujilla 1,7°:een (tele 35 %, d266d1881) ja huoneissa 0°:een.
    Nyt editorissa drone kallistuu 10–15° ja Puyi nojaa 12–17° jokaisessa käännöksessä. Mukana myös Puyin nojaus, askelvaihtelu
    ja kompurointi. Pohjana Peli/Juoksupeli/JuoksuNojaus.cs ja testit Peli-testit/Testit/JuoksuNojausTestit.cs.
  - a8481ad28 / d49412b0a kompurointi ≥ 10 m käännöksestä; liikevahti.
  - 6a605163f avoimet hallit (palatsi avoin …) kuten läpikulkuportit (KattoHaivytys.OnAvoinHalli). Editorissa puutarha ja työhuoneeseen
    sisääntulo: piilot 0. **AVOIN**: työhuoneesta ulostulo, 36 ruutua: este 0,5 m katon reunan ulkona, korkeus 2,8–3,4 m (oven
    yläpalkki?). Kuvausyritys sk-tyohuone-ulos.txt osui väärään kohtaan (piilo t 76,9 s; kuvat esikatselu-20261026-1242).
  - 074f4d7f5 omistaja 12.44: kompurointi hienovaraiseksi (ei stumble-leikettä, ei hidastusta). Lisäksi vilkaisut taakse (65°, 0,6 s)
    ja sivulle (25°).
  - f421306f7 kortit 12.45: väsymys (elinvoima < 35: askel raskaantuu, ryhti painuu) ja omenan piristys sekä säpsähdys täpärässä
    ohituksessa.
  - 81479b011 kortti 12.57: rikkomisreaktio. Säpsähdys ja kädet kasvoille, sitten vilkaisu taakse käsi päälaella alle sekunnissa.
    Kädet suunnataan maailmassa (JuoksuHahmot.Hahmo.Kadet). Huudahdus on jo olemassa (PuyiHuudot rikkomishetkellä), uutta ääntä ei tarvita.
  - QA-komennot: `ui juoksupeli nojaus 0|1`, `kompurointi`, `vilkaisu`, `elinvoima N`, `sapsahdys`, `rikkoreaktio`.

## KESKEN (taustalla luovutushetkellä)

1. **Simuvideo** f421306f7:sta (7 liikettä, ilman rikkomisreaktiota). Simu 39644E75 on omalla JU:n NYT-vuorolla, app-kopio
   proto-3d/_tyo/pelikoodari/fpv-211/app-f421306f7/. Tulos: proto-3d/lokit/todistus-elavyys-f421306f7-20261026-1301/
   (L/elavyys.mp4, TODISTUS.md). Skenaario _tyo/pelikoodari/fpv-211/skenaariot/simu-elavyys-video.txt.
   → Tarkista video (ffmpeg -fflags +igndts), poista teksti kuvan päältä, jos sitä on. **Lähetä JU:lle SIMU VAPAA** ja sammuta oma simu.
2. **Editorin kuvasarja rikkomisreaktion käsistä** (81479b011, sk-rikko-kadet.txt → uusin esikatselu-20261026-13xx, kuvat rk-01…12
   ja vs-01 = väsymys). Tarkista käsien asento 1:1: suojaus kasvojen edessä, käsi päälaella. Jos se näyttää väärältä, säädä
   JuoksuHahmot.Kadet-kohteita.

## JONO

1. Rikkomisreaktion kädet kuntoon → uusi käännös (pyydä JU:lta, kärki ≥ 81479b011) → **YKSI video PT:lle, jossa näkyvät kaikki**:
   kallistus, nojaus, askelvaihtelu, kompurointi, vilkaisut, väsymys ja omena, säpsähdys ja rikkomisreaktio (lisää skenaarioon
   `ui juoksupeli rikkoreaktio` tai oikea rikkominen). Ei tekstiä kuvan päälle. PT:lle enintään 3 riviä ja polku.
2. **Omistajan pelikuvat junan 211 rungosta 0bc12f1b9** (LR paketti56): NS lähettää äpin polun laitekäännöksen jälkeen. Skenaario
   valmiina: _tyo/pelikoodari/fpv-211/skenaariot/simu-pelikuvat-211.txt (aukio 03, kujat 02/05 ja kujaportti, porttihalli reitti B pysty).
   Simuvuoro JU:lta. Tarkista 1:1 itse ja vie PT:lle.
3. Avoimen työhuoneen ulostulon räystäspiilo (yllä AVOIN).
4. Kuja-40 odottaa omistajan leveyspäätöstä (ennallaan).

Väsymystä ja säpsähdystä ei enää odoteta: kortit 12.45 hyväksyttiin, ja ne on toteutettu.

## LISÄYS 13.10

- Simuvideo f421306f7 on valmis: proto-3d/lokit/todistus-elavyys-f421306f7-20261026-1301/elavyys.mp4 (266 Mt). Lokissa näkyvät kallistus,
  kompurointi ja vilkaisut taakse ja sivulle. Säpsähdys ja piristys eivät lauenneet: botin reitillä ei ollut estettä, ja QA-elinvoima
  ohitti piristyksen. Korjattu: **f324e3a9f** (QA sapsahdys säpsähtää heti, QA elinvoima-nousu piristää). tarkista.sh 0.
  Simu 39644E75 on sammutettu, ja JU:lle on lähetetty SIMU VAPAA. Seuraava käännös kärjestä f324e3a9f (sisältää 81479b011:n).
  Huom.: vilkaisuja tuli tiheästi (taakse noin 10 s:n ja sivulle noin 5 s:n välein); harvenna tarvittaessa.
