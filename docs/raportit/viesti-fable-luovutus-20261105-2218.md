# PT:n luovutus 5.11.2026 klo 22.18 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261105-2148.md (opit voimassa). Muistin PT-tila fable-tila-20261019-1910.md on tätä yksityiskohtaisempi.

## ENSIMMÄISENÄ
- Tämä PR (haara fable/luovutus-20261105-2218, worktree wt/fable-luovutus-20261105-2218): yhdistä, poista worktree.
- Viritä postilaatikkomonitori (bkik9by63 päättyy noin 22.25) ja tarkista posti; uusin käsitelty f2182102d.
- ETÄYHTEYS EI OLE PÄÄLLÄ PT:llä, enkä poistanut riviä turhaan: set_remote_control sallii sen vain omistajan pyynnöstä, omistajan sana 28.10. koskee KK:ta. Pyydä KK:lta omistajan sana, jos PT:lle halutaan etäyhteys. Postivahdin aloitusviestistä jätin saman rivin pois.
- KK:n vastaus Ateenan kameraan odottaa (alla).

## OMISTAJAN PÄÄTÖKSET TÄSSÄ VUOROSSA (Raamattu 2.213, loki; PR 6319 yhdistetty)
- 22.04 "Tee muita rakennuksia sillä ohjelmalla  Pariisiin. Onnistuuko?"
- 22.09 kortit: "Myös tavalliset talot"; ensimmäinen erä "Kelpaa". Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md. Jako: A VS (kolmen kohteen vikojen jälkeen), B NS (1 km² Marais, kuva KK:lle, kortti ennen koko Pariisia; lelumainen tai kadut peittävä = tyyli ensin), KS varmistaa rajan. C ja D myöhemmin. Ei junaan, sarja ei hidastu.

## RAAMATUN KOKO: 460698 / 460800 TAVUA
tests/raamattu-loki.test.mjs kaataa yli 450 kt:n. Tilaa 102 tavua: JOKAINEN uusi kirjaus vaatii ensin tiivistyksen. Tapa: kortit, kuvapolut ja kumottu historia lokiviitteiksi, ensin varmistus että sanat ovat lokissa. Tehty 2.213:lle ja osalle 2.215:tä. Älä nosta rajaa ilman omistajaa. Seuraava kokonaisuus: harkitse 2.215:n jakoa KK:n kanssa.

## ROOLIT
| Rooli | Tila | Auki, tarkista |
|---|---|---|
| NS | Marais alkanut | Ateenan kamera: PT:n käsky korjata oli virhe, KK pysäytti (omistaja ei pyytänyt, 2.136). Sitten selvisi: syy on haaran oma df7cc3e0c (21.02:n toteutus) eli regressio. 37fa268e4 korjasi, a6a254be7 kumosi (viestit ristissä). Kärki nyt ilman korjausta. PT suositti KK:lle pitämistä; KK:n sana odottaa. Pidetään → NS palauttaa 37fa268e4:n ja ajaa Ateena + Tukholma + esityskuva. Alkuosan ajastinvika (aarrelaskuri voi jäädä odottamaan, arvio) korjattava ennen junaa. 30fdefd98 esityskuva: 6 s:n raja kelpaa (KK), ajamatta. |
| NUI | Vahtiosumat tehty | cbc744e21 (liikevahti-219, jousi) ja d2f8e2b19 (malli-kyltit-liike-219), koodina hyväksytty, Unity-käännös ja näkeminen liikkeessä puuttuvat. e4b376546 ei junalupaa niitä ennen. Törmäykset: e4b ja NS Nimikerros.cs; PariisiKallistus nahtavyydet-219, katsepiste-maa-219, ohjelmakohteet: jousi voittaa. |
| KS | 93d41db55 | Vahtiosumat valmiit, 3 valopoikkeusta hyväksytty. Invalidit otto 2 kokeena (bea480912), KK päättää. Alustat 24p jatkuvat Codexilla (Riemukaari hyväksytty, Eiffel ja Grand Palais listan loppuun). Muut avoimet edellisessä luovutuksessa. |
| VS | a48428884 JU:lla | Kolmen kohteen viat; osa A kuvat ja mitat alkaneet. Shader df2c647bf on KS:n haarassa (tarkistettu). |
| LAV | Viimeinen ajo lupa | lattia25 A (ulkoalue x > 500 jää) ehdolla: 2 solmukuvaa + avauslennon ruutu, paikka lokista; ei ratkea → vaihtoehdot PT:lle. Todistamatta: sokkeli -40,6, kaista x -450…-470, x -500. Lisäksi seinät aukkoihin (KK PK:n kautta). Ei vientiä. |
| PK | Luovutus tekeillä | Kynnysviesti nähty ovella 107 (PT katsonut r1-kynnys). KK: aukot seinällä, viesti vain ovella; 35140432d ei junaan, PK poistaa seinien jälkeen (varmista). Ympärikäännös kierron aikana vain testeillä; sk-s JU:lla. |
| JU | Nollattu dbe8894f3 | Runko 7bbf04e09 JU:n mukaan, kääntämättä. Jonossa PK sk-s, VS a48428884. |
| Postivahti | Nollautui, aloitusviesti lähetetty | Karttasepän nollaus 7fa35fbcb avoin luovutuksessaan. |

## AUKI PT:LLÄ
- Työlistan rivit ilman tilannetta: Louvren iso pohja, Sainte-Chapellen pohja, Palatsin sisätilat: kysy tekijöiltä.
- Asemataulun Odottajavahti ja TILA-rivit eivät tulleet tässäkään vuorossa.

## LEVY
116 Gi 22.17 (raja 100).

## OPIT
- Viesti jonoon, kun vastaanottajalla on vuoro kesken: kaksi peräkkäistä vastakkaista käskyä sai KS:n ja NS:n kumoamaan ja palauttamaan. Älä korjaa jonossa olevaa käskyä uudella käskyllä: nimeä kärki ("tila on X, älä muuta ilman viestiä, joka mainitsee X:n").
- Ennen kuin käsket korjata toisen roolin havainnon, tarkista onko se pyydetty ja mitä 2.136 ja muut rajaukset sanovat. Ateenan kamera oli PT:n oma ylitys.
- Skriptin testi ei pysäytä committia putken läpi: testin tulos erikseen `|| exit 1`. 1432c769f meni haaraan kaatuvana.
- Vahtipoikkeuksen sana "data" kaatui, kun NUI mittasi: suodin vei kameraa. Epäile poikkeusta, joka koskee ajassa etenevää arvoa.

Tallenne: /Users/Shared/Claude/keskustelut/
