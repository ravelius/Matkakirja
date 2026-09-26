# Natiivi-UI:n luovutus 26.9.2026 (u), klo 21.3x

Jatkaa luovutuksia (s) ja (t) (lue (t):n loppuosa yksityiskohtiin). Proto-git `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
työkopiot wt/proto-natiivi-ui-{sisallys,nostot,pariteetti,kuvapakka} (kuvapakka poistettavissa: mergetty). Oma simulaattori iPhone 17
FB234D08 (tallennuksessa Pariisi-peli). Fable local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437, Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701.

## ENSIMMÄISENÄ: LÄHETTÄMÄTTÖMÄT VIESTIT (edellinen sessio osui istuntoviestien 10 rajaan)
1. Natiivisepälle merge-pyyntö: `natiivi-ui/kuvamerkit-174` @ 21479236 (juna f583f1c2 päällä, vain UI/NostotKartalla.cs): 174 web-mallin
   mukaan — ei läikkää, löytämätön täysin mustein, kuvamerkki webin koossa (≥2,5), alle 2,5 minikuvake ~14 pt, puuttuva kuva →
   minimerkki. Kuvaparit proto-3d/lokit/natiivi-ui-loydos174/ (kuvapari-174-web-malli.png, kuvapari-174c-lahikuva.png). Hän mittaa
   iPadilla. (174b-avaimet hän lisäsi itse junaan.)
2. Natiivisepälle merge-pyyntö: `natiivi-ui/maakunnat-kaikki` @ 0c9a3555 (juna 31e3cbd4): 169 Kaikki + 170b kuvapaikka + 173
   paneeli 250 pt / max 78 %, Kaikki|Pois samalla rivillä. KOSKEE hänen MaakunnatSilta.cs:ää (+3). Kuvat natiivi-ui-loydos169-170b/,
   natiivi-ui-loydos173/kuvapari-173-ennen-jalkeen.png.
3. Siirtosepälle: 170-haara `natiivi-ui/sisalto-vaihtui` @ 544e0ce3 (hänen 42b790c2:n päällä) → hän kääntää yhdessä ja ajaa
   jälkeen-kierroksen. Savukkeessa oikea vaihto v182→v183 laukaisi käsittelijän (proto-3d/lokit/natiivi-ui-loydos170/konsoli-vaihtui.txt).
4. Fablelle tilarivi: 174 valmis (web-malli), 169/170b/173 valmis, 170 valmis Siirtosepän tapahtumalla, 170-alkuperä: natiivi piirsi
   kuvat oikein, syy vanha paketti; 177 analysoitu mutta ei aloitettu (ks. alla); pulun blink-korjaus c39797f9 PR-haarassa (kommentti
   PR ravelius/Matkakirja-natiivi#1), Natiiviseppä mergesi? tarkista.
5. Pelikoodarille: kuittaus 174b (Natiiviseppä teki taulun, natiivin UI minikuvake/vara 21479236) ja pyyntö 177:n nollauslistasta.

## AVOIMET
- 177 (Uusi peli, P1, Pelikoodarin kanssa): toistettu (natiivi-ui-loydos177/). Asetukset.Nollaa poistaa vain Kytkin/Voima-avaimet;
  ~15 UI-avainta jää (lista (t):ssä). Web tyhjennaMuistit (js/main.js:1432) poistaa kaikki matkakirja* paitsi SAILYVAT_ASETUKSET ja
  lataa sivun. Tarvitaan Pelikoodarin nollauslista (tallennus) + omistajan tarkennus "ei ala oikein" ENNEN koodia.
- 174: Natiivisepän iPad-mittaus maatasolla (100+ merkkiä).
- 173/169/170b/174/170: merge-tilat junassa tarkistettava (git merge-base --is-ancestor <sha> juna/b13).

## OPIT
- Viestiraja: SendMessage/send_message pysähtyy 10 viestiin käyttäjän viimeisen viestin jälkeen; ÄLÄ kierrä (harness-jarru), kirjaa
  luovutukseen ja pyydä omistajaa kirjoittamaan.
- zsh: `$B:polku` laukaisee :A-modifikaattorin → käytä `${B}:polku` git show -komennoissa.
- Vähennetty liike simulaattorissa: simctl spawn <UDID> defaults write app.matkakirja.proto3d matkakirja-kartan-liike -string 0.
- Karttamerkit haetaan webistä matkakirja.app/assets/nostotyypit/ (NostoMerkit.KuvaJuuri), ei paketista.
