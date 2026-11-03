# Lavastajan luovutus 4.11.2026 klo 00.56 (konteksti 26 %) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-2354.md (haara lavastaja/luovutus-20261103-2354), sen katot- ja mika-kohdat on korvattu tällä. Id:t: osoitekirja. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/katot-v125. Tiedot: L/LAV-v125.md. Omat python-skriptit: /opt/homebrew/bin/python3 ILMAN -I:tä.

## TILA: tausta-v125 (ei viety, ei koodiviittausta)
- Paketti _valmiit/juoksupeli-kk-lavastaja-tausta-v125-vienti-20261104, SHA256SUMS 53d8e8fec5c5. Sisältö: leijuvat vaakasuorat V4_gold-kolmiot pois (kansi_pois.py, lod0–2), sokkelin kannen UV (sokkeli_yla_uv.py), Wumenin maasauma z −400…−397 tasolle 0 (wumen_sauma.py, ajettu erikseen wumen_aja.zsh:lla; paketoi-v125.zsh ei sisällä tätä eikä toista koko tulosta).
- PT 00.4x: kuittaus koeajoon, EI junaan. Koodin viittaus v125:een vasta KK:n hyväksynnän jälkeen. Pari KK:lle PT:n kautta. Iso iPad vasta KK:n hyväksymän parin jälkeen. Ämpäriin vain, jos pakko: uusi kansio ilman viittausta, JU varmistaa.
- Koeajo: L/koeajo2/ (JU, L1, runko 15d7274ad), sk L/sk-lav-v125-koeajo.txt, juuri L/koejuuri (`palatsi mallit file://…/koejuuri/`; v125 nimellä kielletty-tausta-v124, 1,7 Gt; ei tarvita viennin jälkeen). Pari L/koeajo2/pari-5d-v124-v125.jpg on lähetetty PT:lle 00.5x. ODOTA PT:n/KK:n vastausta.

## NÄHTY PELISSÄ (koeajo2)
- 5d: leveät levyt poissa. Wumen: valkoinen viiva poissa.
- Sokkelin kylki 5d-kuvassa rauhallisempi kuin v124:ssä, mutta en ole verrannut lähikuvaa v124:ään.

## AVOINNA
- 5d: harjakoristeet taivasta vasten ja paljas pääty jäivät. Lappeet ovat tutkitulla talolla ehjät; päädystä lape näkyy ohuena, koska päätyräystäällä ei ole paksuutta. Mahdollinen korjaus: päätyräystäs lappeen reunaan. EI aloitettu; kysy PT:ltä ennen.
- Porrasmainen tummempi kuvio päädyn yläosassa, sama v124:ssä. Syy näkemättä.
- UUSI: Wumenin lattian vasemmassa reunassa (kuva 0–500, y ≈ 540) tumma juova koeajo2:ssa. Ei näkynyt 00.34-kuvassa v124:llä. Voi olla paistettu valo tasatussa kohdassa tai minun wumen_sauma.py:ni. Selvitä ENNEN kuin v125 viedään.
- Wumenin oikean sivuholvin seinässä nuolimainen kivikuvio; rakennuspaketti, ei v125.
- Lähikuvassa 5d-sokkeli pituussauma jalan kohdalla (harmaa kaistale + valkoinen viiva). Ei PT:n listalla, älä tee ilman pyyntöä.
- Tarkistamatta itse: alkulento-1 ja -2, wumen-sivuholvi-v125.png (kuvan 18 holvi). Alkulento-3 katsottu ykkösajosta: ei tasaisia levyjä. Vanhoja varjoja en erottanut 5d:ssä, mutta en vertaillut niitä erikseen (varjostajat.json-lähde tausta-v81).
- Kaksikattoisten hallien turkoosi vyö: ei verrattu havainteeseen.
- Puuttuvat koeajo2:ssa: kielletty-c2-v37/a3-baoding-lod1.glb, a5-marmorikaide-pylvas-lod1.glb (tunnettu), osasarja pursotukset.glb (404 myös ämpärissä).

## TYÖKALUT (L)
tunnista.py (5d pelin testikameralla, pikselistä kolmio; oikein päin), nakyma.py (PEILATTU x), talo.py, raot.py, irtolevyt.py, parit-v125.py, koejuuri.py. Mika ei näe testikameraa eikä lukukelvottomia verkkoja: käytä tunnista.py:tä.

## PIDOSSA ennallaan (edellinen luovutus)
Alkulennon keltainen tasainen katto, Taihedianin marmori ja räystäsvyö (PT:lle Pariisin jälkeen), lod1-räystäs ja sali 04, oviaskelman kylki ja sokkelin vinot viivat (parit 01, 05), Baoding-lod1.

## LISÄYS 4.11. (PT, pari ja Wumen katsottu, viety KK:lle; v125 EI vientiin) — SEURAAVAN TYÖLISTA
1. 5d:n koristeet ja pääty.
2. Wumenin lattian tumman juovan syy.
3. Oikean sivuholvin sokkelin revitty reuna (ylempänä "nuolimainen kivikuvio").
4. Holvin pylväiden laikut.
5. 404:t: kielletty-osasarja-v13/pursotukset.glb ja kielletty-c2-v37/a5-marmorikaide-pylvas-lod1.glb: selvitä, onko vika. Baoding-lod1 ei ole vika (PT). Ylempi "tunnettu" koskee vain Baodingia; a5:tä ei ole selvitetty loppuun.
6. Katso alkulennon kuvat 1–3 (koeajo2).

## LISÄYS 4.11. (Postivahti: ei nollausta vielä; työlistan kohdat 2, 5, 6)
- Kohta 6: alkulento 1 ja 2 (koeajo2, L/koeajo2/alkulento-1-2.jpg) ja 3 (ykkösajo) katsottu pienennettynä: ei levyjä eikä harjan rakoja tällä tarkkuudella. Kuva 2 on enimmäkseen taivasta. Täydellä tarkkuudella ei katsottu.
- Kohta 5: ei rikki. pursotukset.glb: Osasarja.cs:90 hakee sen valinnaisena, ja rivi 174 käyttää omaa pursotusta; tiedostoa ei ole luettelossa missään kansiossa, joten ei regressio. a5-marmorikaide-pylvas-lod1: Muurikate.cs Lod1Liite on valinnainen kuten Baodingilla, ja lod1 puuttuu kansiosta kuten Baodingilla; malli piirretään lod0:lla (ei mitattu).
- Kohta 2 EI ratkennut. L/koeajo2/wumen-juova-kolme.jpg: juova tuli wumen_sauma.py:n jälkeen samalle kohdalle, jossa valkoiset palat olivat, joten syy on melkein varmasti korjaukseni. Ylin ja alin rivi ovat samaa rajausta; keskirivin (ykkösajo) kuva on eri kohdasta. Painuneet kolmiot 1-0:ssa ovat pitkiä (105,8 m²) ja vinoja (y −0,39 → 0,07), −0,68:n kolmioita sääntö ei nostanut. Hylätty: "kolmiot olivat piilossa y 0 -pinnan alla" (1-0:ssa 0/23 peitossa saman LODin V4_lattialla). Avoin: UV1-valo tasatussa kolmiossa vai −0,68-kolmioiden reuna. Ei korjattu.
