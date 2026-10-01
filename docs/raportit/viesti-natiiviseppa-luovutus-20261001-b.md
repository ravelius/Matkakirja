# Natiivisepän luovutus 1.10.2026 klo 21.4x (b) — konteksti 73 %

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261001.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI

- **proto master 5872d9d6 = BUILD 110** (juna/b13 4a5eb743, käännös af0eea4c, savuke 1110 PASS). **Huomisen TF = 1.1 (110)**
  (Julkaisijan tf-jono-20261002.txt; Applen latausraja 1.10. → lataus 2.10.; muutosrivit 109 + 110 Julkaisijalla).
- juna/b13 = 4a5eb743, käännetty. Ei avoimia junia. .app-kopio proto-3d/lokit/juna-1.1.110-af0eea4c/ (+ 1.1.91 Pelikoodarille).
- **Seuraava juna 111** = 110 + natiiviseppa/sarja-20260930 4254fe57 (30-pohja + kerma 30-p060, omistajan lupa e19490c4c) +
  pelikoodari/matkamittari-2 8b590fba (omistajan OK 4b60cee9f, pohjavahti ok). Molemmat on aiemmin koottu vanhoille pohjille
  (natiiviseppa/juna-sarja-vanha e7651015, juna-mittari-vanha 51e1bddc) → kokoa UUDELLEEN juna/b13 4a5eb743:n päälle ja testaa.
  30-pohjan kansio näkyy ämpärissä 21.40, mutta laatat.json ei vielä — odota Karttasepän rivi "pohja … ja kerma … ämpärissä".
  Juna 111:n savukkeeseen Wien/Tonava z10 -kuvapari web (jokiviivataso päällä) vs natiivi → Päätoimittajalle omistajan päätökseen.
- Avoimet merge-pyyntöjen odottajat: Siirtosepän myllyn avaus pelistä + mylly-kuvat (suositin Resources/ASTC 6×6, ~12 Mt,
  kytkentä omistajan OK:n jälkeen); Linssisepän kiilto-leikkaus (Yokuori-kiillon pystyleikkaus, tunnettu); Natiivi-UI:n
  havainnot 110 (kahvan osuma-ala ahdas laajennetussa, "out of view frustum" -rivit pillerivalikon jälkeen); Visan
  paljastuskortti KORTTI-pohjaan (seuraa webiä).

## TÄNÄÄN (1.10.) TEHDYT BUILDIT

92 c256df93 · 93 595d0087 · 94 af9914ac · 95 2d4eceae · 96 2d366385 · 98 0b8a590d · 99 b92f996d · 100 e1699839 · 101 ed7ea890 ·
102 bcf0f5ce · 103 e0cc768e · 109 b1232c6e · 110 5872d9d6 (97, 104–108 ohitettiin: junat yhdistettiin, ks. juna.log).
Savukkeet docs/raportit/savukierros-11NN-*.md (Laitetestaajan haara laitetestaaja-savukierros-b13).

## UUDET OPIT JA SÄÄNNÖT

- **Burst-juurisyy ratkaistu** (muisti burst-linkkeri-ohimeneva): editorin JIT; v1 4f2e2775, v2 4e2dc9ef (pois koko BuildPlayerin
  ajan + palautusmerkki), v3 4bacfbba (Cancel + IsCurrentCompilationDone ≤ 60 s) → juna 110: 0 AotLinkerExceptionia, hinta ~55 s.
- **Kaannos.txt** (a312edf0): .app kantaa käännöksen SHA:n; kopioi AINA `proto-3d/lokit/natiiviseppa-skriptit/kopioi-juna-app.sh
  <versio> <SHA>` (juna 93:ssa kopioitiin 92:n binääri → savuke väärällä appilla).
- **Junien yhdistäminen**: jos edellinen juna ei ole alkanut kääntyä, siirrä juna/b13 suoraan uuteen (Julkaisijan NYT) → yksi
  käännös + yksi savuke. Kiireessä käsikierros `nohup tyokalut/juna-ajo.sh >> juna.log` (ajastin-tila ohittaa niputuksen, odottaa lukkoa).
  Avaus junan perään: `natiiviseppa-skriptit/avaa-11NN.sh` (KÄÄNNETTY → update-ref + juna.log).
- **Pudotus junasta** (puu ilman haaraa, vanha kärki vanhempana) jättää pudotetun commitin historiaan → korjattu versio vain
  UUSINA committeina (muisti juna-pudotus-historia-ansa). Tarkista mergen jälkeen tiedostot tavulleen haarasta.
- **Testit**: skripti scratchpadissa testit-j1099p.sh-pohjasta (4 sarjaa + tyylikirja-tarkistus + pohjavahti, irrotettuna nohup:lla,
  koska sessio voi käynnistyä uudelleen). ÄLÄ käynnistä testejä, jos merge konfliktoi (kahdesti testattiin konfliktipuuta).
- **Jaettu infra, omistajan kortit tässä sessiossa**: juna-ajo.sh ohittaa käynnissä olevat simulaattorit (09.0x); proto-kaanna.sh
  .DS_Store-uusinta (17.0x, varmuuskopio *.ennen-dsstore-uusinta-20261001). Kuormaraja-lippu /tmp/matkakirja-kuormaraja,
  ajastettu poisto 22.00.
- **iPad 00008103**: laite-sha.sh <SHA> (KEHITYS=1 → Development), laite-lukon-jalkeen.sh / laite-junan-jalkeen.sh odottavat
  lukkoa/junaa. Tallennettu Dev-.app: proto-3d/lokit/laite-dev-5238055d/ (uudelleenasennus devicectl:llä ilman käännöstä).
  Swap-raja ~12 Gt: omistaja hyväksyi ajon swap 14,3 Gt / RAM 72 % vapaana.
- **UI-pohjasääntö** (omistaja 1.10.): UI-merge-pyynnössä pohja; pohjavahti kaatoi matkamittarin (oma väri) → korjattu
  tyylikirjan arvolla. Pariteettiero → Päätoimittajan/omistajan OK merge-pyynnössä.
- Natiivi-UI:n testireitit: kohdekortti `ui nosto kohde:akropolis@GRC`, `ui nostonappi …`; ihmiskortti pelaajan reitillä
  (KÄYNNISTÄ → löytökuvan napautus), `ui linssi matka veto laajenna|pienenna|alas`; `ui vahvistus`, `ui loppukortti`, `ui mylly`.
</content>
</invoke>
