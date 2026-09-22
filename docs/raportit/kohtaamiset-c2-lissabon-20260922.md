## Lissabon — laattamaalari Inês

**hahmo:** "laattamaalari Inês"
**nappi:** "Tapaa Inês"
**frame:** "Inês nostaa laatan kuivaustelineeltä ja kysyy"
**tervehdys:** "Inês nostaa laatan kuivaustelineeltä ja vilkaisee kirjaasi. \"Isoisäsi aikaan täällä kuljettiin vielä jalan — hevosraitiovaunu avattiin vasta saman syksyn marraskuussa. Näytä että tunnet maailmaa kuten piirtäjä, niin kerron mistä laatta löytyy.\"" (244 merkkiä)
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Inês nostaa laatan kuivaustelineeltä ja '
    + 'vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan täällä kuljettiin '
    + 'vielä jalan. [warmly] Näytä että tunnet maailmaa kuten piirtäjä, '
    + 'niin kerron mistä laatta löytyy."' },
]
```
**loyto:** "Inês nostaa rasian uunin vierestä: \"Tämä oli laatan alla vuosia. Kukaan ei koskaan kysynyt, miksi se kuvio oli vino.\"" (117 merkkiä)
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Inês nostaa rasian uunin vierestä:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä oli laatan alla vuosia. '
    + '[amused] Kukaan ei koskaan kysynyt, miksi se kuvio oli vino."' },
]
```
**tyhja:** "Inês pyyhkii hyllyn tyhjäksi: \"Ei mitään. Pajaa on siirretty kahdesti tulipalon jälkeen.\"" (89 merkkiä)
**vaarin:** "Inês kääntää laatan takaisin telineelle: \"Ei vielä. Savi kuivuu hitaasti, ja niin kuivuu tietokin.\"" (99 merkkiä)
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // rekisterin oletus: Inês toteaa historiallisen faktan ja esittää käytännön pyynnön mitattoman rauhallisesti — ei erityisen lämmin eikä haastava, joten oletus istuu ilman poikkeamaa
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Lissabonin ensimmäinen raitiotielinja (hevosvetoiset "carros americanos", yhtiö Carris) avattiin 17.11.1873 välille Santa Apolónia–Santos. Sähköraitiovaunut korvasivat hevosvaunut vasta 1901. Pelin oma kaanon (js/packs/fokusvirta-lissabon.js rivi 150) sijoittaa isoisän Lissabonin-käynnin päiväkirjamerkinnän "lokakuuhun 1873" — siis ENNEN linjan avaamista marraskuussa — joten isoisän päiväkirjassa kaupunki kulkee vielä jalan, ja Inêsin repliikki ("hevosraitiovaunu avattiin vasta saman syksyn marraskuussa") on tarkka, ei pyöristetty, kontrasti. Lähde: en-Wikipedia "Trams in Lisbon" (History-osio, Carris-yhtiön perustaminen ja linjan avauspäivä 17.11.1873; sähköistys 31.8.1901), tarkistettu webhaulla 22.9.2026.

**Olemassa oleva kuvamateriaali (löytyi, käytetty pohjana):**

`js/kohtaamiskuvat-data.js`:sta löytyi KAKSI Lissabon-riviä, molemmat hahmolla "Inês" azulejo-laattapajassa:

1. `lissabon-ines-laattapaja` — tila `tarkistettu`, mutta **`aktiivinen: false`** (kommentti rivillä 108–111: korvattu 7.9.2026 uudemmalla versiolla, "kortille mahtuu kaupungista vain yksi").
2. `lissabon-ines-round2-r20260905-v1` — tila `tarkistettu`, **ei `aktiivinen`-kenttää** eli aktiivinen pelin säännön mukaan. Kuvaus: Inês nostaa kuivaustelineestä sinivalkoista azulejo-laattaa, ikkunasta siivilöityvä aurinko osuu kasvoihin, katsoo matkaajaa lämpimän epäuskoisesti; on polvillaan telineen vieressä, lehtien varjot kirjovat lattian ja käsivarren.

Tämä kohtaaminen on kirjoitettu SUORAAN tämän aktiivisen konseptin (`round2-r20260905-v1`) mukaan: sama hahmo, sama laattapaja, sama kuivausteline-hetki. `js/packs/kohtaamiset.js`:ssä ei ollut ennestään `lissabon`-riviä eikä muualla mitään muuta Lissabon-hahmokonseptia löytynyt (docs/kuvatuotanto-kohtaamiset.md:n taulukossa Lissabonia ei mainita lainkaan — se listaa vain tarinakaaren kohtaamiset).

Huom: azulejo-nimen alkuperää EI käytetä minään kysymyksen koukkuna tässä tekstissä (js/packs/fokusvirta-lissabon.js:n kommentti rivi 96 varoittaa, että europe-kulttuuri.js:n kaupunkivisa kysyy sen jo) — kohtaaminen on rakenteeltaan sama yleinen "Etsi kätkö" -kehys kuin Lontoo/Venetsia/Berliini, ei uusi faktakysymys.

**Kuvatilaus Codexille:** EI TARVITA UUTTA KUVAA. Aktiivinen, tarkistettu kuva (`kasvo-lissabon-ines-round2-r20260905-v1.jpg` / tiedosto `lissabon-ines-round2-r20260905-v1.jpg`) vastaa tekstiä suoraan jo sellaisenaan — sama hahmo, sama teko (laatan nostaminen kuivaustelineeltä), sama valo (ikkunasta siivilöityvä aurinko, lehtien varjot). Jos Fable silti haluaa vaihtoehtoisen kuvan tälle nimenomaiselle kohtaamistekstille, tässä lyhyt briiffi varalta:

- Hahmo: Inês, azulejo-laattamaalari/keramiikkatyöläinen, arviolta 30–45-vuotias, työtakki tai esiliina savi-/maalitahroilla, hihat käärittynä.
- Tekeminen kesken kuvan: nostaa vasta maalattua sinivalkoista azulejo-laattaa kuivaustelineeltä, toinen käsi vielä telineen reunalla.
- Kaksi aikakerrosta: perinteinen azulejo-käsityö (laasti-/maaliharja, laattapinot, puu- tai kaakeliuuni taustalla) sekä nykyaikainen yksityiskohta pajassa (esim. LED-työvalo, moderni suojalasi tai kännykkä työpöydällä) — ei hevosraitiovaunua kuvassa, koska konsepti on jo hyväksytty tähän hetkeen eikä liikennehistoriaan.
- Ilme/reaktio: katsoo matkaajaa (kameran linssiin) lämpimän epäuskoisesti, hieman huvittunut yllätys keskeytyksestä.
- Valo/sää: sisätila, ikkunasta siivilöityvä auringonvalo, lehtien varjot lattialla ja käsivarrella (kuten hyväksytyssä konseptissa).

valmis
