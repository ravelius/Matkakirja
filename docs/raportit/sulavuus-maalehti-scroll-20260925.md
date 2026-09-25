# Maalehden vieritys: sulavuusmittaus (löydös 51, 25.9.2026)

Natiivi-UI:n pyyntö (Fable, build 12, löydös 51 — omistaja: maalehden
teksti vierittyy natiivissa "todella tahmeasti"): mittaa sama maalehti
natiivissa ja Safarissa, 3 pitkää + 3 lyhyttä pyyhkäisyä, kehysajat
(p50/p95/yli 33 ms), kosketus→liike-viive, inertian pituus, ja näkyykö
kuvien/tekstin latautumista kesken vierityksen.

## TÄRKEÄ RAJOITE: iPadia ei saatu käyttöön

Oma iPad Pro 13" (M5) -simulaattori (3B4CDACB) jumissa
lupakyselyssä ("The user has not granted Claude access... a recent
request was declined or is awaiting a response") — omistaja ei ollut
koneella hyväksymässä `attach`-pyyntöä. Tein mittauksen sen sijaan
**iPhone 18 Pro -simulaattorilla (1572C658)**, koska se oli jo
käytettävissä. Tämä ei ole se laite jolla omistaja koki tahmeuden
(iPad), joten alla olevat luvut ovat vain SUUNTAA-ANTAVIA — pyydä
omistajaa hyväksymään iPad-simulaattorin käyttölupa Simulaattori-
paneelista ("Let Claude use it"), niin ajan mittauksen uudelleen
oikealla laitteella.

**Web-vertailua (Safari) ei tehty tässä kierroksessa.** Olemassa oleva
web-sulavuustyökalu (`tools/savukkeet/mittaa-sulavuus.mjs`) on
rakennettu pallon/karttalaattojen mittaamiseen (Chromium+ANGLE), ei
lehden DOM-vieritykseen, eikä se aja oikeaa iOS Safaria. Aiempi
natiivi-vs-web-vertailu (`sulavuus-natiivi-vs-web-20260923.md`) sai
oikean Safari-iPad-datan omistajan omasta käsin ajetusta kierroksesta,
ei skriptillä — sama pätisi tässäkin, tai tarvitaan uusi WebKit-
pohjainen (Playwright webkit-moottori) skripti, jota ei ole vielä.

## Menetelmä (natiivi, iPhone-simulaattori)

- `uusi-peli 1 pariisi` → `maalehti FRA 2` (Ranska, sivu 2: PERUSTIEDOT-
  kortin jälkeinen tekstisisältö, kuva "Euroopan raketit lähtevät
  sademetsästä").
- 3D-selvittäjän `mittaus alku/loppu` (KehysMittari.cs, raa'at
  kehysajat) käynnissä koko kierroksen ajan.
- 3 pitkää pyyhkäisyä (kesto 0,8–0,9 s, matka ~600 px) + 3 lyhyttä
  (kesto 0,15 s, matka ~120 px), tauko ~1–1,5 s pyyhkäisyjen välissä.
- Väliruudunkaappaukset (simctl io screenshot) pyyhkäisyjen välissä
  kuvien/tekstin lataustarkistukseen.

## Tulokset (kehysajat)

| Kehyksiä | p50 | p95 | p99 | max | Pieniä tökk. (>12,5 ms) | Isoja tökk. (>33 ms) |
|---:|---:|---:|---:|---:|---:|---:|
| 4262 | 16,67 ms | 17,04 ms | 17,67 ms | 77,13 ms | 99,95 % | 1 (0,02 %) |

**Tulkinta — "pieniä tökkäyksiä 99,95 %" on harhaanjohtava luku tässä
mittauksessa, EI todiste tahmeudesta:** simulaattori renderöi 60 Hz:llä
(p50 = 16,67 ms = tasan 1/60 s), mutta KehysMittari.cs:n 12,5 ms -kynnys
on viritetty 120 Hz ProMotion-laitteelle. 60 Hz:llä JOKAINEN kehys
ylittää 12,5 ms rakenteellisesti, vaikka renderöinti olisi täysin
tasainen — mikä se tässä oli: 4261/4262 kehystä pysyi kapealla
16,6–17,7 ms -välillä (ei sahausta), ja vain YKSI kehys (77 ms, todennäk.
kuvan dekoodaus tai sivun vaihto) nousi selvästi yli. **Todellinen
120 Hz-mittaus vaatii oikean iPadin** (simulaattori ei koskaan näytä
ProMotion-nykimistä, ks. KehysMittari.cs:n oma huomautus koodissa).

## Kosketusviive ja inertia (laadullinen, ei tarkkaa mittalukua)

Ei tarkkaa ajastusta saatavilla (ruudunkaappaus ei ole kehystarkka).
Silmämääräisesti: pyyhkäisyn jälkeen otetut kuvat (0,3 s ja 1,2–1,5 s
pyyhkäisyn alusta) näyttävät sisällön jo asettuneena, ei näkyvää
jälkiliukua kesken kuvan ottohetkellä — viittaa lyhyeen (<1 s)
inertiaan, mutta tätä EI pidä ottaa täsmällisenä lukuna.

## Kuvien/tekstin lataus kesken vierityksen

Ei havaittu placeholder-tyhjiä kohtia tai jälkikäteen ilmestyviä kuvia
kolmessa väliruudunkaappauksessa (ks. `docs/raportit/kaappaukset/` —
kuvat vain paikallisesti `/tmp`, ei pushattu, koska eivät sisällä
pikselivertailua). Yksi 77 ms:n kehys mittauksen aikana voi olla kuvan
dekoodaus tai sivunvaihtokehys — ei varmistettu tarkasti kumpi.

## Seuraava askel

1. **Omistajan hyväksyntä tarvitaan** iPad-simulaattorin (3B4CDACB)
   käyttöön Simulaattori-paneelin "Let Claude use it" -linkistä, jotta
   mittaus voidaan toistaa oikealla laitteella/taajuudella.
2. Web-Safari-vertailuun tarvitaan joko omistajan käsin ajama kierros
   (kuten 23.9.) tai uusi WebKit-pohjainen automaatioskripti lehden
   DOM-vieritykselle (ei vielä olemassa).
3. Tarkempi kosketusviive/inertia vaatisi frame-tarkan ajastuksen
   (esim. KehysMittari laajennettuna merkitsemään kosketuksen alku/
   loppu -tapahtumat samaan tiedostoon).
