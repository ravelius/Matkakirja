# Natiivi-UI: luovutus 19.10.2026 klo 14.31 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1233:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_8d8ebf72-…, JU local_24e63224-…, Valoseppä VS local_e675f86d-…, Linssiseppä LS local_7a457b99-…, SK local_b9ca71c7-…).
Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen SIMU VAPAA JU:lle. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A,
iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Juna 204 julkaistaan, kun KAIKKI omistajan pyynnöt on tehty (omistaja 13.31) → kriittinen polku.

## KÄYNNISSÄ
- **JU kääntää natiivi-ui/valikko-204 15bd68892** (L2, arvio ~14.45) → /Users/Shared/Claude/proto-3d/_tyo/julkaisija/juna204-valikko-app.
  Kun SIMU NYT tulee: lue sha `.app/Data/Raw/kaannos.txt` ja aja ketju (4 ajoa, taustalla, ~20 min). Skriptin sisältö alla (KETJU2).
  Sitten kuva-arkit läpi täysikokoisina → PT ≤ 3 riviä → SIMU VAPAA JU:lle.

## VALMIIT
- **KIPIN NAPIT** natiivi-ui/lenna-itse-204 **ada01496b**: PT kuittasi 14.1x (KK:lle). Kysy-listan vika (lista rakentui joka ruudulla,
  KysyKysymykset = uusi lista joka kutsulla) korjattu 5dfe7a3b7. Todisteet lokit/todistus-kippi-napit-204-{iphone-20261019-1340,ipad-…-1345}.
- **X-SULKU-POHJA** natiivi-ui/x-sulku-204 **1335f92ba**: ✕:n keskipiste ikkunan oikeassa yläkulmassa (Sulkunappi.cs), Vara 28 pt,
  luokka .mk-sulkunappi-kulma → ≡ + kaiutin väistävät 16 pt (nostokortti.uss), chatin ylärivi 24 pt (pulu.uss). Paikka ikkunan
  LOPULLISESTA layoutista (Ponnahduksen scale-animaatio ei laukaise GeometryChangedia → ✕ jäi iPadilla kortin sisään, VS 14.1x).
  LS:n Etusija fd14a0ea5 (noston ✕ piiloon chatin ajaksi) yhdistyy puhtaasti. PT välittää X-sulun KK:lle vasta VS+LS-yhteiskäännöksellä.
  AVOIN PT:n löydös: "Molemmat suljettu" -ruutu näytti ikkunat auki → skenaarion napautus osui noston ✕:ään chatin alla (ohinapautus-
  kerros nielee). Ota ruutu uudelleen käännöksellä, jossa LS:n Etusija on mukana (silloin "Sulje" löytää vain chatin ✕:n).
- **VALIKKO 204** (omistaja 13.31 PT:n kautta) natiivi-ui/valikko-204 **15bd68892** = VS:n nostokortti-204 (6083f3ede, sisältää KUVARAITA-
  pohjan) + x-sulku + omat: Galleriat.cs (juliste Kokoruutu+Raita, Osuus 0,94; ‹ Takaisin → pillerivalikko via Julistegalleria.Takaisin),
  Matkalaukku.cs (vedokset JulisteTiedot.Pikku), Linssivalitsin.Pilleri.cs (aarre paperikehyksessä aarreSuurennos, kuvaus+historia
  Tekstit/aarnin-luettelo.fi.json 7 mannerta SK:n main 9a78746a1:stä), pillerivalikko.uss (avatar background-size 170 % = tietäjäpöllö
  täyttää ympyrän), Sahke.cs + SahkeNakyma.cs (selite omistajan sanoin + kutsuohje 3 vaihetta, ui.sahke.kutsu-*), Sahke.uss ("tyhjät
  ruudut" = toimintonappien nimi var(--panel) läpinäkyvä pergamentilla → paperimuste). unity-tarkistus 0, pohjavahti/kielivahti ok.
  Ennen-kuvat: lokit/todistus-valikko-ennen-{iphone-20261019-1349,ipad-…-1353}, lokit/todistus-retkikunta-ennen-iphone-20261019-1400.
  Tulkinnat PT:lle kerrottu (avatar = tietäjätason hahmo, koska pelaajahahmoa ei ole; tyhjät ruudut = näkymättömät napit).

## KETJU2 (kirjoita scratchpadiin ja aja `zsh ketju2.sh <kaannos-sha> 15bd68892`, run_in_background)
iPad-skenaariot = sama tiedosto ilman `ui kierto` -rivejä: `sed '/^ui kierto/d' <skenaario> > <scratch>/…-ipad.txt`.
```
A=/Users/Shared/Claude/proto-3d/_tyo/julkaisija/juna204-valikko-app/Matkakirja3D.app
cd /Users/Shared/Claude/wt/proto-natiivi-ui-valikko-204
todistusajo.sh --era valikko-jalkeen-iphone --udid <iPhone> --app $A --sha $SHA --haara $HAARA --skenaario tyokalut/todistusajo/skenaariot/valikko-204.txt --nyt
todistusajo.sh --era valikko-jalkeen-ipad --laite ipad --udid <iPad> … --skenaario <scratch>/valikko-204-ipad.txt --nyt
todistusajo.sh --era x-sulku-vaisto-iphone --udid <iPhone> … --haara 1335f92ba --skenaario tyokalut/todistusajo/skenaariot/x-sulku.txt --nyt
todistusajo.sh --era x-sulku-vaisto-ipad --laite ipad … --skenaario <scratch>/x-sulku-ipad.txt --nyt
```
(kaikki `nice -n 10 zsh tyokalut/todistusajo/todistusajo.sh …`; lokit scratchpadiin). Tarkista: va avatar täyttää ympyrän; vc aarre
paperikehyksessä + kuvaus/historia; ve juliste ~94 % + raita; vg galleria ‹ Takaisin; vf retkikunta selite + 3 vaihetta + napeissa teksti;
x-sulku: ✕ kulmassa iPadilla EI kaiuttimen päällä.

## Muuta
- Worktreet (proto): lenna-itse-204, x-sulku-204, valikko-204 (+ vanhat logo-feidaus-204, iss-otsikot-204, iss-ympyra-204). Poista
  mergen jälkeen `git worktree remove` proto-repossa.
- SK:n muut tekstit: PT rajasi ensin VAIN EUROOPPAAN, SK toimitti silti kaikki 7 (myöhempi viesti) → kaikki mukana; mainitse PT:lle jos kysyy.

## Opit
- **Editoriton käännöstarkistus**: `bash Peli-testit/unity-tarkistus.sh` worktreessa (~1 min) → "virheitä yhteensä 0". Aja ennen JU-pyyntöä.
- Ponnahdus-animaatio (style.scale) ei laukaise GeometryChangedEventiä: worldBound animaation aikana on väärä → käytä parent.LocalToWorld(layout).
- Todistusajon ui-puussa ei ole ScrollViewiä eikä tekstittömiä nappeja luokalla aina → veto/tap tekstillisestä sirusta (`Kerro lisää`).
- Uusi asennus jää aloitusnäkymään: skenaarion alkuun `alku odota-tila Aloitus 60;uusi-peli 5 pariisi;odota-tila Kartta 60`.
- Kuvasuurennos jää päälle seuraavien askelten eteen: sulje `tap 4 300` (ohinapautus).
- Kieli lataa kaikki Resources/Tekstit/*.fi.json → sisältötekstit omaan tiedostoon (+ .meta samassa muodossa kuin ui.fi.json.meta).
