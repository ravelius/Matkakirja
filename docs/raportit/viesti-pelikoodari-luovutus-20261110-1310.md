# Pelikoodari: luovutus 10.11.2026 klo 13.10 (konteksti 27 %, pehmeä raja)

Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/latausruutu-225 (natiivi-backupissa), kärki f45192f8e.
Ketju juna-224:n kärjestä f08387e78: 423e02931 (otsikko+palkki) → d42a45345 (jumi) → 15baea099 (Poistu) → f45192f8e (musiikki, leima).
Kaikissa unity 0; peli 897/897 (uusi JuoksuVerkkoVahtiTestit 4 testiä). EI VIELÄ AJETTU esikatselussa eikä laitteella.

## 1. JUOKSUPELIN LATAUSRUUTU (OMISTAJA 12.47 KK:n kautta, PT 13.1x) – KOODI TEHTY, KUVAAMATTA
Kuva ennen: /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261110/juoksupeli-latausruutu-jumi-1247.png (pieni iPad pysty).
1) JUMI d42a45345. TODELLINEN SYY (v130-konsoli proto-3d/lokit/pelikoodari-tausta-v130/konsoli.txt, rivit ~1757–): ~14 rinnakkaista hakua
   jakoivat hitaan verkon (~0,3 Mt/s), jokainen sai ~1,4 Mt 60 s:ssa ja UnityWebRequestin timeout (= KOKO haun kesto) katkaisi kaikki yhtä
   aikaa (92 osittain, 21 "kaikki tavut saatu" mutta ei päättynyt); uusinnat samoin. Lyhyempi timeout (edellisen luovutuksen ehdotus a)
   olisi pahentanut (puyi.glb 9 Mt). Korjaus: Peli/Juoksupeli/JuoksuVerkkoVahti.cs (puhdas) + Scripts/Juoksupeli/JuoksuVerkko.cs:
   - hiljaisuusraja 15 s (ei tavuja → Abort), kokonaiskatto 240 s; kaikki juoksun haut (JuoksuHahmot.Hae, JuoksuLeivottu hakemisto/glb/kuvajono)
   - nopeus mitataan 4 s:n ikkunoissa; latauksen aikana taustaesihaku (glb + kuvat) odottaa, kunnes verkko mitattu nopeaksi (> 1 Mt/s)
     tai maailma valmis (Valmis → JuoksuVerkko.LatausLoppuu)
   - katkaisin: 3 peräkkäistä yhteysvirhettä TAI 120 s latausta → välimuistista puuttuvat glb/kuvat ohitetaan (ei hahmot-; json vain kun verkko poikki)
   - HaeGlb ei hae etualalla uudelleen katkaistussa latauksessa; taivas: hitaalla verkolla proseduraalinen (leivottu odottaa mittausta ≤ 15 s)
   - QA: `juoksupeli palatsi verkko hidas 1 | viive S | latausraja S | hiljaisuus S`; lokirivit "MATKAKIRJA juoksupeli: verkko …"
   Ei koskettu: JuoksuSokkeloMaailma.Osasarja.cs:305 valoatlaksen suora haku (pelin aikana, timeout 60) – voi siirtää JuoksuVerkko.Odotaan.
2) POISTU 15baea099: pelin yhteinen ☰ (Raamattu 2.201, alin rivi Poistu) latauskuvan (latausIsa) lapseksi latauksen ajaksi
   (KehysLatauskuvalle), kotiin ennen häivytystä ja Suljessa; latausruudulla Poistu ilman vahvistusta; Tuhoa → JuoksuVerkko.Peru.
   TARKISTA kuvasta: ☰ näkyy latauskuvan päällä oikeassa yläkulmassa turva-alueella; valikko aukeaa kuvan päälle; Poistu → kartta.
3+4) 423e02931 (edellinen luovutus): tarkista pystykuvassa, ettei otsikko osu vasemman katon koristeisiin.
5) LEIMAN ÄÄNI f45192f8e: laskeutuminen-1 pois (LeimaAaniUrl null = ei ääntä). TILATTU Äänittäjältä (local_726ba209…) 13.0x: kengän
   tömähdys Soundly/Sonniss (5.27) → kun url tulee: JuoksupeliNakyma.LeimaAaniUrl = "<url>" (kenttä rivillä ~281).
6) MUSIIKKI f45192f8e: Avaa (v4) → avausMusiikki + SoitaAvausKappale("latausruutu"); LentoAlkaa ei aloita uudelleen ("musiikki avaus
   jatkuu (lento)" lokissa). TARKISTA: soiko latausruudulla (mykistys/PohjaLahde latauksen aikana?), ei katkoa lennon alussa.
SEURAAVAKSI: Mac-esikatselu (JU:n vuorolla): kylmä välimuisti (`juoksupeli palatsi valimuisti tyhjenna`) + `verkko viive 8` +
`verkko latausraja 30` → lataus päättyy, palkki etenee, loki "verkko lataus katkaistu"; toinen ajo normaalisti. Sitten pieni iPad pysty
(JU) kuvapari ennen|jälkeen täysikoossa + kuulonäyte videona (leima + musiikki) PT:lle; KK:lle kuulonäyte ja pari. Juna: seuraava avoin.

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
