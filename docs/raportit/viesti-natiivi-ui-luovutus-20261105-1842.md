# Natiivi-UI: luovutus 5.11.2026 klo 18.42 (konteksti 30 %)

Korvaa -1825:n ja -1815:n. Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki 6ea480e73, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haaraa ei ole Matkakirja-repon originissa.

## Ensin
1. Kuittaa JU:lle "NUI valmis". Ei NUI:n ajoja jonossa.
2. Odota KK:n vastausta kohtiin Auki 1-3. Älä korjaa niitä ennen sanaa. Oma suositus KK:lle: 1 ja 2 korjataan, 3 selvitetään ensin.
3. Viestit: SendMessage pysähtyi viestirajaan 18.3x, joten käytä `mcp__ccd_session_mgmt__send_message` (CLAUDE.md, Raamattu 12.20).

## Tehty (ajo 6ea480e73, katsottu täysikoossa, KK:lla ja PT:llä)
Kansio: /Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-6ea480e73. KK näytti edellisen ajon 2174c6785 omistajalle ("hyvä"); tästä ajosta KK:n arvio puuttuu.
- 4daf2c152 3D-kyltti: kiinteä sivu, häipyy kun oma paikka on varattu tai ruudun ulkopuolella (MalliKyltit). Lisäksi kysely `ui kohdassa x y` (0-1, origo vasen ylä): UI-elementit ja 3D-piirtäjät lokiin; DrawMesh-piirto ei näy listassa.
- 2174c6785 nimen väistö pyöreän merkin kohdalta pois (KK lopullinen). PT: "Älä peru tätä ilman KK:n uutta sanaa."
- 086f0ca91 ja 344b2dd82 kaupungin oma piste ei piirry sen kohdekartalla (KaupunkiMerkit.LahikartanKaupunki = Kohdenostot.Kaupunki). Yleinen sääntö, koskee kaikkia kohdekartan kaupunkeja. Piilossa oleva piste ei ota napautusta (näkyvä nimi ottaa) eikä vie nimiltä paikkaa. Valittava, korostettu ja renkaallinen piste jää. Läiskä oli tämä piste; kuvassa poissa.
- 6ea480e73 Les Hallesin kyltti kiinteästi pisteen oikealla (StriimiKyltinKyljet). Chatelet-kuvassa väli Louvren kylttiin on selvä, mutta tuileries-kuvassa kyltit ovat lähes kulmittain, väli muutama piste: Louvren kyltti liikkuu mallin mukana. KK:lle kerrottu; suositus: katsotaan ensin, riittääkö väli.
- PT hyväksyi hintakyltin ja 3D-kyltin ratkaisut: hintakyltti väistää yhä nimiöitä, kylttejä ja malleja narun pään viereen (KK 16.2x), pyöreä merkki ei siirrä sitä.
- Kylttien pysyvyys: kyltit-keski ja kyltit-keski-lahempi, nähtävyyskyltit samalla puolella kahdella zoomtasolla. Liikkeen aikana ei todistettu.
- Ohjelma: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-pariisi-kyltit-5.txt (6 kuvaa, 2 kyselyä). Rengaskyselyn voi poistaa.

## Auki (kuva kyltit-keski-lahempi, odottaa KK:ta)
1. Hintakyltti peittää osan nimestä Pompidou-keskus, ja sen paikka narun päähän nähden vaihtuu zoomatessa (keski: alla, lähempi: vasemmalla).
2. Grand Châtelet'n kyltti peittää nappulan yläosan.
3. Les Hallesin kyltti ei näy kummassakaan keski-kuvassa, vain chatelet-kuvassa. Syy selvittämättä (törmäys vai zoomraja).

## Muut havainnot, syy ei tiedossa
- Kuvamerkki Notre-Damen pohjoispuolella puiden välissä näkyy ajossa 6ea480e73 ja 6ff3ef451, ei ajossa 2174c6785. KK:lle kerrottu.
- Pieni harmaa rengas (chatelet 1305,475 / 2000x1500; myös tuileries ja orsay Louvren länsipäässä): kysely löysi vain Louvren pohjan rajauslaatikon, joten todennäköisesti osa karttakuvaa, ei varmistettu.
- Quai Voltaire -nimi puuttuu orsay-kuvasta ajoissa 2174c6785 ja 6ea480e73, vaikka näkyy chatelet-kuvassa. KK:lle kerrottu.
- Pulu koskettaa kuvamerkkiä kyltit-tuileries-kuvassa. KK:lle kerrottu.
- Tuileries'n leike: KS tekee tiiviin kuvan; älä tee omaa kokoa koodiin.
- Siivous: NostotKartalla.KyltinPerusKylki ja KyltinSivun kommentit kuvaavat yhä sivunvaihtoa.
- -1815:n Auki 3:n kohdat ennallaan, paitsi nimien ja läiskän osalta.

## Huomiot
- Postivahti pyysi 18.38 nollausta luovutuksen b6bca6ead perusteella, mutta se oli edellisen NUI:n luovutus; kieltäydyin, ja tämä luovutus on se, jonka perusteella nollataan.
- tarkista.sh: `zsh tyokalut/tarkista.sh`, sitten `git restore` Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json. Exit 1 valovahdista (Komennot, Nahtavyysalue, NotreDameKirkko) ei tule näistä commiteista; PT ratkaisee. Pelkkä käännös: `bash Peli-testit/unity-tarkistus.sh`.
- Kääntyminen on tarkistettu jokaisesta commitista (0 virhettä).
