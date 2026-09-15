# Fable: yhdistä tarina14 yhteen PR:ään ja käytä jo korjattuja kuvatekstejä — 15.9.2026

Omistajan aiempi ”Synkkaa ne eleet ja vaihda kuvat” on tämän rajatun 14 kuvan vaihdon lupa. Tämä on jo tehtyjen toteutusten yhteensovitus, ei uusi kuva- tai tekstikierros eikä lupapyyntö omistajalle.

## Varmennettu päällekkäisyys

- PR2450 https://github.com/ravelius/Matkakirja/pull/2450 on open / merged=false, head 2a5109dc66581e04a3252daaedd3b2e09f6b2073, haara codex/horatio-livia-images14-20260914.
- PR2496 https://github.com/ravelius/Matkakirja/pull/2496 on open / merged=false, tarkistettu head cb1962fd193f37825930c3d79334f61395bffe70, haara claude/bold-ride-vow4ki-tarina14.
- Codex luki PR2450:n lopullisen tests/fixtures/horatio-livia-images14-20260914.json:n ja vertasi sitä alkuperäiseen posti/kuvatoimitus-tarina14-20260914.json -manifestiin. Kaikki 14 URLia ja lyhyttä kuvatekstiä täsmäävät. Täsmälleen 10 pitkää selitettä on korjattu PR2450:ssä kahdeksi sisältölauseeksi; ne puuttuvat PR2496:sta. Pariisin vanhan URLin testilukko on myös jo korjattu PR2450:ssä.
- Alkuperäinen mediamanifesti on tarkoituksella muuttumaton toimituskuitti, EI lopullisten korjattujen kuvatekstien lähde.

## Yksi toteutus — sinun PR2496 toimii yhdistettävänä kokonaisuutena

1. Käytä PR2496:ta ainoana yhdistettävänä kuva-PR:nä, mutta sen 14 replacement-kuvaolion AUKTORITATIIVINEN sisältö on PR2450 head 2a5109dc... -commitin tests/fixtures/horatio-livia-images14-20260914.json.
2. Siirrä tästä fixturestä vain nimetyt 14 kuvaoliota ja niiden täsmälliset kentät nykyisiin kuuteen kaupunkipakkaan. Älä korvaa kokonaisia pakkoja vanhan v1879-pohjan tiedostoilla: nykyiset puhetekstit, ääniavaimet ja muut rinnakkaiset muutokset säilyvät.
3. Tuo samasta PR2450-commitista fixture ja tests/horatio-livia-images14.test.mjs. Tuo tests/luentakuva.test.mjs:stä vain retain-kuvatestin kohdennettu muutos: kuusi muuta kuvaa pysyy paper-v4-lukossa, Pariisin I1 lukitaan matkakirja-pariisi-i1-r20260914-tarina-v1.jpg:hen. Älä poista testiä tai löysennä sitä yleiseksi JPEG-tarkistukseksi.
4. Säilytä kahden sisältölauseen sääntö ja lähdemerkintä erillään. Ei porttien ohitusta eikä omistajalta jo ratkaistun pituuspäätöksen uudelleen kysymistä.
5. Päivitä vaihdettujen kuvaolioiden vanhoihin paper-v4/v5-kuviin, SHA:hin tai vanhaan aiheeseen viittaavat lohkokommentit uuden toimituksen mukaisiksi. Fixturestä saa uuden kuvan SHA:n. Älä muuta itse puheita, kuvajärjestystä tai muita kuvia.
6. Säilytä PR2496:n hyödyllinen katselmuskuva/raportti, mutta päivitä raportin pitkät selitteet lopullisen fixturen mukaisiksi, jotta raportti ja peli eivät taas eroa.
7. Aja kolme aiemmin kaatunutta porttia, tarina14-regressio sekä koko normaali testisarja nykyistä mainia vasten. Jos narrativeSha256 ei täsmää nykyiseen puheeseen, selvitä oikea muutossyy: älä päivitä tarkisteita sokeasti tai vaihda puhetta testin vuoksi.
8. Kun korjaukset ovat mukana ja tarkistettu, merkitse PR2450 korvatuksi PR2496:lla ja sulje päällekkäinen PR yhteisellä selitteellä. Älä yhdistä molempia PR:iä.
9. Yhdistä/julkaise vasta porttien läpäistyä aiemman omistajaluvan mukaisesti. Palauta yhdistetty commit, versio, testit ja oikeassa pelissä tarkistettu kuva/lyhyt selite/suurennoksen pitkä selite. Pelijulkaisu ja sovellustarkistus ovat erillisiä; nykytilasta ei väitetä kuvien jo näkyvän pelissä.

## Korjattujen kymmenen pitkän selitteen täsmällinen lukukopio

- bergen:I2: Pieni rautakuula on kiinnitetty tuomiokirkon kiviseinään. Kiinnityksen ajankohtaa ei tunneta.
- bergen:P1: Lasten ja nuorten rumpujoukko marssii kadulla. Katsojat kuvaavat kulkuetta.
- bergen:P2: Nuori johtaja tarkistaa rumpujoukon järjestystä. Matalalta ikkunalaudalta näkee nuoremmat soittajat muodostelmassa.
- amsterdam:I1: Kanavatalon ullakolle mahtui kokonainen kirkko. Pappi seisoo alttarin vierellä puuparvien alla.
- amsterdam:I2: Ullakkokirkon urut ovat salin toisessa päädyssä. Vuonna 1794 rakennettu soitin kohoaa penkkien yläpuolella.
- amsterdam:P1: Aseman edustan pyörähalli sijaitsee veden alla. Pyörätelineet ja valkoiset pylväät kohoavat matalan kameran yllä.
- amsterdam:P2: Ankka kelluu Open Havenfrontilla. Sen alapuolella on aseman edustan pyörähalli.
- varsova:P1: Kukkula koottiin sodassa tuhoutuneen Varsovan raunioista. Nyt metsäpolut kulkevat sen halki.
- bukarest:P1: Lintuharrastajat kiikaroivat Văcăreștin ruovikossa. Hylätyn tekojärvihankkeen betonivallien sisään on syntynyt luonnonpuisto.
- oslo:I1: Työmies kantaa astiaa molemmin käsin Lysakerin tehtaan luona. Kuviteltu kohtaaminen pohjautuu noin vuonna 1870 kuvattuun tehdasympäristöön.

Bergen I1 ja Pariisin I1/I2/P1 olivat jo kahden lauseen mukaisia, eivätkä ne muutu alkuperäisestä manifestista. Kaikki lyhyet kuvatekstit, lähdemerkinnät, lähdelinkit ja kuvat säilyvät fixturen mukaisina.

Kuvalaajuus: Bergen I1/I2/P1/P2; Amsterdam I1/I2/P1/P2; Pariisi I1/I2/P1; Varsova P1; Bukarest P1; Oslo I1. Sisilia, Islanti, Alpit, Lappi/Rovaniemi ja Tromssa pysyvät tässä kokonaan ennallaan. Kuvatehtävä ei tee kolmatta rinnakkaistoteutusta eikä Codex kirjoita sinun pakkojasi rinnakkain.

Äänet/iskulauseet ovat eri työ: uusi omistajalinja posti/iskulause-vakaa-livia-reaktiot-20260915.md on voimassa. Tämä kuvien julkaisu ei käynnistä uusia maksullisia ääni- tai kuva-ajoja.
