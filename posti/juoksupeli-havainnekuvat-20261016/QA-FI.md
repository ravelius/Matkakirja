# Juoksupeli j1–j3 — QA ja osittainen tulos

**Kolme sallittua kutsua käytetty: kaksi native-PNG:tä, yksi epäonnistunut yritys.** J1/j3 ovat 1086 × 1448 (3:4), alkuperäiset muokkaamattomat tavut. J2:n ainoa kutsu hylättiin työkalun output-turvatarkistuksessa (`moderation_blocked`, luokka `other`); tarkempaa syytä ei annettu eikä käyttökelpoista kuvaa palautettu. J2-PNG:tä ei ole. Ei uusintaa tai estettyjen tulosten hakua.

Kesäkorjaus c43bec90 / a3110d6… luettiin kokonaan ja otettiin käyttöön **ennen kaikkia generointikutsuja**. Ensimmäinen vanhan syyslähteen yrityksen valmistelu pysähtyi lähdetarkistukseen jo ennen työkalukutsua: syyskuvia/kutsuja0. Vihreät puut, kesävalo, ei syyslehtiä/lunta/ammepäällyksiä havaittu j1/j3:ssa. Viitattu suunnitelmatiedosto puuttui tilauscommitista; sitä ei luettu eikä sen sisältöä oletettu.

**J1:** Pieni keltaiseen lohikäärmesilkkiin puettu poika, pyöreä päähine, lentävä letti, korkean kynnyksen ylityshyppy, kolme miespalvelijaa ja hoitaja erottuvat. Vesiastia on avoin, tumma ja suurikokoinen kiviperustalla; kaksi näkyvää rengaskahvaa. Tarkka vastakkaisuus/mitat eivät varmistu. **Olennainen poikkeama:** oikean ovilehden näkyvä nastaruudukko on6saraketta×10riviä, osin peittyen, eikä pyydetty9×9/81. Nastoitusta ei saa käyttää tarkkana porttireferenssinä. Myös kynnysmateriaalin puumaisuus jää tulkinnanvaraiseksi. Muu tilanne on arvioitava havainne-ehdokas, ei hyväksytty lopputulos.

**J3:** Poika seisoo leveällä muurikäytävällä kaiteen takana, letti/kaapu/päähine näkyvät; yksi aikuinen hengähtää tornin ovella. Keltaiset monikerroksiset katot, vallihauta, vihreät puut, matala vanha kaupunki, kukkulapaviljongit ja valkoinen dagoba muodostavat rauhallisen näköalan. **Jingshan ja Beihai on yhdistelty elokuvalliseksi sommitelmaksi**: niiden suuntaa, etäisyyttä tai näkymistä tästä samasta luoteiskulman kamerasta ei ole varmennettu. Tämä ei ole karttatarkka maisema- tai tornimittareferenssi. Tornin tarkka kattogeometria, maamerkkien tunnistettavuus ja pojan tarkka ikä ovat havainnollistavia. Katonharjan yllä näkyy ohut lankamainen viiva; sen käyttötarkoitus ei selviä. Johdottomuutta tai täsmällistä vuoden 1914 näkymää ei siten kuitata varmennetuiksi.

Keksittyä ovat tilanteet, alkuperäiset henkilökasvot, hahmojen ilmeet/liike, silkkikuviot, valaistuksen yksityiskohdat ja rakennusten pienkoristeet. Näyttelijäkuvia tai elokuvan ruutuja ei käytetty. Historialliseksi valokuvaksi tai koko puvuston/arkkitehtuurin faktatarkaksi rekonstruktioksi kuvia ei väitetä. Pinnoissa on optista vaihtelua, mutta täydellistä luonnonvalokuvan aitoutta tai toistokuviottomuutta ei varmenneta.

FACT-PREFLIGHT.json sisältää ensisijaiset lähdelinkit ja niiden lukurajoitteet:9×9 ei koske jokaista porttia, harjaeläinten senttikoko/ammeen jalustan korkeus eivät varmistuneet, J3:n maantieteellinen yhdistelmä on epävarma. Riippumaton kuva-QA mukana. **Vastaanottajan/PT/KK/omistajan päätökset odottavat.** Ei pelin rakentamista, Peking-mallinnusta, R2:ta, main-muutosta tai julkaisua. J2 on tuottamatta; raportin toimitus ei merkitse sen kuvan valmistumista.


## J2 safe scene follow-up - 16.10.2026

Erillinen uusi yhden kutsun lupa (4f968001 / 267e9baf) käytetty: J2:n turvallinen käytäväkohtaus syntyi 1086 × 1448 native-PNG:nä. Lapsi ja rauhalliset aikuiset ovat tasaisella kaiteellisella kivikäytävällä. Kuuden keraamisen hahmon tarkka mitta, lajimääritys ja harjan historiallinen rakenne jäävät avoimiksi; lisätiedot J2-SAFE-RETRY-QA-FI.md:ssä ja riippumattomassa QA:ssa. Aiempi J2-hylkäys ja kolmen kutsun historia säilyvät. Kumulatiivisesti neljä kutsua ja kolme kuvaa. J1/J3 hyväksytty vastaanottajalla vain havainnekuviksi rajoituksin, uusi J2 odottaa arviota. Ei omistajahyväksyntää, pelitoteutusta tai julkaisua.


## J4 game camera - 16.10.2026

Erillinen yhden kutsun J4-tilaus (2e6770d5 / 79df3460): yksi uusi muokkaamaton native-PNG 1086 × 1448. Takaa yläviistoinen kamera, molemmat kaiteet ja tulevat puupalkki/lyhty/haarautuma näkyvät. Palvelijan rajaus näyttää pyydettyä enemmän vartaloa; tarkka kameraetäisyys/korkeus, lapsen alakolmannes ja lyhdyn liukukorkeus eivät varmistu. Keksitty pelikenttäsommitelma, ei historiallinen reittidokumentti. Lisää J4-QA-FI.md:ssä ja riippumattomassa QA:ssa. Aiemmat hyväksytyt J1–J3 säilyvät; J4 odottaa vastaanottajan/PT/omistajan arviota. Ei peliä tai julkaisua, ei lisäkutsua.
