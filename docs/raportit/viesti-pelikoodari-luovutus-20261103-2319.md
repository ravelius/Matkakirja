# Pelikoodari: luovutus 3.11.2026 klo 23.19 – otsikko-219 odottaa vuoroa

Edellinen: -20261103-2255 (832b43ee2), voimassa ellei alla toisin. Syy: kontekstiraja 27 % (7.37). Ei omia taustaketjuja.

## Tehty: KK:n otsikkopalaute, pelikoodari/otsikko-219 878ac7755 (wt/proto-pelikoodari-otsikko)
Ei ajettu pelissä. Peli-testit 814/814, unity-tarkistus 0 virhettä. PT: ei valmis ennen kuin B4 ja C on katsottu kuvista.
- **A latauskuva pysty**: PystyOtsikko keskikohta y 356,7 → 215 px; VIIMEINEN-sanan alareuna 194 px, koristeiden yläpuolella (oma kooste, ei todistus).
- **B1 otsikko vasta maailman näkyessä**: JuoksuOtsikkoPortti (Peli/Juoksupeli/JuoksuOtsikkoSommittelu.cs): Nakyvissa + Lammitetty + latauskuva pois, 3 peräkkäistä ruutua; maailma piiloon → otsikko piiloon ja alusta.
  Soikion syy koodista päätelty: Uudestaan vaihtoi reitin, Nakyvissa oli ruudun vanhentunut, lento alkoi ja rakennus näytti kameran taustavärin (0.78, 0.84, 0.90). Korjaus uusiJuoksuPiirtamatta. Normaalia aloitusta ei ole kuvattu.
- **Usva poistettu kokonaan** (oma päätös, PT:lle kerrottu): tumma teksti taivasta vasten.
- **B2**: kehote pois, kun AvausKaynnissa (ei avausT ≥ 0: sen jälkeen pelaaja ohjaa).
- **B3**: JuoksuOtsikkoPaikka: lohko taivaalla (alareuna ≤ 33 %, horisontti ~37 %, pystykulma 65° kiinteä), ei ☰:n päällä; testit JuoksuOtsikkoSommitteluTestit. Korvaa 13.18:n "keskelle" pystysuunnassa.
- **QA** `ui juoksupeli avauskuvat 1`: latauskuva 3 s:n kohdalla ja lennosta 20 kuvaa 0,5 s välein, Documents/avauskuva-NN.png, aika lokiin. Kuvan otto voi hieman hidastaa ruutuja: huomioi B4:ää lukiessa.

## AVOIN
1. **Vuoro JU:lla**: linja 1 lav-v123:n jälkeen, iso iPad Pariisi-jonon jälkeen. Skriptit proto-3d/_tyo/pelikoodari/otsikko-219/aja.zsh + aja-simu.zsh (`<linja> iphone`, `<linja> ipad <runko>`); vain syntaksi tarkistettu, EI koeajettu. JU:lle lähetetty 23.1x, JU ilmoittaa kansion.
2. **Kun kuvat tulevat**: katso itse kaikki (valmis vasta katsottuna). B4: lokirivit.txt "häipyvät N s" ja rivien hetket (tavoite 4,8 s, rivit 0,4/1,0/1,6 s vaiheesta). Tarkista ettei vaaleaa ruutua, ei kehotetta, otsikko taivaalla kaikissa kolmessa muodossa. Kuvat PT:lle, KK:lle 0,5 s välein yksittäisinä, ei koosteita.
3. **B5 keltainen katto**: PT 23.1x: ÄLÄ jatka laskentaa. Ota vuoron kuvista ruutu, jossa katto näkyy (noin pikseli (450, 583) vaaka-iPadilla), merkitse ehdokkaat, kuva PT:lle; KK vahvistaa kohteen ennen korjausta. Ehdokas ilman näyttöä: tausta-v115 laatta 1-1 V4_gold x −233…−192, z −222…−167 (koko sopii, sivusuunta ei). Lavastajalta kysytty (proto-3d/lokit/pk-keltainen-katto-20261103/), vastausta ei ole; jos tulee, ehdokkaisiin.
4. **Vesi-219 ja palvelijat v6**: JU: ei tähän vuoroon, pyydä erikseen. Palvelijoista uudet kuvat proto-3d/_tyo/pelikoodari/palvelijat-v6/ (23.06), EN ole katsonut.
5. Muut kohdat -2255:stä ennallaan (kohdat 5–6). Kohdat 1 ja 2 korvattu tällä.
6. Checkout: luovutushaara koti/Matkakirja-pelikoodari.

## Lisäys: Lavastajan vastaus B5:een
LAV ei tunnistanut mallia; väri on väärä. LAV:n arvio kuvasta x ≈ −97, z ≈ −205 (±30 m), Taihemenin länsipuoli; ei löytynyt tausta 1-1:n lod0/1:stä, t-portti-m216:sta eikä avoimista (tausta 1-0 ja lod2 vain laaja haku, c2 ei osumia). Oma ehdokas x −233…−192 on siis heikko. Merkitse kuvaan molemmat. LAV:lle sanottu: ei korjausta ennen KK:n vahvistusta, säteen tulosta ei tule (PT kielsi laskennan, pelissä ei poimintakomentoa).

## Lisäys: JU:n korjauspyyntö – SEURAAVAN ISTUNNON ENSIMMÄINEN TYÖ, EI TEHTY
JU: 878ac7755 jonossa: iPhone L1 lav-v123:n jälkeen, iso iPad NUI:n sauma-a2:n jälkeen (runko 693cf437f). Ennen iPad-vuoroa korjattava aja.zsh: `devicectl … --console` on ollut rikki (3.11. 20.20), konsoli.log jää tyhjäksi eikä B4:n rivejä "avauksen tekstit" ja "häipyvät" tule.
Korjaus: skripti konsolittomaksi ja rivit peliltä tiedostoon, jonka skripti hakee Documentsista (tarkista ensin, päätyvätkö ne ui-lokiin; Debug.Log-rivit eivät todennäköisesti päädy). Jos pelikoodi muuttuu, SHA vaihtuu: kerro uusi SHA JU:lle ja päivitä aja.zsh. Skripti luetaan vasta vuorolla, joten sitä saa muokata suoraan. Samalla tarkista iPhone-osan konsoli (simctl, ei tämä vika).
