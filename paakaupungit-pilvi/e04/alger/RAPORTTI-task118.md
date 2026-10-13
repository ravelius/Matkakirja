# Task118 — Algerin C-korjaukset

Koko nykyinen sisalto.json luettu ja tarkistettu 13.10.2026. Työhaara: paakaupungit-e04-codex. Origin/main: 0f5cf472fe08a7efe89cb6f80f313395625b6af4. Git- ja kuvasidoskirjoittaja on root.

Alku-SHA256: af96b94dcec78632321a487582bdb607158302d62cb5758c68319df8db0107a7
Loppu-SHA256: f66ae7c96ab2973c188f5d1a0410ca6ea6d4fdc97cc91b7ee72d04f17d1a08be

Korjattu 56 kenttää: intro ja Lue lisää, kaikki kahdeksan nostoa, oppaan viisi jaksoa, toistuvat varaukset, visa-vaihtoehdot/vihjeet, nähtävyysjuttujen metakirjoitus, täsmälliset lähde-URLit sekä viiden nykyisen kuvan erilliset lyhyt/selite-kentät. Hamman karmiinivärin tuotanto lisättiin nykyisestä koepuutarha-artikkelista. Kuvien osoittimet/krediitit, koordinaatit ja säädata säilytetty. Ei poistettuja kuvia.

Nykyisten lähdehakujen täsmäosoitteet ja tallenteet: korjausmuistiinpanot-task118/lahdehaut.json ja lahdehaut-extra.json. Algiers ja Casbah of Algiers sekä jokaisen rakennusaiheen artikkeli luettu aihekohtaisesti; oppaassa Wikivoyage Algiers ja 21.8.2026 päivätty UM:n Algeria-tiedote (haettu 13.10.). Rakennusvuosien ristiriidat pidetty vuosisatatasolla, ei uusia tarkkoja rakennusvuosia. Dar Mustapha Pachan pieni kulkuovi: A-faktapohjan asiantuntijalähde https://islamicart.museumwnf.org/database_item.php?id=monument;ISL;dz;Mon01;13;en .

Päällekkäisyys: git grep origin/main -- js data. Samoja kohteita kartta- ja kevytpistetasolla, mutta Casbahin asumisen/sisäpihojen kertomus ei toistu pelissä. Algerin olemassa oleva keskustakartta huomioitava rootin yhdistämisessä.

Viisi nykyistä CC-kuvaa katsottu henkilökohtaisesti natiiveista: PHOTO, C1, K4, TRAVELER, O3. Tiedostonimet täsmäävät nykyiseen C-aineistoon ja QA-evidence-tallenteisiin. Kuvatekstit vastaavat näkyvää lampea, puukäytävää, kasvillisuutta ja NASA-aluenäkymää. Kasvilajeja tai puiden ikää ei arvattu. Lähdepäiväykset säilytetty.

Mitat: intro 795 merkkiä / 9 virkettä; teksti 922 merkkiä / 3 kappaletta. Nostot [[485, 497, 484, 504], [471, 498, 515, 516]]. Nähtävyysjuttuja ja karttapisteitä seitsemän; säänormaalit puuttuvat.

Paikallinen kuitti: node paakaupungit-pilvi/tyokalu.mjs tarkista e04 alger --lyhyt, exit 1; 20 virhettä, 8 varoitusta. Kaikki 20 virhettä ovat tiedosto puuttuu; tekstirakenteen virheitä 0. Seitsemän varoitusta on legacy-tarkistimen lahde="Wikipedia"-odotus: täsmälliset HTTPS-lähdeosoitteet säilytetään task118:n mukaan. Yksi varoitus koskee puuttuvaa hyväksyttyä säädataa. Raakakuitti: korjausmuistiinpanot-task118/tarkista-lyhyt.txt.

C-tekstikorjaus valmis. Kuva-, sää- ja rootin immutable batch0088:n uudelleenbindausportit erikseen avoinna. Pelikytkentää/julkaisua ei tällä raportilla vahvisteta; riippumaton Sisältökirjurin uusintapistokoe tarvitaan.
