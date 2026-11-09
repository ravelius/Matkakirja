# Karttaseppä: luovutus 10.11.2026 klo 01.35 (KS)
Syy: konteksti 26 % (hook), pehmeä raja. Korvaa -0100:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **Koe3 (viillot) katsottu, PT kuitannut.** Pariisin vaaleat viillot pois; Lontoossa niitä ei juuri ollut. Pienet vaaleat pisteet
   seinissä ja katoissa = varjostimen rae (sama määrä jo "nyt"-ajossa), ei vika. `$K/koe3-tulos.md`, parit `$K/kuvat/a/pt/`.
2. **Rypyt (b) + palakoko (c) = koe5, PT: "koe5 hyvä".** "Ala- ja ylärinne yhdeksi tasoksi" HYLÄTTY (rako naapurikasvon
   taitteiseen puolittajaan). Koe5: rangan syöte yksinkertaistetaan vapailla reunoilla ≤ 0,3 m molempiin suuntiin; sisäpuolisen
   jänteen ja seinän väliin tasainen reunus räystään tasolla (`tayte`), ulkopuoliselle seinäkaista (päädyt myös vapaille reunoille).
   Rypyt P 3438 → 2205 (−36 %), L 380 → 249 (−34 %); luurankokatot P 1419 (koe3 1415), L 530; koko ennallaan (P 25 Mt, L 7 Mt).
   - Koodi: `$K/skriptit/katot.py` (KATOT_YKSINK, KATOT_KAKSIP, TAYTE; oletus pois = koe3 ennallaan), `tee-palat-*-luuranko.py`
     (tayte pohjat-vaiheesta katto()-kutsuun). Varmuuskopiot katot-koe3.py, katot-koe4.py, tee-palat-*-luuranko-koe3.py.
   - Ajot: `$K/aja-pariisi-koe5.zsh` + `aja-pariisi-vaihe3-koe5.zsh` (LISAPALA "16600 11271"), `aja-lontoo-koe5.zsh` (LISAPALA "16375 10895").
   - Mittarit: `$K/profiloi/rypyt.py` (ryppy = < 0,5 m² ja normaali > 5° talon ≥ 2 m²:n pinnoista), `rypyt-syy.py`, `rypyt-pari.py`.
   - Koe4 (vain ulospäin 0,15 m) −4 %, hylätty; palat `$K/pariisi/palat-v23-katot-koe4` (380 Mt, voi siirtää NAS:lle).
3. **B3 Commons-kuvat**: Pariisi 15 (04-b pois, sama kaiverrus), Lontoo 16 (tunneli a/b POIS → c 1843-mainos, d 1832-kilpi).
   `$B/commons-kuvat-pariisi/`, `$B/commons-kuvat/` (LAHTEET.md, selitteet-luonnos.md). Kuvat katsottu arkkina.
4. **B3 tekstit KK:lle numeroituna listana**: Pariisi 22 kysymystä + 15 selitettä (01.3x), Lontoo 16 + 16 (01.3x, jonossa KK:lla).
   KK tarkisti Pariisin 01.5x: 6 korjausta + Edelfelt TEHTY tiedostoihin (`$B/kysymykset-pariisi-luonnos.md`,
   `$B/commons-kuvat-pariisi/selitteet-luonnos.md`). KK:n tarkistus: Matkakirja-fable/scratchpad/keskustelukanava/b3-pariisi-tekstit-tarkistus-20261110.md.

## TYÖN ALLA / JONO (järjestyksessä)
a. **KK:n pyyntö (01.5x)**: korjattu Pariisin lista + kaksi pelikuvaa (nostokortti kysymyksineen; juttu kuvan ja selitteen kanssa,
   01-a 448 px ja 03-a 608 px tarkkuus pelin koossa) PT:n kautta KK:lle. Opus-agentti teki pelinäkymää (verkkopeli, väliaikaiset
   muokkaukset js:iin + assets/_luonnos/, palautus git checkoutilla) → tulokset `$B/pelinakyma/havainnot.md` (+ kuvat). TARKISTA
   ENSIN: `git status --short js assets` tyhjä (jos ei: `git checkout -- <js>`, assets/_luonnos → mv scratchpadiin). Lähetä sitten
   PT:lle 3 riviä + korjattu lista (numeroitu, ks. kohta 4) ja kuvat; PT välittää KK:lle.
b. **Koe5 Mac-kuvat JU:lta** (ajot 9–10, `$K/ajopyynto-mac.md` LISÄYS 01.2x; skenaariot `$K/sk-*-koe5.txt`) → parit koe3 | koe5
   `python3 -I $K/skriptit/parit-koe.py koe3 koe5` (1000 px PT:lle; KK:lle/omistajalle täysikoko, tekstit kuvan ulkopuolelle, PT 4.48).
   Tarkista erityisesti reunuskaistat (sininen ylhäältä-kuvassa) ja seinäkaistat räystäällä lähikuvista.
c. Lontoon tekstit: KK:n tarkistus odottaa (sama kaava kuin Pariisi).
d. Sisäkulmien rypyt (13 %, "muu" rypyt-syy.py:ssä) jäivät; katso vasta koe5-kuvien jälkeen, tarvitaanko.
e. Nimiäänet Lontoolle vasta Pariisin oton jälkeen (KK 01.0x); nimilista 43 (sijainnit.json lontoo:*) tekstinä valmiiksi silloin.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä. Työlista "Kaupungit koodilla: Pariisi ja Lontoo loppuun" päivitetty 01.2x.
