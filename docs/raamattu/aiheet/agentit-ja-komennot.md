# agentit-ja-komennot · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Työ etenee rinnakkain ilman lupaikkunoita, kadonneita muutoksia ja kaatuneita ajoja. Apulainen tekee rajatun palan, rooli vastaa kokonaisuudesta.

SÄÄNNÖT:
1. Rajattu tehtävä delegoidaan, kun se säästää kokonaiskäyttöä; aivan pientä ei delegoida. Vaativa harkinta, työnjako ja tarkistus jäävät roolille. [R-7.11]
2. Opus tekee koodin ja sisällön, Sonnet lukevan työn: tarkistukset, laajat haut, välivaiheiden kuva-arkit ja pitkät lokit. Malli valitaan kyvyn mukaan. [R-1.1] [R-7.12] [R-9.6]
3. Roolilla on enintään 3 apulaista rinnakkain, niistä selain- tai käännösapulaisia enintään 2; CI-ajon aikana ei selaimia. Selvärajaisen erän parvessa saa olla noin 8. [R-7.12] [R-12.14] [R-7.10]
4. Tehtävänannossa ovat komentosäännöt, polut ja tuloksen muoto (enintään 15 riviä ja polut). Ensimmäinen kirjoitus on enintään 150 riviä ja loput osina; iso moduuli jaetaan tiedosto kerrallaan. [R-7.12] [R-13.46]
5. Apulainen ei käytä simulaattoreita, käännöspalvelua eikä tuotannon workeria, ei poista eikä avaa PR:ää. Se on kertakäyttöinen; rooli todentaa ja julkaisee. [R-7.12] [R-12.1]
6. Mikä onnistuu Macilla, ajetaan Macilla; GitHubin työnkulut vain PR:n porttiin ja siihen, mikä ei Macilla onnistu. [R-12.4]
7. Ei cd:tä eikä komentoketjuja, haut rajattuun kansioon. Lupakysely on jumi: yksi viesti PT:lle, ei kiertoa. [R-12.9] [R-7.25]
8. Yli 10 minuutin ajo käynnistetään omaan prosessiryhmäänsä lukolla ja pid tallennetaan. Lopetus vain kill <oma pid>; pkill ja killall kielletty kokonaan (macOS:n pkill lukee valitsimet kuvioiksi ja osuu kaikkiin sessioihin). [R-12.9] [R-12.4]
9. Tiedosto, jota toinen ohjelma lukee, kirjoitetaan väliaikaistiedostoon ja vaihdetaan paikalleen; suoritusoikeus säilyy, ja committiin ei mene oikeusmuutoksia. [R-7.40] [R-12.9] [P-261104-7]
10. Työkansiot ovat vain yhteisessä Claude-kansiossa. PT:n checkoutiin ei kosketa; roolin checkout pysyy omassa työhaarassaan, jota ei yhdistetä. [R-7.7]
11. Yksi erä = yksi worktree ja yksi haara uniikilla aiheella; commit vasta, kun tila on katsottu oikeassa worktreessä. Roolilla enintään 3 worktreetä, talossa alle 20. [R-7.7] [R-10.13]
12. Worktree poistetaan heti yhdistämisen jälkeen, kun se on puhdas, yli tunnin vanha eikä mikään skripti viittaa sen polkuun. PR yhdistetään aina ilman --delete-branch-valitsinta (gh poistaa myös työpuun, jossa haara on auki); etähaaran voi poistaa erikseen, toisten työpuihin ei kosketa. Jaettua työkaluworktreetä tai Codexin worktreitä ei poisteta. [R-10.13] [R-10.12] [P-261112-22]

EI VIKA:
- Roolin checkout ei ole päähaarassa.
- Yhdistetyn PR:n haara jää palvelimelle.

TEKOTAPA:
- Worktreet: tools/uusi-worktree.sh (luonti, --poista); siivouslista tools/tarkista-tyotilat.sh.
- Macin ajot: tools/aja-macilla.mjs.
- Muiden haarat ennen isoa erää: roolit-ja-viestit. Avaimet, luvat, eston kierto: avaimet-ja-luvat. Levy: kone-ja-levy. Mallit ja effort: tilit-ja-kiintio.
