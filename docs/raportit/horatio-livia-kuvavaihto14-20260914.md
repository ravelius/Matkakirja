# Fablelle: 14 tarinaan sopivan matkakirjakuvan kytkentä

Omistajan lupa: ”Synkkaa ne eleet ja vaihda kuvat”. Kuvalähde on kuvatoimituksen etävarmennettu `posti/kuvatoimitus-tarina14-20260914.json` postilaatikkohaarassa (commit ee220ba06ffd655d922ca83595ca4fc92c648162). Mediatoimituksen 14 JPEGiä on erikseen GET/SHA/tavumäärä/MIME/CORS-varmennettu sekä kuvatoimituksessa että koordinaattorilla.

## Täsmärajattu koodimuutos

- Bergen: I1, I2, P1, P2.
- Amsterdam: I1, I2, P1, P2.
- Pariisi: I1, I2, P1; kokonaan uudet Tuileries-kuvat.
- Varsova P1, Bukarest P1, Oslo I1.
- Vain 14 olemassa olevaa kuvaoliota kuudessa kaupunkipakassa. Ei uusia kuvapaikkoja, ääniä, eledataa, puhetekstejä tai pelisääntöjä.
- Sisilia, Islanti, Alpit, Lappi ja Tromssa säilyvät täysin ennallaan. Tromssan uusi P1 on toimituksessa odottamassa sen oikeaa tekstiä ja ääntä.

Vanhoja mediatiedostoja ei poistettu tai korvattu: kaikki uudet JPEGit ovat omissa `r20260914-tarina-v1`-avaimissaan. Alkuperäiset PNG:t säilyvät kuvatoimituksen työtilassa. Pelin kuvasarjan pituus ja kuvapaikkojen järjestys eivät muutu.

## Kuvatekstien täydennys

Kuvatoimituksen kymmenen pitkää selitettä sisälsi yhden sisältölauseen. Täydensin ne kahdeksi lyhyeksi lauseeksi pelin nykyisen 1+2-sopimuksen mukaisesti: hyödynsin vain saman kuvan jo toimitettua lyhyttä ja pitkää selitettä. Uusia faktaväitteitä ei lisätty. Pariisin kolme selitettä ja Bergen I1 olivat jo kaksilauseisia ja pysyivät ennallaan. Kaikki lyhyet kuvatekstit, lähdemerkinnät ja lähdelinkit pysyvät toimituksen mukaisina.

Kytkennän lopullinen tarkka kuva/kuvateksti/tekstin-SHA/kuvan-SHA-luettelo on `tests/fixtures/horatio-livia-images14-20260914.json`. Se säilyttää myös vanhat URLit palautusta ja vertailua varten. Alkuperäistä kuvatoimituksen manifestia ei muutettu.

## Tarkistus ja julkaisu

Koordinaattori vertasi kaikkia 45 kaupunkipakkaa v1879-pohjaan ja varmisti, ettei 14 kuvaolion ulkopuolella muuttunut mitään. Kohdennettu tarina-/kuvasarja-/kuvatekstiregressio läpäisee; vanha Pariisin paper-v4-lukitustesti päivitettiin nimenomaisesti uuteen hyväksyttyyn Tuileries-versioon, muiden kuuden retain-kuvan lukitukset säilyivät.

Lopullinen koko npm-testi: 3378 testiä, 3365 PASS, 13 skip, 0 fail. Erillinen korjattujen tarina-/kuvateksti-/kuva-alueiden ajo: 44/44 PASS. Diff-check PASS. Ensimmäinen kokonaisajo paljasti kaksi yksilauseisiin pitkiin kuvateksteihin liittyvää virhettä; molemmat korjattiin sisältöön, eikä kahden lauseen sääntöä löysennetty.

Tämä on valmis kuvakytkentä, ei vielä julkaisu. Fable yhdistää kuva-PR:n, hoitaa version ja julkaisee. Tarkista sen jälkeen oikeassa asennetussa pelissä etenkin Pariisi: molemmat historialliset rauniokuvat, Livian nykyajan vihreät tuolit, lyhyt kuvateksti kartalla ja kaksilauseinen selite lähteineen suurennoksessa. Tarkista myös Bergenin ja Amsterdamin neljän kuvan järjestys.

Äänipilotti on erillinen: omistaja kuuntelee ensin Ateena/Sofia-uusinnan. Kuvien julkaisu ei anna lupaa jatkaa ääni- tai kohdistusajoja ennen tuota hyväksyntää. Elekohdistuksen tekninen valmistelu on erillisessä PR:ssä #2446.
