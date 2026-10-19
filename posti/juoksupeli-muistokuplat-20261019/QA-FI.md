# Muistokuplien kaksi tyyliluonnosta — QA 19.10.2026

**Havainnekuvia, eivät aitoja historiallisia valokuvia tai todellisten henkilöiden muotokuvia.** Tilaus #485: kaksi luonnosta, kaksi sisäistä image_gen-kutsua, yksi per esine. Ei 40 kuvan sarjaa (#486), ei 3D-malleja, Tripoa tai pelimuutoksia.

- **01 posliinimaljakko:** riemastunut kuvitteellinen miesopettaja esittelee ehjää sinivalkoista Jingdezhen/Qing-vaikutteista maljakkoa nuorelle keisarille. Maljakko, kädet ja kasvojen ilo erottuvat. Esineen muoto/koristelu ja asut ovat tulkintaa, eivät varmennettu museoesine tai aikalaiskuva.
- **02 cloisonné:** iloinen kuvitteellinen naisopettaja pitelee ehjää matalaa turkoosi-kultaista cloisonné-vatia. Lapsi kuuntelee sivuprofiilissa. Vati erottuu vaatteesta ja pysyy kokonaisena. Pieni taustamaljakko on kuviteltua sisustusta.

Katsottu natiivit ja staattinen 160×160-esikatselu vaalealla ja tummalla taustalla: kummassakin kasvojen ilo, lapsi ja esineen perusmuoto/väri ovat luettavia. Hienot koristeet yhdistyvät pienessä koossa väripinnoiksi. 2–3 sekunnin esitystä liikkuvan pelin yläkulmassa ei ole testattu. Mukana `qa/pienluettavuus-160.png` on diagnostinen vertailu, ei kolmas luonnos tai pelikuva.

Molemmat natiivit **1254×1254 RGBA-PNG**. Kuplan ulkopuolella aitoa läpinäkyvyyttä, reunassa pehmennys. Natiivikoossa näkyy pieniä vaaleita/värillisiä reunahippuja; 160 px koossa ne ovat huomattavasti vähemmän näkyviä. 01:n alfa-alue 0–255, 02:n 0–254: jälkimmäisen sisältö on hieman läpikuultava eikä täysin peittävä. Näitä ei ole siistitty tai tasattu. Luonnokset toimitetaan PT:n tyylikatselmukseen, ei teknisesti viimeisteltyinä käyttöliittymäelementteinä.

Natiivit säilytetty muuttamattomina oletussijainnissa sekä NAS/T7-kopioissa. Toimitus-PNG:ihin lisätty vain tekstimetatieto havainnekuvasta; purettujen kuvapikselien identtisyys tarkistettu. Ei retusointia, rajausta, skaalausta tai osakorjausta toimituskuviin. Pienluettavuuden diagnostinen arkki käyttää erillisiä pienennettyjä QA-kopioita.

Ei tekstejä, puhekuplia, rikkoutuneita esineitä tai näkyviä sirpaleita. Ihmiset ovat keksittyjä; täsmällinen historiallinen asu-/esineaitous ja oikean Puyin yhdennäköisyys eivät ole varmennettuja. Vastaanottajan hyväksyntä, omistajan tyylipäätös, 40 esineen hyväksytty lista, runtime-kytkentä ja julkaisu ovat erillisiä avoimia vaiheita.
