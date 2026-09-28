# Natiivi-UI:n luovutus 28.9.2026 (ac), NOLLAUS klo 11.4x

Jatkaa luovutusta (aa). Fable = local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 ("Päätoimittaja"). Proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat masterin (17c2928b) päällä. Worktreet (2/3):
wt/proto-natiivi-ui-sisallys (natiivi-ui/maan-niminen-kaupunki), wt/proto-natiivi-ui-vieritys (natiivi-ui/pehmea-nakyvyys).
Apuskriptit: proto-3d/lokit/natiivi-ui-1035/skriptit/ (k.sh i|p ui/kartta/kuva, kierros.sh <nimi> <app> = asennus +
stdout + Ateena + "nostot tila ISL" + panorointivideo, pari.py kuvaparit, web-ihme.mjs webin mittaus PR-haarasta).
Aineisto: proto-3d/lokit/natiivi-ui-1035/.

SÄÄNNÖT NYT (omistaja klo 17 asti): Clauden kuorma ≤ 8 ydintä, käännökset yksi kerrallaan matalalla prioriteetilla,
simulaattoreita YKSI booted koko Macilla. Käännös- ja simulaattorivuorot jakaa Julkaisija ("NYT"); ilmoita "käännös
valmis" ja sammutus UDID:llä. ÄLÄ käytä `taskpolicy -b` (jumivahti tappoi käännöksen 11.37), vain `nice -n 15`.

## JUNASSA (Natiiviseppä mergesi)
- natiivi-ui/ihme-kuvana f1714aaf + nimet-laskuri 5d79edd9 (juna/b13 980c176f): web #3517 ihme ensin, nykykuva kyljessä.
- natiivi-ui/paivityslappu e19b5d97 (juna/b13 30ddb4ad): "Peli päivittyi" hakee rivin verkosta, jos laitteen paketti
  on vanha; yleinen "Sisältöä päivitettiin." pois; "v1.0.34". Siirtoseppä #3538 tuo oikean sisältötekstin.

## KÄRKI: KÄÄNNÖS JA SIMULAATTORI (ei vielä laitteella)
Julkaisija on sallinut uusinnan Linssisepän cl2-käännöksen jälkeen; pyydä "NYT". Komento:
`nice -n 15 proto-3d/tyokalut/proto-kaanna.sh natiivi-ui/lukijan-valikko+natiivi-ui/pehmea-nakyvyys+natiivi-ui/pelikello+natiivi-ui/maan-niminen-kaupunki`
(merge-tree: ristiriidaton). Tallenna .app heti: Build/dd-sim/Build/Products/Release-iphonesimulator → _valmiit/.
Simulaattorilla FB234D08 (~20 min, ainoa booted): ENNEN = _valmiit/build34-17c2928b, JÄLKEEN = uusi:
`kierros.sh ennen <build34-app>` ja `kierros.sh jalkeen <uusi-app>` → panorointivideot + Islannin nostoportit.
Sitten jälkeen-appilla: `ui nosto kohde:korintin-kanava@GRC lisaa` (kaiutin näkyy heti), `ui nosto
skandaali:shakkiturkkilainen valikko` (kappalelista), ulosnapautus valikon ohi (kortti jää auki: MCP-simulaattorin tap),
`ui aloitus valinta` (kello + "+6 h"-nimiöt), `ui pelikello tunnit 7.5`. Kuvaparit → merge-pyynnöt Natiivisepälle
1.0.36-junaan, välkyntävideo ja kuvaparit Fablelle.

Haarat:
1. natiivi-ui/lukijan-valikko 5313075a (sis. aanivalinta-sulku 595efbb2): KAKSINAPPINEN LUKIJA kaikissa luentakohdissa
   (web #3537): nostokortti, lehti, nähtävyysjuttu, tiedeliite, wiki (KortinLukija saatimet + Lahde). Valikko 320 pt:
   kappalelista, nopeus, ääni, kelaus |◁ −10 s +10 s ▷| (Puhe.Kelaa uusi, palan sisällä; rajalla viereisen palan alkuun),
   latausrengas 250 ms. Nostokortin napit kiinni kortissa (Nostokortti.SijoitaLukija), eivät vieri pois (Korintin kanava).
   Ulosnapautus sulkee vain valikon (StopPropagation + PointerUp/Click-nielu). Testi: `ui nosto <valo> valikko`.
   Webistä puuttuu: lehden "Jatkuva luenta" (ei natiivissa).
2. natiivi-ui/pehmea-nakyvyys 89b01b09: VÄLKYNTÄ (omistaja TF 1.0.34, Fablen linja + Pelikoodarin mittaus
   proto-3d/lokit/nostoreuna-web/mittaus.md, web #3540): merkkielementti pysyy samalla nostolla (NostotKartalla.Hae),
   nimiö 220 ms ease-in-out, kalustepeitto lukossa liikkeessä, kuvakortti (Kutsuminiatyyri) lukossa liikkeessä ja
   kulkee reunan yli (PalloKierto.RuutuPiste ulos), levossa häivytys 250 ms; kaupunkinimet 220 ms smoothstep ja
   LIIKELUKKO (NimiLadonta.Ruudulla/LukittuNakyvyys; Natiiviseppä antoi tämän minulle). Kartta-testit 338/338.
3. natiivi-ui/pelikello d305e546: v3f UI. Pelikello.cs (rajapinta Natiivisepän kanssa: Tunnit, AlkuKelloUtc, Lennossa,
   LentoTunnit isoympyrä/800 km/h 6 h:n ikkunoin), Pelikellonaytto (oikea yläkulma, valinnassa ja lennolla), lentoaika
   valittavien renkaan alle (KaupunkiMerkit.AsetaLentoaika). Testi `ui pelikello`. Natiiviseppä kirjoittaa Lennossa/Tunnit.
4. natiivi-ui/maan-niminen-kaupunki 25215c25: Pelikoodarin Geysir-löydös (web #3541): nimivertailu vain paikkaLahde
   "data" ja ei maan nimiselle kaupungille (Islanti 0/31 → 30/31, Luxemburg 0/17 → 14/17 webin vientimittauksella).

## AVOINNA MUUTA
- iPad-kuvat valikosta ja välkynnästä (jaettu 503000D1, vuoro Julkaisijalta).
- Linssisepän ISS-kyydin Cupola-kehyksen katselmointi, kun hän ilmoittaa SHA:n (suositus
  origin/linssiseppa-tyo-20260923:docs/raportit/iss-kyyti-suositus-20260928.md). Astro-selain katselmoitu (74f21d92 OK).
- Web-ero Fablelle kerrottu: webin ihmekuvan kuvateksti on pitkä selite (kohteenIhmekuva ei välitä lyhyt-kenttää).

## OPIT
- UITK `resolvedStyle.width` pyöristyy pikseliruutuun: älä vertaa asetettuun odotusehdossa.
- Unityn Debug.Log: `xcrun simctl launch --stdout=<f> --stderr=<f>`; kartan `nimet`/`nostot tila` kirjaa sinne.
- Unity piirtää vain herätettynä: kuvaa ~90 s "ui aloita ateena" -komennon jälkeen, muuten saat jähmettyneen välikehyksen.
- Lukijan ääni: plist Library/Preferences/app.matkakirja.proto3d.plist, `plutil -remove matkakirja-puhe-persoonat`.
- Simulaattorin 7 Gt:n PRBPosterExtensionDataStore on iOS:n välimuisti (poistettu omasta ja iPadista 28.9.).
