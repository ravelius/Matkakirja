# Pelikoodari: luovutus 07.11.2026 klo 08.45

Korvaa kaikki aiemmat. Haaran rakenne, yritys 1 ja vanhat opit: `git show fe7e15f93:docs/raportit/viesti-pelikoodari-luovutus-20261107-0821.md`. Lontoo G ja muut vanhat auki olevat: `git show 3fb1be23d:docs/raportit/viesti-pelikoodari-luovutus-20261107-0641.md`.

**Työ nyt: jono tyhjä. TF 219 on JU:lla: ASSETIT OK lähetetty, sha `a8b873e5d` (proto, haara `pelikoodari/tf-219-talot`, `natiivi-backup`). Seuraava työ PT:ltä.**

## 1. TF 219 tulos (`a8b873e5d`, iso iPad iPad13,8)
- **B, Lontoosta aloitettu** (`proto-3d/lokit/pelikoodari-tf219-a8b873e5d-lontoo`): 2/2 kuvaa, NRE 0, huippu 3 418 Mt, talot näkyvät, otsikko ISO-BRITANNIA.
- **A, oma käynnistys, vahti päällä** (`...-juoksu`): 0/4 kuvaa. VIKA 4 095 Mt klo 08.27.14, 6 komentoa ohitettu, huippu 4 660 Mt, vapaa väh. 459 Mt, ei kaatumista.
- **A, vahti pois, PT:n viimeinen ajo** (`...-juoksu2`): 4/4 kuvaa, NRE 0, ei kaatumista, huippu 4 732 Mt, vapaa väh. 394 Mt. KK laski lokista kaksi iOS:n muistivaroitusta. Kuvissa muuri ja lattia kunnossa, hahmot lattialla. Kääntö lokissa (`kaanto oikea`), sen jälkeen portin alle ja ote; "Uuvuit!" 45 s:ssa, koska kukaan ei ohjannut.
- **Kytkin:** `muistivahti.txt` ei poistunut laitteelta, sisältö nyt `paalla` (JU luki takaisin). Vahti on päällä, tiedosto jäi. Runko `d092f48c` takaisin.
- **Vietävä tieto, kaikille kerrottu:** muistia ei ole hyväksytty, vain iso iPad ajettu, polku kaupunki → juoksu ilman kuvia. Oma raja isolla 5 120 Mt; 5 100 on pienen iPadin raja, ja VIKA-raja 4 080 Mt on sen 80 %.

## 2. Selvitetty, ei vika
- **RANSKA Lontoon päällä:** näkyy kaikissa 4 yritys 1:n Lontoon kuvassa. Otsikko seuraa pelaajan kaupunkia (`Kartuscha.TodellinenMaa`), ei kameraa; `aja` siirtää vain kameraa. Testiajon jälki.
- **Punaiset läiskät kääntökuvassa:** rimpuilun peukalokohdat (`JuoksupeliNakyma.cs:1914`), omistajan 6.11. päätös säilytti hehkun. Kohdat x 377 ja x 2350, y 1430.

## 3. Auki, ei estä (PT tietää, paitsi viimeinen)
1. Alkulennon kuvassa aukiolla pieniä harmaita laikkuja ja irrallinen kattopala. Vertailu 218:aan puuttuu.
2. ISO-BRITANNIA-otsikon alarivi puuttuu, Ranskalla on. Koodi piilottaa rivin, jos sekä paikallinen nimi että valtiomuoto puuttuvat (`Kartuscha.cs:434`). Aineistoa en löytänyt, syy selvittämättä.
3. `pursotukset.glb` 404: koodi jatkaa ilman sitä, ja 218:n koodi pyytää samaa polkua (`kielletty-osasarja-v8`). 218:n lokia ei löytynyt.
4. Puhdistamatta: `.claude/settings.local.json.ennen-kevennysta` on seurantaamaton, ei minun tekemäni; älä lisää committiin.

## 4. Opit
- Juoksun lataus nostaa muistin VIKA-rajan yli joka käynnistyksessä, koska kartta on jo noin 3 800 Mt. Oma käynnistys ei auta (4 660 Mt, kaupunkien jälkeen 4 605 Mt). Juoksun kuvat vaativat kytkimen `pois`, eikä se ole oletus: pyydä lupa PT:ltä.
- Kytkin luetaan vain käynnistyksessä, ja `muisti-tarkka.log` on vahdista erillinen. Vahdin oma loki ja tulosrivi jäävät silloin lyhyiksi: tulosrivin huippu on väärä, luku haetaan `muisti-tarkka.log`:sta.
- JU kirjoittaa ajon lopussa `muisti-tarkka.txt`:n pois: seuraava ajo tarvitsee sen uudelleen.
- Tarkista otsikot täysikokoisista rajauksista: KK ei nähnyt RANSKAa taloja vasten koosteessa.
