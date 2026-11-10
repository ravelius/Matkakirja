# Pelikoodari: luovutus 10.11.2026 klo 12.55 (konteksti > 30 %)

Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (nyt haarassa pelikoodari/latausruutu-225). Kaikki haarat natiivi-backupissa.

## 1. JUOKSUPELIN LATAUSRUUTU (OMISTAJAN PYYNTÖ 12.47 KK:n kautta, PT 13.1x) – KESKEN, PÄÄTYÖ
Kuva: /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261110/juoksupeli-latausruutu-jumi-1247.png
(pieni iPad Pro 11 M5 pysty, 224.16; palkkia ei näy, otsikko reunasta reunaan ylhäällä). PT:n järjestys:
1) VIKA: lataus jumissa. 2) Poistu-nappi latausruutuun. 3) Otsikko pienemmäksi ja alemmas. 4) Palkki paksummaksi.
5) Kengänjälkileiman ääneksi kengän tömähdys (valmiista pankista, ei generointia), nykyinen laskeutuminen-1 pois.
6) Taustamusiikki latausruutuun = sama kappale kuin alkulennossa, jatkuu katkeamatta lentoon.
Tulokset: kuvapari ennen | jälkeen täysikoossa (pieni iPad pysty) + kuulonäyte videona PT:lle; KK:lle kuulonäyte ja pari. Juna: seuraava avoin.

TEHTY: haara pelikoodari/latausruutu-225 (juna-224:n kärjestä f08387e78) = 423e02931: kohdat 3 ja 4
(PystyOtsikko keskikohta 215 → 309 px / 1672, PystyOtsikkoNakyva 0,92 → 0,68; USS .mk-edistyminen--paksu 5 px × 180 px). unity 0, peli 893/893.
Ei vielä kuvattu: tarkista pystykuvassa, ettei otsikko osu vasemman katon koristeisiin (KK 3.11. 23.0x), säädä tarvittaessa.

