# Natiivi-UI: luovutus 5.11.2026 klo 18.42 (konteksti 30 %)

Korvaa -1825:n ja -1815:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki 6ea480e73, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haaraa ei ole Matkakirja-repon originissa.

## Ensin
1. Kuittaa JU:lle "NUI valmis". Ei NUI:n ajoja jonossa.
2. Tee KK:n käskyt (kohta "KK:n käskyt" alla). Ei omaa ajoa: pushattu SHA JU:lle seuraavan Pariisin ajon yhteyteen, rivi "mitä tämä ratkaisee" (10.5).
3. Viestit: SendMessage pysähtyi viestirajaan 18.3x, joten käytä `mcp__ccd_session_mgmt__send_message` (CLAUDE.md, Raamattu 12.20).

## Tehty (ajo 6ea480e73, katsottu täysikoossa, KK:lla ja PT:llä)
Kansio: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-6ea480e73. KK näytti edellisen ajon 2174c6785 omistajalle ("hyvä"); tästä ajosta KK:n arvio puuttuu.
- 4daf2c152 3D-kyltti: kiinteä sivu, häipyy kun oma paikka on varattu tai ruudun ulkopuolella (MalliKyltit). Lisäksi kysely `ui kohdassa x y` (0-1, origo vasen ylä): UI-elementit ja 3D-piirtäjät lokiin; DrawMesh-piirto ei näy listassa.
- 2174c6785 nimen väistö pyöreän merkin kohdalta pois (KK lopullinen). PT: "Älä peru tätä ilman KK:n uutta sanaa."
- 086f0ca91 ja 344b2dd82 kaupungin oma piste ei piirry sen kohdekartalla (KaupunkiMerkit.LahikartanKaupunki = Kohdenostot.Kaupunki). Yleinen sääntö, koskee kaikkia kohdekartan kaupunkeja. Piilossa oleva piste ei ota napautusta (näkyvä nimi ottaa) eikä vie nimiltä paikkaa. Valittava, korostettu ja renkaallinen piste jää. Läiskä oli tämä piste; kuvassa poissa.
- 6ea480e73 Les Hallesin kyltti kiinteästi pisteen oikealla (StriimiKyltinKyljet). Chatelet-kuvassa väli Louvren kylttiin on selvä, mutta tuileries-kuvassa kyltit ovat lähes kulmittain, väli muutama piste: Louvren kyltti liikkuu mallin mukana. KK:lle kerrottu; suositus: katsotaan ensin, riittääkö väli.
- Nykyinen koodi: hintakyltti väistää yhä nimiöitä, kylttejä ja malleja narun pään viereen; KK:n käsky 1 poistaa tämän.
- Kylttien pysyvyys: kyltit-keski ja kyltit-keski-lahempi, nähtävyyskyltit samalla puolella kahdella zoomtasolla. Liikkeen aikana ei todistettu.
- Ohjelma: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-pariisi-kyltit-5.txt (6 kuvaa, 2 kyselyä). Molemmat kyselyt (läiskä ja rengas) voi poistaa.

## KK:n käskyt 5.11. 18.4x (6ea480e73 näytetty omistajalle: läiskä pois, kyltit samalla puolella, Les Halles irti)
1. Hintakyltti pysyy aina samassa paikassa narun päässä, ei väistöä. Korvaa KK:n 16.2x:n ja PT:n viestin "hintakyltin väistö narun pään viereen jää". Koodi: KaupunkiPallot.cs, kylttiPaikat-silmukka ja HintakylttiVapaa. Päätä, häipyykö kyltti törmätessä vai pysyykö näkyvissä; KK:n sana on "aina samassa paikassa", joten kysy KK:lta, jos tämä jää epäselväksi.
2. Grand Châtelet saa oman kiinteän sivun, jolta kyltti ei peitä nappulaa. Kyltti on nyt oikealla ja peittää nappulan yläosan kyltit-keski-lahempi-kuvassa. Koodi: NostotKartalla.cs, KyltinPerusKylki; huomaa, että kadonnut kuvallinen kohde lukee PiirrosKyljet-taulukkoa eikä StriimiKyltinKyljet-taulukkoa.
3. Les Hallesin kyltin puuttuminen keski-kuvista: selvitä lokista tai koodista ilman ajoa. Jos syy on tavallinen törmäyshäivytys Louvren kylttiin, se saa jäädä; rivi tuloksesta KK:lle. Ei vielä selvitetty.
Saavat jäädä (KK): kuvamerkki Notre-Damen pohjoispuolella ja harmaa rengas.

## Muut havainnot, syy ei tiedossa
- Quai Voltaire -nimi puuttuu orsay-kuvasta ajoissa 2174c6785 ja 6ea480e73, vaikka näkyy chatelet-kuvassa. KK:lle kerrottu.
- Pulu koskettaa kuvamerkkiä kyltit-tuileries-kuvassa. KK:lle kerrottu.
- Tuileries'n leike: KS tekee tiiviin kuvan; älä tee omaa kokoa koodiin.
- Siivous: NostotKartalla.KyltinPerusKylki ja KyltinSivun kommentit kuvaavat yhä sivunvaihtoa.
- -1815:n Auki 3:n kohdat ennallaan, paitsi nimien ja läiskän osalta.

## Huomiot
- Postivahti pyysi 18.38 nollausta luovutuksen b6bca6ead perusteella, mutta se oli edellisen NUI:n luovutus; kieltäydyin, ja tämä luovutus on se, jonka perusteella nollataan.
- tarkista.sh: `zsh tyokalut/tarkista.sh`, sitten `git restore` Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json. Exit 1 valovahdista (Komennot, Nahtavyysalue, NotreDameKirkko) ei tule näistä commiteista; PT ratkaisee. Pelkkä käännös: `bash Peli-testit/unity-tarkistus.sh`.
- Kääntyminen on tarkistettu jokaisesta commitista (0 virhettä).
