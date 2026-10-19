# Kolme veljestä 658 — pystytaustojen QA

Portrait-alierä valmis rootin toimituspakettiin. Tämä kuitti koskee yhtä uutta pystymasteria ja siitä tehtyjä kahta pystyrajausta. Root kokoaa erikseen vaaka-alierän kanssa lähteen vaatimat neljä esikatselua. Uuden taustan PT-/omistajahyväksyntää, mallinnusta, videota, peli-integraatiota tai julkaisua ei väitetä valmistuneeksi.

## Tuotanto ja oma tarkastus

Yksi kokonaan uusi valokuvamainen 3:4-pystygenerointi, 1 kutsu, 0 uusintaa, ei osamuokkausta tai outpaintia. Katsoin itse molemmat paikalliset omistajan hyväksymät pilotin referenssit, uuden muuttamattoman natiivin, molemmat rajauksen esikatselut ja molemmat target-PNG:t täydessä toimituskoossa.

Sama kynttilänvalaistun 1400-luvun pariisilaisen kultasepänpajan identiteetti säilyy: lämmin puinen työpöytä, tummat puurakenteet ja rappaus, vanhat käsityövälineet, isompi kynttilä lähempänä sekä pienempi taaempana, sinertävä lyijylasi-ikkuna sivulla. Pystysommittelu näyttää oikean työtilan ja työvälineet keskellä. Kuvassa ei ole riipusta, narua, Havainnekuva-merkintää, muuta tekstiä tai käyttöliittymää. Keskelle ei ole varattu tyhjää ruskeaa blur-koloa.

Molemmat kynttilänliekit säilyvät myös puhelinrajauksessa. Pääkynttilä jalustoineen sekä työstöalusta ja käsityökalut näkyvät. Puhelinrajauksessa osa sivuikkunasta, kulhosta ja tavallisista reunavälineistä jää kuvan ulkopuolelle; kynttilänvalo ja pajan olennainen sisältö säilyvät. Pinnat ovat valokuvamaisia: puun kuluma, metallin patina, oikean oloinen vaha ja liekit. Syvempi huone on pehmeämpi kuin etualan työpöytä.

## Täsmälliset rajaukset ja tekniset viennit

Natiivi: 1086 × 1448 RGB-PNG, täysin peittävä, alkuperäiset tavut säilytetty muuttumattomina sekä työkalun tallennuspaikassa että työpaketissa.

| Kohde | Natiivin rajaus XYXY | Rajauksen koko | Toimitus-PNG |
|---|---|---|---|
| iPad pysty | [0, 0, 1086, 1448] | 1086 × 1448 | 2048 × 2732 |
| iPhone pysty | [160, 0, 828, 1448] | 668 × 1448 | 1179 × 2556 |

Puhelimen noin 61,5 % leveä rajaus siirrettiin hieman vasemmalle pääkynttilän jalustan säilyttämiseksi. Rajauksen esikatselut ovat itse valittuja natiivipikselirajauksia ennen koonmuutosta. Tuotteiden rajaukset ovat uuden lähteen sallima tekninen ratkaisu. Molemmat targetit ovat TEKNISIÄ SUURENNUKSIA, eivät natiivisti toimituskoossa generoituja kuvia. Targetkoon vaatimus tulee lähteestä; koon vienti LANCZOS-menetelmällä ja vähäinen pikselipyöristyksen aspektiero ovat rootin teknisiä toteutusratkaisuja.

iPadin rajauksen ja targetin kuvasuhde-ero on 0,048828 %, puhelimen 0,012652 %. Rajauslaatikot, normalisoidut koordinaatit, tarkat akselikohtaiset mittakaavat sekä natiivi-/rajaus-/target-pikseli-SHA:t ja erilliset tiedostotarkisteet ovat crop-export-provenance.jsonissa. Ei täyttöä, erillistä perspektiivi-/muotovenytystä, sisältöretusointia tai outpaintia. Koon suurentaminen ei lisää alkuperäistä yksityiskohtatietoa.

## Lähteet ja työnjako

Vaihe 2 -lähde ja videota koskeva täydennys on luettu kokonaan ja Git-blobit/SHA:t varmennettu. Omistajan pilotille antama hyväksyntä koskee referenssejä, ei tämän uuden taustan vielä avointa arviointia. Tausta on tarkoitettu myöhemmin erillisen Tripo-/video-omistajan Cycles-työhön; tämä agentti ei ole tehnyt mallia, renderipareja tai videoita. Tämän agentin Tripo-kutsuja 0 eikä Tripo-lupaa. Kolmen Tripo Max -generoinnin kokonaisbudjetti ei uusiudu tällä taustatyöllä. Muita kuutta aarteen löytöhetkeä ei aloitettu.