VIAN SYY (Sonnet-tutkija, koodi; vahvistettu v130-ajon konsolista lokit/pelikoodari-tausta-v130/konsoli.txt: 113 × Curl 28, ei "latauksen
ositus" 831 s:ssa): hitaalla verkolla JuoksuV4Maailma.Lataa() etenee PERÄKKÄIN ja jokainen haku odottaa 60 s:n timeoutin
(JuoksuHahmot.Hae ~cs:274, JuoksuLeivottu kuva :181 ja glb :267). Ketju: ~7 JSON-hakua + jokainen palatsin glb (Palatsi.cs ~321/~472)
+ HaeKuvat-silmukka (JuoksuLeivottu 187–208, epäonnistuneet uudelleen jonoon :199) + HaeGlb-tuplahaku taustatyön epäonnistuttua
(~240–262) → Valmis (JuoksuV4Maailma.cs:555) ei käytännössä tule. Taivas ei estä Valmista mutta syö kaistaa (koottu 1 × 60 s + palat
13 × 60 s = 724 s). Taustaesihaku (glb 6 + kuvat 6–8 rinnakkain, JuoksuV4Maailma.cs:419) kilpailee kriittisen polun kanssa koko ajan.
Pelin käynnistys odottaa vm.Valmis (JuoksupeliNakyma.cs ~1222), ei yleistä latausaikarajaa.
Pienen iPadin Documents (fi.matkakirja.peli.kehitys, devicectl copy from): verkko-odotus.jsonl 12.48 puhe 17,1 s → studion verkko hidas
(myös Mac-curl 11.1x 3–25 s, ks. kohta 2). Jumi-ajon omaa konsolia ei ole talletettu.
KORJAUSEHDOTUS (toteuta): (a) kriittisille hauille lyhyt timeout (~10–15 s), tausta 60 s; (b) taustaesihaku tauolle (tai 2+2) kunnes
Valmis; (c) HaeGlb ei uudelleen etualalla, jos taustatyö aikakatkesi; HaeKuvat-silmukalle aikaraja (~20 s), glb ilman puuttuvia kuvia;
(d) peräkkäisten aikakatkaisujen katkaisin (3 → ohita loput ei-pakolliset); (e) taivas: kokonaiskatto ~15 s → proseduraalinen;
(f) KOHTA 2 poistu-nappi latausruutuun aina (palaa kartalle, peruu latauksen siististi). Palkki näkyy jo (latauspalkki näkyy -rivi),
mutta jäi 0,02:een, koska LatausOsuus ei edennyt.
Testaus: Mac-esikatselu hitaan verkon simulaatiolla (esim. testikytkin, joka viivästää JuoksuHahmot.Hae-hakuja) + pieni iPad pysty JU:n vuorolla.

## 2. TAUSTA v131 + LEIVOTTU-v5 (PT 12.1x SANA, JU ajaa OZ)
Haara pelikoodari/tausta-v131-224 = 8d22f34e4 (66b550331:n päällä): TaustaKansio kielletty-tausta-v131, Palvelin leivottu-v5,
leivontalista 69 url:ia v131, paketti-v5 = 530 glb + 524 kuvaa + taivas 12/12, SHA256SUMS 510da66d5069 (_tyo/pelikoodari/juoksu-leivottu/
paketti-v5, lähteet LAV:n paketista). JU vei 12.2x: tausta-v131 SHA 100/100, leivottu-v5 tarkistus käynnissä → laitekäännös 8d22f34e4 →
odottaa curl taivas-koottu < 3 s (verkko hidas 11.1x: 3–25 s) → iso iPad sk _tyo/pelikoodari/juoksu-leivottu/sk-ipad-tausta-v131.txt →
lokit/pelikoodari-tausta-v131. KUN VALMIS: kuvat v131-* + muisti-tarkka.log (huippu ≤ ~3850 Mt, kylmä < 40 s, ei valkoisia, lattia
yhtenäinen, ei punaista piikkiä) → pari PT:lle (vertailu lokit/pelikoodari-yhd-1) → junaan 224 VAIN PT:n kuittauksella. v130-ajo peruttu
(v131 korvaa); LAV:lle sha ilmoitettu.

## 3. NIMEN NAPAUTUS = ZOOMAUS + LISÄKAUPUNGIT (haara pelikoodari/nimi-zoomaus-224)
c3e223a5f:n Lyon oli tyhjä paperi (zoomaus ilman maata → kaupunkinäkymä). KORJAUS 2997f7c80: ZoomaaPaikkaan(…, maa) noston ISO3-maalla
(vara lähimmän pelin kaupungin maa). Uusinta lokit/pk-lisakaupunki-2997f7c80: Lyon FRA 1,7 km, kartta näkyy mutta kuva 7 s:ssa sumea ilman
nimiä (aste 95,7 %, nimiä ruudulla 0). JU:lla jonossa PA = sk julkaisija-tyokalut/sk-taysi/pk-lisakaupunki-b-2997f7c80.txt (lisäkuvat 17 s
ja 30 s) → lokit/pk-lisakaupunki-b-2997f7c80. KUN VALMIS: jos Lyon terävä nimineen 30 s:ssa → pari PT:lle (Pariisi + Lyon nyky | uusi, ja
nimi-zoomaus bdae03fd6 | nyky 4444e211a, lokit/pk-nimi-zoomaus-bdae03fd6 ja -nyky-4444e211a, JU ajoi 5/5); muuten tarkista korkeus
(Lyonilla ei piirroskaupunkia, MinKorkeusPaikassa 1,7 km). Molemmissa ajoissa vanha ArgumentOutOfRange "ui sulje" -kohdassa (myös nyky).

## 4. MUUT
- PR 6557 (NUI data 083410e11) tarkistettu: OK julkaistuille ≤ 224.16 (vastattu PT:lle ja NUI:lle 12.5x).
- Montparnasse [1] JU:lla vasta linkkiketjun 224.14–16 jälkeen. Peukalorenkaat [60] odottaa yhteisajoa.
