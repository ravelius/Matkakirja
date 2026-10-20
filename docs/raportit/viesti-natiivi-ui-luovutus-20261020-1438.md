# Natiivi-UI: luovutus 20.10.2026 klo 14.38 (konteksti täynnä, PT:n pyynnöstä ennen isoa erää)

Korvaa -1025:n (Opit -0350/-0530/-0615/-0926/-1025 yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md.
SIMU: omistaja 11.45 → vain uusi tekniikka, omistajan pyytämät kuvat, yöjunan kierros. Muu: tarkista.sh (+ tarvittaessa Mac-esikatselu
TKS:llä, ei ikkunoita omistajan näytölle) → sha PT:lle → NS junaan. Proto-worktree: /Users/Shared/Claude/wt/proto-natiivi-ui-museo-teoskortti-208
(nyt haarassa natiivi-ui/kertoja-napit-208-juna 7c10e9f71, puhdas).

## ENSIN: OMISTAJAN PYYNTÖ 14.37 (PT:n kautta, isolla iPadilla 8c9fe4fce, museo)
1. Maalaus zoomautuu KEHYKSEN SISÄLLÄ automaattisen zoomauksen lähestyessä (Mona Lisa ym.) → kuva ei koskaan zoomaudu kehyksessä;
   lähestyttäessä taulu + kehys kasvavat yhtenä kappaleena (kamera liikkuu, ei tekstuurin/kankaan oma zoom). Etsi: MuseoKierros (Zoom,
   UiTila, Laajennus), MuseoSovitin, MuseoNayttamo – mikä skaalaa kangasta/UV:ta erikseen kehyksestä (suurennuslasi? AUTO ZOOM -pilleri).
2. AUTO ZOOM "zoomailee välillä turhaan sisään ja ulos, varsinkin lopussa" ja kohdistus nykii ylös/alas → liike vain kun kertoja siirtyy
   uuteen kohtaan (kohdat/virke), lopussa rauhallinen asettuminen, kohdistus + zoom samassa pehmeässä liikkeessä (liikepohja/Kamerajohtaja;
   kameravahti + kameratesti tarkista.sh:ssa – uusi kameraliike tarvitsee testin).
3. Kaikki päälle/pois-napit päällä-tilassa samalla värityksellä kuin AUTO ZOOM (oranssi pilleri), mutta kaikissa (myös zoom) pehmeämpi ja
   himmeämpi; YKSI yhteinen tyyli UI-pohjiin (Ohjausnappi mk-valittu / mk-ohjausnappi--pois, tyylikirja.json + Tyylikirja.uss generoitu,
   pohjavahti), kaikkiin linsseihin (KertojanNapit käyttää Ohjausnappia). UI-POHJAT: uusi väritoken → kysy PT:ltä ennen, jos puuttuu;
   web-tyylikirja PR:nä (kuten #5027).
Sha PT:lle (local_8d8ebf72) → NS (local_fcc10552) junaan 208 → iso iPad.

## TILA (kaikki NS:llä junaan 208, PT OK)
- natiivi-ui/kertoja-napit-208-juna 7c10e9f71 (proto): museo (teoskortti, alarivi 🔈 T, tekstitys, nimi ☰-riviin, LS:n kyltit/kehykset,
  KK:n palaute: › ja kaiutin näkyviin, Huomiokohdat sulkee kortin, teosluettelon valittu nimi kokonaan + kamera perääntyy) + 🔈/T 9
  linssiin + .metat + lisenssirivi antiikvaan + nimen sävy: omistaja 12.33 vaalea seinä → tumma, tumma/punainen → valkoinen, sama
  molemmilla laitteilla (MuseoTaulu.Tausta.cs kynnys 0,24/0,18 + seinän kaistale teoksen vasemmalta). EI VS:n valoa (VS hoitaa).
- Juoksunimet natiivi-ui/juoksu-nimet-208 e6238c958: NS:n pidossa palatsin kanssa (musta latausnäyte uusitaan, sävy kirkkaammasta
  neljänneksestä, QA `ui juoksupeli nimiaika <s>`).
- Web #5027 (tyylikirja _vakanen + ohjausnapin pois-tila) MERGETTY 11.5x, worktree poistettu.
- _tyo/natiivi-ui: vain museo-208-yhd3b-app ja juoksu-nimet-208e-app (208-vanhat poistettu).
- Simukuvat (vanhat, viite): lokit/todistus-museo-teoskortti-b-jalkeen-{iphone-1059,ipad-1104}, lokit/todistus-kertoja-napit-208-iphone-1109,
  lokit/todistus-juoksu-nimetd-jalkeen-*-1132/1135. Skenaariot sk-museo-teoskortti-208b, sk-kertoja-napit-208b (ui tekstitys 1 0
  ennen linssiä), sk-juoksu-nimet-208e; ajo-nui-208-vuoro2.zsh (ei ajettu, peruttu 11.45).

## Opit (uudet)
- Todistusajon oleta-regex ei osu emojiin (🔈) → käytä [^,]* tms.; lokirivi voi tulla ennen oleta-uusi-askelta → odota heti komennon perään.
- Pohjan .mk-kortti--pohja-valitsimet (kentta.uss) voittavat tumman variantin, jos valitsimessa ei ole sisäkorttia.
- museon nimen oletusväri (mk-aikajana-havainne__otsikko) on kultainen → valkoinen pitää asettaa (Kehys.Paper).
- PK:lle löydös: iPhone pysty juoksupelissä kamera punaisen muurin sisällä (N1/N2, 208d) – kerrottu.
