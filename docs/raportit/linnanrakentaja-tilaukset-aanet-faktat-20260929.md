# Linnanrakentajan tilaukset: äänet, repliikit ja faktat (Poikkileikkaus, Olavinlinnan keittiö), 29.9.2026

Päätoimittaja 29.9. klo 03.2x: listat lähetetään suoraan Pelikoodarille ja Sisältökirjurille. Tekstien lähde on pelin
repossa: `js/dioraama/rakennukset/olavinlinna.js` haarassa `linnanrakentaja-keittio` (tila `luonnos`). Tunnisteet
alla ovat datan id:itä.

## A. Pelikoodari: äänet ja repliikit

Järjestys: ensin radion lukittumisen uusi otto, sitten tämä.

### Äänitehosteet

CC0 tai CC BY, `lisenssiKelpaa`. Ogg- tai mp3-silmukat, jotka toistuvat saumattomasti.

**Keittiö:**

| id | laji | kuvaus |
|---|---|---|
| `keittio-ambienssi` | silmukka 20–40 s | hiljainen askare, kaukainen puhe ilman sanoja |
| `tulisija-ratina` | silmukka | avotulen rätinä |
| `pata-poreilu` | silmukka | padan poreilu |
| `pilkkominen` | kerta 3–4 varianttia | pilkkominen |
| `vaivaaminen` | silmukka | taikinan vaivaaminen |
| `askel-puu`, `askel-kivi` | kerta | askeleet puulla ja kivellä |
| `vesisanko` | kerta | vesisanko |
| `ovi-puu` | kerta | puuovi |

**Koko linna:**

| id | laji |
|---|---|
| `linna-tuuli` | silmukka |
| `jarvi-laineet` | silmukka |
| `lokit` | kerta, satunnainen |
| `kellot-kaukaa` | kerta |

### Puhe

- Tagisääntö: ei [softly]/[whispers], yksi tunnetagi virkettä kohden.
- Pulu: Pulun oma ääni ja repertuaarin tasoitus (`eleven_v4`).
- Hahmoille kolme eri ääntä: kokki (aikuinen, jämäkkä), apulainen (aikuinen, nauravainen), vesipoika (nuori).
- Teksti datasta. Äänen id = datan id.

| id | puhuja | teksti |
|---|---|---|
| `kokki-1` | kokki | Malta mielesi, ei tuo pata omin päin kiehu valmiiksi. |
| `kokki-2` | kokki | Isännän pöytään ei kelpaa puuro liian suolaisena eikä liian laihana. |
| `apulainen-1` | apulainen | Leipätaikina lepää vielä hetken, ennen kuin se uuniin kelpaa. |
| `apulainen-2` | apulainen | Jauhosäkki painaa aina enemmän kuin luulisi — eikä se ole minun syytäni. |
| `vesipoika-1` | vesipoika | Kaivosta tänne ja takaisin, jalat tuntevat jo polun ulkoa. |
| `vesipoika-2` | vesipoika | Yksi sanko kokille, toinen padalle — kolmannen taidan juoda itse. |
| `pulu-kokki-r1` | Pulu | Kuulitteko? Tässä linnassa padallakin on oma tahto. |
| `pulu-apulainen-r1` | Pulu | Säkki painaa, leipä palkitsee. Minä lupaan hoitaa murut. |
| `pulu-vesipoika-r1` | Pulu | Kymmeniä sankoja päivässä! Vesijohtoa hän ei ehtinyt nähdä. |
| `linna-kohta-0…2`, `keittio-kohta-0…2` | Pulu | taulujen kuusi kohtaa, kun Sisältökirjuri on ne tarkistanut (B) |

### Toimitus

- Tiedostot kansioon `dioraama/olavinlinna/aanet/<id>.mp3` (Julkaisija vie ämpäriin).
- Kestot sekunteina taulukkona (id → kesto_s), niin kirjaan ne `js/dioraama/pankit/aanet.js`:ään.
- Moottori ajoittaa askeleet äänen keston mukaan.

### Natiivin rajapinta

- Linssi tarvitsee useita samanaikaisia silmukoita, joiden voimakkuus muuttuu (herätyksen tasot 0 / 0,25 / 1, liuku 1,2 s).
- Ehdotus: `ILinssiYmparisto.Silmukka(tunnus, url) → kahva { Voimakkuus, Lopeta }` Aanisoittimen mikseriin.
  Vaihtoehto: lupa linssin omille AudioSourceille Aanisoittimen mikseriryhmän alla.
- Kerro kumpi, niin kytken.

## B. Sisältökirjuri: faktantarkistus ennen ääntä

Tarkista jokainen kohta. Korjaa sanamuoto tarvittaessa (≤ 110 merkkiä kohdassa), merkitse lähde ja vaihda tila
`tarkistettu`. Lähteet: Kansallismuseo, Museovirasto ja Finna.

### Linnan taulu

1. Olavinlinna rakennettiin 1475 kalliosaarelle vartioimaan valtakunnan itärajaa.
   *Tarkista: vuosi, perustaja Erik Axelsson Tott, ilmaisu "valtakunnan itäraja".*
2. Keskiaikaista kivilinnaa on korjattu ja laajennettu vuosisatojen kuluessa moneen otteeseen.
3. Nykyään linnassa on museo, ja kesäisin sen pihat toimivat oopperajuhlien näyttämönä.

### Keittiön taulu

1. Keittiön avotuli paloi lähes taukoamatta — sen sammuminen tiesi kylmää ruokaa koko linnalle.
2. Ruokana oli kalaa, viljaa ja suolattua lihaa; talven varalle säilöttiin mitä vain saatiin.
3. Keittiö ruokki koko linnaväen: vartijat, palvelusväen ja isännän pöytään kutsutut vieraat.

### Repliikit

A:n taulukon kuusi hahmorepliikkiä ja kolme Pulun reaktiota. Tarkista:
- aikalaisuus (ammatit, ruoat ja sanasto 1400–1500-luvulla)
- että ne eivät ole anakronistisia, paitsi Pulun nykyajan kommentti vesijohdosta, joka on tahallinen

### Lisäksi

- Tornien nimet: Kellotorni, Kirkkotorni ja Kijlin torni (`Kartta/Erikoismallit/Olavinlinna.cs` käyttää näitä).
- Keittiön sijainti linnassa on tulkintaa. Riittääkö taulun alle pieni "tulkinta"-merkintä?
- Linssikatalogi E11 (haara `sisaltokirjuri-linssi-e11`): tila "työn alla (natiivi, hiomassa)".
- Palauta tarkistetut tekstit rivi riviltä: id, uusi teksti, lähde. Minä vien ne dataan.
