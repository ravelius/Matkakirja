# Invalidit24l — lopullinen toimitus, otto 2 / #2146

Ensisijainen `invalides.glb` on hyväksytyn oton2 raakageometria normaalimitoissa. Se on sama tavutasolla kuin diagnostiikan hyväksytty `attempt02-diagnostic-yaw0.glb`. Kevennetty `vertailu/invalides-kevyt.glb` on mukana vertailua varten; sitä ei suositella ensisijaiseksi. Kunniapihan aukko jätettiin molempiin tilaajan nimenomaisesta pyynnöstä. Malliin ei lisätty lattiaa, eikä tekstuureja muokattu paikallisesti.

LIIKE: ei liikettä. Ei luurankoa eikä animaatioita.

## Pihojen ja akselien tarkistus

Kaikki7suuntaa kummastakin versiosta katsottu800×800täysikokoisina. SW4 + SE6 + kunniapiha1 + NW2 + NE2 =15 avointa pihaa. Välisiivet, kultainen kupoli, lyhty ja risti säilyvät. Samat23maailmakoordinaattien pystysädettä laskettiin uudelleen kummallekin:9/9kunniapihan keskipisteissä ei kolmiopintaa,14/14pienissä pihoissa lattiapinta. Otos ei ole kaikkien pintojen aukottomuustodistus; kuvat täydentävät mittausta.

Yylös; kupoli/etelä+Z, pohjoinen−Z, J-siipi+X/+Z. EWleveys363m. Molemmissa vain positiivinen tasaskaala, pohjan Y0 ja XZ-keskitys; yaw0°, ei peilausta/venytystä/litistystä. Raaka363×142.792×400.056m; kevyt363×142.767×400.193m. Raaka H/W0.39337 (+6.32% tavoitteesta0.37), L/W1.10208 (−2.47% tavoitteesta1.13), molemmat7%rajan sisällä. Muuttunut raakakevennyksen rajaus muutti tasaskaalaa408.55885→408.69923; ei akselikohtaista venytystä.

## Kunniapihan aukko — ensisijaisen raakamallin metreissä

Kolme X- ja kolme Z-poikkileikkausta, ensimmäinen pystysäteen pintaleikkaus. Haku0.25m askelin, rajan puolitusväli enintään0.01m. Nämä ovat näyteleikkausten raja-arviot, eivät aukon tarkka reunapolygoni tai senttimetrin rakennustarkkuus.

- Länsireuna X noin−37.64…−37.55; itäreuna+37.02…+37.09.
- Pohjoisreuna Z noin−148.95…−148.67; eteläreuna−58.28…−57.85.
- Noin2m limitys näyterajojen yli antaa alustavan laatan X[−39.641,+39.086], Z[−150.955,−55.846], leveys78.727m ja syvyys95.109m. Pelissä voi pyöristää ulospäin ja tarkistaa koko reunan.
- Pienten pihojen14lattiapistettä Y5.228…5.523m, mediaani5.494m.
- Aukon rajalla näytepintojen Y noin2.359…3.592m;2m ulkopuolisilla reunanauhan näytteillä Y2.258…4.233m. Nauha ei ole samalla tasolla pienten pihojen kanssa.

**Korkeusvaroitus:** pienten pihojen mukaan johdettu taso Y≈5.44m jää mitatun reunanauhan päälle, ei sen alle. Myöskään Y4.18 ei ole kaikkien näytteiden alla. Jos tavoite on limittää yhtenäinen taso kaikkien mitattujen reunapintojen alle, kokeen lähtökohta on Y≈2.20m ja yllä oleva XZ-limitys; tällöin kunniapiha on noin3.3m pieniä pihoja alempana. Tämäkään ei takaa koko reunan peittymistä, koska mittaus on otos. Karttaseppä valitsee pelissä sopivan korkeuden/siirtymän ja tarkistaa saumat. JSONin `ySuggested`5.44 on vain pienten pihojen tasosta laskettu vaihtoehto, EI valmis asennuskorkeus. Mallia ei korjattu.

Kevyen vertailun vastaava limitys X[−39.578,+39.273], Z[−150.853,−55.838]; pienten lattioiden Y5.165…5.468, mediaani5.417; nauhan näytepinnat Y2.191…4.151. Täydet23säteen ja poikkileikkausten luvut QA-JSONeissa.

## Kevennys ja värit

| Mitta | Raaka, ensisijainen | Kevyt, vertailu |
|---|---:|---:|
| Kolmiot |44766|28009|
| GLB tavua |4683808|2833180|
| Primitiivit / materiaalit |1 /1|1 /1|
| UVnolla-alan kolmiot |11|36|
| Niiden3Dala m² |3.383785|73.910768|
| Osuus koko3Dalasta |0.00092095%|0.02016231%|
| Tekstuurikuvat |3×2048²|512² /2048² /1024²|

UVkynnys abs ristitulo≤1e−12. Mustat pikselit (kaikkiRGBkanavat<16), kuva800², sama kevyt CPU-esikatseluvalaistus:

| Suunta | Raaka | Kevyt |
|---|---:|---:|
| Etelä |0|34|
| Pohjoinen |0|0|
| Länsi |0|0|
| Itä |0|2|
| Ylhäältä |0|131|
| Lounas |0|92|
| Koillinen |0|103|

Tripon kevennys muutti kaikkien upotettujen kuvien tiivisteet ja UV-jaon: palvelu tuotti tekstuurit uudelleen. Paikallinen normalisointi säilytti kummankin version omat kuvabytet jaUV-taulukot täsmälleen.19samassaXZpisteessä mitattu valaisematon perusvärinäyte muuttui keskimäärin RGB(−5.27,−3.91,−3.13)/255; absoluuttinen keskiarvo(5.54,4.84,4.11). Suurin kanavapoikkeama84.22/255 itäisen korttelin näytteessä. Näytteen nimi `east-roof` on sijaintinimi: ylimmän osuman pinta ja UV voivat vaihtua geometrian myötä, joten tästä ei voi päätellä koko katon yhtä värisiirtymää. Tämä on rajattu tekstuuri/UVvertailu, ei pelivalaistuksen arvio. Raaka säilyttää hyväksytyn diagnostiikan ulkoasun; vastaanottaja arvioi alkuperäisen tummuuden ja mahdolliset värisäädöt pelissä.

## Otokset, kustannukset ja vastaanotto

Otto1 job a49050a0-61e6-434e-84f5-b3e56e5b65a3:45cr, hylätty/säilytetty. Otto2 job2293c6b6-55bb-4f8e-be66-c38019021f84:45cr, hyväksytty #2146. Kevennys samalla vanhemmalla:5cr, ordinaryTriangle28000, SmartMeshpois, toteutunut28009. Yhteensä95cr. Saldo ennen kevennystä15600, jälkeen15595. Ei kolmatta ottoa eikä uusintakevennystä. Erillistä retopotyön tunnusta UI ei näyttänyt; ladatun viennin tunnus c3f031cb-4190-4913-9657-e4cc8b1fe1f8.

GLB2.0, kaikki upotettuna, ei Dracoa, läpinäkymätön. Tekninen portti ajetaan paketille ja tulos mukana. Karttaseppä asentaa kokeen omaan haaraansa. **Ei junaan.** Toimitus ei tarkoita pelissä tarkistettua väriä, asennusta tai julkaisua.
